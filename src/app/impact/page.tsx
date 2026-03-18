import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

interface ProgramItem {
  title: string;
  description: string;
  points: string[];
}

interface PillarSection {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  pillar: string;
  title: string;
  subtitle: string;
  programs: ProgramItem[];
}

const pillars: PillarSection[] = [
  {
    icon: '🎓',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    pillar: 'Students',
    title: 'Student Support Programs',
    subtitle: 'Empowering every learner to stay in school and thrive',
    programs: [
      {
        title: 'Scholarship Continuity',
        description:
          'We provide renewable scholarships based on student attendance and academic progress to prevent dropouts.',
        points: [],
      },
      {
        title: 'Essential Dignity Kits',
        description:
          'We distribute essential items so children can attend school with confidence and dignity.',
        points: ['School bags', 'Notebooks & stationery', 'Uniforms & footwear'],
      },
      {
        title: 'Bridge Courses',
        description: 'Special coaching programs designed for students who need extra support.',
        points: ['Students who dropped out', 'Slow learners', 'Students rejoining school'],
      },
    ],
  },
  {
    icon: '👩‍🏫',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    pillar: 'Teachers',
    title: 'Teacher Empowerment',
    subtitle: 'Equipping educators with modern skills and resources',
    programs: [
      {
        title: 'Digital Literacy Training',
        description: 'We train teachers to use modern tools for better classroom outcomes.',
        points: ['Smart classrooms', 'E-learning platforms (like DIKSHA)'],
      },
      {
        title: 'Stipend Support',
        description: 'Financial support provided to teachers in underserved areas.',
        points: ['Rural areas', 'Specialized education fields'],
      },
      {
        title: 'Skill Development Workshops',
        description: 'Comprehensive training to help teachers grow professionally.',
        points: ['Classroom management', 'Student tracking systems', 'Modern teaching methods'],
      },
    ],
  },
  {
    icon: '🏫',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    pillar: 'Schools',
    title: 'School Infrastructure Development',
    subtitle: 'Building environments where learning can flourish',
    programs: [
      {
        title: 'Smart Classrooms',
        description: 'We support schools with cutting-edge digital learning infrastructure.',
        points: [
          'Digital learning tools',
          'AI-based learning systems',
          'Regional language content',
        ],
      },
      {
        title: 'Basic Facilities',
        description: 'We improve essential facilities to create safe and inclusive schools.',
        points: [
          'Drinking water facilities',
          'Toilets (especially for girls)',
          'Library infrastructure',
        ],
      },
      {
        title: 'Scholarship Transparency Systems',
        description:
          'We aim to integrate transparent platforms for fair scholarship distribution.',
        points: ['Vidyasaarathi for transparent scholarship distribution'],
      },
    ],
  },
];

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-14 bg-primary relative overflow-hidden grain-overlay">
        <div className="cta-glow" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span
              className="section-badge mb-4"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              CSR &amp; Funding
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-4">
              Our Impact &amp; Initiatives
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Creating sustainable change by strengthening the three pillars of education —
              Students, Teachers, and Schools.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge mb-4">Our Approach</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tighter mb-6">
              An Integrated Approach to Education
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed mb-10">
              Dharmam Charitable Trust focuses on creating sustainable change by strengthening the
              three pillars of education. This integrated approach ensures long-term community
              development and educational success.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {pillars.map((p) => (
              <div
                key={p.pillar}
                className={`rounded-2xl border ${p.borderColor} ${p.bgColor} p-8 text-center`}
              >
                <div className="text-5xl mb-4">{p.icon}</div>
                <h3 className={`font-display font-bold text-2xl ${p.color} mb-2`}>{p.pillar}</h3>
                <p className="text-foreground/60 text-sm">{p.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Sections */}
      {pillars.map((pillar, idx) => (
        <section
          key={pillar.pillar}
          className={`py-16 ${idx % 2 === 1 ? 'bg-surface' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10">
              <div
                className={`w-14 h-14 rounded-2xl ${pillar.bgColor} border ${pillar.borderColor} flex items-center justify-center text-3xl flex-shrink-0`}
              >
                {pillar.icon}
              </div>
              <div>
                <p className={`text-sm font-semibold ${pillar.color} uppercase tracking-widest mb-1`}>
                  Pillar {idx + 1} — {pillar.pillar}
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tighter">
                  {pillar.title}
                </h2>
              </div>
            </div>

            {/* Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillar.programs.map((program) => (
                <div
                  key={program.title}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${pillar.bgColor} border ${pillar.borderColor} mb-4`}
                  >
                    <span className={`text-lg font-bold ${pillar.color}`}>✦</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {program.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  {program.points.length > 0 && (
                    <ul className="space-y-2">
                      {program.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className={`mt-0.5 flex-shrink-0 ${pillar.color}`}>•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-primary relative overflow-hidden grain-overlay">
        <div className="cta-glow" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tighter mb-4">
            Be Part of the Change
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Your support helps us reach more students, empower more teachers, and transform more
            schools across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-accent"
            >
              Donate Now
            </a>
            <a
              href="/volunteer-application"
              className="inline-block px-8 py-3 border border-white/60 text-white hover:bg-white/10 font-semibold rounded-xl transition-all"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
