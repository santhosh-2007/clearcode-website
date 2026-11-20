import { z } from 'zod';

export const enquirySchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: 'Customer name must be at least 2 characters.' })
    .max(100, { message: 'Customer name must not exceed 100 characters.' }),
  business_name: z.string().max(100).optional().or(z.literal('')),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(8, { message: 'Please enter a valid phone number (at least 8 digits).' })
    .max(20, { message: 'Phone number cannot exceed 20 digits.' })
    .regex(/^[+0-9\s\-()]+$/, { message: 'Phone number contains invalid characters.' }),
  whatsapp: z
    .string()
    .max(20)
    .optional()
    .or(z.literal('')),
  service_id: z.string().optional().or(z.literal('')),
  project_description: z
    .string()
    .min(20, { message: 'Please provide at least 20 characters describing your project requirements.' })
    .max(2500, { message: 'Project description cannot exceed 2500 characters.' }),
  reference_url: z
    .string()
    .url({ message: 'Please enter a valid URL (including https://).' })
    .optional()
    .or(z.literal('')),
  budget: z
    .string({ required_error: 'Please select an approximate budget range.' })
    .min(1, { message: 'Please select an approximate budget range.' }),
  expected_date: z.string().optional().or(z.literal('')),
  additional_requirements: z.string().max(1500).optional().or(z.literal('')),
  // Anti-spam honeypot (must remain empty for real humans)
  website_honeypot: z.string().max(0, { message: 'Bot submission detected.' }).optional().or(z.literal('')),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image_url: z.string().url('Please enter a valid image URL'),
  technologies: z.string().min(2, 'Enter at least one technology (comma separated)'),
  live_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
});

export const serviceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  short_description: z.string().min(10, 'Short description is required'),
  full_description: z.string().min(20, 'Full description is required'),
  features: z.string().min(5, 'Enter features separated by commas or newlines'),
  image_url: z.string().url('Valid image URL required'),
  is_active: z.boolean().default(true),
  display_order: z.number().int().default(0),
});
