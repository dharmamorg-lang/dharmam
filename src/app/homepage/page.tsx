import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HeroSection from './components/HeroSection';
import AboutPreview from './components/AboutPreview';
import ProgramsPreview from './components/ProgramsPreview';
import ImpactSection from './components/ImpactSection';
import GalleryPreview from './components/GalleryPreview';
import DonateCTA from './components/DonateCTA';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ImpactSection />
      <AboutPreview />
      <ProgramsPreview />
      <GalleryPreview />
      <DonateCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}