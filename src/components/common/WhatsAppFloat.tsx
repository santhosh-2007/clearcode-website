import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { dataService } from '@/services/dataService';

export const WhatsAppFloat: React.FC = () => {
  const [phone, setPhone] = useState<string>('918110853519');

  useEffect(() => {
    dataService.getSettings().then((settings) => {
      if (settings?.whatsapp_number) {
        setPhone(settings.whatsapp_number.replace(/\D/g, ''));
      }
    });
  }, []);

  const message = encodeURIComponent(
    "Hello ClearCode.dev! I'm interested in developing a website. I would like to discuss my project."
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ClearCode.dev on WhatsApp"
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-medium text-sm tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
