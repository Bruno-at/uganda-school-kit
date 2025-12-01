import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useDeleteNewsItem } from '@/hooks/useNewsItems';
import type { NewsItem } from '@/hooks/useNewsItems';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface NewsItemsListProps {
  newsItems: NewsItem[];
  isLoading: boolean;
  onEdit: (id: string) => void;
}

const NewsItemsList: React.FC<NewsItemsListProps> = ({ newsItems, isLoading, onEdit }) => {
  const deleteMutation = useDeleteNewsItem();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (newsItems.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No news items yet. Click "Add News" to create your first article.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.is_featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                  <Badge variant={item.status === 'published' ? 'default' : 'outline'} className="text-xs">
                    {item.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.short_description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{format(new Date(item.date_published), 'MMM dd, yyyy')}</span>
                  {item.reading_time && <span>{item.reading_time} min read</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(item.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this news item. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsItemsList;