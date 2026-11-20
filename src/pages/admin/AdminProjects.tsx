import React, { useEffect, useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Github, 
  Star, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { Project } from '@/types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit/Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [technologiesInput, setTechnologiesInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await dataService.getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setCurrentProject({
      title: '',
      slug: '',
      category: 'Custom Web Application',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      live_url: '',
      github_url: '',
      is_featured: false,
      is_published: true,
    });
    setTechnologiesInput('React, TypeScript, Tailwind CSS');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setCurrentProject(p);
    setTechnologiesInput(p.technologies.join(', '));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.slug) return;

    const parsedTech = technologiesInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await dataService.saveProject({
      ...currentProject,
      technologies: parsedTech,
    });

    setIsModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await dataService.deleteProject(deleteId);
    setDeleteId(null);
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Project Management</h1>
          <p className="text-xs text-text-secondary mt-1">
            Create, edit, feature, and publish case studies and demo portfolio projects.
          </p>
        </div>
        <Button size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <LoadingSpinner message="Loading projects..." />
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center text-sm text-text-secondary">
          No projects added yet. Click "Add New Project" to add your first showcase.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Card key={proj.id} className="overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-44 w-full relative overflow-hidden border-b border-surface-border">
                  <img
                    src={proj.image_url}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {proj.is_featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      proj.is_published 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {proj.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-mono text-brand-cyan uppercase tracking-wider mb-1">
                    {proj.category}
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-3 mb-4">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-cardHover border border-surface-border text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-cyan">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleOpenEdit(proj)}>
                    <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                  <button
                    onClick={() => setDeleteId(proj.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
          title={currentProject.id ? 'Edit Project' : 'Add New Project'}
          maxWidth="xl"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={currentProject.title || ''}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setCurrentProject({ ...currentProject, title, slug });
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Slug (URL path) *
                </label>
                <input
                  type="text"
                  required
                  value={currentProject.slug || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={currentProject.category || 'Custom Web Application'}
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all cursor-pointer"
                >
                  <option value="Custom Web Application">Custom Web Application</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Business Website">Business Website</option>
                  <option value="Personal Portfolio">Personal Portfolio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={currentProject.image_url || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Technologies (Comma separated) *
              </label>
              <input
                type="text"
                required
                value={technologiesInput}
                onChange={(e) => setTechnologiesInput(e.target.value)}
                placeholder="React, TypeScript, Tailwind CSS, Supabase"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                Project Description *
              </label>
              <textarea
                rows={3}
                required
                value={currentProject.description || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Live Preview URL
                </label>
                <input
                  type="url"
                  value={currentProject.live_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, live_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={currentProject.github_url || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white text-xs border-glow-focus transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                <input
                  type="checkbox"
                  checked={Boolean(currentProject.is_featured)}
                  onChange={(e) => setCurrentProject({ ...currentProject, is_featured: e.target.checked })}
                  className="rounded bg-surface-cardHover border-surface-border text-brand-blue"
                />
                <span>Featured on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                <input
                  type="checkbox"
                  checked={Boolean(currentProject.is_published)}
                  onChange={(e) => setCurrentProject({ ...currentProject, is_published: e.target.checked })}
                  className="rounded bg-surface-cardHover border-surface-border text-brand-blue"
                />
                <span>Published (Visible to public)</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Project
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
          title="Delete Project"
          maxWidth="sm"
        >
          <div className="space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-base font-semibold text-white">Delete Project Showcase?</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Are you sure you want to permanently delete this portfolio entry?
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
