'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = [
  'Education Programs',
  'Health Camps',
  'Community Events',
  'Student Mentoring',
  'Volunteer Activities',
];

interface Stats {
  totalPhotos: number;
  totalMessages: number;
  unreadMessages: number;
  totalVolunteers: number;
}

interface ActivityItem {
  id: string;
  type: 'message' | 'volunteer';
  name: string;
  created_at: string;
  detail?: string;
}

interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalPhotos: 0, totalMessages: 0, unreadMessages: 0, totalVolunteers: 0 });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [recentPhotos, setRecentPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const [photosRes, messagesRes, unreadRes, volunteersRes, recentMsgs, recentVols, recentPhotosRes] = await Promise.all([
        supabase.from('gallery_photos').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('volunteer_applications').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id, name, subject, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('volunteer_applications').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('gallery_photos').select('*').order('created_at', { ascending: false }).limit(4),
      ]);

      setStats({
        totalPhotos: photosRes.count ?? 0,
        totalMessages: messagesRes.count ?? 0,
        unreadMessages: unreadRes.count ?? 0,
        totalVolunteers: volunteersRes.count ?? 0,
      });

      const msgs: ActivityItem[] = (recentMsgs.data || []).map((m: { id: string; name: string; subject?: string; created_at: string }) => ({
        id: `msg-${m.id}`,
        type: 'message' as const,
        name: m.name,
        detail: m.subject,
        created_at: m.created_at,
      }));
      const vols: ActivityItem[] = (recentVols.data || []).map((v: { id: string; full_name: string; created_at: string }) => ({
        id: `vol-${v.id}`,
        type: 'volunteer' as const,
        name: v.full_name,
        created_at: v.created_at,
      }));
      const combined = [...msgs, ...vols]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      setActivity(combined);
      setRecentPhotos(recentPhotosRes.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category) return;
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (storageError) { setUploadError(`Upload failed: ${storageError.message}`); return; }
      const { data: urlData } = supabase.storage.from('gallery-images').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('gallery_photos').insert({
        title,
        category,
        image_url: urlData.publicUrl,
      });
      if (dbError) { setUploadError(`Save failed: ${dbError.message}`); return; }
      setUploadSuccess('Photo uploaded successfully!');
      setTitle('');
      setCategory(CATEGORIES[0]);
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchData();
      setTimeout(() => { setShowUploadModal(false); setUploadSuccess(''); }, 1500);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const statsCards = [
    {
      label: 'Total Volunteers',
      value: stats.totalVolunteers,
      sub: 'Applications received',
      href: '/admin/dashboard/volunteers',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bg: 'bg-[#1F5F7A]',
    },
    {
      label: 'Contact Messages',
      value: stats.totalMessages,
      sub: `${stats.unreadMessages} unread`,
      href: '/admin/dashboard/messages',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-[#F07A2B]',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null,
    },
    {
      label: 'Gallery Photos',
      value: stats.totalPhotos,
      sub: 'Total uploaded',
      href: '/admin/dashboard/gallery',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-teal-600',
    },
    {
      label: 'Donations',
      value: '—',
      sub: 'Coming soon',
      href: '#',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      bg: 'bg-rose-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#1F5F7A] to-[#2a7a9a] rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Welcome back, Dharmam Admin 👋</h1>
          <p className="text-white/70 text-sm mt-1">{formatDate(new Date())}</p>
        </div>
        <a
          href="/homepage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-medium rounded-xl transition-all border border-white/20 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Website
        </a>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-xl mb-4" />
              <div className="h-7 w-14 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                {card.icon}
              </div>
              {card.badge && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              )}
              <div className="text-3xl font-display font-bold text-gray-900 mb-0.5">{card.value}</div>
              <div className="text-sm font-semibold text-gray-700">{card.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F07A2B] inline-block" />
            Recent Activity
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1.5" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No recent activity yet.</p>
          ) : (
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'message' ? 'bg-orange-100' : 'bg-teal-100'}`}>
                    {item.type === 'message' ? (
                      <svg className="w-4 h-4 text-[#F07A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#1F5F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.type === 'message' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'}`}>
                        {item.type === 'message' ? 'Message' : 'Volunteer'}
                      </span>
                      <span className="text-xs text-gray-400">{timeAgo(item.created_at)}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{item.name}</p>
                    {item.detail && <p className="text-xs text-gray-400 truncate">{item.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Quick Update */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F5F7A] inline-block" />
              Gallery Update
            </h2>
            <button
              onClick={() => { setShowUploadModal(true); setUploadError(''); setUploadSuccess(''); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F5F7A] hover:bg-[#174d63] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload New Photo
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-400">No photos yet. Upload your first photo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {recentPhotos.map((photo) => (
                <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={photo.image_url}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-xs font-medium truncate">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/admin/dashboard/gallery"
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#1F5F7A] font-semibold hover:underline"
          >
            View all photos
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/dashboard/volunteers"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#1F5F7A] hover:bg-[#1F5F7A]/5 transition-all group text-center"
          >
            <div className="w-10 h-10 bg-[#1F5F7A]/10 group-hover:bg-[#1F5F7A]/20 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-[#1F5F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#1F5F7A]">View All Volunteers</span>
          </Link>
          <Link
            href="/admin/dashboard/messages"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#F07A2B] hover:bg-[#F07A2B]/5 transition-all group text-center"
          >
            <div className="w-10 h-10 bg-[#F07A2B]/10 group-hover:bg-[#F07A2B]/20 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-[#F07A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#F07A2B]">View All Messages</span>
          </Link>
          <Link
            href="/admin/dashboard/gallery"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-600 hover:bg-teal-50 transition-all group text-center"
          >
            <div className="w-10 h-10 bg-teal-50 group-hover:bg-teal-100 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600">Manage Gallery</span>
          </Link>
          <a
            href="/homepage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-400 hover:bg-gray-50 transition-all group text-center"
          >
            <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">View Website</span>
          </a>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg text-gray-900">Upload New Photo</h3>
              <button
                onClick={() => { setShowUploadModal(false); setUploadError(''); setUploadSuccess(''); setPreview(null); setFile(null); setTitle(''); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{uploadError}</div>
            )}
            {uploadSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{uploadSuccess}</div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter photo title"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F7A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5F7A] focus:border-transparent"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
                {preview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 mb-2">
                    <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" />
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="absolute top-2 right-2 bg-white/90 rounded-lg p-1 hover:bg-white transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#1F5F7A] hover:bg-[#1F5F7A]/5 transition-all"
                  >
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-400">Click to select image</p>
                    <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP supported</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required={!file}
                />
              </div>
              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1F5F7A] hover:bg-[#174d63] text-white font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Uploading...
                  </>
                ) : 'Upload Photo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
