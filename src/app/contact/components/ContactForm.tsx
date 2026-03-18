'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        message: form.message,
        is_read: false,
      });
      if (insertError) {
        setError('Failed to send message. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl shadow-card border border-border p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Icon name="CheckCircleIcon" size={32} className="text-green-600" variant="solid" />
        </div>
        <h3 className="font-display font-bold text-2xl text-foreground mb-2">Message Sent!</h3>
        <p className="text-foreground-muted leading-relaxed max-w-md mx-auto mb-6">
          Thank you, <strong>{form.name}</strong>! We've received your message and will respond within 24 hours at <strong>{form.email}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-border p-6 md:p-8">
      <h2 className="font-display font-bold text-2xl text-foreground mb-1">Send Us a Message</h2>
      <p className="text-foreground-muted text-sm mb-7">We typically respond within 24 hours on business days.</p>

      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="form-label">Full Name <span className="text-accent">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Priya Ramasubramanian"
              required
            />
          </div>
          <div>
            <label className="form-label">Email <span className="text-accent">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              placeholder="priya@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="form-label">Subject <span className="text-accent">*</span></label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a subject</option>
              <option value="Donation Inquiry">Donation Inquiry</option>
              <option value="Volunteer Application">Volunteer Application</option>
              <option value="Program Information">Program Information</option>
              <option value="Partnership">Partnership / Collaboration</option>
              <option value="Media Inquiry">Media Inquiry</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Message <span className="text-accent">*</span></label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-input resize-none"
            rows={5}
            placeholder="Tell us how we can help, or share your thoughts about our programs..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all group text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Icon name="PaperAirplaneIcon" size={18} />
          {loading ? 'Sending...' : 'Send Message'}
          {!loading && <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <p className="text-center text-xs text-foreground-muted">
          Or reach us directly at{' '}
          <a href="mailto:info@dharmam.org" className="text-primary font-semibold hover:underline">
            info@dharmam.org
          </a>
        </p>
      </form>
    </div>
  );
}