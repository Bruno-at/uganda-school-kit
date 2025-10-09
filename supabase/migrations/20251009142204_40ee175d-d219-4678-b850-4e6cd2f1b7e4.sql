-- Fix the security definer view issue
-- Drop and recreate the view with SECURITY INVOKER
DROP VIEW IF EXISTS public.donations_public;

CREATE OR REPLACE VIEW public.donations_public
WITH (security_invoker = true)
AS
SELECT
  id,
  CASE 
    WHEN is_anonymous = true THEN NULL 
    ELSE donor_name 
  END AS donor_name,
  CASE 
    WHEN is_anonymous = true THEN NULL 
    ELSE donor_email 
  END AS donor_email,
  amount,
  currency,
  purpose,
  CASE 
    WHEN is_anonymous = true THEN NULL 
    ELSE message 
  END AS message,
  is_anonymous,
  payment_status,
  created_at
FROM public.donations
WHERE payment_status = 'completed';

-- Allow anyone to view the public donations view (with anonymity respected)
GRANT SELECT ON public.donations_public TO anon;
GRANT SELECT ON public.donations_public TO authenticated;