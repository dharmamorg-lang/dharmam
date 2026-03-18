'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { icon: 'AcademicCapIcon', value: 2400, suffix: '+', label: 'Students Supported', description: 'Children received educational support' },
  { icon: 'BookOpenIcon', value: 12, suffix: '', label: 'Education Programs', description: 'Active learning initiatives running' },
  { icon: 'HeartIcon', value: 48, suffix: '', label: 'Health Camps', description: 'Free medical camps conducted' },
  { icon: 'UserGroupIcon', value: 30, suffix: '+', label: 'Community Initiatives', description: 'Grassroots development programs' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl text-primary tracking-tighter">
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function ImpactSection() {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-primary-light border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 reveal">
          <span className="section-badge mb-3">Our Impact</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-tight">
            Changing Lives, One Child at a Time
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal bento-card text-center group`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-light mx-auto mb-4 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Icon
                  name={stat.icon as "AcademicCapIcon"}
                  size={24}
                  className="text-primary group-hover:text-white transition-colors"
                />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="font-semibold text-foreground text-sm mt-1">{stat.label}</div>
              <div className="text-foreground-muted text-xs mt-1 leading-snug">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}