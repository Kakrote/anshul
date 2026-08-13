'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { getPortfolioData } from '../lib/portfolio';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { personal } = getPortfolioData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060907]/85 backdrop-blur-md border-b border-[#00ff87]/15 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 font-mono text-lg font-bold tracking-wider">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#10251a] border border-[#00ff87]/40 text-[#00ff87] group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="text-white group-hover:text-[#00ff87] transition-colors">
              {personal.name.toLowerCase()}
              <span className="text-[#00ff87]">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0d1712]/80 border border-[#00ff87]/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/30 shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00ff87] rounded-full shadow-[0_0_8px_#00ff87]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Status & Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-[#10251a]/60 border border-[#00ff87]/20 text-[#00ff87]">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
              <span>Available</span>
            </div>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-black bg-[#00ff87] hover:bg-[#60efff] rounded-lg transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] hover:shadow-[0_0_20px_rgba(96,239,255,0.5)] active:scale-95"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0d1712] border border-[#00ff87]/30 text-[#00ff87] hover:bg-[#00ff87]/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#00ff87]/20 bg-[#060907]/95 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-mono flex items-center justify-between ${
                    isActive
                      ? 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg bg-[#10251a]/80 border border-[#00ff87]/30 text-[#00ff87]">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
              <span>{personal.availabilityStatus}</span>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-mono font-semibold text-black bg-[#00ff87] rounded-lg shadow-[0_0_15px_rgba(0,255,135,0.4)]"
            >
              GET IN TOUCH →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
