alter table public.orders
  add column if not exists status text not null default 'submitted',
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.order_portal_access (
  order_id text primary key references public.orders(id) on delete cascade,
  access_token_hash text not null unique,
  created_at timestamptz not null default now(),
  last_accessed_at timestamptz
);

create table if not exists public.order_deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(id) on delete cascade,
  version integer not null default 1,
  title text not null default 'Project delivery',
  notes text,
  files jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique(order_id, version)
);

create index if not exists order_deliveries_order_id_idx
  on public.order_deliveries(order_id, created_at desc);

alter table public.order_portal_access enable row level security;
alter table public.order_deliveries enable row level security;
revoke all on public.order_portal_access from anon, authenticated;
revoke all on public.order_deliveries from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit)
values ('order-deliveries', 'order-deliveries', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = 52428800;
