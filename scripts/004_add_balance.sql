-- Add balance column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS balance decimal(10,2) DEFAULT 0;

-- Update the profile trigger to include balance
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, balance)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'username', SPLIT_PART(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data ->> 'display_name', SPLIT_PART(new.email, '@', 1)),
    0
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;
