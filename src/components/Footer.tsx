import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg p-1.5 inline-flex">
                <AppLogo size={56} src="/assets/images/dharmam_logo-1773644296566.png" />
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-2 max-w-xs">
              Empowering Through Education
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Supporting underprivileged children in Chennai through education, healthcare, and community development since 2019.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: 'GlobeAltIcon', label: 'Website', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
                >
                  <Icon name={s.icon as "GlobeAltIcon"} size={16} />
                </a>
              ))}
              <a
                href="https://wa.me/919176917626"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/homepage' },
                { label: 'About Us', href: '/about' },
                { label: 'Programs', href: '/programs' },
                { label: 'Donate', href: '/donate' },
                { label: 'Volunteer', href: '/volunteer-application' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Our Programs</h4>
            <ul className="space-y-2.5">
              {[
                'Educational Support',
                'After-School Coaching',
                'Student Mentorship',
                'Health Awareness Camps',
                'Life Skills Training',
                'Community Development',
              ].map((p) => (
                <li key={p}>
                  <Link
                    href="/programs"
                    className="text-sm text-white/65 hover:text-white transition-colors font-medium"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Icon name="MapPinIcon" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/65 leading-relaxed">
                  1, Lakshmi Nagar, Perumal Kovil Main Road, Puthagaram, Chennai – 600099
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="PhoneIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+919176917626" className="text-sm text-white/65 hover:text-white transition-colors">
                  +91 9176 9176 26
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="EnvelopeIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@dharmam.org" className="text-sm text-white/65 hover:text-white transition-colors">
                  info@dharmam.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="GlobeAltIcon" size={16} className="text-accent flex-shrink-0" />
                <a href="https://www.dharmam.org" className="text-sm text-white/65 hover:text-white transition-colors">
                  www.dharmam.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 DHARMAM CHARITABLE TRUST. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}