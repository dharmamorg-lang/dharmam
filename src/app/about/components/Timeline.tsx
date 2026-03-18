'use client';
import React, { useEffect, useRef } from 'react';

const milestones = [
  { year: '2019', title: 'Trust Established', description: 'DHARMAM Charitable Trust registered in Chennai. First educational support program launched serving 50 students.' },
  { year: '2020', title: 'Community Expansion', description: 'Expanded to 3 communities. Launched health awareness camps during the pandemic, reaching 500+ families.' },
  { year: '2021', title: 'After-School Programs', description: 'Formal after-school coaching centers established. 200 students enrolled. Volunteer network grew to 50 members.' },
  { year: '2022', title: 'Mentorship Launch', description: 'Student Mentorship Program launched with 30 professional mentors. First batch of 60 students received career guidance.' },
  { year: '2023', title: 'Healthcare Initiative', description: '20 medical camps conducted. Employment Support Initiative launched. Volunteer base surpassed 100 members.' },
  { year: '2024', title: 'Scaling Impact', description: '2,400+ students supported. 48 health camps. 9 active programs. 180+ volunteers. Recognized by local government.' },
];

export default function Timeline() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 reveal">
          <span className="section-badge mb-3">Our Journey</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            Six Years of Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones?.map((m, i) => (
            <div
              key={m?.year}
              className="reveal bento-card relative overflow-hidden group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-light group-hover:bg-accent transition-colors" />
              <div className="pl-4">
                <div className="font-display font-bold text-4xl text-primary/20 tracking-tighter mb-2">{m?.year}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {m?.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{m?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}