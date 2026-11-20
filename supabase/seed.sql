-- ====================================================================
-- ClearCode.dev Seed Data
-- Professional initial data for services, demo projects, FAQs & settings
-- ====================================================================

-- 1. Services
insert into public.services (id, title, slug, short_description, full_description, features, image_url, is_active, display_order)
values
(
  'e1a0b1c2-0001-4000-8000-000000000001',
  'Business Website Development',
  'business-website-development',
  'High-impact corporate and agency websites designed to convert visitors into clients and build unmatched credibility.',
  'We create custom, brand-tailored corporate websites that communicate your company’s strengths with authority. From lightning-fast landing pages to multi-page enterprise showcases, our sites are engineered for high conversion, search engine dominance, and seamless mobile usability.',
  array['Custom Responsive Design', 'SEO Architecture & Optimization', 'Lead Capture Forms & WhatsApp Integration', 'CMS Integration for Easy Updates', 'Blazing-fast Page Speed (<1s load time)', 'Analytics & Conversion Tracking'],
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  true,
  1
),
(
  'e1a0b1c2-0002-4000-8000-000000000002',
  'E-commerce Website Development',
  'ecommerce-website-development',
  'Full-featured digital storefronts with secure payment gateways, inventory management, and smooth checkout experiences.',
  'Transform your retail business into a 24/7 revenue engine. We build e-commerce solutions that handle product catalogs, cart logic, multi-tier pricing, coupon systems, and instant payments through Stripe, Razorpay, or PayPal.',
  array['Custom Product Showcase & Filters', 'Secure Multi-Payment Gateways', 'Order & Inventory Tracking', 'Customer Account Dashboards', 'Abandoned Cart Recovery Logic', 'Automated Email Invoicing'],
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
  true,
  2
),
(
  'e1a0b1c2-0003-4000-8000-000000000003',
  'Personal Portfolio Websites',
  'personal-portfolio-websites',
  'Showcase your career, freelance work, software projects, or creative craft with modern interactive portfolios.',
  'Make a lasting first impression on recruiters, venture capitalists, and clients. Our custom developer and creative portfolios showcase your best work with interactive case studies, smooth animations, and downloadable resumes.',
  array['Interactive Project Case Studies', 'Curated Skill & Tech Badges', 'GitHub & Social Integration', 'Lightweight Minimalist UI', 'Interactive Contact Modal', 'Downloadable Resume / CV Hook'],
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  true,
  3
),
(
  'e1a0b1c2-0004-4000-8000-000000000004',
  'Restaurant & Hotel Websites',
  'restaurant-and-hotel-websites',
  'Mouth-watering digital experiences with online menus, table reservations, location maps, and direct order links.',
  'Attract foodies and travelers with appetizing visual menus, table booking integrations, real-time hours, and instant Google Maps navigation. Boost direct bookings and reduce aggregator commission fees.',
  array['Interactive Digital Menu with Dietary Filters', 'Direct Table Reservation Engine', 'Google Maps & Location Integration', 'Special Offers & Events Banner', 'One-Click Direct WhatsApp Ordering', 'Instagram Feed Showcase'],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  true,
  4
),
(
  'e1a0b1c2-0005-4000-8000-000000000005',
  'Educational Websites',
  'educational-websites',
  'Engaging web platforms for academies, tutors, schools, and course creators with syllabus listings and student enrollment.',
  'Empower learners and educators with structured curriculum guides, faculty showcases, course enrollment inquiry systems, and student resource downloads built on a modern, accessible architecture.',
  array['Course Syllabus & Curriculum Showcases', 'Online Enrollment & Lead Capture', 'Faculty & Mentor Bios', 'Downloadable Brochures & Guides', 'Event & Webinar Scheduling', 'Mobile-First Student Accessibility'],
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  true,
  5
),
(
  'e1a0b1c2-0006-4000-8000-000000000006',
  'Custom Web Application Development',
  'custom-web-application-development',
  'Tailored SaaS MVPs, customer portals, internal management tools, and data dashboards built with React and PostgreSQL.',
  'Have a unique software idea? We turn complex business workflows into intuitive web applications with role-based access control, real-time database reactivity, secure APIs, and responsive dashboard layouts.',
  array['Modern React & TypeScript Architecture', 'PostgreSQL Database & Real-Time Sync', 'Role-Based Authentication (RBAC)', 'RESTful API & Webhook Integrations', 'Custom Data Dashboards & Reports', 'Scalable Cloud Architecture'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  true,
  6
),
(
  'e1a0b1c2-0007-4000-8000-000000000007',
  'Website Redesign',
  'website-redesign',
  'Upgrade your outdated, slow website with a futuristic UI, improved SEO rankings, and higher conversion rates.',
  'If your current website feels slow, looks dated on smartphones, or fails to generate leads, our complete redesign service modernizes your visual identity while preserving your SEO link juice and improving Core Web Vitals.',
  array['Complete Visual & UX Modernization', 'Speed & Core Web Vitals Optimization', 'Mobile-Responsive Re-engineering', 'SEO Preservation & 301 Redirect Strategy', 'Conversion Rate Optimization (CRO)', 'Content Migration & Polish'],
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  true,
  7
),
(
  'e1a0b1c2-0008-4000-8000-000000000008',
  'Website Maintenance & Support',
  'website-maintenance',
  'Keep your digital platform secure, up-to-date, fast, and backup-protected with reliable monthly maintenance.',
  'Focus on growing your business while we handle security patches, content updates, dependency upgrades, SSL renewals, uptime monitoring, and weekly database backups.',
  array['Regular Security Scans & Patches', 'Performance & Uptime Monitoring', 'Routine Content & Image Updates', 'Automated Cloud Backups', 'Broken Link & Bug Resolution', 'Priority Developer Support Channel'],
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  true,
  8
)
on conflict (slug) do nothing;

-- 2. Initial Sample Demo Projects (Strictly labelled as demo content per Section 4 requirement)
insert into public.projects (id, title, slug, category, description, image_url, technologies, live_url, github_url, is_featured, is_published)
values
(
  'a1b2c3d4-0001-4000-8000-000000000001',
  'PulseMetrics — SaaS Analytics Platform [Demo Concept]',
  'pulsemetrics-saas-analytics',
  'Custom Web Application',
  'A concept real-time performance analytics platform for indie SaaS founders. Features high-frequency metric graphs, subscription cohort tracking, and automated MRR forecasts.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  array['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Chart.js'],
  'https://clearcode.dev',
  'https://github.com/clearcode-dev',
  true,
  true
),
(
  'a1b2c3d4-0002-4000-8000-000000000002',
  'Aura Living — Modern E-commerce Store [Demo Concept]',
  'aura-living-ecommerce',
  'E-commerce',
  'A minimalist home decor and furniture boutique website concept featuring dynamic cart state, currency switching, customer review galleries, and lightning-fast checkout flow.',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  array['React', 'Vite', 'Tailwind CSS', 'Stripe', 'Zustand'],
  'https://clearcode.dev',
  'https://github.com/clearcode-dev',
  true,
  true
),
(
  'a1b2c3d4-0003-4000-8000-000000000003',
  'Lumina Bistro — Culinary & Dining Experience [Demo Concept]',
  'lumina-bistro-restaurant',
  'Restaurant',
  'An interactive restaurant showcase with sensory food photography, online table reservations, daily chef specials, and direct WhatsApp takeaway ordering.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  array['React', 'Framer Motion', 'Tailwind CSS', 'WhatsApp API'],
  'https://clearcode.dev',
  'https://github.com/clearcode-dev',
  true,
  true
),
(
  'a1b2c3d4-0004-4000-8000-000000000004',
  'Vanguard Corporate Legal — Law Firm Portal [Demo Concept]',
  'vanguard-corporate-legal',
  'Business Website',
  'An authoritative corporate portal designed for a corporate advisory and intellectual property law practice, featuring lawyer profiles, practice area deep-dives, and client inquiry booking.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  array['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  'https://clearcode.dev',
  'https://github.com/clearcode-dev',
  false,
  true
)
on conflict (slug) do nothing;

-- 3. FAQs
insert into public.faqs (question, answer, display_order, is_published)
values
(
  'What services do you provide?',
  'ClearCode.dev provides full-lifecycle web development solutions including custom business websites, high-converting e-commerce storefronts, personal portfolios, restaurant websites with online ordering/reservations, educational portals, custom React/PostgreSQL web applications, website redesigns, and ongoing technical maintenance.',
  1,
  true
),
(
  'How do I start a project with ClearCode.dev?',
  'Starting a project is straightforward! You can either fill out our detailed Project Enquiry Form on the website or message us directly via WhatsApp. We will review your requirements, discuss your goals, provide a transparent quotation, and guide you through each milestone from design to launch.',
  2,
  true
),
(
  'How long does website development take?',
  'Timelines depend on project complexity: standard business or portfolio websites typically take 1 to 2 weeks; e-commerce platforms and custom web applications typically range from 2 to 4 weeks. We provide clear milestone dates during the initial consultation.',
  3,
  true
),
(
  'Do you provide responsive websites that work on mobile devices?',
  'Yes, absolutely. Every single website we build is 100% mobile-first and fully responsive across smartphones, tablets, laptops, and 4K desktop screens. We test extensively on all major screen resolutions and browsers.',
  4,
  true
),
(
  'Do you provide domain and hosting setup?',
  'Yes! We assist with selecting, purchasing, and connecting custom domain names, DNS records, SSL certificates, and configuring cloud hosting (such as Vercel, Netlify, or Supabase) so your website is deployed securely and reliably.',
  5,
  true
),
(
  'Can I request website modifications after launch?',
  'Yes. We include a revision window after deployment to fine-tune your website. For ongoing updates, feature additions, or security monitoring, we also offer flexible Website Maintenance packages.',
  6,
  true
),
(
  'How can I contact ClearCode.dev?',
  'You can reach us directly through our Contact Us page, send an email to contact@clearcode.dev, or tap the WhatsApp button on our website for instant consultation.',
  7,
  true
);

-- 4. Site Settings
insert into public.site_settings (setting_key, setting_value)
values
(
  'general',
  '{
    "site_title": "ClearCode.dev",
    "tagline": "Code It. Build It. Launch It.",
    "brand_heading": "Ideas Deserve Better Websites. Let''s Build Yours.",
    "brand_positioning": "Modern Web Development Studio",
    "contact_email": "contact@clearcode.dev",
    "whatsapp_number": "919876543210",
    "location": "Global Remote Studio",
    "announcement_banner": {
      "enabled": true,
      "text": "🚀 Now taking new client projects for Q1/Q2. Free initial consultation included!"
    },
    "social_links": {
      "github": "https://github.com/clearcode-dev",
      "linkedin": "https://linkedin.com/company/clearcode-dev",
      "instagram": "https://instagram.com/clearcode.dev",
      "twitter": "https://twitter.com/clearcodedev"
    }
  }'::jsonb
),
(
  'seo',
  '{
    "meta_title": "ClearCode.dev — Modern Web Development Studio",
    "meta_description": "We design and develop modern, responsive websites that help businesses establish their digital presence and grow online.",
    "og_image": "https://clearcode.dev/og-image.png"
  }'::jsonb
)
on conflict (setting_key) do nothing;

