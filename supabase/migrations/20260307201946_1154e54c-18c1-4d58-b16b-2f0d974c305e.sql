
-- Create activities table
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  media_type TEXT NOT NULL DEFAULT 'image',
  media_url TEXT,
  thumbnail_url TEXT,
  activity_date DATE,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Anyone can view activities
CREATE POLICY "Anyone can view activities" ON public.activities
  FOR SELECT USING (true);

-- Anyone can insert activities (no auth required per project design)
CREATE POLICY "Anyone can insert activities" ON public.activities
  FOR INSERT WITH CHECK (true);

-- Anyone can update activities
CREATE POLICY "Anyone can update activities" ON public.activities
  FOR UPDATE USING (true);

-- Anyone can delete activities
CREATE POLICY "Anyone can delete activities" ON public.activities
  FOR DELETE USING (true);

-- Create updated_at trigger
CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create storage bucket for activity media
INSERT INTO storage.buckets (id, name, public)
VALUES ('activities', 'activities', true);

-- Storage policies for activities bucket
CREATE POLICY "Anyone can upload activity media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'activities');

CREATE POLICY "Anyone can view activity media"
ON storage.objects FOR SELECT
USING (bucket_id = 'activities');

CREATE POLICY "Anyone can delete activity media"
ON storage.objects FOR DELETE
USING (bucket_id = 'activities');
