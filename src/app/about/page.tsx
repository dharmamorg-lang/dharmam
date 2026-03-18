import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AboutContent from './components/AboutContent';
import FounderSection from './components/FounderSection';
import MissionVision from './components/MissionVision';
import Timeline from './components/Timeline';

export default function AboutPage() {
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
              Our Story
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-4">
              About DHARMAM
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              A charitable trust founded with the conviction that education is the most powerful tool to break the cycle of poverty.
            </p>
          </div>
        </div>
      </section>

      <AboutContent />
      <MissionVision />
      <Timeline />
      <FounderSection />

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}