import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { 
  Project, 
  Service, 
  Enquiry, 
  Testimonial, 
  FAQ, 
  SiteSettingsGeneral, 
  ContentPage,
  EnquiryStatus 
} from '@/types';

// Default initial data matching seed.sql
const DEFAULT_SERVICES: Service[] = [
  {
    id: 'e1a0b1c2-0001-4000-8000-000000000001',
    title: 'Business Website Development',
    slug: 'business-website-development',
    short_description: 'High-impact corporate and agency websites designed to convert visitors into clients and build unmatched credibility.',
    full_description: 'We create custom, brand-tailored corporate websites that communicate your company’s strengths with authority. From lightning-fast landing pages to multi-page enterprise showcases, our sites are engineered for high conversion, search engine dominance, and seamless mobile usability.',
    features: ['Custom Responsive Design', 'SEO Architecture & Optimization', 'Lead Capture Forms & WhatsApp Integration', 'CMS Integration for Easy Updates', 'Blazing-fast Page Speed (<1s load time)', 'Analytics & Conversion Tracking'],
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 1
  },
  {
    id: 'e1a0b1c2-0002-4000-8000-000000000002',
    title: 'E-commerce Website Development',
    slug: 'ecommerce-website-development',
    short_description: 'Full-featured digital storefronts with secure payment gateways, inventory management, and smooth checkout experiences.',
    full_description: 'Transform your retail business into a 24/7 revenue engine. We build e-commerce solutions that handle product catalogs, cart logic, multi-tier pricing, coupon systems, and instant payments through Stripe, Razorpay, or PayPal.',
    features: ['Custom Product Showcase & Filters', 'Secure Multi-Payment Gateways', 'Order & Inventory Tracking', 'Customer Account Dashboards', 'Abandoned Cart Recovery Logic', 'Automated Email Invoicing'],
    image_url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 2
  },
  {
    id: 'e1a0b1c2-0003-4000-8000-000000000003',
    title: 'Personal Portfolio Websites',
    slug: 'personal-portfolio-websites',
    short_description: 'Showcase your career, freelance work, software projects, or creative craft with modern interactive portfolios.',
    full_description: 'Make a lasting first impression on recruiters, venture capitalists, and clients. Our custom developer and creative portfolios showcase your best work with interactive case studies, smooth animations, and downloadable resumes.',
    features: ['Interactive Project Case Studies', 'Curated Skill & Tech Badges', 'GitHub & Social Integration', 'Lightweight Minimalist UI', 'Interactive Contact Modal', 'Downloadable Resume / CV Hook'],
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 3
  },
  {
    id: 'e1a0b1c2-0004-4000-8000-000000000004',
    title: 'Restaurant & Hotel Websites',
    slug: 'restaurant-and-hotel-websites',
    short_description: 'Mouth-watering digital experiences with online menus, table reservations, location maps, and direct order links.',
    full_description: 'Attract foodies and travelers with appetizing visual menus, table booking integrations, real-time hours, and instant Google Maps navigation. Boost direct bookings and reduce aggregator commission fees.',
    features: ['Interactive Digital Menu with Dietary Filters', 'Direct Table Reservation Engine', 'Google Maps & Location Integration', 'Special Offers & Events Banner', 'One-Click Direct WhatsApp Ordering', 'Instagram Feed Showcase'],
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 4
  },
  {
    id: 'e1a0b1c2-0005-4000-8000-000000000005',
    title: 'Educational Websites',
    slug: 'educational-websites',
    short_description: 'Engaging web platforms for academies, tutors, schools, and course creators with syllabus listings and student enrollment.',
    full_description: 'Empower learners and educators with structured curriculum guides, faculty showcases, course enrollment inquiry systems, and student resource downloads built on a modern, accessible architecture.',
    features: ['Course Syllabus & Curriculum Showcases', 'Online Enrollment & Lead Capture', 'Faculty & Mentor Bios', 'Downloadable Brochures & Guides', 'Event & Webinar Scheduling', 'Mobile-First Student Accessibility'],
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 5
  },
  {
    id: 'e1a0b1c2-0006-4000-8000-000000000006',
    title: 'Custom Web Application Development',
    slug: 'custom-web-application-development',
    short_description: 'Tailored SaaS MVPs, customer portals, internal management tools, and data dashboards built with React and PostgreSQL.',
    full_description: 'Have a unique software idea? We turn complex business workflows into intuitive web applications with role-based access control, real-time database reactivity, secure APIs, and responsive dashboard layouts.',
    features: ['Modern React & TypeScript Architecture', 'PostgreSQL Database & Real-Time Sync', 'Role-Based Authentication (RBAC)', 'RESTful API & Webhook Integrations', 'Custom Data Dashboards & Reports', 'Scalable Cloud Architecture'],
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 6
  },
  {
    id: 'e1a0b1c2-0007-4000-8000-000000000007',
    title: 'Website Redesign',
    slug: 'website-redesign',
    short_description: 'Upgrade your outdated, slow website with a futuristic UI, improved SEO rankings, and higher conversion rates.',
    full_description: 'If your current website feels slow, looks dated on smartphones, or fails to generate leads, our complete redesign service modernizes your visual identity while preserving your SEO link juice and improving Core Web Vitals.',
    features: ['Complete Visual & UX Modernization', 'Speed & Core Web Vitals Optimization', 'Mobile-Responsive Re-engineering', 'SEO Preservation & 301 Redirect Strategy', 'Conversion Rate Optimization (CRO)', 'Content Migration & Polish'],
    image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 7
  },
  {
    id: 'e1a0b1c2-0008-4000-8000-000000000008',
    title: 'Website Maintenance & Support',
    slug: 'website-maintenance',
    short_description: 'Keep your digital platform secure, up-to-date, fast, and backup-protected with reliable monthly maintenance.',
    full_description: 'Focus on growing your business while we handle security patches, content updates, dependency upgrades, SSL renewals, uptime monitoring, and weekly database backups.',
    features: ['Regular Security Scans & Patches', 'Performance & Uptime Monitoring', 'Routine Content & Image Updates', 'Automated Cloud Backups', 'Broken Link & Bug Resolution', 'Priority Developer Support Channel'],
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    display_order: 8
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'a1b2c3d4-0001-4000-8000-000000000001',
    title: 'PulseMetrics — SaaS Analytics Platform [Demo Concept]',
    slug: 'pulsemetrics-saas-analytics',
    category: 'Custom Web Application',
    description: 'A concept real-time performance analytics platform for indie SaaS founders. Features high-frequency metric graphs, subscription cohort tracking, and automated MRR forecasts.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Chart.js'],
    live_url: 'https://clearcode.dev',
    github_url: 'https://github.com/clearcode-dev',
    is_featured: true,
    is_published: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 10).toISOString()
  },
  {
    id: 'a1b2c3d4-0002-4000-8000-000000000002',
    title: 'Aura Living — Modern E-commerce Store [Demo Concept]',
    slug: 'aura-living-ecommerce',
    category: 'E-commerce',
    description: 'A minimalist home decor and furniture boutique website concept featuring dynamic cart state, currency switching, customer review galleries, and lightning-fast checkout flow.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Stripe', 'Zustand'],
    live_url: 'https://clearcode.dev',
    github_url: 'https://github.com/clearcode-dev',
    is_featured: true,
    is_published: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
  },
  {
    id: 'a1b2c3d4-0003-4000-8000-000000000003',
    title: 'Lumina Bistro — Culinary & Dining Experience [Demo Concept]',
    slug: 'lumina-bistro-restaurant',
    category: 'Restaurant',
    description: 'An interactive restaurant showcase with sensory food photography, online table reservations, daily chef specials, and direct WhatsApp takeaway ordering.',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'WhatsApp API'],
    live_url: 'https://clearcode.dev',
    github_url: 'https://github.com/clearcode-dev',
    is_featured: true,
    is_published: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 4).toISOString()
  },
  {
    id: 'a1b2c3d4-0004-4000-8000-000000000004',
    title: 'Vanguard Corporate Legal — Law Firm Portal [Demo Concept]',
    slug: 'vanguard-corporate-legal',
    category: 'Business Website',
    description: 'An authoritative corporate portal designed for an advisory and intellectual property law practice, featuring lawyer profiles, practice area deep-dives, and client inquiry booking.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    live_url: 'https://clearcode.dev',
    github_url: 'https://github.com/clearcode-dev',
    is_featured: false,
    is_published: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  }
];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'f-1',
    question: 'What services do you provide?',
    answer: 'ClearCode.dev provides full-lifecycle web development solutions including custom business websites, high-converting e-commerce storefronts, personal portfolios, restaurant websites with online ordering/reservations, educational portals, custom React/PostgreSQL web applications, website redesigns, and ongoing technical maintenance.',
    display_order: 1,
    is_published: true
  },
  {
    id: 'f-2',
    question: 'How do I start a project with ClearCode.dev?',
    answer: 'Starting a project is straightforward! You can either fill out our detailed Project Enquiry Form on the website or message us directly via WhatsApp. We will review your requirements, discuss your goals, provide a transparent quotation, and guide you through each milestone from design to launch.',
    display_order: 2,
    is_published: true
  },
  {
    id: 'f-3',
    question: 'How long does website development take?',
    answer: 'Timelines depend on project complexity: standard business or portfolio websites typically take 1 to 2 weeks; e-commerce platforms and custom web applications typically range from 2 to 4 weeks. We provide clear milestone dates during the initial consultation.',
    display_order: 3,
    is_published: true
  },
  {
    id: 'f-4',
    question: 'Do you provide responsive websites that work on mobile devices?',
    answer: 'Yes, absolutely. Every single website we build is 100% mobile-first and fully responsive across smartphones, tablets, laptops, and 4K desktop screens. We test extensively on all major screen resolutions and browsers.',
    display_order: 4,
    is_published: true
  },
  {
    id: 'f-5',
    question: 'Do you provide domain and hosting setup?',
    answer: 'Yes! We assist with selecting, purchasing, and connecting custom domain names, DNS records, SSL certificates, and configuring cloud hosting (such as Vercel, Netlify, or Supabase) so your website is deployed securely and reliably.',
    display_order: 5,
    is_published: true
  },
  {
    id: 'f-6',
    question: 'Can I request website modifications after launch?',
    answer: 'Yes. We include a revision window after deployment to fine-tune your website. For ongoing updates, feature additions, or security monitoring, we also offer flexible Website Maintenance packages.',
    display_order: 6,
    is_published: true
  },
  {
    id: 'f-7',
    question: 'How can I contact ClearCode.dev?',
    answer: 'You can reach us directly through our Contact Us page, send an email to clearcode.dev16@gmail.com, or tap the WhatsApp button on our website for instant consultation.',
    display_order: 7,
    is_published: true
  }
];

