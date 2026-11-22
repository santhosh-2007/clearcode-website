export interface AdminProfile {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  features: string[];
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Discussion' 
  | 'Quotation Sent' 
  | 'In Progress' 
  | 'Completed' 
  | 'Rejected';

export type BudgetRange = 
  | 'Below ₹5,000'
  | '₹5,000–₹10,000'
  | '₹10,000–₹25,000'
  | '₹25,000–₹50,000'
  | 'Above ₹50,000'
  | 'Not decided yet';

export interface Enquiry {
  id: string;
  customer_name: string;
  business_name?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  service_id?: string;
  service_title?: string;
  project_description: string;
  reference_url?: string;
  budget: BudgetRange | string;
  expected_date?: string;
  additional_requirements?: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company_name: string;
  testimonial: string;
  rating: number;
  is_published: boolean;
  created_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
}

export interface SiteSettingsGeneral {
  site_title: string;
  tagline: string;
  brand_heading: string;
  brand_positioning: string;
  contact_email: string;
  whatsapp_number: string;
  location: string;
  footer_description?: string;
  footer_copyright?: string;
  announcement_banner: {
    enabled: boolean;
    text: string;
  };
  social_links: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter?: string;
  };
}

export interface SiteSettingsSEO {
  meta_title: string;
  meta_description: string;
  og_image: string;
}

export interface ContentPage {
  id: string;
  page_slug: string;
  title: string;
  content: any;
  updated_at: string;
}
