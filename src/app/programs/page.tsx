import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProgramsList from './components/ProgramsList';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-14 bg-primary relative overflow-hidden grain-overlay">
        <div className="cta-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span
              className="section-badge mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              What We Do
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-4">
              Our Programs &amp; Services
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Nine focused initiatives addressing education, health, mentorship, and community development for underprivileged children and families in Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <ProgramsList />

      {/* CTA */}
      <section className="py-16 bg-primary-light border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <Icon name="HeartIcon" size={40} className="text-accent mx-auto mb-4" variant="solid" />
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
            Support a Program
          </h2>
          <p className="text-foreground-muted mb-6 leading-relaxed">
            Every program runs on the generosity of donors and volunteers. Choose a program to support or make a general donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-accent"
            >
              <Icon name="HeartIcon" size={18} variant="solid" />
              Donate Now
            </Link>
            <Link
              href="/volunteer-application"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              <Icon name="UserGroupIcon" size={18} />
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}