const DEFAULT_SETTINGS: SiteSettingsGeneral = {
  site_title: 'ClearCode.dev',
  tagline: 'Code It. Build It. Launch It.',
  brand_heading: 'Ideas Deserve Better Websites. Let\'s Build Yours.',
  brand_positioning: 'Modern Web Development Studio',
  contact_email: 'clearcode.dev16@gmail.com',
  whatsapp_number: '+918110853519',
  location: 'Global Remote Studio',
  footer_description: 'Modern Web Development Studio. We engineer lightning-fast, high-converting websites and scalable web applications for startups, businesses, and ambitious creators.',
  footer_copyright: 'ClearCode.dev. Code It. Build It. Launch It. All rights reserved.',
  announcement_banner: {
    enabled: true,
    text: '🚀 Now taking new client projects for Q1/Q2. Free initial consultation included!'
  },
  social_links: {
    github: 'https://github.com/santhosh-2007',
    linkedin: 'https://www.linkedin.com/in/santhosh-s-90581a334/',
    instagram: 'https://instagram.com/clearcode.dev',
    twitter: ''
  }
};

const DEFAULT_ABOUT = {
  intro: 'ClearCode.dev is a web development and digital solutions brand built for startups, small businesses, entrepreneurs, restaurants, and visionaries.',
  brand_story: 'Founded on the belief that every idea deserves a high-performance, aesthetically exceptional web presence, ClearCode.dev eliminates bloated code and generic templates. We engineer websites from first principles with modern tools like React, TypeScript, and PostgreSQL.',
  mission: 'To craft lightning-fast, visually captivating, and purpose-built digital experiences that empower businesses to thrive in the modern web era.',
  vision: 'To become the preferred web development studio known globally for technical precision, transparent collaboration, and uncompromising design quality.',
  approach: [
    { step: '01. Architecture First', desc: 'We understand your business model and target audience before writing a single line of code.' },
    { step: '02. Modern Craftsmanship', desc: 'Engineered with clean React, type-safe TypeScript, and optimized database models.' },
    { step: '03. Pixel-Perfect Polish', desc: 'Smooth micro-interactions, responsive fluid layouts, and dark-mode elegance.' },
    { step: '04. Reliable Launch & Support', desc: 'Complete DNS setup, SSL configuration, automated backups, and post-launch maintenance.' }
  ],
  core_values: [
    { title: 'Clean Code', desc: 'No bloated frameworks or tangled spaghetti code. Only pure, maintainable, high-performance architecture.' },
    { title: 'Radical Transparency', desc: 'Clear pricing, direct communication, and realistic delivery timelines without hidden surprises.' },
    { title: 'Mobile-First Excellence', desc: 'Every pixel is tested on mobile devices first, ensuring impeccable smartphone usability.' },
    { title: 'Speed & Security', desc: 'Sub-second load times, strict Row Level Security, and automated SSL encryption out of the box.' }
  ],
  founder: {
    name: 'ClearCode.dev Engineering Lead',
    role: 'Lead Full-Stack Architect & Founder',
    bio: 'Passionate software engineer and product builder dedicated to elevating the web standard for growing businesses and innovative founders.'
  }
};

