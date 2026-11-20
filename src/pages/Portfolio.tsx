import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SEOHead } from '@/components/common/SEOHead';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { Project } from '@/types';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Custom Web Application', 'E-commerce', 'Restaurant', 'Business Website'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <>
      <SEOHead
        title="Our Work & Portfolio — ClearCode.dev"
        description="Explore our portfolio of web applications, e-commerce stores, business websites, and conceptual digital solutions."
      />

      {/* Hero */}
      <section className="pt-16 pb-16 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Project Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Crafted with Code & <span className="gradient-text">Aesthetic Precision</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            A curated showcase of our engineering capabilities, responsive interface systems, and demo concept applications.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-surface/80 border border-brand-blue/20 max-w-xl mx-auto text-xs text-text-secondary flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>Note: Initial sample entries are clearly labelled demo concepts per our strict integrity policy.</span>
          </div>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="py-16 bg-background-secondary border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white shadow-glow'
                    : 'bg-surface text-text-secondary border border-surface-border hover:text-white hover:border-brand-blue/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner message="Loading portfolio items..." />
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              No projects found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="h-52 w-full relative overflow-hidden border-b border-surface-border">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="cyan" size="sm">
                          {project.category}
                        </Badge>
                        <Badge variant="amber" size="sm">
                          Demo Concept
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-cardHover border border-surface-border text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-surface-border/50 flex items-center justify-between gap-4 mt-4">
                    {project.live_url ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-cyan transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Preview
                      </a>
                    ) : (
                      <span className="text-xs text-text-muted">Concept Preview</span>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Bottom Enquiry CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-surface border border-surface-border text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-3">
              Have a Custom Concept or Project in Mind?
            </h3>
            <p className="text-sm text-text-secondary mb-6 max-w-xl mx-auto">
              We specialize in turning rough wireframes and high-level ideas into high-converting digital reality.
            </p>
            <Link to="/enquiry">
              <Button size="md">
                Submit Your Project Details
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
