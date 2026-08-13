'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices
    if (window.innerWidth < 1024) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, borderColor: '#00ff87', backgroundColor: 'rgba(0, 255, 135, 0.1)', duration: 0.2 });
      gsap.to(dot, { scale: 0.5, backgroundColor: '#00f0ff', duration: 0.2 });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 255, 135, 0.5)', backgroundColor: 'transparent', duration: 0.2 });
      gsap.to(dot, { scale: 1, backgroundColor: '#00ff87', duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00ff87] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00ff87]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-[#00ff87]/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
      />
    </div>
  );
}
