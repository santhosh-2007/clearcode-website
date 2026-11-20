-- ====================================================================
-- ClearCode.dev Database Schema Migration
-- Production PostgreSQL schema with Row Level Security (RLS)
-- Idempotent & safe to re-run in Supabase SQL Editor
-- ====================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ADMIN PROFILES
create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'superadmin')),
  created_at timestamptz default now()
);

-- 2. SERVICES
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  features text[] not null default '{}',
  image_url text not null,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. PROJECTS
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text not null,
  image_url text not null,
  technologies text[] not null default '{}',
  live_url text,
  github_url text,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. ENQUIRIES
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  business_name text,
  email text not null,
  phone text not null,
  whatsapp text,
  service_id uuid references public.services(id) on delete set null,
  project_description text not null,
  reference_url text,
  budget text not null,
  expected_date date,
  additional_requirements text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Discussion', 'Quotation Sent', 'In Progress', 'Completed', 'Rejected')),
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. TESTIMONIALS
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company_name text not null,
  testimonial text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  is_published boolean default true,
  created_at timestamptz default now()
);

-- 6. FAQS
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order integer default 0,
  is_published boolean default true
);

-- 7. SITE SETTINGS
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null,
  updated_at timestamptz default now()
);

-- 8. CONTENT PAGES
create table if not exists public.content_pages (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null unique,
  title text not null,
  content jsonb not null,
  updated_at timestamptz default now()
);

-- Indexes for performance (using IF NOT EXISTS)
create index if not exists unique_slug_projects_idx on public.projects(slug);
create index if not exists unique_slug_services_idx on public.services(slug);
create index if not exists idx_enquiries_status on public.enquiries(status);
create index if not exists idx_enquiries_created_at on public.enquiries(created_at desc);
create index if not exists idx_projects_featured on public.projects(is_featured) where is_published = true;
create index if not exists idx_services_display_order on public.services(display_order);

-- Automatic updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects
  for each row execute function public.handle_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at before update on public.services
  for each row execute function public.handle_updated_at();

drop trigger if exists set_enquiries_updated_at on public.enquiries;
create trigger set_enquiries_updated_at before update on public.enquiries
  for each row execute function public.handle_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings
  for each row execute function public.handle_updated_at();

drop trigger if exists set_content_pages_updated_at on public.content_pages;
create trigger set_content_pages_updated_at before update on public.content_pages
  for each row execute function public.handle_updated_at();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.admin_profiles enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_pages enable row level security;

-- Helper security function to check if the current caller is a confirmed admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where auth_user_id = auth.uid()
    and role in ('admin', 'superadmin')
  );
end;
$$ language plpgsql security definer;

-- 1. admin_profiles policies
drop policy if exists "Admins can view their own profile or all profiles if admin" on public.admin_profiles;
create policy "Admins can view their own profile or all profiles if admin"
  on public.admin_profiles for select
  using (auth.uid() = auth_user_id or public.is_admin());

drop policy if exists "Admins can update their own profile" on public.admin_profiles;
create policy "Admins can update their own profile"
  on public.admin_profiles for update
  using (auth.uid() = auth_user_id or public.is_admin());

-- 2. services policies: Public read active services; Admins full access
drop policy if exists "Public can view active services" on public.services;
create policy "Public can view active services"
  on public.services for select
  using (is_active = true or public.is_admin());

drop policy if exists "Admins can manage services" on public.services;
create policy "Admins can manage services"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

-- 3. projects policies: Public read published projects; Admins full access
drop policy if exists "Public can view published projects" on public.projects;
create policy "Public can view published projects"
  on public.projects for select
  using (is_published = true or public.is_admin());

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- 4. enquiries policies: Public INSERT only; Admins full access
drop policy if exists "Public can submit enquiries" on public.enquiries;
create policy "Public can submit enquiries"
  on public.enquiries for insert
  with check (
    customer_name is not null and
    email is not null and
    phone is not null and
    project_description is not null and
    budget is not null
  );

drop policy if exists "Admins can view all enquiries" on public.enquiries;
create policy "Admins can view all enquiries"
  on public.enquiries for select
  using (public.is_admin());

drop policy if exists "Admins can update enquiries" on public.enquiries;
create policy "Admins can update enquiries"
  on public.enquiries for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete enquiries" on public.enquiries;
create policy "Admins can delete enquiries"
  on public.enquiries for delete
  using (public.is_admin());

-- 5. testimonials policies: Public read published; Admins full access
drop policy if exists "Public can view published testimonials" on public.testimonials;
create policy "Public can view published testimonials"
  on public.testimonials for select
  using (is_published = true or public.is_admin());

drop policy if exists "Admins can manage testimonials" on public.testimonials;
create policy "Admins can manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- 6. faqs policies: Public read published; Admins full access
drop policy if exists "Public can view published faqs" on public.faqs;
create policy "Public can view published faqs"
  on public.faqs for select
  using (is_published = true or public.is_admin());

drop policy if exists "Admins can manage faqs" on public.faqs;
create policy "Admins can manage faqs"
  on public.faqs for all
  using (public.is_admin())
  with check (public.is_admin());

-- 7. site_settings policies: Public read; Admins update
drop policy if exists "Public can view site settings" on public.site_settings;
create policy "Public can view site settings"
  on public.site_settings for select
  using (true);

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- 8. content_pages policies: Public read; Admins update
drop policy if exists "Public can view content pages" on public.content_pages;
create policy "Public can view content pages"
  on public.content_pages for select
  using (true);

drop policy if exists "Admins can update content pages" on public.content_pages;
create policy "Admins can update content pages"
  on public.content_pages for all
  using (public.is_admin())
  with check (public.is_admin());

-- Setup Storage bucket for project images
insert into storage.buckets (id, name, public) 
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read portfolio images" on storage.objects;
create policy "Public can read portfolio images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

drop policy if exists "Admins can upload portfolio images" on storage.objects;
create policy "Admins can upload portfolio images"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "Admins can update/delete portfolio images" on storage.objects;
create policy "Admins can update/delete portfolio images"
  on storage.objects for update
  using (bucket_id = 'portfolio-images' and public.is_admin());
