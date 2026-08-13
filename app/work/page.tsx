'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Briefcase,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  X,
} from 'lucide-react';
import { getPortfolioData } from '../../lib/portfolio';
import ProjectModal from '../../components/ProjectModal';
import { Project } from '../../types/portfolio';
import { GithubIcon } from '../../components/SocialIcons';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'saas', label: 'SaaS Platforms' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
  { id: 'ai', label: 'AI & LLM Workflows' },
  { id: 'devops', label: 'DevOps & VPS' },
];

export default function WorkPage() {
  const { projects } = getPortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory, searchQuery]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.techStack.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 neo-grid-bg">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1712] border border-[#00ff87]/30 text-[#00ff87] font-mono text-xs">
          <Briefcase className="w-3.5 h-3.5" />
          <span>PORTFOLIO & SHOWCASE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
          Selected <span className="text-gradient-emerald">Engineering Projects</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          A showcase of full-stack web applications, SaaS platforms, high-throughput APIs, and AI integrations shipped for global clients.
        </p>
      </div>

      {/* Controls Bar: Category Filters & Search Input */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#09110d] border border-[#00ff87]/20 backdrop-blur-md">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00ff87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                  : 'bg-[#0d1712] text-gray-300 hover:text-white border border-[#00ff87]/15 hover:border-[#00ff87]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#00ff87] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack, title..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-gray-200 placeholder-gray-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00ff87]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="work-card glass-panel rounded-2xl overflow-hidden border border-[#00ff87]/20 hover:border-[#00ff87]/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-black/80 text-[#00ff87] border border-[#00ff87]/30 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-[#00ff87] text-black shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-mono font-bold text-white group-hover:text-[#00ff87] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00ff87]">{project.tagline}</p>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{project.description}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 space-y-4 border-t border-white/5">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#00ff87]/10 text-[#00ff87]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-gray-400">Click card for metrics</span>
                  <span className="text-xs font-mono text-[#00ff87] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-2xl border border-[#00ff87]/20 text-center space-y-4">
          <p className="font-mono text-lg text-white">No projects found matching your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#00ff87] text-black font-mono text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
