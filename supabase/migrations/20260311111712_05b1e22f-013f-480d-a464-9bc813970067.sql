-- Insert admin role for the existing user
INSERT INTO public.user_roles (user_id, role)
VALUES ('e76bdf30-0bcb-493e-b4e7-06f9d5e33ee6', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;