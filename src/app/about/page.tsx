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
      <section className="pt-24 pb-0 bg-primary relative overflow-hidden grain-overlay">
        <div className="cta-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-14">
          <div className="max-w-3xl">
            <span
              className="section-badge mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              
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
        {/* Indian context image strip */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-3 -mb-8">
            <div className="rounded-t-2xl overflow-hidden aspect-video">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1916dcba0-1773643246498.png"
                alt="Indian children in a classroom learning with Dharmam Charitable Trust support in Chennai"
                className="w-full h-full object-cover" />
              
            </div>
            <div className="rounded-t-2xl overflow-hidden aspect-video">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_177c038e2-1765055292564.png"
                alt="Indian teacher conducting a lesson for underprivileged students in Tamil Nadu"
                className="w-full h-full object-cover" />
              
            </div>
            <div className="rounded-t-2xl overflow-hidden aspect-video">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1627ed242-1772702762732.png"
                alt="Indian students smiling and engaged in learning activities at a Dharmam Trust event"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </div>
      </section>

      <AboutContent />
      <MissionVision />
      <Timeline />
      <FounderSection />

      <Footer />
      <WhatsAppFloat />
    </main>);

}