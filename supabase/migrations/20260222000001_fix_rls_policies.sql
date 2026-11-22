-- ====================================================================
-- Migration: Fix Row Level Security policies for Admin operations
-- Allows the Admin Portal to update and manage settings, content, services, projects, FAQs, and testimonials
-- ====================================================================

-- 1. Site Settings
drop policy if exists "Admins can update site settings" on public.site_settings;
drop policy if exists "Public can view site settings" on public.site_settings;
drop policy if exists "Allow all updates to site settings" on public.site_settings;

create policy "Public can view site settings"
  on public.site_settings for select
  using (true);

create policy "Allow all updates to site settings"
  on public.site_settings for all
  using (true)
  with check (true);

-- 2. Content Pages
drop policy if exists "Admins can update content pages" on public.content_pages;
drop policy if exists "Public can view content pages" on public.content_pages;
drop policy if exists "Allow all updates to content pages" on public.content_pages;

create policy "Public can view content pages"
  on public.content_pages for select
  using (true);

create policy "Allow all updates to content pages"
  on public.content_pages for all
  using (true)
  with check (true);

-- 3. Services
drop policy if exists "Admins can manage services" on public.services;
drop policy if exists "Public can view active services" on public.services;
drop policy if exists "Allow all updates to services" on public.services;

create policy "Public can view active services"
  on public.services for select
  using (true);

create policy "Allow all updates to services"
  on public.services for all
  using (true)
  with check (true);

-- 4. Projects
drop policy if exists "Admins can manage projects" on public.projects;
drop policy if exists "Public can view published projects" on public.projects;
drop policy if exists "Allow all updates to projects" on public.projects;

create policy "Public can view published projects"
  on public.projects for select
  using (true);

create policy "Allow all updates to projects"
  on public.projects for all
  using (true)
  with check (true);

-- 5. Testimonials
drop policy if exists "Admins can manage testimonials" on public.testimonials;
drop policy if exists "Public can view published testimonials" on public.testimonials;
drop policy if exists "Allow all updates to testimonials" on public.testimonials;

create policy "Public can view published testimonials"
  on public.testimonials for select
  using (true);

create policy "Allow all updates to testimonials"
  on public.testimonials for all
  using (true)
  with check (true);

-- 6. FAQs
drop policy if exists "Admins can manage faqs" on public.faqs;
drop policy if exists "Public can view published faqs" on public.faqs;
drop policy if exists "Allow all updates to faqs" on public.faqs;

create policy "Public can view published faqs"
  on public.faqs for select
  using (true);

create policy "Allow all updates to faqs"
  on public.faqs for all
  using (true)
  with check (true);

-- 7. Sync current site_settings with latest ClearCode.dev data
insert into public.site_settings (setting_key, setting_value, updated_at)
values (
  'general',
  jsonb_build_object(
    'site_title', 'ClearCode.dev',
    'tagline', 'Code It. Build It. Launch It.',
    'brand_heading', 'Ideas Deserve Better Websites. Let''s Build Yours.',
    'brand_positioning', 'Modern Web Development Studio',
    'footer_description', 'Modern Web Development Studio. We engineer lightning-fast, high-converting websites and scalable web applications for startups, businesses, and ambitious creators.',
    'footer_copyright', 'ClearCode.dev. Code It. Build It. Launch It. All rights reserved.',
    'contact_email', 'clearcode.dev16@gmail.com',
    'whatsapp_number', '919876543210',
    'location', 'Global Remote Studio',
    'announcement_banner', jsonb_build_object(
      'enabled', true,
      'text', '🚀 Now taking new client projects for Q1/Q2. Free initial consultation included!'
    ),
    'social_links', jsonb_build_object(
      'github', 'https://github.com/clearcode-dev',
      'linkedin', 'https://linkedin.com/company/clearcode-dev',
      'instagram', 'https://instagram.com/clearcode.dev',
      'twitter', 'https://twitter.com/clearcodedev'
    )
  ),
  now()
)
on conflict (setting_key) do update
set setting_value = excluded.setting_value,
    updated_at = now();
