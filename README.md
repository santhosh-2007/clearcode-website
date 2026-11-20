# ClearCode.dev — Modern Web Development Studio

> **"Ideas Deserve Better Websites. Let's Build Yours."**  
> *Code It. Build It. Launch It.*

ClearCode.dev is a complete, production-oriented, full-stack web development agency application built with React, Vite, TypeScript, Tailwind CSS, and PostgreSQL (via Supabase).

---

## 🚀 Live Features Overview

### 1. Public Pages & Client Experience
- **Page 1: Home (`/`)** — High-impact hero section with interactive 3D laptop and mobile phone mockups, glowing accents, services overview, "Why Choose ClearCode.dev", featured portfolio projects, our 5-step development process, modern tech stack, genuine client feedback section, interactive FAQ accordion, and final conversion call-to-action.
- **Page 2: About Us (`/about`)** — Authentic brand story, mission, vision, our engineering approach, core guiding principles, and transparent founder/lead introduction.
- **Page 3: Services (`/services`)** — 8 detailed service cards (Business Websites, E-commerce Stores, Personal Portfolios, Restaurant & Hotel Platforms, Educational Websites, Custom Web Applications, Website Redesign, and Maintenance & Support), featuring deliverables, ideal customer profiles, and one-click enquiry buttons that prefill the enquiry form.
- **Page 4: Portfolio / Our Work (`/portfolio`)** — Category filterable showcase (`Custom Web Application`, `E-commerce`, `Restaurant`, `Business Website`) with technology tags, live demo links, and GitHub links. Initial entries are strictly and transparently labelled as demo concepts per brand integrity guidelines.
- **Page 5: Project Enquiry (`/enquiry`)** — Comprehensive lead generation form with React Hook Form and Zod validation, budget tiers (Below ₹5,000 up to Above ₹50,000), anti-spam honeypot, expected completion date, reference URL, and instant reference ID confirmation with a direct WhatsApp follow-up link.
- **Page 6: Contact Us (`/contact`)** — Working quick message form, direct WhatsApp conversation button with prefilled enquiry message, business email, location info, and verified social media links (GitHub, LinkedIn, Instagram, Twitter/X).
- **Page 7: FAQ (`/faq`)** — Comprehensive, searchable accordion covering common client questions on timelines, responsive testing, hosting, domain setup, revisions, and contact methods.
- **Page 8: Privacy Policy (`/privacy-policy`)** — Transparent privacy overview covering data collection, database encryption, enquiry handling, and contact details (with draft review notice).
- **Page 9: Terms & Conditions (`/terms-and-conditions`)** — Service scope, payment terms, revision policies, intellectual property transfer, and liability limitations (with draft review notice).
- **Page 10: 404 Not Found (`*`)** — Styled dark 404 error page guiding users back home or to contact.

### 2. WhatsApp Integration
- Floating green WhatsApp badge fixed on all public pages.
- Prefilled message: `"Hello ClearCode.dev! I'm interested in developing a website. I would like to discuss my project."`
- Real business WhatsApp number dynamically managed via environment variable (`VITE_WHATSAPP_NUMBER`) or the Admin Settings panel.

### 3. Secure Admin Dashboard (`/admin/login`)
- **Authentication**: Powered by Supabase Auth with server-side role validation in `public.admin_profiles`. Public registration is permanently disabled.
- **Overview Dashboard (`/admin/dashboard`)**: Displays real-time metrics computed directly from PostgreSQL records (Total Enquiries, New Enquiries, In-Progress Enquiries, Published Projects, Total Projects, and Recent Customer Enquiries table with quick-view).
- **Module 1: Enquiry Management (`/admin/enquiries`)**: Search by customer/business/email/phone, filter by status or date, inspect full customer details in a modal, update lead status (`New`, `Contacted`, `Discussion`, `Quotation Sent`, `In Progress`, `Completed`, `Rejected`), log private internal notes, delete with confirmation modal, and export filtered enquiry lists as CSV.
- **Module 2: Project Management (`/admin/projects`)**: Add, edit, delete, feature, or publish portfolio showcases with image URLs, category tags, technology badges, live demo links, and GitHub links.
- **Module 3: Services Management (`/admin/services`)**: Edit service descriptions, upload/update visuals, configure features, adjust display order, and publish/unpublish services.
- **Module 4: Content Management (`/admin/content`)**: Manage homepage copy, about section, founder bio, and add/edit/reorder FAQ items.
- **Module 5: Testimonial Management (`/admin/testimonials`)**: Add verified client reviews, star ratings (1–5), and toggle website publication (strict anti-fake review policy).
- **Module 6: Settings (`/admin/settings`)**: Manage site title, tagline, main brand heading, brand positioning, business email, WhatsApp number, studio location, social links, and toggle the announcement banner.

---

## 🛠 Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, React Router v6.
- **UI Components & Icons**: Lucide React, custom electric blue glow accents, glassmorphic cards, custom scrollbars.
- **Animations**: Framer Motion fluid animations, 3D perspective hero mockups.
- **Forms & Validation**: React Hook Form, Zod schema validation, honeypot spam protection.
- **Backend & Database**: Supabase (PostgreSQL 15), Row Level Security (RLS) policies, Storage bucket for images, Edge Functions for notifications.
- **Testing**: Node.js native test runner (`node --test`), automated Zod schema audits, security scans.

---

## 📂 Project Structure

