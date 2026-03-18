import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import DonationPanel from './components/DonationPanel';
import UPICard from './components/UPICard';
import Icon from '@/components/ui/AppIcon';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 bg-primary relative overflow-hidden grain-overlay">
        <div className="cta-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="section-badge bg-white/10 text-white border-white/20 mb-4" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            Support Our Cause
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter mb-4">
            Make a Donation
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your contribution directly supports underprivileged children in Chennai through education, healthcare, and community programs.
          </p>
        </div>
      </section>

      {/* Donation Interface */}
      <section className="py-16 md:py-20 bg-primary-light">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Donation Panel */}
            <div className="lg:col-span-7">
              <DonationPanel />
            </div>
            {/* Right: UPI Card */}
            <div className="lg:col-span-5">
              <UPICard />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ShieldCheckIcon',
                title: '100% Secure',
                description: 'All transactions are encrypted and processed securely through trusted payment gateways.',
              },
              {
                icon: 'DocumentTextIcon',
                title: 'Transparent Fund Use',
                description: 'Every donation is tracked and reported. Annual financial reports are publicly available.',
              },
              {
                icon: 'BoltIcon',
                title: 'Instant Acknowledgement',
                description: 'Receive immediate confirmation via email and WhatsApp upon successful donation.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-primary-light border border-border">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <Icon name={item.icon as "ShieldCheckIcon"} size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">{item.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}