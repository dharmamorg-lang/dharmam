'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ContactInfo() {
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-5">
      {/* Organization Card */}
      <div className="reveal bg-white rounded-3xl p-6 border border-border shadow-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
            <Icon name="BuildingOfficeIcon" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground leading-tight">DHARMAM CHARITABLE TRUST</h2>
            <span className="text-xs text-foreground-muted font-medium">Established 2019 · Chennai</span>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: 'MapPinIcon',
              label: 'Address',
              content: '1, Lakshmi Nagar, Perumal Kovil Main Road, Puthagaram, Chennai – 600099',
              href: 'https://maps.google.com/?q=Puthagaram+Chennai+600099',
              isLink: true,
            },
            {
              icon: 'PhoneIcon',
              label: 'Phone',
              content: '044 31551490',
              href: 'tel:044 31551490',
              isLink: true,
            },
            {
              icon: 'EnvelopeIcon',
              label: 'Email',
              content: 'info@dharmam.org',
              href: 'mailto:info@dharmam.org',
              isLink: true,
            },
            {
              icon: 'GlobeAltIcon',
              label: 'Website',
              content: 'www.dharmam.org',
              href: 'https://www.dharmam.org',
              isLink: true,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={item.icon as "MapPinIcon"} size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-foreground-muted font-medium mb-0.5">{item.label}</div>
                {item.isLink ? (
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors leading-relaxed"
                  >
                    {item.content}
                  </a>
                ) : (
                  <div className="text-sm font-semibold text-foreground leading-relaxed">{item.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Card */}
      <div className="reveal bg-white rounded-3xl p-6 border border-border shadow-card">
        <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
          <Icon name="UserCircleIcon" size={20} className="text-primary" />
          Founder
        </h3>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 font-display font-bold text-primary text-xl">
            SK
          </div>
          <div>
            <div className="font-display font-bold text-foreground text-base">S. KATHIRAVAN</div>
            <div className="text-foreground-muted text-sm mb-1">MA. LLB.</div>
            <div className="text-xs text-accent font-semibold">Founder & Managing Trustee</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="reveal grid grid-cols-1 gap-3">
        <a
          href="https://wa.me/919176917626?text=Hello%20Dharmam%20Charitable%20Trust"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100 hover:border-green-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-green-800 text-sm">Chat on WhatsApp</div>
            <div className="text-green-600 text-xs">Quick response guaranteed</div>
          </div>
          <Icon name="ArrowRightIcon" size={16} className="text-green-400 ml-auto group-hover:translate-x-1 transition-transform" />
        </a>

        <Link
          href="/donate"
          className="flex items-center gap-3 p-4 rounded-2xl bg-accent/5 border border-accent/20 hover:border-accent transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <Icon name="HeartIcon" size={20} className="text-white" variant="solid" />
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm">Make a Donation</div>
            <div className="text-foreground-muted text-xs">Support our programs directly</div>
          </div>
          <Icon name="ArrowRightIcon" size={16} className="text-accent ml-auto group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}