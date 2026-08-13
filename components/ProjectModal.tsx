'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#09110d] border border-[#00ff87]/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,135,0.15)] text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#09110d]/90 backdrop-blur-md border-b border-[#00ff87]/20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-gray-400">• Featured Project</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-[#00ff87]/20 text-gray-400 hover:text-[#00ff87] transition-colors"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white mb-2">{project.title}</h2>
            <p className="text-sm sm:text-base font-mono text-[#00ff87]">{project.tagline}</p>
          </div>

          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden border border-[#00ff87]/20 aspect-video group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09110d] via-transparent to-transparent opacity-80" />
          </div>

          {/* Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0e1b15] border border-[#00ff87]/20 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#00ff87]" />
                    <span>{m.label}</span>
                  </div>
                  <span className="text-xl font-mono font-bold text-[#00ff87]">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Full Description */}
          <div className="space-y-3 text-sm leading-relaxed text-gray-300">
            <h3 className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Overview & Architecture
            </h3>
            <p className="bg-[#0e1b15]/60 p-4 rounded-xl border border-white/5">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-wider">Key Technical Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#0e1b15]/40 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="space-y-2 pt-2">
            <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ff87] hover:bg-[#60efff] text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)]"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e1b15] hover:bg-[#12231b] border border-[#00ff87]/30 text-white font-mono text-xs font-semibold transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#00ff87]" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
