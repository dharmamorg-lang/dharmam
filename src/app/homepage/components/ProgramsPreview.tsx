'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const programs = [
  {
    icon: 'AcademicCapIcon',
    title: 'Educational Support',
    description: 'Providing books, stationery, and academic resources to children who cannot afford them.',
    color: 'bg-blue-50 text-blue-600',
    span: 'md:col-span-2',
  },
  {
    icon: 'ClockIcon',
    title: 'After-School Coaching',
    description: 'Evening coaching sessions to help students catch up and excel academically.',
    color: 'bg-orange-50 text-orange-600',
    span: 'md:col-span-1',
  },
  {
    icon: 'HeartIcon',
    title: 'Health Awareness Camps',
    description: 'Free medical checkups, nutrition guidance, and health education for families.',
    color: 'bg-red-50 text-red-500',
    span: 'md:col-span-1',
  },
  {
    icon: 'UserGroupIcon',
    title: 'Student Mentorship',
    description: 'One-on-one career guidance connecting students with professionals and role models.',
    color: 'bg-green-50 text-green-600',
    span: 'md:col-span-1',
  },
  {
    icon: 'LightBulbIcon',
    title: 'Life Skills Training',
    description: 'Workshops on communication, critical thinking, financial literacy, and personal growth.',
    color: 'bg-purple-50 text-purple-600',
    span: 'md:col-span-1',
  },
];

export default function ProgramsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 100);
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-stone-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="reveal">
              <span className="section-badge mb-3">What We Do</span>
            </div>
            <h2 className="reveal font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight">
              Programs That{' '}
              <span className="text-primary">Transform</span> Lives
            </h2>
          </div>
          <Link
            href="/programs"
            className="reveal inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary rounded-full px-6 py-2.5 hover:bg-primary hover:text-white transition-all"
          >
            View All Programs
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`reveal bento-card ${program.span} group`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl ${program.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <Icon name={program.icon as "AcademicCapIcon"} size={24} />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                {program.description}
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0"
              >
                Learn More
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}