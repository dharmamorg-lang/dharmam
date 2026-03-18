'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-primary-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 reveal">
          <span className="section-badge mb-3">Leadership</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            Meet the Founder
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="reveal bg-white rounded-3xl shadow-card border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Image */}
              <div className="md:col-span-4 relative min-h-[300px] md:min-h-full bg-primary">
                <AppImage
                  src="/assets/images/kathiravan-1773643712860.png"
                  alt="S. Kathiravan, Founder and Managing Trustee of Dharmam Charitable Trust, Chennai"
                  fill
                  className="object-cover object-top opacity-80" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display font-bold text-white text-lg">S. KATHIRAVAN</div>
                  <div className="text-white/70 text-sm">MA. LLB.</div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-8 p-8 md:p-10">
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Founder & Managing Trustee</span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-4">
                  S. Kathiravan, MA. LLB.
                </h3>
                <div className="accent-line mb-5" />
                <p className="text-foreground-muted leading-relaxed mb-6 text-base">
                  With a background in law (LLB) and arts (MA), S. Kathiravan founded DHARMAM Charitable Trust in 2019 driven by a deep commitment to social justice and education equity. His legal expertise ensures the trust operates with full transparency and compliance, while his community roots in Chennai keep the organization grounded in genuine need.
                </p>
                <p className="text-foreground-muted leading-relaxed mb-8 text-sm">
                  "Dharmam means righteous duty. Every one of us has a duty toward those who are less fortunate. Education is not a privilege — it is a right. Our mission is to make that right a reality for every child in Chennai."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+919176917626"
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary-light border border-border hover:border-primary transition-colors group">
                    
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="PhoneIcon" size={16} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted">Phone</div>
                      <div className="text-sm font-semibold text-foreground">+91 9176 9176 26</div>
                    </div>
                  </a>
                  <a
                    href="mailto:info@dharmam.org"
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary-light border border-border hover:border-primary transition-colors group">
                    
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="EnvelopeIcon" size={16} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted">Email</div>
                      <div className="text-sm font-semibold text-foreground">founder@dharmam.org</div>
                    </div>
                  </a>
                  <a
                    href="https://www.dharmam.org"
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary-light border border-border hover:border-primary transition-colors group">
                    
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="GlobeAltIcon" size={16} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted">Website</div>
                      <div className="text-sm font-semibold text-foreground">www.dharmam.org</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-light border border-border">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="MapPinIcon" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted">Location</div>
                      <div className="text-sm font-semibold text-foreground">Puthagaram, Chennai – 600099</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}