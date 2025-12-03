-- Drop the restrictive insert policy and create a permissive one
DROP POLICY IF EXISTS "Allow anyone to insert news item" ON public.news_items;

CREATE POLICY "Allow anyone to insert news item"
ON public.news_items
FOR INSERT
TO public
WITH CHECK (true);