-- Create storage bucket for news and events images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-events', 'news-events', true);

-- Storage policies for news-events bucket
CREATE POLICY "Anyone can view news event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-events');

CREATE POLICY "Authenticated users can upload news event images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-events' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update their news event images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-events' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete news event images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-events' 
  AND auth.role() = 'authenticated'
);

-- Create news_items table
CREATE TABLE public.news_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  image_url TEXT,
  date_published TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reading_time INTEGER,
  is_featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_details TEXT NOT NULL,
  category TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  is_highlighted BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news_items
CREATE POLICY "Anyone can view published news items"
ON public.news_items FOR SELECT
USING (status = 'published');

CREATE POLICY "Authenticated users can insert news items"
ON public.news_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own news items"
ON public.news_items FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own news items"
ON public.news_items FOR DELETE
USING (auth.uid() = created_by);

-- RLS Policies for events
CREATE POLICY "Anyone can view events"
ON public.events FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert events"
ON public.events FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own events"
ON public.events FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events"
ON public.events FOR DELETE
USING (auth.uid() = created_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_news_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_news_items_updated_at
BEFORE UPDATE ON public.news_items
FOR EACH ROW
EXECUTE FUNCTION public.update_news_events_updated_at();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_news_events_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_news_items_status ON public.news_items(status);
CREATE INDEX idx_news_items_category ON public.news_items(category);
CREATE INDEX idx_news_items_featured ON public.news_items(is_featured);
CREATE INDEX idx_news_items_date ON public.news_items(date_published DESC);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_category ON public.events(category);