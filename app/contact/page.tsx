'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  Globe,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { getPortfolioData } from '../../lib/portfolio';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

  const { personal, contact } = getPortfolioData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || contact.subjectOptions[0] || 'New Project Inquiry',
    budget: '$2,500 - $5,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 neo-grid-bg">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="contact-animate inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1712] border border-[#00ff87]/30 text-[#00ff87] font-mono text-xs">
          <Mail className="w-3.5 h-3.5" />
          <span>START A CONVERSATION</span>
        </div>

        <h1 className="contact-animate text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
          Let&apos;s Build Something <span className="text-gradient-emerald">Remarkable</span>
        </h1>
        <p className="contact-animate text-sm sm:text-base text-gray-300">
          Have a project inquiry, technical challenge, or custom SaaS idea? Send me a message below or email directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Contact Form */}
        <div className="contact-animate lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00ff87]/30 relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-12 space-y-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#00ff87]/20 border-2 border-[#00ff87] text-[#00ff87] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,255,135,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-mono font-bold text-white">Message Transmitted!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-[#00ff87] font-semibold">{formData.name}</span>. I will review your inquiry and reply within {contact.responseTime}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ ...formData, message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#00ff87] text-black font-mono text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#00ff87]" /> Send a Direct Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-white placeholder-gray-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@techcompany.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-white placeholder-gray-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-300">Project Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-white focus:outline-none transition-colors"
                    >
                      {contact.subjectOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#060907] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-300">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-white focus:outline-none transition-colors"
                    >
                      <option value="< $2,500">&lt; $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-gray-300">Project Requirements / Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project goals, timelines, and technical requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[#060907] border border-[#00ff87]/20 focus:border-[#00ff87] text-xs font-mono text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00ff87] hover:bg-[#60efff] text-black font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] active:scale-95"
                >
                  <span>SEND INQUIRY</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Quick Info & FAQs */}
        <div className="contact-animate lg:col-span-5 space-y-6">
          {/* Quick Copy Card */}
          <div className="glass-panel p-6 rounded-3xl border border-[#00ff87]/20 space-y-4">
            <h3 className="font-mono text-sm font-bold text-[#00ff87] uppercase tracking-wider">Direct Channels</h3>

            <div className="p-4 rounded-xl bg-[#09110d] border border-[#00ff87]/20 flex items-center justify-between gap-3">
              <div className="truncate">
                <p className="text-[10px] font-mono text-gray-400">Primary Email</p>
                <p className="font-mono text-xs text-white font-bold truncate">{personal.email}</p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#00ff87]/15 hover:bg-[#00ff87] text-[#00ff87] hover:text-black font-mono text-xs font-bold flex items-center gap-1 transition-all shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#09110d] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>Response</span>
                </div>
                <p className="text-white font-semibold">{contact.responseTime}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#09110d] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Globe className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>Timezone</span>
                </div>
                <p className="text-white font-semibold">{contact.timezone}</p>
              </div>
            </div>
          </div>

          {/* Process FAQs */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#00ff87] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {contact.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl border border-[#00ff87]/15 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-4 py-3 text-left font-mono text-xs font-bold text-white flex items-center justify-between gap-2 hover:text-[#00ff87]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00ff87] transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-3 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 font-mono text-[#00ff87]">Loading Contact Form...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