```
clearcode-website/
├── public/
│   ├── favicon.svg              # ClearCode brand icon
│   ├── robots.txt               # SEO robots policy (protects /admin/*)
│   └── sitemap.xml              # Search engine XML sitemap
├── src/
│   ├── components/
│   │   ├── admin/               # Admin layout, sidebar, stat cards
│   │   ├── common/              # Navbar, Footer, WhatsAppFloat, Button, Card, Modal, etc.
│   │   └── home/                # HeroMockup, WhyChooseUs, DevProcess, TechStack, FinalCTA
│   ├── hooks/
│   │   └── useAuth.tsx          # Supabase auth session & admin profile verification
│   ├── lib/
│   │   └── supabase.ts          # Supabase client singleton
│   ├── pages/
│   │   ├── admin/               # Admin pages (Login, Dashboard, Enquiries, Projects, etc.)
│   │   ├── Home.tsx             # Page 1: Home
│   │   ├── About.tsx            # Page 2: About Us
│   │   ├── Services.tsx         # Page 3: Services (8 services)
│   │   ├── Portfolio.tsx        # Page 4: Portfolio
│   │   ├── Enquiry.tsx          # Page 5: Project Enquiry Form
│   │   ├── Contact.tsx          # Page 6: Contact Us
│   │   ├── FAQ.tsx              # Page 7: FAQ Accordion
│   │   ├── PrivacyPolicy.tsx    # Page 8: Privacy Policy
│   │   ├── TermsConditions.tsx  # Page 9: Terms & Conditions
│   │   └── NotFound.tsx         # 404 Not Found
│   ├── services/
│   │   └── dataService.ts       # Unified data access layer with live Supabase & local fallback
│   ├── types/
│   │   └── index.ts             # Complete TypeScript interfaces
│   ├── utils/
│   │   ├── formatters.ts        # Date and CSV export utilities
│   │   └── validators.ts        # Zod validation schemas
│   ├── App.tsx                  # Main router definitions
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Tailwind directives & glow utilities
├── supabase/
│   ├── migrations/
│   │   └── 20260220000001_create_schema.sql  # Normalized PostgreSQL DDL & RLS policies
│   ├── functions/
│   │   └── send-enquiry-notification/index.ts # Deno Edge Function for email dispatch
│   └── seed.sql                 # Initial seed data for ClearCode.dev
├── tests/
│   └── unit.test.mjs            # Automated unit and security tests
├── .env.example                 # Environment variables specification
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## ⚡ Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/clearcode-website.git
cd clearcode-website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your variables:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
VITE_WHATSAPP_NUMBER=919876543210
VITE_CONTACT_EMAIL=contact@clearcode.dev
```
*(Note: If Supabase keys are not set yet, the application automatically launches in **Local Demo Mode** with pre-seeded data and mock admin login `admin@clearcode.dev` / `clearcode2026`, allowing instant local evaluation!)*

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Run Automated Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## 🗄️ Database Setup (Supabase)

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Create a new project named `clearcode-dev`.
3. Open the **SQL Editor** tab.
4. Execute `supabase/migrations/20260220000001_create_schema.sql` to establish tables, triggers, and Row Level Security (RLS) policies.
5. Execute `supabase/seed.sql` to populate services, demo concept projects, FAQs, site settings, and content pages.
6. Under **Storage**, verify that the `portfolio-images` public bucket is created.
7. To create your first authorized admin:
   - Go to **Authentication** > **Users** > **Add User** (Create user with email e.g. `admin@clearcode.dev` and a secure password).
   - In SQL Editor, link that user to `admin_profiles`:
     ```sql
     insert into public.admin_profiles (auth_user_id, full_name, email, role)
     values ('<PASTE_USER_UUID_FROM_AUTH_USERS>', 'ClearCode Administrator', 'admin@clearcode.dev', 'admin');
     ```

---

## 🌐 Deployment Guide (Vercel)

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ClearCode.dev full-stack platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/clearcode-website.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `clearcode-website` repository.
4. Configure the Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase Anon/Public Key
   - `VITE_WHATSAPP_NUMBER` = your WhatsApp business number
   - `VITE_CONTACT_EMAIL` = contact@clearcode.dev
5. Set Build & Output Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**.

### Custom Domain Setup (DNS)
1. On Vercel, go to **Project Settings** > **Domains**.
2. Enter your custom domain (e.g., `clearcode.dev`).
3. In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), configure DNS records:
   - **Type**: `A`, **Name**: `@`, **Value**: `76.76.21.21`
   - **Type**: `CNAME`, **Name**: `www`, **Value**: `cname.vercel-dns.com`
4. Wait for DNS propagation and automatic SSL certificate generation.

---

## 🔒 Security & Privacy Architecture

- **Row Level Security (RLS)**: Enforced on all PostgreSQL tables. Public users can only read published content and insert valid enquiries. Public users cannot read enquiries, modify projects, or access admin profiles.
- **Server-Side Role Verification**: Admin routes and mutations are verified against `public.admin_profiles` matching `auth.uid()`.
- **Anti-Spam Honeypot**: Hidden honeypot fields silently trap automated bot submissions.
- **No Client Secrets**: Only the safe public anonymous key is exposed in the frontend. Privileged service-role keys and email provider keys are strictly isolated to serverless functions / Supabase dashboard secrets.

---

## 📄 License
Copyright © 2026 ClearCode.dev. All rights reserved.
Code It. Build It. Launch It.
