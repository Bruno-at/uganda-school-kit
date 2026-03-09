import React, { useState } from 'react';
import { useActivities, Activity } from '@/hooks/useActivities';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Play, Image as ImageIcon, Video } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const getEmbedUrl = (url: string): string | null => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return null;
};

const isDirectVideo = (url: string): boolean => {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
};

const ActivityCard = ({ activity, onClick }: { activity: Activity; onClick: () => void }) => {
  const thumbnail = activity.thumbnail_url || activity.media_url;

  return (
    <div
      className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={activity.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            {activity.media_type === 'video' ? <Video className="h-10 w-10 text-muted-foreground" /> : <ImageIcon className="h-10 w-10 text-muted-foreground" />}
          </div>
        )}
        {activity.media_type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
            <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play className="h-7 w-7 text-primary-foreground ml-1" />
            </div>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-primary/80 text-primary-foreground text-xs">
          {activity.media_type === 'video' ? 'Video' : 'Image'}
        </Badge>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">{activity.category}</Badge>
          {activity.featured && <Badge className="text-xs bg-secondary text-secondary-foreground">Featured</Badge>}
        </div>
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{activity.title}</h3>
        {activity.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
        )}
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  const { activities, isLoading } = useActivities();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Activity | null>(null);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activities.length === 0) return null;

  // Separate images and videos
  const images = activities.filter(a => a.media_type === 'image');
  const videos = activities.filter(a => a.media_type === 'video');

  return (
    <>
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">School Activities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our vibrant school activities — from sports and arts to tours and cultural events.
            </p>
          </div>

          {/* Images Section */}
          {images.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center">Image Gallery</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((a) => (
                  <ActivityCard key={a.id} activity={a} onClick={() => setSelected(a)} />
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {videos.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Video Collection</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((a) => (
                  <ActivityCard key={a.id} activity={a} onClick={() => setSelected(a)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Video Player */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
          {selected && (
            selected.media_type === 'video' && selected.media_url ? (
              (() => {
                const embedUrl = getEmbedUrl(selected.media_url);
                if (embedUrl) {
                  return (
                    <div className="aspect-video">
                      <iframe src={embedUrl} className="h-full w-full" allowFullScreen allow="autoplay; encrypted-media" />
                    </div>
                  );
                }
                if (isDirectVideo(selected.media_url)) {
                  return (
                    <div className="aspect-video">
                      <video src={selected.media_url} controls autoPlay className="h-full w-full" />
                    </div>
                  );
                }
                return (
                  <div className="p-8 text-center">
                    <a href={selected.media_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Open video in new tab
                    </a>
                  </div>
                );
              })()
            ) : selected.media_url ? (
              <img src={selected.media_url} alt={selected.title} className="w-full max-h-[80vh] object-contain" />
            ) : (
              <div className="p-8 text-center text-muted-foreground">No media available</div>
            )
          )}
          {selected && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{selected.category}</Badge>
              </div>
              <h3 className="font-semibold text-lg">{selected.title}</h3>
              {selected.description && <p className="text-sm text-muted-foreground mt-1">{selected.description}</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivitiesSection;
