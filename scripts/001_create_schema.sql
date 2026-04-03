-- CNOIRYA Platform Schema

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  is_admin boolean default false,
  tier text default 'free' check (tier in ('free', 'devotee', 'chosen', 'inner-circle')),
  wallet_balance decimal(10, 2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Admin can view all profiles
create policy "admin_select_all_profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, is_admin)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data ->> 'is_admin')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Subscriptions table
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  tier text not null check (tier in ('devotee', 'chosen', 'inner-circle')),
  status text default 'active' check (status in ('active', 'cancelled', 'expired', 'pending')),
  payment_id text,
  amount decimal(10, 2) not null,
  currency text default 'USDT',
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions_insert_own" on public.subscriptions for insert with check (auth.uid() = user_id);

-- Payments table
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  payment_id text unique,
  payment_type text not null check (payment_type in ('subscription', 'topup', 'ppv', 'tip', 'custom', 'call')),
  amount decimal(10, 2) not null,
  currency text default 'USDT',
  status text default 'pending' check (status in ('pending', 'confirming', 'confirmed', 'finished', 'failed', 'refunded', 'expired')),
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "payments_select_own" on public.payments for select using (auth.uid() = user_id);
create policy "payments_insert_service" on public.payments for insert with check (true);

-- Wallet transactions
create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('topup', 'spend', 'refund', 'earned')),
  amount decimal(10, 2) not null,
  description text,
  reference_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.wallet_transactions enable row level security;

create policy "wallet_select_own" on public.wallet_transactions for select using (auth.uid() = user_id);

-- Content table
create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null check (type in ('photo', 'video', 'gallery', 'audio')),
  media_url text,
  thumbnail_url text,
  is_ppv boolean default false,
  ppv_price decimal(10, 2),
  required_tier text check (required_tier in ('free', 'devotee', 'chosen', 'inner-circle')),
  is_published boolean default false,
  publish_at timestamp with time zone,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.content enable row level security;

-- Anyone can view published content (tier check done in app)
create policy "content_select_published" on public.content for select using (is_published = true);

-- Admin can manage all content
create policy "content_admin_all" on public.content for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete set null,
  recipient_id uuid references public.profiles(id) on delete set null,
  content text not null,
  is_read boolean default false,
  is_paid boolean default false,
  price decimal(10, 2),
  media_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;

create policy "messages_select_own" on public.messages for select using (
  auth.uid() = sender_id or auth.uid() = recipient_id
);
create policy "messages_insert_own" on public.messages for insert with check (auth.uid() = sender_id);

-- Likes table
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, content_id)
);

alter table public.likes enable row level security;

create policy "likes_select_all" on public.likes for select using (true);
create policy "likes_insert_own" on public.likes for insert with check (auth.uid() = user_id);
create policy "likes_delete_own" on public.likes for delete using (auth.uid() = user_id);

-- Comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  content_id uuid references public.content(id) on delete cascade not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.comments enable row level security;

create policy "comments_select_all" on public.comments for select using (true);
create policy "comments_insert_own" on public.comments for insert with check (auth.uid() = user_id);
create policy "comments_delete_own" on public.comments for delete using (auth.uid() = user_id);

-- PPV Purchases
create table if not exists public.ppv_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  amount decimal(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, content_id)
);

alter table public.ppv_purchases enable row level security;

create policy "ppv_select_own" on public.ppv_purchases for select using (auth.uid() = user_id);
create policy "ppv_insert_own" on public.ppv_purchases for insert with check (auth.uid() = user_id);
