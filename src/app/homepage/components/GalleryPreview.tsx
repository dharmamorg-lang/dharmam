'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

interface GalleryImage {
  id: string;
  image_url: string;
  title?: string;
  category?: string;
}

const STATS = [
  { value: '500+', label: 'Students Supported', icon: 'AcademicCapIcon' },
  { value: '12+', label: 'Programs Running', icon: 'BookOpenIcon' },
  { value: '8+', label: 'Communities Reached', icon: 'MapPinIcon' },
  { value: '100+', label: 'Volunteers Active', icon: 'UsersIcon' },
];

export default function GalleryPreview() {
  const [recentImages, setRecentImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('id, image_url, title, category')
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error && data) setRecentImages(data);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-badge mb-3">Our Impact</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            Changing Lives,{' '}
            <span className="text-primary">One Step at a Time</span>
          </h2>
          <p className="mt-4 text-foreground/60 text-base max-w-xl mx-auto">
            Through education, health, and community programs, we create lasting change for children and families across Tamil Nadu.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-2xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon as any} size={20} className="text-primary" />
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-foreground/50 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Moments Strip */}
        {!loading && recentImages.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-4 text-center">
              Recent Moments
            </p>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {recentImages.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-video rounded-2xl overflow-hidden group"
                >
                  <img
                    src={img.image_url}
                    alt={img.title || 'Dharmam Charitable Trust'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    {img.title && (
                      <span className="text-white text-xs font-medium line-clamp-1">{img.title}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary rounded-full px-7 py-3 hover:bg-primary hover:text-white transition-all"
          >
            <Icon name="PhotoIcon" size={16} />
            View Gallery
          </Link>
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-white rounded-full px-7 py-3 hover:bg-primary/90 transition-all"
          >
            Our Impact & Initiatives
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}