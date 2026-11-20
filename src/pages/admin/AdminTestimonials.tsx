import React, { useEffect, useState } from 'react';
import { MessageSquareQuote, Plus, Edit2, Trash2, Star, AlertCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { Testimonial } from '@/types';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    const data = await dataService.getTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setCurrentTestimonial({
      client_name: '',
      company_name: '',
      testimonial: '',
      rating: 5,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setCurrentTestimonial(t);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial.client_name || !currentTestimonial.testimonial) return;

    await dataService.saveTestimonial(currentTestimonial);
    setIsModalOpen(false);
    fetchTestimonials();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await dataService.deleteTestimonial(deleteId);
    setDeleteId(null);
    fetchTestimonials();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Testimonial Management</h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage genuine client reviews and testimonials. (Strict policy: Never fabricate client reviews).
          </p>
        </div>
        <Button size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </Button>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Strict integrity requirement: Only input authentic client feedback received from real engagements.</span>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading testimonials..." />
      ) : testimonials.length === 0 ? (
        <Card className="p-12 text-center text-sm text-text-secondary">
          No testimonials added yet. Click "Add Testimonial" to enter your first verified client review.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.is_published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-text-muted'
                  }`}>
                    {t.is_published ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <p className="text-xs text-text-secondary italic my-4 leading-relaxed">
                  "{t.testimonial}"
                </p>
                <div className="font-heading font-semibold text-white text-sm">
                  {t.client_name}
                </div>
                <div className="text-[11px] text-text-muted">{t.company_name}</div>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-border flex items-center justify-end gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleOpenEdit(t)}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
          maxWidth="md"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={currentTestimonial.client_name || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, client_name: e.target.value })}
                placeholder="Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Company / Project Name *
              </label>
              <input
                type="text"
                required
                value={currentTestimonial.company_name || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, company_name: e.target.value })}
                placeholder="Vance Logistics"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Star Rating (1 - 5)
              </label>
              <select
                value={currentTestimonial.rating || 5}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) || 5 })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★</option>
                <option value={3}>3 Stars ★★★</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Testimonial Text *
              </label>
              <textarea
                rows={4}
                required
                value={currentTestimonial.testimonial || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, testimonial: e.target.value })}
                placeholder="Describe client review..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                <input
                  type="checkbox"
                  checked={Boolean(currentTestimonial.is_published)}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, is_published: e.target.checked })}
                  className="rounded bg-surface-cardHover border-surface-border text-brand-blue"
                />
                <span>Publish on Website</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Testimonial
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <Modal
          isOpen={Boolean(deleteId)}
          onClose={() => setDeleteId(null)}
          title="Delete Testimonial"
          maxWidth="sm"
        >
          <div className="text-center space-y-4">
            <h3 className="text-sm font-semibold text-white">Delete Testimonial?</h3>
            <div className="flex justify-center gap-3">
              <Button size="sm" variant="secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