// Storage keys for local persistence
const STORAGE_KEYS = {
  SERVICES: 'cc_services',
  PROJECTS: 'cc_projects',
  ENQUIRIES: 'cc_enquiries',
  TESTIMONIALS: 'cc_testimonials',
  FAQS: 'cc_faqs',
  SETTINGS: 'cc_settings',
  ABOUT: 'cc_about',
};

// Helper for local mock persistence
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

// Data Service
export const dataService = {
  // Services
  async getServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data) return data as Service[];
    }
    return getStored<Service[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  },

  async saveService(service: Partial<Service>): Promise<Service> {
    if (isSupabaseConfigured && supabase) {
      if (service.id) {
        const { data, error } = await supabase
          .from('services')
          .update(service)
          .eq('id', service.id)
          .select()
          .single();
        if (!error && data) return data as Service;
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert([service])
          .select()
          .single();
        if (!error && data) return data as Service;
      }
    }
    const current = getStored<Service[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    let updated: Service;
    if (service.id) {
      updated = { ...service } as Service;
      const index = current.findIndex(s => s.id === service.id);
      if (index >= 0) current[index] = updated;
      else current.push(updated);
    } else {
      updated = {
        ...service,
        id: crypto.randomUUID ? crypto.randomUUID() : 'srv-' + Date.now(),
        display_order: current.length + 1,
      } as Service;
      current.push(updated);
    }
    setStored(STORAGE_KEYS.SERVICES, current);
    return updated;
  },

  async deleteService(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) return true;
    }
    const current = getStored<Service[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    setStored(STORAGE_KEYS.SERVICES, current.filter(s => s.id !== id));
    return true;
  },

  // Projects
  async getProjects(featuredOnly = false): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (featuredOnly) query = query.eq('is_featured', true);
      const { data, error } = await query;
      if (!error && data) return data as Project[];
    }
    const projects = getStored<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    return featuredOnly ? projects.filter(p => p.is_featured) : projects;
  },

  async saveProject(project: Partial<Project>): Promise<Project> {
    if (isSupabaseConfigured && supabase) {
      if (project.id) {
        const { data, error } = await supabase
          .from('projects')
          .update(project)
          .eq('id', project.id)
          .select()
          .single();
        if (!error && data) return data as Project;
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([project])
          .select()
          .single();
        if (!error && data) return data as Project;
      }
    }
    const current = getStored<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    let updated: Project;
    if (project.id) {
      updated = { ...project } as Project;
      const index = current.findIndex(p => p.id === project.id);
      if (index >= 0) current[index] = updated;
      else current.push(updated);
    } else {
      updated = {
        ...project,
        id: crypto.randomUUID ? crypto.randomUUID() : 'proj-' + Date.now(),
        created_at: new Date().toISOString(),
      } as Project;
      current.unshift(updated);
    }
    setStored(STORAGE_KEYS.PROJECTS, current);
    return updated;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) return true;
    }
    const current = getStored<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    setStored(STORAGE_KEYS.PROJECTS, current.filter(p => p.id !== id));
    return true;
  },

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Enquiry[];
    }
    return getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
  },

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: crypto.randomUUID ? crypto.randomUUID() : 'enq-' + Date.now(),
      status: 'New',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([{
          customer_name: enquiry.customer_name,
          business_name: enquiry.business_name || null,
          email: enquiry.email,
          phone: enquiry.phone,
          whatsapp: enquiry.whatsapp || null,
          service_id: enquiry.service_id || null,
          project_description: enquiry.project_description,
          reference_url: enquiry.reference_url || null,
          budget: enquiry.budget,
          expected_date: enquiry.expected_date || null,
          additional_requirements: enquiry.additional_requirements || null,
          status: 'New'
        }])
        .select()
        .single();

      if (!error && data) {
        // Also fire edge function notification in background if available
        try {
          supabase.functions.invoke('send-enquiry-notification', { body: enquiry });
        } catch (e) {
          // Non-blocking
        }
        return data as Enquiry;
      }
    }

    // Local storage fallback for seamless testing
    const current = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    current.unshift(newEnquiry);
    setStored(STORAGE_KEYS.ENQUIRIES, current);
    return newEnquiry;
  },

  async updateEnquiryStatus(id: string, status: EnquiryStatus, admin_notes?: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const updateData: any = { status };
      if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
      const { error } = await supabase.from('enquiries').update(updateData).eq('id', id);
      if (!error) return true;
    }
    const current = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const enq = current.find(e => e.id === id);
    if (enq) {
      enq.status = status;
      if (admin_notes !== undefined) enq.admin_notes = admin_notes;
      enq.updated_at = new Date().toISOString();
      setStored(STORAGE_KEYS.ENQUIRIES, current);
    }
    return true;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (!error) return true;
    }
    const current = getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    setStored(STORAGE_KEYS.ENQUIRIES, current.filter(e => e.id !== id));
    return true;
  },

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data) return data as FAQ[];
    }
    return getStored<FAQ[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
  },

  async saveFAQ(faq: Partial<FAQ>): Promise<FAQ> {
    if (isSupabaseConfigured && supabase) {
      if (faq.id) {
        const { data, error } = await supabase
          .from('faqs')
          .update(faq)
          .eq('id', faq.id)
          .select()
          .single();
        if (!error && data) return data as FAQ;
      } else {
        const { data, error } = await supabase
          .from('faqs')
          .insert([faq])
          .select()
          .single();
        if (!error && data) return data as FAQ;
      }
    }
    const current = getStored<FAQ[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    let updated: FAQ;
    if (faq.id) {
      updated = { ...faq } as FAQ;
      const index = current.findIndex(f => f.id === faq.id);
      if (index >= 0) current[index] = updated;
      else current.push(updated);
    } else {
      updated = {
        ...faq,
        id: 'faq-' + Date.now(),
        display_order: current.length + 1,
      } as FAQ;
      current.push(updated);
    }
    setStored(STORAGE_KEYS.FAQS, current);
    return updated;
  },

  async deleteFAQ(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (!error) return true;
    }
    const current = getStored<FAQ[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    setStored(STORAGE_KEYS.FAQS, current.filter(f => f.id !== id));
    return true;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Testimonial[];
    }
    return getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
  },

  async saveTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    if (isSupabaseConfigured && supabase) {
      if (testimonial.id) {
        const { data, error } = await supabase
          .from('testimonials')
          .update(testimonial)
          .eq('id', testimonial.id)
          .select()
          .single();
        if (!error && data) return data as Testimonial;
      } else {
        const { data, error } = await supabase
          .from('testimonials')
          .insert([testimonial])
          .select()
          .single();
        if (!error && data) return data as Testimonial;
      }
    }
    const current = getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
    let updated: Testimonial;
    if (testimonial.id) {
      updated = { ...testimonial } as Testimonial;
      const index = current.findIndex(t => t.id === testimonial.id);
      if (index >= 0) current[index] = updated;
      else current.push(updated);
    } else {
      updated = {
        ...testimonial,
        id: 'tst-' + Date.now(),
        created_at: new Date().toISOString(),
      } as Testimonial;
      current.unshift(updated);
    }
    setStored(STORAGE_KEYS.TESTIMONIALS, current);
    return updated;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (!error) return true;
    }
    const current = getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
    setStored(STORAGE_KEYS.TESTIMONIALS, current.filter(t => t.id !== id));
    return true;
  },

  // Settings
  async getSettings(): Promise<SiteSettingsGeneral> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'general')
        .single();
      if (!error && data?.setting_value) return data.setting_value as SiteSettingsGeneral;
    }
    return getStored<SiteSettingsGeneral>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async saveSettings(settings: SiteSettingsGeneral): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          {
            setting_key: 'general',
            setting_value: settings,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'setting_key' }
        );
      if (error) {
        console.error('Supabase saveSettings error:', error);
        // If Supabase RLS or network failed, still update local fallback but inform caller
        setStored(STORAGE_KEYS.SETTINGS, settings);
        return { success: false, error: error.message };
      }
      setStored(STORAGE_KEYS.SETTINGS, settings);
      return { success: true };
    }
    setStored(STORAGE_KEYS.SETTINGS, settings);
    return { success: true };
  },

  // Content Pages
  async getContentPage(slug: string): Promise<any> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .eq('page_slug', slug)
        .single();
      if (!error && data?.content) return data.content;
    }
    if (slug === 'about') {
      return getStored(STORAGE_KEYS.ABOUT, DEFAULT_ABOUT);
    }
    return null;
  },

  async saveContentPage(slug: string, title: string, content: any): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('content_pages')
        .upsert(
          {
            page_slug: slug,
            title,
            content,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'page_slug' }
        );
      if (error) {
        console.error('Supabase saveContentPage error:', error);
      }
      if (!error) return true;
    }
    if (slug === 'about') {
      setStored(STORAGE_KEYS.ABOUT, content);
    }
    return true;
  }
};
