import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';

// Public Layout & Pages
import { PublicLayout } from '@/components/common/PublicLayout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Portfolio } from '@/pages/Portfolio';
import { Enquiry } from '@/pages/Enquiry';
import { Contact } from '@/pages/Contact';
import { FAQPage } from '@/pages/FAQ';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsConditions } from '@/pages/TermsConditions';
import { NotFound } from '@/pages/NotFound';

// Admin Layout & Pages
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminEnquiries } from '@/pages/admin/AdminEnquiries';
import { AdminProjects } from '@/pages/admin/AdminProjects';
import { AdminServices } from '@/pages/admin/AdminServices';
import { AdminContent } from '@/pages/admin/AdminContent';
import { AdminTestimonials } from '@/pages/admin/AdminTestimonials';
import { AdminSettings } from '@/pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes with Navbar, Footer & Floating WhatsApp */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Secure Admin Dashboard (Guarded by AdminLayout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
