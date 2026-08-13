'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Mail, ArrowUpRight, Code, ShieldCheck } from 'lucide-react';
import { getPortfolioData } from '../lib/portfolio';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export default function Footer() {
  const { personal, contact } = getPortfolioData();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <GithubIcon className="w-4 h-4" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon className="w-4 h-4" />;
    return <Mail className="w-4 h-4" />;
  };

  return (
    <footer className="relative bg-[#040605] border-t border-[#00ff87]/15 pt-16 pb-12 overflow-hidden neo-grid-bg">
      {/* Glow background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00ff87]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800/80">
          {/* Col 1: Bio & Copy Email */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="font-mono text-xl font-bold tracking-wider text-white">
              {personal.name.toLowerCase()}<span className="text-[#00ff87]">.dev</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              {personal.tagline} Single source of truth driven portfolio powered by Next.js, GSAP & Tailored JSON architecture.
            </p>

            {/* Quick Copy Email Box */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 p-1.5 pl-4 rounded-xl bg-[#0d1712] border border-[#00ff87]/25 shadow-sm max-w-full">
                <span className="font-mono text-xs text-gray-300 truncate">{personal.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00ff87]/15 hover:bg-[#00ff87] text-[#00ff87] hover:text-black font-mono text-xs font-semibold transition-all"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 font-mono text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#00ff87] transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00ff87] transition-colors flex items-center gap-1 group">
                  <span>About & Experience</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#00ff87] transition-colors flex items-center gap-1 group">
                  <span>Work & Showcase</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00ff87] transition-colors flex items-center gap-1 group">
                  <span>Contact & Inquiry</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Availability & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-widest">Availability & Connect</h4>
            <div className="p-3.5 rounded-xl bg-[#0a140f] border border-[#00ff87]/20 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00ff87] shrink-0" />
              <div className="text-xs">
                <p className="text-white font-semibold">{personal.availabilityStatus}</p>
                <p className="text-gray-400">Response time: {contact.responseTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {personal.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0d1712] border border-[#00ff87]/20 text-gray-300 hover:text-[#00ff87] hover:border-[#00ff87]/60 hover:bg-[#00ff87]/10 flex items-center justify-center transition-all"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Code className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>Configurable via <code className="text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded">data/portfolio.json</code></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
