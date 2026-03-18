'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 nav-load loaded transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2 group">
          <div className="bg-white rounded-lg p-1">
            <AppLogo size={48} src="/assets/images/dharmam_logo-1773644296566.png" onClick={() => {}} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                pathname === link?.href
                  ? scrolled
                    ? 'text-primary' :'text-white'
                  : scrolled
                  ? 'text-foreground/70 hover:text-primary'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/volunteer-application"
            className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-all ${
              scrolled
                ? 'border-primary text-primary hover:bg-primary hover:text-white' :'border-white/60 text-white hover:bg-white/10'
            }`}
          >
            Volunteer
          </Link>
          <Link
            href="/donate"
            className="text-sm font-bold px-5 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-all shadow-accent"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === link?.href
                    ? 'bg-primary-light text-primary' :'text-foreground hover:bg-primary-light hover:text-primary'
                }`}
              >
                {link?.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <Link
                href="/volunteer-application"
                className="flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="flex-1 text-center text-sm font-bold px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}