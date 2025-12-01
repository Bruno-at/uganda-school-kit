import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Newspaper, Calendar as CalendarIcon } from 'lucide-react';
import { useNewsItems } from '@/hooks/useNewsItems';
import { useEvents } from '@/hooks/useEvents';
import NewsItemForm from '@/components/settings/NewsItemForm';
import EventForm from '@/components/settings/EventForm';
import NewsItemsList from '@/components/settings/NewsItemsList';
import EventsList from '@/components/settings/EventsList';

const NewsEventsSettings = () => {
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const { data: newsItems, isLoading: newsLoading } = useNewsItems();
  const { data: events, isLoading: eventsLoading } = useEvents();

  const handleNewsFormClose = () => {
    setShowNewsForm(false);
    setEditingNewsId(null);
  };

  const handleEventFormClose = () => {
    setShowEventForm(false);
    setEditingEventId(null);
  };

  const handleEditNews = (id: string) => {
    setEditingNewsId(id);
    setShowNewsForm(true);
  };

  const handleEditEvent = (id: string) => {
    setEditingEventId(id);
    setShowEventForm(true);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">News & Events Settings</h1>
          <p className="text-muted-foreground">Manage news articles and upcoming events for your website</p>
        </div>

        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Latest News
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latest News</CardTitle>
                    <CardDescription>Add and manage news articles that appear on the News & Events page</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewsForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add News
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showNewsForm ? (
                  <NewsItemForm
                    newsId={editingNewsId}
                    onClose={handleNewsFormClose}
                    onSuccess={handleNewsFormClose}
                  />
                ) : (
                  <NewsItemsList
                    newsItems={newsItems || []}
                    isLoading={newsLoading}
                    onEdit={handleEditNews}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Add and manage events that appear on the News & Events page</CardDescription>
                  </div>
                  <Button onClick={() => setShowEventForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showEventForm ? (
                  <EventForm
                    eventId={editingEventId}
                    onClose={handleEventFormClose}
                    onSuccess={handleEventFormClose}
                  />
                ) : (
                  <EventsList
                    events={events || []}
                    isLoading={eventsLoading}
                    onEdit={handleEditEvent}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewsEventsSettings;