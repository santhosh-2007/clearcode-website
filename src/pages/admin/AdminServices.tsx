import React, { useEffect, useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { Service } from '@/types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit/Add modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [featuresInput, setFeaturesInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const data = await dataService.getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setCurrentService({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      features: ['Custom Responsive Design', 'SEO Architecture'],
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      is_active: true,
      display_order: services.length + 1,
    });
    setFeaturesInput('Custom Responsive Design\nSEO Architecture');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setCurrentService(s);
    setFeaturesInput(s.features.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService.title || !currentService.slug) return;

    const parsedFeatures = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    await dataService.saveService({
      ...currentService,
      features: parsedFeatures,
    });

    setIsModalOpen(false);
    fetchServices();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await dataService.deleteService(deleteId);
    setDeleteId(null);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Services Management</h1>
          <p className="text-xs text-text-secondary mt-1">
            Configure services, update deliverables, features, and active status.
          </p>
        </div>
        <Button size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Service
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading services..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv, idx) => (
            <Card key={srv.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <span className="text-xs font-mono text-brand-cyan">Order #{srv.display_order || idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    srv.is_active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {srv.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>

                <div className="pt-4 flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-surface-border">
                    <img src={srv.image_url} alt={srv.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base mb-1">{srv.title}</h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-2">{srv.short_description}</p>
                    <div className="text-[11px] text-text-muted font-mono">Slug: /{srv.slug}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border/50">
                  <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1">
                    Features ({srv.features.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {srv.features.slice(0, 4).map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-surface-cardHover text-text-secondary">
                        {f}
                      </span>
                    ))}
                    {srv.features.length > 4 && (
                      <span className="text-[10px] text-text-muted">+{srv.features.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-border flex items-center justify-end gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleOpenEdit(srv)}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
                <button
                  onClick={() => setDeleteId(srv.id)}
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
          title={currentService.id ? 'Edit Service' : 'Add New Service'}
          maxWidth="xl"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={currentService.title || ''}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setCurrentService({ ...currentService, title, slug });
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={currentService.slug || ''}
                  onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={currentService.display_order || 0}
                  onChange={(e) => setCurrentService({ ...currentService, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={currentService.image_url || ''}
                onChange={(e) => setCurrentService({ ...currentService, image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Short Description (Card view) *
              </label>
              <textarea
                rows={2}
                required
                value={currentService.short_description || ''}
                onChange={(e) => setCurrentService({ ...currentService, short_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Full Detailed Description *
              </label>
              <textarea
                rows={4}
                required
                value={currentService.full_description || ''}
                onChange={(e) => setCurrentService({ ...currentService, full_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Features & Deliverables (One per line)
              </label>
              <textarea
                rows={4}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all font-mono"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                <input
                  type="checkbox"
                  checked={Boolean(currentService.is_active)}
                  onChange={(e) => setCurrentService({ ...currentService, is_active: e.target.checked })}
                  className="rounded bg-surface-cardHover border-surface-border text-brand-blue"
                />
                <span>Active (Available for customer enquiry)</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Service
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <Modal
          isOpen={Boolean(deleteId)}
          onClose={() => setDeleteId(null)}
          title="Delete Service"
          maxWidth="sm"
        >
          <div className="space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Delete Service Offering?</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Are you sure you want to delete this service?
            </p>
            <div className="flex justify-center gap-3 pt-2">
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
