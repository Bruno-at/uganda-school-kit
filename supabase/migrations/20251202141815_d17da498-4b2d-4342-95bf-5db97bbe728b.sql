-- Create function to delete old news items (older than 2 weeks)
CREATE OR REPLACE FUNCTION public.delete_old_news_items()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.news_items
  WHERE created_at < NOW() - INTERVAL '2 weeks';
END;
$$;

-- Create a policy to allow authenticated users to insert events
CREATE POLICY "Authenticated users can insert events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);