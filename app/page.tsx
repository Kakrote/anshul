'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Code2,
  Rocket,
  Bot,
  Server,
  Terminal,
  ExternalLink,
  Star,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { getPortfolioData, getFeaturedProjects } from '../lib/portfolio';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { personal, services, testimonials } = getPortfolioData();
  const featuredProjects = getFeaturedProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-title',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtext',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-pill',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5 },
          '-=0.3'
        );

      // Section ScrollTrigger Animations
      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-[#00ff87]" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-[#00ff87]" />;
      case 'Bot': return <Bot className="w-6 h-6 text-[#00ff87]" />;
      default: return <Server className="w-6 h-6 text-[#00ff87]" />;
    }
  };

  return (
    <div ref={heroRef} className="space-y-24 pb-20 neo-grid-bg">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        {/* Radial Green Ambient Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff87]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d1712] border border-[#00ff87]/30 text-[#00ff87] font-mono text-xs shadow-[0_0_15px_rgba(0,255,135,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
            <span>{personal.availabilityStatus}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title text-4xl sm:text-6xl md:text-7xl font-mono font-extrabold tracking-tight text-white leading-[1.1]">
            Hello, I&apos;m <span className="text-gradient-emerald">{personal.name}</span>
            <br />
            <span className="text-gray-200 text-3xl sm:text-5xl md:text-6xl block mt-2">
              {personal.title}
            </span>
          </h1>

          {/* Hero Subtext */}
          <p ref={subtextRef} className="hero-subtext text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {personal.heroSubtext}
          </p>

          {/* Call to Actions */}
          <div ref={ctaRef} className="hero-cta flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00ff87] hover:bg-[#60efff] text-black font-mono text-sm font-bold transition-all shadow-[0_0_25px_rgba(0,255,135,0.4)] hover:shadow-[0_0_35px_rgba(96,239,255,0.6)] active:scale-95"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0d1712] hover:bg-[#12221a] border border-[#00ff87]/30 text-white font-mono text-sm font-semibold transition-all hover:border-[#00ff87]/60 active:scale-95"
            >
              <span>Schedule Consultation</span>
            </Link>
          </div>

          {/* Floating Tech Stack Badges */}
          <div className="pt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {['MERN Stack', 'PERN Stack', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'VPS Deployment', 'Claude Code', 'CI/CD Pipelines'].map((tech) => (
              <span
                key={tech}
                className="hero-pill px-3.5 py-1.5 rounded-lg bg-[#0d1712]/80 border border-[#00ff87]/20 text-[#00ff87] font-mono text-xs shadow-sm hover:border-[#00ff87]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INFINITE TECH MARQUEE */}
      <section className="py-4 border-y border-[#00ff87]/15 bg-[#09110d]/90 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 font-mono text-xs font-bold text-gray-400 tracking-widest uppercase animate-marquee">
          <div className="flex items-center gap-10 shrink-0">
            <span className="text-[#00ff87]">⚡ MERN STACK</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ PERN STACK</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ REDIS CACHING</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ DOCKER CONTAINERS</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ VPS HOSTING</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ CLAUDE CODE & LLMS</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ CI/CD PIPELINES</span>
            <span>•</span>
          </div>
          <div className="flex items-center gap-10 shrink-0">
            <span className="text-[#00ff87]">⚡ MERN STACK</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ PERN STACK</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ REDIS CACHING</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ DOCKER CONTAINERS</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ VPS HOSTING</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ CLAUDE CODE & LLMS</span>
            <span>•</span>
            <span className="text-[#00ff87]">⚡ CI/CD PIPELINES</span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS & STATS */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card glass-panel p-6 sm:p-8 rounded-2xl border border-[#00ff87]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[#00ff87]">
              <TrendingUp className="w-16 h-16" />
            </div>
            <span className="font-mono text-xs text-[#00ff87] font-semibold uppercase tracking-wider">Experience</span>
            <p className="text-4xl sm:text-5xl font-mono font-bold text-white mt-2">{personal.yearsOfExperience}</p>
            <p className="text-sm text-gray-400 mt-2">Years architecting full-stack & SaaS applications</p>
          </div>

          <div className="stat-card glass-panel p-6 sm:p-8 rounded-2xl border border-[#00ff87]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[#00ff87]">
              <Rocket className="w-16 h-16" />
            </div>
            <span className="font-mono text-xs text-[#00ff87] font-semibold uppercase tracking-wider">Projects Shipped</span>
            <p className="text-4xl sm:text-5xl font-mono font-bold text-white mt-2">{personal.projectCount}</p>
            <p className="text-sm text-gray-400 mt-2">Successful production web apps, APIs & infrastructure rollouts</p>
          </div>

          <div className="stat-card glass-panel p-6 sm:p-8 rounded-2xl border border-[#00ff87]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[#00ff87]">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <span className="font-mono text-xs text-[#00ff87] font-semibold uppercase tracking-wider">Client Satisfaction</span>
            <p className="text-4xl sm:text-5xl font-mono font-bold text-white mt-2">{personal.clientSatisfactionRate}</p>
            <p className="text-sm text-gray-400 mt-2">Rating across global freelance & contract deliverables</p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE */}
      <section ref={projectsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Portfolio Highlights</span>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white mt-1">Featured Work</h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#00ff87] hover:text-[#60efff] group"
          >
            <span>VIEW ALL PROJECTS ({getPortfolioData().projects.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="project-card glass-panel rounded-2xl overflow-hidden border border-[#00ff87]/20 hover:border-[#00ff87]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-black/80 text-[#00ff87] border border-[#00ff87]/30 backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-mono font-bold text-white group-hover:text-[#00ff87] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00ff87]">{proj.tagline}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#00ff87]/10 text-[#00ff87]">
                      {t}
                    </span>
                  ))}
                  {proj.techStack.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/5 text-gray-400">
                      +{proj.techStack.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-[#00ff87] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Core Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white">Freelance Services</h2>
          <p className="text-sm text-gray-400">Targeted full-stack engineering, custom SaaS building, and AI server infrastructure solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((serv) => (
            <div key={serv.id} className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00ff87]/20 space-y-6">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30">
                  {getServiceIcon(serv.icon)}
                </div>
                <span className="font-mono text-xs text-gray-400 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  From {serv.startingPrice}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-mono font-bold text-white mb-2">{serv.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{serv.description}</p>
              </div>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="font-mono text-[11px] font-bold text-[#00ff87] uppercase">Key Deliverables</span>
                <ul className="grid grid-cols-1 gap-2 text-xs text-gray-300">
                  {serv.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?subject=${encodeURIComponent(serv.title)}`}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00ff87] hover:text-[#60efff] pt-2 group"
              >
                <span>Request Proposal for {serv.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Client Feedback</span>
          <h2 className="text-3xl font-mono font-bold text-white">What Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-panel p-6 rounded-2xl border border-[#00ff87]/20 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#00ff87]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00ff87]" />
                  ))}
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={t.avatar} alt={t.clientName} className="w-10 h-10 rounded-full object-cover border border-[#00ff87]/30" />
                <div>
                  <h4 className="font-mono text-xs font-bold text-white">{t.clientName}</h4>
                  <p className="text-[11px] text-gray-400">{t.clientRole}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONVERSION CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0d1c14] via-[#09120d] to-[#040806] border border-[#00ff87]/40 text-center space-y-6 shadow-[0_0_40px_rgba(0,255,135,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff87]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white">
            Ready to Build Your Next <span className="text-gradient-emerald">High-Performance Product?</span>
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Whether you need a full-stack MERN/PERN application, Redis query acceleration, Docker VPS pipelines, or custom Claude AI integration—let&apos;s collaborate.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00ff87] hover:bg-[#60efff] text-black font-mono text-sm font-bold transition-all shadow-[0_0_30px_rgba(0,255,135,0.5)] active:scale-95"
            >
              <span>Get In Touch Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
