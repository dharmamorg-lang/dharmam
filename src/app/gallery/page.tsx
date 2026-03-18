'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';


interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('gallery_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          setError('Failed to load gallery photos.');
          return;
        }

        const photos = data || [];
        setPhotos(photos);

        // Extract unique categories
        const uniqueCategories = ['All', ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))];
        setCategories(uniqueCategories);
      } catch {
        setError('Failed to load gallery photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos =
    activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Moments of Change
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">
              Moments of <span className="text-accent">Change</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              A visual journey through our programs, events, and the lives we touch every day.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">

            {/* Category Filter */}
            {!loading && !error && categories.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-foreground/70 border border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-foreground/50 text-sm">Loading gallery...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Icon name="ExclamationTriangleIcon" size={28} className="text-red-400" />
                </div>
                <p className="text-foreground/60 text-base">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredPhotos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon name="PhotoIcon" size={32} className="text-primary" />
                </div>
                <p className="text-foreground/60 text-base">
                  {activeCategory === 'All' ?'No photos have been uploaded yet.'
                    : `No photos in "${activeCategory}" yet.`}
                </p>
              </div>
            )}

            {/* Photo Grid */}
            {!loading && !error && filteredPhotos.length > 0 && (
              <>
                <p className="text-center text-foreground/50 text-sm mb-8">
                  Showing {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
                  {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                </p>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-foreground font-semibold text-sm leading-snug line-clamp-2">
                          {photo.title}
                        </p>
                        {photo.category && (
                          <span className="inline-block mt-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {photo.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}