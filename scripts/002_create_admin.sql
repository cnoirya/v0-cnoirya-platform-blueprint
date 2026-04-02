-- This script updates a user to be an admin
-- Replace 'your-email@example.com' with your actual admin email after creating an account

-- To make a user an admin, they need to:
-- 1. Sign up via the normal subscribe flow (or login page)
-- 2. Then run this script with their user ID

-- After a user signs up, find their ID and update their metadata:
-- UPDATE auth.users 
-- SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
-- WHERE email = 'your-admin-email@example.com';

-- For now, we'll create a function that can be called to make any user an admin
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users 
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_admin": true}'::jsonb
  WHERE email = user_email;
END;
$$;

-- Grant execute to authenticated users (you'll need to be logged in)
-- In production, you'd want to restrict this further
