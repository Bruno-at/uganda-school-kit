-- Create storage bucket for homepage background images
INSERT INTO storage.buckets (id, name, public)
VALUES ('homepage-backgrounds', 'homepage-backgrounds', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view background images
CREATE POLICY "Anyone can view homepage backgrounds"
ON storage.objects
FOR SELECT
USING (bucket_id = 'homepage-backgrounds');

-- Allow authenticated users to upload background images
CREATE POLICY "Authenticated users can upload homepage backgrounds"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'homepage-backgrounds' AND auth.role() = 'authenticated');

-- Allow authenticated users to update background images
CREATE POLICY "Authenticated users can update homepage backgrounds"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'homepage-backgrounds' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete background images
CREATE POLICY "Authenticated users can delete homepage backgrounds"
ON storage.objects
FOR DELETE
USING (bucket_id = 'homepage-backgrounds' AND auth.role() = 'authenticated');