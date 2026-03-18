import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
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
              Get In Touch
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Have questions about our programs, want to donate, or ready to volunteer? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F5F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            Our Location
          </h2>
          <div className="rounded-3xl overflow-hidden border border-border shadow-card h-[380px] bg-primary-light flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1F5F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p className="font-display font-bold text-primary text-xl mb-1">DHARMAM CHARITABLE TRUST</p>
              <p className="text-foreground-muted text-sm">1, Lakshmi Nagar, Perumal Kovil Main Road</p>
              <p className="text-foreground-muted text-sm">Puthagaram, Chennai – 600099</p>
              <a
                href="https://maps.app.goo.gl/yu2CUiHYLdLNKQcQ8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all text-sm"
              >
                Open in Google Maps
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}