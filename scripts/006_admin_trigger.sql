-- Create a trigger to automatically make cnoirya@proton.me an admin when they sign up

-- Update the handle_new_user function to check for admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, is_admin, balance, tier)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    CASE WHEN new.email = 'cnoirya@proton.me' THEN true ELSE false END,
    0,
    'devotee'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    is_admin = CASE WHEN EXCLUDED.email = 'cnoirya@proton.me' THEN true ELSE profiles.is_admin END;

  RETURN new;
END;
$$;

-- Also update any existing user with that email to be admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{is_admin}', 
  'true'
)
WHERE email = 'cnoirya@proton.me';

UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'cnoirya@proton.me';
