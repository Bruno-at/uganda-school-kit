-- Drop existing RLS policies on user_roles if any
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "First admin can be created" ON public.user_roles;
DROP POLICY IF EXISTS "Allow first admin signup" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own admin role if no admin exists" ON public.user_roles;

-- Create policy to allow authenticated users to view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create policy to allow the first admin signup (when no admin exists)
CREATE POLICY "Allow first admin signup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() 
  AND role = 'admin'
  AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
);

-- Create policy to allow admins to manage all roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));