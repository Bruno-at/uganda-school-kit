-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Grant usage to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Schedule daily cleanup of old news items (runs at midnight UTC)
SELECT cron.schedule(
  'delete-old-news-daily',
  '0 0 * * *',
  $$SELECT public.delete_old_news_items()$$
);