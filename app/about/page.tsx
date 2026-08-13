'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  User,
  Briefcase,
  GraduationCap,
  Layers,
  Server,
  Cpu,
  Download,
  Terminal,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { getPortfolioData } from '../../lib/portfolio';

export default function AboutPage() {
  const { personal, skills, experience, education } = getPortfolioData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-[#00ff87]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#00ff87]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#00ff87]" />;
      default: return <Terminal className="w-5 h-5 text-[#00ff87]" />;
    }
  };

  const displayedSkills = activeCategory === 'all'
    ? skills
    : skills.filter((c) => c.id === activeCategory);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 neo-grid-bg">
      {/* 1. HEADER & BIO NARRATIVE */}
      <section className="space-y-8">
        <div className="about-animate inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1712] border border-[#00ff87]/30 text-[#00ff87] font-mono text-xs">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT & BACKGROUND</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Avatar / Photo Card */}
          <div className="about-animate lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#00ff87]/30 p-2 bg-[#09110d] shadow-[0_0_30px_rgba(0,255,135,0.15)] group">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060907] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4 text-center space-y-1">
                <h3 className="font-mono text-lg font-bold text-white">{personal.name}</h3>
                <p className="font-mono text-xs text-[#00ff87]">{personal.title}</p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-mono pt-1">
                  <MapPin className="w-3 h-3 text-[#00ff87]" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="about-animate lg:col-span-8 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              {personal.bioHeading}
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              {personal.bioParagraphs.map((para, idx) => (
                <p key={idx} className="p-4 rounded-xl bg-[#09110d]/80 border border-white/5">
                  {para}
                </p>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00ff87] hover:bg-[#60efff] text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d1712] hover:bg-[#12221a] border border-[#00ff87]/30 text-white font-mono text-xs font-semibold transition-colors"
              >
                <span>Initiate Project Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#00ff87]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE COMPETENCIES & TECH RADAR */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Skill Inventory</span>
            <h2 className="text-3xl font-mono font-bold text-white mt-1">Technologies & Proficiency</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#00ff87] text-black font-bold shadow-[0_0_12px_rgba(0,255,135,0.3)]'
                  : 'bg-[#0d1712] text-gray-300 hover:text-white border border-[#00ff87]/20'
              }`}
            >
              All Categories
            </button>
            {skills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#00ff87] text-black font-bold shadow-[0_0_12px_rgba(0,255,135,0.3)]'
                    : 'bg-[#0d1712] text-gray-300 hover:text-white border border-[#00ff87]/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedSkills.map((category) => (
            <div key={category.id} className="glass-panel p-6 rounded-2xl border border-[#00ff87]/20 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30">
                  {getCategoryIcon(category.icon)}
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-white">{category.name}</h3>
                  <p className="text-[11px] text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`flex items-center gap-1.5 ${skill.isPrimary ? 'text-white font-bold' : 'text-gray-300'}`}>
                        {skill.isPrimary && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />}
                        {skill.name}
                      </span>
                      <span className="text-[#00ff87] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/60 overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#00ff87] transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAREER & EDUCATION TIMELINE */}
      <section className="space-y-10">
        <div>
          <span className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Track Record</span>
          <h2 className="text-3xl font-mono font-bold text-white mt-1">Experience & Education</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Work History */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-mono text-sm font-bold text-[#00ff87] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Work Experience
            </h3>

            <div className="relative border-l-2 border-[#00ff87]/30 ml-3 pl-6 space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#060907] border-2 border-[#00ff87] group-hover:bg-[#00ff87] transition-colors" />

                  <div className="glass-panel p-6 rounded-2xl border border-[#00ff87]/20 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-mono text-lg font-bold text-white">{exp.role}</h4>
                        <p className="font-mono text-xs text-[#00ff87]">{exp.company} • {exp.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-[11px] font-mono rounded-full bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/30">
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase rounded-full bg-white/5 text-gray-400">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{exp.description}</p>

                    {/* Key Achievements */}
                    <div className="space-y-1.5 pt-1">
                      <span className="font-mono text-[10px] font-bold text-[#00ff87] uppercase">Key Highlights</span>
                      <ul className="space-y-1 text-xs text-gray-300">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#00ff87]/10 text-[#00ff87]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certification Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-mono text-sm font-bold text-[#00ff87] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="glass-panel p-6 rounded-2xl border border-[#00ff87]/20 space-y-3">
                  <span className="font-mono text-[11px] text-[#00ff87]">{edu.period}</span>
                  <h4 className="font-mono text-base font-bold text-white">{edu.degree}</h4>
                  <p className="font-mono text-xs text-gray-400">{edu.institution}</p>
                  <p className="text-xs text-gray-300 leading-relaxed pt-1">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Philosophy Card */}
            <div className="glass-panel p-6 rounded-2xl border border-[#00ff87]/30 space-y-3 bg-[#0a1610]/80">
              <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00ff87]" /> Engineering Philosophy
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                I believe in simple architecture for complex problems: fast database indexing with PostgreSQL, microsecond Redis caching, containerized Docker isolation, and zero-downtime CI/CD deployments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
