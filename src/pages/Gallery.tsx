import React, { useState } from 'react';
import { useGalleryItems } from '@/hooks/useGalleryItems';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, Camera, X, Play } from 'lucide-react';
import AutoTranslate from '@/components/AutoTranslate';

const Gallery = () => {
  const { galleryItems = [], isLoading } = useGalleryItems();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const categories = [...new Set(galleryItems.map(i => i.category))];

  const filtered = galleryItems.filter(item => {
    const matchesSearch = !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AutoTranslate>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary rounded-full">
                <Camera className="h-8 w-8 text-secondary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo & Video Gallery</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Explore moments from school life, events, sports, and celebrations at Excellence Academy.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos and videos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading gallery...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No gallery items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted"
                  onClick={() => setLightboxItem(item)}
                >
                  {item.media_type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                      {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <Play className="h-12 w-12 text-muted-foreground" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary/80 rounded-full p-3">
                          <Play className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.media_url || '/placeholder.svg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <Badge variant="secondary" className="mt-1 text-xs">{item.category}</Badge>
                    </div>
                  </div>
                  {item.is_featured && (
                    <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs">Featured</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Lightbox */}
        <Dialog open={!!lightboxItem} onOpenChange={() => setLightboxItem(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {lightboxItem && (
              <div>
                {lightboxItem.media_type === 'video' ? (
                  <video src={lightboxItem.media_url || ''} controls className="w-full max-h-[70vh]" />
                ) : (
                  <img
                    src={lightboxItem.media_url || '/placeholder.svg'}
                    alt={lightboxItem.title}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{lightboxItem.title}</h3>
                  {lightboxItem.description && (
                    <p className="text-sm text-muted-foreground mt-1">{lightboxItem.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{lightboxItem.category}</Badge>
                    {lightboxItem.date_taken && (
                      <Badge variant="outline">{new Date(lightboxItem.date_taken).toLocaleDateString()}</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AutoTranslate>
  );
};

export default Gallery;
