'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const slides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d96f2a8c-1772755746983.png",
  alt: 'Children studying in a bright classroom with notebooks and books'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_12bc316de-1765646270865.png",
  alt: 'Volunteers teaching underprivileged children in an outdoor setting'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_166aaeb81-1766950136073.png",
  alt: 'Community health camp with medical staff helping children and families'
}];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setTitleRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) =>
        <div
          key={i}
          className={`carousel-slide ${i === currentSlide ? 'active' : ''}`}>
          
            <AppImage
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
          
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 hero-gradient" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/30 via-transparent to-primary/60" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full pt-24 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[calc(100vh-8rem)]">
            {/* Left: Hero Text */}
            <div className="md:col-span-8 flex flex-col justify-center">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                titleRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
                }
                style={{ transitionDelay: '0.1s' }}>
                
                <span className="px-3 py-1.5 border border-white/30 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 backdrop-blur-sm bg-white/5">
                  Est. 2019 · Chennai, India
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`font-display font-bold text-white leading-none tracking-tighter mb-6 ${titleRevealed ? 'reveal-active' : ''}`}>
                
                <span className="text-reveal-wrapper block">
                  <span className="text-reveal-content text-5xl md:text-7xl" style={{ transitionDelay: '0.2s' }}>
                    Empowering Lives
                  </span>
                </span>
                <span className="text-reveal-wrapper block">
                  <span className="text-reveal-content text-5xl md:text-7xl" style={{ transitionDelay: '0.35s' }}>
                    Through{' '}
                    <span className="text-accent">Education</span>
                  </span>
                </span>
              </h1>

              {/* Subtext */}
              <p
                className={`text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-8 transition-all duration-700 ${
                titleRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
                }
                style={{ transitionDelay: '0.6s' }}>
                
                DHARMAM Charitable Trust supports underprivileged children through education, mentoring, healthcare support and community development programs.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 ${
                titleRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
                }
                style={{ transitionDelay: '0.75s' }}>
                
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-accent text-base group">
                  
                  <Icon name="HeartIcon" size={18} variant="solid" />
                  Donate Now
                  <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/volunteer-application"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all text-base">
                  
                  <Icon name="UserGroupIcon" size={18} />
                  Become a Volunteer
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 mt-10">
                {slides.map((_, i) =>
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? 'w-8 bg-accent' : 'w-4 bg-white/30'}`
                  }
                  aria-label={`Slide ${i + 1}`} />

                )}
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3">
              {[
              { icon: 'AcademicCapIcon', value: '2,400+', label: 'Students Supported', delay: '0.5s' },
              { icon: 'BookOpenIcon', value: '12', label: 'Education Programs', delay: '0.65s' },
              { icon: 'HeartIcon', value: '48', label: 'Health Camps', delay: '0.8s' },
              { icon: 'UserGroupIcon', value: '30+', label: 'Community Initiatives', delay: '0.95s' }].
              map((stat) =>
              <div
                key={stat.label}
                className={`stat-card group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5 flex md:flex-row items-center gap-3 transition-all duration-700 ${
                titleRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`
                }
                style={{ transitionDelay: stat.delay }}>
                
                  <div className="w-10 h-10 rounded-xl bg-accent/20 group-hover:bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={stat.icon as "AcademicCapIcon"} size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-white group-hover:text-gray-900 font-display font-bold text-xl md:text-2xl tracking-tight leading-none transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-white/60 group-hover:text-gray-600 text-xs font-medium mt-0.5 leading-tight transition-colors duration-300">{stat.label}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <div className="scroll-indicator">
          <Icon name="ChevronDownIcon" size={20} className="text-white/50" />
        </div>
      </div>
    </section>);

}