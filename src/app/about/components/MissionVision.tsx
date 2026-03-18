'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const pillars = [
  {
    icon: 'EyeIcon',
    title: 'Our Vision',
    description: 'A society where every child, regardless of economic background, has equal access to quality education, healthcare, and opportunities to thrive.',
    color: 'border-t-primary',
  },
  {
    icon: 'RocketLaunchIcon',
    title: 'Our Mission',
    description: 'To empower underprivileged children and communities in Chennai through holistic programs in education, healthcare, mentorship, and life skills development.',
    color: 'border-t-accent',
  },
  {
    icon: 'StarIcon',
    title: 'Our Values',
    description: 'Compassion, Transparency, Integrity, Community-First, Sustainable Impact. We believe in righteous duty (Dharmam) toward every individual we serve.',
    color: 'border-t-green-500',
  },
];

const objectives = [
  'Provide free educational materials and support to underprivileged students',
  'Run after-school coaching and academic support programs',
  'Conduct free health camps and medical assistance programs',
  'Offer career guidance and mentorship to first-generation learners',
  'Develop life skills and counseling programs for holistic growth',
  'Build community development initiatives addressing root causes of poverty',
  'Engage volunteers meaningfully in structured social impact programs',
  'Support employment and vocational training for youth',
];

export default function MissionVision() {
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
    <section ref={sectionRef} className="py-20 bg-stone-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 reveal">
          <span className="section-badge mb-3">Foundation</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            Mission, Vision & Objectives
          </h2>
        </div>

        {/* MVV Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`reveal bento-card border-t-4 ${pillar.color}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
                <Icon name={pillar.icon as "EyeIcon"} size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{pillar.title}</h3>
              <p className="text-foreground-muted leading-relaxed text-sm">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Objectives */}
        <div className="reveal bg-white rounded-3xl p-8 border border-border shadow-card">
          <h3 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-2">
            <Icon name="ClipboardDocumentListIcon" size={24} className="text-primary" />
            Our Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="CheckIcon" size={14} className="text-accent" />
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}