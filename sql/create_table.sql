create table if not exists public.reflection (
  id uuid default uuid_generate_v4() not null primary key,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  link text,
  infoTech text,
  ideaTech text,
  reflectionTech text,
  memo text,
  user_id uuid not null references auth.users(id) default auth.uid()
);