'use client';
import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = [
  'Education Programs',
  'Health Camps',
  'Community Events',
  'Student Mentoring',
  'Volunteer Activities',
];

interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

interface BulkFile {
  file: File;
  preview: string;
  title: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bulk upload state
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const [bulkCategory, setBulkCategory] = useState(CATEGORIES[0]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkError, setBulkError] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState('');
  const [bulkProgress, setBulkProgress] = useState(0);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  const fetchPhotos = async () => {
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (!fetchError) setPhotos(data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPhotos(); }, []);

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
    setError('');
    setSuccess('');
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('dharmam')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('dharmam')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('gallery_photos')
        .insert({ title, category, image_url: publicUrl });

      if (insertError) {
        setError(`Failed to save photo: ${insertError.message}`);
        return;
      }

      setSuccess('Photo uploaded successfully!');
      setTitle('');
      setCategory(CATEGORIES[0]);
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchPhotos();
    } catch (err: any) {
      setError(err?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Bulk upload handlers
  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newBulkFiles: BulkFile[] = files.map((f, i) => ({
      file: f,
      preview: URL.createObjectURL(f),
      title: f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending',
    }));
    setBulkFiles((prev) => [...prev, ...newBulkFiles]);
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
  };

  const updateBulkTitle = (index: number, newTitle: string) => {
    setBulkFiles((prev) => prev.map((f, i) => i === index ? { ...f, title: newTitle } : f));
  };

  const removeBulkFile = (index: number) => {
    setBulkFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleBulkUpload = async () => {
    if (!bulkFiles.length || !bulkCategory) return;
    const pendingFiles = bulkFiles.filter((f) => f.status === 'pending');
    if (!pendingFiles.length) return;

    setBulkUploading(true);
    setBulkError('');
    setBulkSuccess('');
    setBulkProgress(0);

    const supabase = createClient();
    let completed = 0;
    let failed = 0;

    for (let i = 0; i < bulkFiles.length; i++) {
      const item = bulkFiles[i];
      if (item.status !== 'pending') continue;

      setBulkFiles((prev) => prev.map((f, idx) => idx === i ? { ...f, status: 'uploading' } : f));

      try {
        const ext = item.file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('dharmam')
          .upload(fileName, item.file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw new Error(uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('dharmam')
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from('gallery_photos')
          .insert({ title: item.title || item.file.name, category: bulkCategory, image_url: publicUrl });

        if (insertError) throw new Error(insertError.message);

        setBulkFiles((prev) => prev.map((f, idx) => idx === i ? { ...f, status: 'done' } : f));
        completed++;
      } catch (err: any) {
        setBulkFiles((prev) => prev.map((f, idx) => idx === i ? { ...f, status: 'error', error: err?.message } : f));
        failed++;
      }

      setBulkProgress(Math.round(((completed + failed) / pendingFiles.length) * 100));
    }

    setBulkUploading(false);
    if (failed === 0) {
      setBulkSuccess(`${completed} photo${completed !== 1 ? 's' : ''} uploaded successfully!`);
    } else {
      setBulkError(`${completed} uploaded, ${failed} failed. Check individual errors above.`);
    }
    fetchPhotos();
  };

  const clearDoneFiles = () => {
    setBulkFiles((prev) => {
      prev.filter((f) => f.status === 'done').forEach((f) => URL.revokeObjectURL(f.preview));
      return prev.filter((f) => f.status !== 'done');
    });
    setBulkSuccess('');
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    if (!confirm(`Delete "${photo.title}"?`)) return;
    setDeleting(photo.id);
    try {
      const supabase = createClient();
      const urlParts = photo.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      await supabase.storage.from('dharmam').remove([fileName]);
      await supabase.from('gallery_photos').delete().eq('id', photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      setSuccess('Photo deleted.');
    } catch (err: any) {
      setError(err?.message || 'Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Gallery Management</h1>
        <p className="text-foreground-muted text-sm mt-1">Upload and manage gallery photos.</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'single' ? 'bg-white text-foreground shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
          >
            Single Upload
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'bulk' ? 'bg-white text-foreground shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
          >
            Bulk Upload
          </button>
        </div>

        {/* Single Upload */}
        {activeTab === 'single' && (
          <>
            <h2 className="font-display font-semibold text-lg text-foreground mb-5">Upload New Photo</h2>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{success}</div>}
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Photo Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Enter photo title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    required
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Image File <span className="text-red-500">*</span></label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <div className="flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="max-h-40 rounded-lg object-contain" />
                      <span className="text-xs text-foreground-muted">{file?.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-foreground-muted">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Click to select image</span>
                      <span className="text-xs">JPG, PNG, WebP up to 10MB</span>
                    </div>
                  )}
                </div>
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
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </form>
          </>
        )}

        {/* Bulk Upload */}
        {activeTab === 'bulk' && (
          <>
            <h2 className="font-display font-semibold text-lg text-foreground mb-1">Bulk Upload Photos</h2>
            <p className="text-foreground-muted text-sm mb-5">Select multiple images at once. Each image title can be edited before uploading.</p>

            {bulkError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{bulkError}</div>}
            {bulkSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center justify-between">
                <span>{bulkSuccess}</span>
                <button onClick={clearDoneFiles} className="text-green-600 hover:text-green-800 text-xs font-semibold underline ml-4">Clear uploaded</button>
              </div>
            )}

            {/* Category selector */}
            <div className="mb-5 max-w-xs">
              <label className="block text-sm font-semibold text-foreground mb-1.5">Category for all images <span className="text-red-500">*</span></label>
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Drop zone */}
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mb-5"
              onClick={() => bulkFileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
                if (!files.length) return;
                const newBulkFiles: BulkFile[] = files.map((f) => ({
                  file: f,
                  preview: URL.createObjectURL(f),
                  title: f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                  status: 'pending',
                }));
                setBulkFiles((prev) => [...prev, ...newBulkFiles]);
              }}
            >
              <div className="flex flex-col items-center gap-2 text-foreground-muted">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm font-medium">Click or drag & drop images here</span>
                <span className="text-xs">Select multiple images at once • JPG, PNG, WebP</span>
              </div>
            </div>
            <input
              ref={bulkFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleBulkFileChange}
              className="hidden"
            />

            {/* File list */}
            {bulkFiles.length > 0 && (
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{bulkFiles.length} image{bulkFiles.length !== 1 ? 's' : ''} selected</p>
                  {!bulkUploading && (
                    <button
                      onClick={() => {
                        bulkFiles.forEach((f) => URL.revokeObjectURL(f.preview));
                        setBulkFiles([]);
                        setBulkError('');
                        setBulkSuccess('');
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                {bulkUploading && (
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${bulkProgress}%` }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                  {bulkFiles.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        item.status === 'done' ? 'border-green-200 bg-green-50' :
                        item.status === 'error' ? 'border-red-200 bg-red-50' :
                        item.status === 'uploading'? 'border-primary/30 bg-primary/5' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.preview} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateBulkTitle(index, e.target.value)}
                          disabled={item.status === 'uploading' || item.status === 'done'}
                          className="w-full text-xs font-medium bg-transparent border-b border-gray-300 focus:border-primary focus:outline-none pb-0.5 text-foreground disabled:opacity-60"
                          placeholder="Image title"
                        />
                        <p className="text-xs text-foreground-muted mt-1 truncate">{item.file.name}</p>
                        {item.status === 'done' && <p className="text-xs text-green-600 font-semibold mt-0.5">✓ Uploaded</p>}
                        {item.status === 'uploading' && <p className="text-xs text-primary font-semibold mt-0.5">Uploading...</p>}
                        {item.status === 'error' && <p className="text-xs text-red-600 mt-0.5 truncate">{item.error || 'Failed'}</p>}
                      </div>
                      {item.status === 'pending' && (
                        <button
                          onClick={() => removeBulkFile(index)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 text-gray-500 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleBulkUpload}
              disabled={bulkUploading || bulkFiles.filter((f) => f.status === 'pending').length === 0}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {bulkUploading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading {bulkProgress}%...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload {bulkFiles.filter((f) => f.status === 'pending').length > 0 ? `${bulkFiles.filter((f) => f.status === 'pending').length} ` : ''}Photo{bulkFiles.filter((f) => f.status === 'pending').length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Photos Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-5">
          All Photos <span className="text-foreground-muted font-normal text-base">({photos.length})</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12 text-foreground-muted">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No photos uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
                  <p className="text-white/70 text-xs truncate">{photo.category}</p>
                  <button
                    onClick={() => handleDelete(photo)}
                    disabled={deleting === photo.id}
                    className="mt-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-60"
                  >
                    {deleting === photo.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
                <div className="p-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-foreground truncate">{photo.title}</p>
                  <p className="text-xs text-foreground-muted truncate">{photo.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
