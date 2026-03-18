import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import VolunteerForm from './components/VolunteerForm';

export default function VolunteerApplicationPage() {
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
              Join Our Team
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-4">
              Volunteer Application
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Join 180+ volunteers making a real difference in the lives of underprivileged children in Chennai. Complete the form below to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20 bg-primary-light">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <VolunteerForm />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}