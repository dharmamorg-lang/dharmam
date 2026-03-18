'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 150);
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <div className="md:col-span-5 reveal">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] relative">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1e22698f9-1773118155938.png"
                  alt="Children learning together in a classroom supported by Dharmam Charitable Trust"
                  fill
                  className="object-cover img-hover-color" />
                
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-primary p-4 border border-border float-anim">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Icon name="StarIcon" size={20} className="text-accent" variant="solid" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-primary text-lg">Est. 2019</div>
                    <div className="text-foreground-muted text-xs">Chennai, India</div>
                  </div>
                </div>
              </div>
              {/* Accent block */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-primary-light -z-10" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-7">
            <div className="reveal">
              <span className="section-badge mb-4">About DHARMAM</span>
            </div>
            <h2 className="reveal font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight mb-6">
              A Trust Built on{' '}
              <span className="text-primary">Compassion</span>{' '}
              and Purpose
            </h2>
            <p className="reveal text-foreground-muted text-lg leading-relaxed mb-6">
              Founded in 2019 by S. Kathiravan in Chennai, DHARMAM Charitable Trust was born from a simple belief: every child deserves access to quality education regardless of their economic background.
            </p>
            <p className="reveal text-foreground-muted leading-relaxed mb-8">
              We work directly with underprivileged communities across Chennai, providing educational support, health awareness, mentoring, and life skills training to help children build brighter futures.
            </p>

            {/* Mission / Vision */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
              {
                icon: 'EyeIcon',
                title: 'Our Vision',
                text: 'A society where every child has equal opportunity to learn, grow, and thrive.'
              },
              {
                icon: 'RocketLaunchIcon',
                title: 'Our Mission',
                text: 'Empower underprivileged children through education, healthcare, and community programs.'
              }].
              map((item) =>
              <div key={item.title} className="bg-primary-light rounded-2xl p-5 border border-border">
                  <Icon name={item.icon as "EyeIcon"} size={22} className="text-primary mb-2" />
                  <h3 className="font-display font-bold text-foreground text-base mb-1">{item.title}</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{item.text}</p>
                </div>
              )}
            </div>

            <div className="reveal flex flex-col sm:flex-row gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all group">
                
                Learn More About Us
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all">
                
                View Our Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}