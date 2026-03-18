'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const programs = [
  {
    id: 1,
    category: 'Education',
    icon: 'AcademicCapIcon',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    title: 'Educational Support Programs',
    problem: 'Thousands of children in Chennai lack access to basic educational materials — textbooks, stationery, uniforms — due to financial hardship.',
    how: 'DHARMAM provides free school supplies, uniforms, and educational materials to enrolled students. We partner with local schools to identify children in need and ensure they have everything required to attend and participate fully.',
    impact: '600+ children received educational materials in the last academic year, reducing dropout rates by 35% in partner schools.',
    tag: 'Core Program',
  },
  {
    id: 2,
    category: 'Education',
    icon: 'ClockIcon',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    title: 'After-School Coaching & Mentoring',
    problem: 'Children from low-income families often struggle academically due to lack of a quiet study environment and parental support with homework.',
    how: 'Our trained volunteers conduct daily after-school coaching sessions (5–8 PM) at community centers, covering core subjects like Mathematics, Science, and English for grades 5–10.',
    impact: '85% of coached students showed measurable improvement in school grades within one semester.',
    tag: 'Active',
  },
  {
    id: 3,
    category: 'Mentorship',
    icon: 'UserGroupIcon',
    color: 'bg-green-50 text-green-600 border-green-100',
    title: 'Student Mentorship & Career Guidance',
    problem: 'First-generation learners have no role models or guidance for career planning, higher education, and skill development.',
    how: 'We connect students with volunteer mentors from professional backgrounds — engineers, doctors, teachers, entrepreneurs — for one-on-one guidance sessions, career workshops, and college application support.',
    impact: '120 students received career counseling; 42 secured college admissions with scholarship support.',
    tag: 'Active',
  },
  {
    id: 4,
    category: 'Healthcare',
    icon: 'HeartIcon',
    color: 'bg-red-50 text-red-500 border-red-100',
    title: 'Health Awareness & Medical Camps',
    problem: 'Underprivileged families lack access to preventive healthcare. Many children suffer from undiagnosed conditions due to cost barriers.',
    how: 'DHARMAM organizes free medical camps with volunteer doctors providing checkups, vaccinations, dental care, and nutrition counseling. We also conduct health awareness sessions in schools and communities.',
    impact: '48 camps conducted; 3,200+ individuals received free medical consultations in 2024–25.',
    tag: 'Ongoing',
  },
  {
    id: 5,
    category: 'Healthcare',
    icon: 'ShieldCheckIcon',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    title: 'Medical Assistance for Underprivileged Children',
    problem: 'Critical illnesses requiring specialist care or surgery are financially devastating for low-income families, often leading to delayed or no treatment.',
    how: 'We identify children requiring medical intervention, connect families with government schemes, facilitate hospital admissions, and provide direct financial assistance for treatment costs when needed.',
    impact: '28 children received specialized medical assistance, including 6 surgical procedures fully funded by DHARMAM.',
    tag: 'Emergency Support',
  },
  {
    id: 6,
    category: 'Life Skills',
    icon: 'LightBulbIcon',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    title: 'Life Skills & Counseling Programs',
    problem: 'Children from difficult backgrounds often struggle with self-esteem, emotional regulation, and basic life competencies that affect their development.',
    how: 'Weekend workshops covering communication skills, financial literacy, conflict resolution, digital literacy, and mental wellness. Individual counseling is available through our network of trained counselors.',
    impact: 'Over 400 students completed life skills modules; 92% reported increased confidence and communication ability.',
    tag: 'Active',
  },
  {
    id: 7,
    category: 'Community',
    icon: 'BuildingOfficeIcon',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    title: 'Community Development Programs',
    problem: 'Entire communities in urban slums lack basic infrastructure, sanitation awareness, and access to government welfare programs.',
    how: 'We conduct community surveys, awareness drives, and connect residents with government schemes for housing, sanitation, and social welfare. Community meetings are held monthly to address local issues.',
    impact: 'Supported 15 communities; helped 200+ families access government welfare programs they were previously unaware of.',
    tag: 'Ongoing',
  },
  {
    id: 8,
    category: 'Volunteering',
    icon: 'HandRaisedIcon',
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    title: 'Volunteer Engagement Programs',
    problem: 'Many compassionate individuals want to contribute to social causes but lack structured opportunities to do so meaningfully.',
    how: 'DHARMAM provides a structured volunteering framework with training, role assignments, shift scheduling, and impact tracking. Volunteers can contribute in teaching, healthcare, administration, fundraising, or events.',
    impact: '180+ active volunteers across Chennai; over 12,000 volunteer hours contributed in 2024–25.',
    tag: 'Open for Enrollment',
  },
  {
    id: 9,
    category: 'Employment',
    icon: 'BriefcaseIcon',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    title: 'Employment Support Initiative',
    problem: 'Youth from underprivileged backgrounds face barriers to employment due to lack of skills, networks, and professional presentation.',
    how: 'We provide resume writing assistance, interview preparation, digital skills training, and job placement support. We partner with local businesses to create internship and entry-level job opportunities.',
    impact: '65 young adults placed in employment or internships within 3 months of program completion.',
    tag: 'New Initiative',
  },
];

export default function ProgramsList() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-8">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className="reveal program-card group"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon & Category */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${program.color} border flex items-center justify-center`}>
                      <Icon name={program.icon as "AcademicCapIcon"} size={28} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">{program.category}</span>
                      <span className="px-2 py-0.5 bg-primary-light text-primary text-xs font-semibold rounded-full">{program.tag}</span>
                    </div>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {program.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                      <div className="bg-primary-light rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Icon name="ExclamationTriangleIcon" size={14} className="text-accent" />
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">The Problem</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{program.problem}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Icon name="CheckCircleIcon" size={14} className="text-green-600" />
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">How We Help</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{program.how}</p>
                      </div>
                      <div className="bg-accent/5 rounded-xl p-4 border border-accent/15">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Icon name="ChartBarIcon" size={14} className="text-accent" />
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Our Impact</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed font-medium">{program.impact}</p>
                      </div>
                    </div>

                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all text-sm group/btn"
                    >
                      <Icon name="HeartIcon" size={16} variant="solid" />
                      Support This Program
                      <Icon name="ArrowRightIcon" size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}