import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useDeleteEvent } from '@/hooks/useEvents';
import type { Event } from '@/hooks/useEvents';
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

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  onEdit: (id: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, isLoading, onEdit }) => {
  const deleteMutation = useDeleteEvent();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No events yet. Click "Add Event" to create your first event.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-24 h-24 object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  {event.is_highlighted && (
                    <Badge variant="secondary" className="text-xs">Highlighted</Badge>
                  )}
                  <Badge variant={event.status === 'upcoming' ? 'default' : event.status === 'past' ? 'outline' : 'destructive'} className="text-xs">
                    {event.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{event.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{event.short_description}</p>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(new Date(event.start_date), 'MMM dd, yyyy')} - {format(new Date(event.end_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(event.id)}>
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
                        This will permanently delete this event. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(event.id)}
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

export default EventsList;