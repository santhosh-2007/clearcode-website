import React, { useEffect, useState } from 'react';
import { FileEdit, Plus, Trash2, Edit2, CheckCircle2, HelpCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { FAQ } from '@/types';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'faqs'>('about');
  const [aboutData, setAboutData] = useState<any>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // FAQ modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({});
  const [deleteFaqId, setDeleteFaqId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const [about, faqList] = await Promise.all([
      dataService.getContentPage('about'),
      dataService.getFAQs(),
    ]);
    setAboutData(about || {});
    setFaqs(faqList);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.saveContentPage('about', 'About ClearCode.dev', aboutData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleOpenAddFaq = () => {
    setCurrentFaq({
      question: '',
      answer: '',
      display_order: faqs.length + 1,
      is_published: true,
    });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (f: FAQ) => {
    setCurrentFaq(f);
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFaq.question || !currentFaq.answer) return;
    await dataService.saveFAQ(currentFaq);
    setIsFaqModalOpen(false);
    dataService.getFAQs().then(setFaqs);
  };

  const handleDeleteFaq = async () => {
    if (!deleteFaqId) return;
    await dataService.deleteFAQ(deleteFaqId);
    setDeleteFaqId(null);
    dataService.getFAQs().then(setFaqs);
  };

  if (loading) {
    return <LoadingSpinner message="Loading content pages..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Content & FAQ Management</h1>
          <p className="text-xs text-text-secondary mt-1">
            Edit brand story, mission, vision, founder details, and manage public FAQs.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'about'
                ? 'bg-brand-blue text-white shadow-glow'
                : 'bg-surface text-text-secondary hover:text-white border border-surface-border'
            }`}
          >
            About & Story
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'faqs'
                ? 'bg-brand-blue text-white shadow-glow'
                : 'bg-surface text-text-secondary hover:text-white border border-surface-border'
            }`}
          >
            FAQs ({faqs.length})
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Website content updated successfully!</span>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Introduction Summary
              </label>
              <textarea
                rows={2}
                value={aboutData?.intro || ''}
                onChange={(e) => setAboutData({ ...aboutData, intro: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Brand Story
              </label>
              <textarea
                rows={4}
                value={aboutData?.brand_story || ''}
                onChange={(e) => setAboutData({ ...aboutData, brand_story: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={aboutData?.mission || ''}
                  onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={aboutData?.vision || ''}
                  onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>
            </div>

            {/* Founder Details */}
            <div className="pt-4 border-t border-surface-border space-y-4">
              <h3 className="font-heading font-bold text-white text-sm">Founder / Lead Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Founder / Lead Name</label>
                  <input
                    type="text"
                    value={aboutData?.founder?.name || ''}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        founder: { ...aboutData.founder, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Role Title</label>
                  <input
                    type="text"
                    value={aboutData?.founder?.role || ''}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        founder: { ...aboutData.founder, role: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Founder Bio</label>
                <textarea
                  rows={2}
                  value={aboutData?.founder?.bio || ''}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      founder: { ...aboutData.founder, bio: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" size="md">
                Save Content Updates
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">
              Drag or set display order to organize the FAQ list.
            </span>
            <Button size="sm" onClick={handleOpenAddFaq} leftIcon={<Plus className="w-4 h-4" />}>
              Add FAQ
            </Button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={faq.id} className="p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-cardHover text-brand-cyan">
                      #{faq.display_order || idx + 1}
                    </span>
                    <h3 className="text-sm font-heading font-semibold text-white">{faq.question}</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed pl-8">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenEditFaq(faq)}>
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <button
                    onClick={() => setDeleteFaqId(faq.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {isFaqModalOpen && (
        <Modal
          isOpen={isFaqModalOpen}
          onClose={() => setIsFaqModalOpen(false)}
          title={currentFaq.id ? 'Edit FAQ' : 'Add New FAQ'}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveFaq} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Question *
              </label>
              <input
                type="text"
                required
                value={currentFaq.question || ''}
                onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Answer *
              </label>
              <textarea
                rows={4}
                required
                value={currentFaq.answer || ''}
                onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={currentFaq.display_order || 0}
                onChange={(e) => setCurrentFaq({ ...currentFaq, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsFaqModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save FAQ
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete FAQ Confirm */}
      {deleteFaqId && (
        <Modal
          isOpen={Boolean(deleteFaqId)}
          onClose={() => setDeleteFaqId(null)}
          title="Delete FAQ"
          maxWidth="sm"
        >
          <div className="text-center space-y-4">
            <h3 className="text-sm font-semibold text-white">Permanently Delete Question?</h3>
            <div className="flex justify-center gap-3">
              <Button size="sm" variant="secondary" onClick={() => setDeleteFaqId(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" onClick={handleDeleteFaq}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
