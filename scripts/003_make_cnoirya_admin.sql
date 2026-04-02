-- Make cnoirya@proton.me an admin user
-- This will set is_admin: true in the user's metadata once they sign up

SELECT make_user_admin('cnoirya@proton.me');
