-- Fix donations table security issues
-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all donations" ON public.donations;

-- Create new restrictive SELECT policies
-- Policy 1: Admins can view all donations with full details
CREATE POLICY "Admins can view all donations"
ON public.donations
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Policy 2: Users can view their own donations
CREATE POLICY "Users can view their own donations"
ON public.donations
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
);

-- Create a public view that respects anonymity for public display
-- This view hides donor_name and donor_email when is_anonymous = true
CREATE OR REPLACE VIEW public.donations_public AS
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