'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';


export default function AboutContent() {
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-6 reveal">
            <span className="section-badge mb-4">Who We Are</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-tight mb-6">
              Rooted in Chennai,<br />
              <span className="text-primary">Driven by Purpose</span>
            </h2>
            <p className="text-foreground-muted text-lg leading-relaxed mb-5">
              DHARMAM Charitable Trust was established in 2019 in Chennai, Tamil Nadu, with a singular focus: ensuring that no child's potential is limited by the circumstances of their birth.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-5">
              The word "Dharmam" reflects our core belief in righteous duty — the responsibility each of us holds toward the vulnerable members of our community. We operate on the principle that sustainable change comes through education, not charity alone.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              Our programs span educational support, after-school coaching, health awareness camps, student mentorship, life skills training, and community development. We work in direct partnership with local schools, hospitals, and government bodies to maximize impact.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
              { value: '2019', label: 'Year Established' },
              { value: 'Chennai', label: 'Headquartered' },
              { value: '9', label: 'Active Programs' },
              { value: '180+', label: 'Volunteers' }]?.
              map((stat) =>
              <div key={stat?.label} className="bg-primary-light rounded-2xl p-4 border border-border">
                  <div className="font-display font-bold text-2xl text-primary tracking-tight">{stat?.value}</div>
                  <div className="text-foreground-muted text-sm font-medium">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>

                    <div className="md:col-span-6 reveal delay-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] relative">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1bbb7e82f-1773643246262.png"
                    alt="Dharmam Trust volunteer teaching Indian children in a Chennai classroom setting"
                    fill
                    className="object-cover img-hover-color" />
                  
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1b995ecad-1773643244912.png"
                    alt="Indian children smiling and holding books at a Dharmam educational event in Tamil Nadu"
                    fill
                    className="object-cover img-hover-color" />
                  
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden aspect-square relative">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_108ca6363-1773645135796.png"
                    alt="Health camp organized by Dharmam Trust providing free medical checkups for Indian families"
                    fill
                    className="object-cover img-hover-color" />
                  
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] relative">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_19b4a0499-1773830671166.png"
                    alt="Community development workshop conducted by Dharmam Charitable Trust volunteers in Chennai"
                    fill
                    className="object-cover img-hover-color" />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}