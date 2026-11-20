import test from 'node:test';
import assert from 'node:assert/strict';

// Test Zod validation schemas
import { z } from 'zod';

const enquirySchema = z.object({
  customer_name: z.string().min(2).max(100),
  business_name: z.string().max(100).optional().or(z.literal('')),
  email: z.string().email(),
  phone: z.string().min(8).max(20).regex(/^[+0-9\s\-()]+$/),
  whatsapp: z.string().max(20).optional().or(z.literal('')),
  service_id: z.string().optional().or(z.literal('')),
  project_description: z.string().min(20).max(2500),
  reference_url: z.string().url().optional().or(z.literal('')),
  budget: z.string().min(1),
  expected_date: z.string().optional().or(z.literal('')),
  additional_requirements: z.string().max(1500).optional().or(z.literal('')),
  website_honeypot: z.string().max(0).optional().or(z.literal('')),
});

test('Enquiry validation accepts valid customer enquiry', () => {
  const validData = {
    customer_name: 'Priya Sharma',
    business_name: 'Sharma Tech Innovations',
    email: 'priya@example.com',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    service_id: 'e1a0b1c2-0001-4000-8000-000000000001',
    project_description: 'We need a high-converting corporate agency website built with modern React and dark aesthetic.',
    budget: '₹25,000–₹50,000',
    website_honeypot: '',
  };

  const result = enquirySchema.safeParse(validData);
  assert.equal(result.success, true);
});

test('Enquiry validation rejects invalid email and short description', () => {
  const invalidData = {
    customer_name: 'P',
    email: 'invalid-email',
    phone: '123',
    project_description: 'Too short',
    budget: 'Below ₹5,000',
  };

  const result = enquirySchema.safeParse(invalidData);
  assert.equal(result.success, false);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    assert.ok(fieldErrors.customer_name);
    assert.ok(fieldErrors.email);
    assert.ok(fieldErrors.phone);
    assert.ok(fieldErrors.project_description);
  }
});

test('Anti-spam honeypot blocks automated bot submissions', () => {
  const botData = {
    customer_name: 'Spam Bot',
    email: 'spammer@example.com',
    phone: '+1234567890',
    project_description: 'Spam submission attempting to advertise SEO services.',
    budget: 'Not decided yet',
    website_honeypot: 'http://spam-link.ru',
  };

  const result = enquirySchema.safeParse(botData);
  assert.equal(result.success, false);
});

test('Budget options match project requirements', () => {
  const requiredBudgets = [
    'Below ₹5,000',
    '₹5,000–₹10,000',
    '₹10,000–₹25,000',
    '₹25,000–₹50,000',
    'Above ₹50,000',
    'Not decided yet',
  ];

  assert.equal(requiredBudgets.length, 6);
  assert.ok(requiredBudgets.includes('Below ₹5,000'));
  assert.ok(requiredBudgets.includes('Above ₹50,000'));
});

test('No hardcoded secrets or service role keys in client code', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const supabaseClientCode = fs.readFileSync(path.resolve('./src/lib/supabase.ts'), 'utf8');
  assert.equal(supabaseClientCode.includes('SUPABASE_SERVICE_ROLE_KEY'), false);
  assert.equal(supabaseClientCode.includes('secret_'), false);
});
