'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function DonateCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-primary overflow-hidden relative grain-overlay">
      <div className="cta-glow" />

      {/* Floating decorative */}
      <div className="absolute top-10 left-10 opacity-10 float-anim hidden lg:block" style={{ animationDelay: '0s' }}>
        <Icon name="AcademicCapIcon" size={80} className="text-white" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 float-anim hidden lg:block" style={{ animationDelay: '2s' }}>
        <Icon name="HeartIcon" size={64} className="text-accent" />
      </div>
      <div className="absolute top-20 right-20 opacity-10 float-anim hidden lg:block" style={{ animationDelay: '1s' }}>
        <Icon name="StarIcon" size={48} className="text-white" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-white/60">Make a Difference Today</span>
          </div>
        </div>

        <h2 className="reveal font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-6">
          Your Gift Can Change{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
            a Child's Future
          </span>
        </h2>

        <p className="reveal text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          ₹500 provides school supplies for one child. ₹2,500 sponsors a month of coaching. ₹10,000 funds a health camp. Every rupee reaches those who need it most.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-accent text-lg group"
          >
            <Icon name="HeartIcon" size={20} variant="solid" />
            Donate Now
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/volunteer-application"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
          >
            <Icon name="UserGroupIcon" size={20} />
            Volunteer With Us
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-white/10 pt-8">
          {[
            { icon: 'ShieldCheckIcon', label: '100% Secure' },
            { icon: 'DocumentCheckIcon', label: 'Transparent Fund Use' },
            { icon: 'BoltIcon', label: 'Instant Acknowledgement' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/60">
              <Icon name={item.icon as "ShieldCheckIcon"} size={18} className="text-accent" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}