-- 5. Content Pages (About, Privacy, Terms)
insert into public.content_pages (page_slug, title, content)
values
(
  'about',
  'About ClearCode.dev',
  '{
    "intro": "ClearCode.dev is a web development and digital solutions brand built for startups, small businesses, entrepreneurs, restaurants, and visionaries.",
    "brand_story": "Founded on the belief that every idea deserves a high-performance, aesthetically exceptional web presence, ClearCode.dev eliminates bloated code and generic templates. We engineer websites from first principles with modern tools like React, TypeScript, and PostgreSQL.",
    "mission": "To craft lightning-fast, visually captivating, and purpose-built digital experiences that empower businesses to thrive in the modern web era.",
    "vision": "To become the preferred web development studio known globally for technical precision, transparent collaboration, and uncompromising design quality.",
    "approach": [
      {"step": "01. Architecture First", "desc": "We understand your business model and target audience before writing a single line of code."},
      {"step": "02. Modern Craftsmanship", "desc": "Engineered with clean React, type-safe TypeScript, and optimized database models."},
      {"step": "03. Pixel-Perfect Polish", "desc": "Smooth micro-interactions, responsive fluid layouts, and dark-mode elegance."},
      {"step": "04. Reliable Launch & Support", "desc": "Complete DNS setup, SSL configuration, automated backups, and post-launch maintenance."}
    ],
    "core_values": [
      {"title": "Clean Code", "desc": "No bloated frameworks or tangled spaghetti code. Only pure, maintainable, high-performance architecture."},
      {"title": "Radical Transparency", "desc": "Clear pricing, direct communication, and realistic delivery timelines without hidden surprises."},
      {"title": "Mobile-First Excellence", "desc": "Every pixel is tested on mobile devices first, ensuring impeccable smartphone usability."},
      {"title": "Speed & Security", "desc": "Sub-second load times, strict Row Level Security, and automated SSL encryption out of the box."}
    ],
    "founder": {
      "name": "ClearCode.dev Engineering Lead",
      "role": "Lead Full-Stack Architect & Founder",
      "bio": "Passionate software engineer and product builder dedicated to elevating the web standard for growing businesses and innovative founders."
    }
  }'::jsonb
),
(
  'privacy-policy',
  'Privacy Policy',
  '{
    "last_updated": "2026-02-20",
    "notice": "Draft requiring business/legal review before final commercial publication.",
    "sections": [
      {
        "title": "1. Information We Collect",
        "content": "When you submit a project enquiry or contact ClearCode.dev, we collect your name, business name, email address, phone number, WhatsApp contact, project descriptions, and budget preferences strictly for the purpose of communicating about potential development services."
      },
      {
        "title": "2. How We Use Your Information",
        "content": "We use the provided information solely to evaluate project requirements, formulate project proposals and quotations, coordinate development milestones, and respond to your direct queries. We never sell, rent, or trade your contact information to third parties."
      },
      {
        "title": "3. Data Storage & Protection",
        "content": "Your enquiry details are stored securely in encrypted PostgreSQL databases powered by Supabase with Row Level Security (RLS) enforcement. Only authorized administrative personnel have access to enquiry records."
      },
      {
        "title": "4. Third-Party Services",
        "content": "Our website may integrate with trusted third-party providers such as Supabase (database & authentication) and Vercel (cloud hosting). Each of these services adheres to robust industry security standards."
      },
      {
        "title": "5. Contact Details for Privacy Inquiries",
        "content": "If you have questions about your personal data, wish to request removal of your enquiry record, or need privacy clarifications, please contact us directly at contact@clearcode.dev."
      }
    ]
  }'::jsonb
),
(
  'terms-and-conditions',
  'Terms & Conditions',
  '{
    "last_updated": "2026-02-20",
    "notice": "Draft requiring business/legal review before final commercial publication.",
    "sections": [
      {
        "title": "1. Website Usage",
        "content": "By accessing ClearCode.dev, you agree to comply with and be bound by these terms. The content, graphics, code samples, and designs showcased on this site are protected by copyright and intellectual property laws."
      },
      {
        "title": "2. Project Enquiries & Quotations",
        "content": "Submitting an enquiry via our website does not constitute a legally binding service contract. Official project engagements begin only upon written agreement of project scope, timelines, and commercial payment terms."
      },
      {
        "title": "3. Service Scope & Deliverables",
        "content": "ClearCode.dev provides web design, development, and maintenance as outlined in formal client proposals. Any out-of-scope requests or major architectural shifts will be estimated separately."
      },
      {
        "title": "4. Payments & Revisions",
        "content": "Project payments follow agreed milestone schedules (typically an initial deposit followed by milestone deliverables). Standard projects include designated revision cycles during active development."
      },
      {
        "title": "5. Intellectual Property Rights",
        "content": "Upon full and final settlement of all agreed project dues, full ownership of client-specific source code and customized assets is transferred to the client, unless otherwise agreed in writing."
      },
      {
        "title": "6. Limitation of Liability",
        "content": "ClearCode.dev shall not be held liable for indirect, consequential, or third-party service provider outages (including domain registrar issues, hosting downtime, or third-party API deprecations)."
      }
    ]
  }'::jsonb
)
on conflict (page_slug) do nothing;
