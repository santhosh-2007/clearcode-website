import React, { useEffect, useState } from 'react';
import { Settings, CheckCircle2, Shield, Bell, Globe, Phone, Mail, Share2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { SiteSettingsGeneral } from '@/types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettingsGeneral | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    dataService.getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await dataService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading || !settings) {
    return <LoadingSpinner message="Loading site settings..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Site Settings & Configuration</h1>
        <p className="text-xs text-text-secondary mt-1">
          Update brand metadata, contact info, WhatsApp number, announcement banner, and social links.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Site settings saved and applied across the website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Brand Details */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Globe className="w-4 h-4 text-brand-cyan" />
            <h2 className="font-heading font-bold text-white text-sm">General Brand Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Website Brand Title</label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Main Brand Heading</label>
            <input
              type="text"
              value={settings.brand_heading}
              onChange={(e) => setSettings({ ...settings, brand_heading: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Brand Positioning</label>
            <input
              type="text"
              value={settings.brand_positioning}
              onChange={(e) => setSettings({ ...settings, brand_positioning: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>
        </Card>

        {/* Footer Content & Copyright */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Globe className="w-4 h-4 text-brand-cyan" />
            <h2 className="font-heading font-bold text-white text-sm">Footer Content & Copyright</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Footer Brand Description</label>
            <textarea
              rows={3}
              value={settings.footer_description || ''}
              onChange={(e) => setSettings({ ...settings, footer_description: e.target.value })}
              placeholder="Modern Web Development Studio. We engineer lightning-fast..."
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Footer Copyright Notice</label>
            <input
              type="text"
              value={settings.footer_copyright || ''}
              onChange={(e) => setSettings({ ...settings, footer_copyright: e.target.value })}
              placeholder="ClearCode.dev. Code It. Build It. Launch It. All rights reserved."
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>
        </Card>

        {/* Contact & WhatsApp */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Phone className="w-4 h-4 text-emerald-400" />
            <h2 className="font-heading font-bold text-white text-sm">Contact Channels & WhatsApp</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Business Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">WhatsApp Business Number (with country code)</label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="919876543210"
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Studio Location Label</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>
        </Card>

        {/* Announcement Banner */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="font-heading font-bold text-white text-sm">Top Announcement Banner</h2>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
            <input
              type="checkbox"
              checked={settings.announcement_banner.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement_banner: {
                    ...settings.announcement_banner,
                    enabled: e.target.checked,
                  },
                })
              }
              className="rounded bg-surface-cardHover border-surface-border text-brand-blue"
            />
            <span>Enable Announcement Banner at Top of Public Website</span>
          </label>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={settings.announcement_banner.text}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement_banner: {
                    ...settings.announcement_banner,
                    text: e.target.value,
                  },
                })
              }
              className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
            />
          </div>
        </Card>

        {/* Social Media Links */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <Share2 className="w-4 h-4 text-brand-blue" />
            <h2 className="font-heading font-bold text-white text-sm">Social Media Links</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">GitHub Profile / Org</label>
              <input
                type="url"
                value={settings.social_links.github}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, github: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">LinkedIn Company Page</label>
              <input
                type="url"
                value={settings.social_links.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, linkedin: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Instagram Profile</label>
              <input
                type="url"
                value={settings.social_links.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, instagram: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Twitter / X Profile</label>
              <input
                type="url"
                value={settings.social_links.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, twitter: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="md">
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
