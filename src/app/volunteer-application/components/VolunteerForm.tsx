'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

const skillOptions = [
  'Writing and Editing', 'Web Design', 'IT Support', 'Promoter', 'Canvassing',
  'Fundraising', 'Public Speaking', 'Performing Arts', 'Social Media Influencer',
  'Activities', 'Other',
];

const roleOptions = [
  'Teaching / Tutoring', 'Health Camp Support', 'Event Management',
  'Fundraising', 'Administration', 'Social Media & Communications',
  'Mentorship', 'Community Outreach',
];

export default function VolunteerForm() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [specialEventsOnly, setSpecialEventsOnly] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '', pronoun: '', dob: '', mobile: '', email: '',
    address: '', city: '', country: 'India', languages: '',
    education: '', heardAbout: '', whyVolunteer: '', goals: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const toggleRole = (role: string) => {
    setRoles((prev) => prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]);
  };

  const toggleAvailability = (a: string) => {
    setAvailability((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const toggleShift = (s: string) => {
    setShifts((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from('volunteer_applications').insert({
        full_name: form.fullName,
        pronoun: form.pronoun || null,
        dob: form.dob || null,
        mobile: form.mobile,
        email: form.email,
        address: form.address || null,
        city: form.city,
        country: form.country || 'India',
        languages: form.languages || null,
        education: form.education || null,
        how_heard: form.heardAbout || null,
        why_volunteer: form.whyVolunteer || null,
        goals: form.goals || null,
        preferred_roles: roles.length > 0 ? roles : null,
        skills: skills.length > 0 ? skills : null,
        availability: availability.length > 0 ? availability : null,
        shift: shifts.length > 0 ? shifts : null,
        special_events_only: specialEventsOnly,
      });
      if (insertError) {
        setError('Failed to submit application. Please try again.');
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
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={40} className="text-green-600" variant="solid" />
        </div>
        <h2 className="font-display font-bold text-3xl text-foreground mb-3">Application Submitted!</h2>
        <p className="text-foreground-muted text-lg leading-relaxed max-w-lg mx-auto mb-6">
          Thank you, <strong>{form.fullName}</strong>! Your volunteer application has been received. Our team will contact you within 2–3 business days at <strong>{form.email}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/919176917626"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
          <a
            href="/homepage"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-border overflow-hidden">
      {/* Step Indicator */}
      <div className="bg-primary-light border-b border-border px-6 md:px-10 py-6">
        <div className="flex items-center gap-0 max-w-sm">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`step-dot ${
                    step >= s
                      ? 'bg-primary text-white' :'bg-border text-foreground-muted'
                  }`}
                >
                  {step > s ? <Icon name="CheckIcon" size={16} /> : s}
                </div>
                <span className="text-xs font-medium text-foreground-muted whitespace-nowrap">
                  {s === 1 ? 'Applicant Info' : 'Volunteer Details'}
                </span>
              </div>
              {s < 2 && (
                <div className={`step-line mx-2 mb-5 ${step > s ? 'active' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10">
        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        )}

        {/* STEP 1: Applicant Information */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">Applicant Information</h2>
            <p className="text-foreground-muted text-sm mb-8">Tell us a little about yourself.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="form-label">Full Name <span className="text-accent">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Pronoun */}
              <div>
                <label className="form-label">Pronoun</label>
                <div className="flex gap-3">
                  {['Female', 'Male', 'Others'].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pronoun"
                        value={p}
                        checked={form.pronoun === p}
                        onChange={handleChange}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-sm text-foreground font-medium">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="form-label">Date of Birth <span className="text-accent">*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="form-label">Mobile <span className="text-accent">*</span></label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email <span className="text-accent">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="form-input resize-none"
                  rows={2}
                  placeholder="Street address, locality"
                />
              </div>

              {/* City */}
              <div>
                <label className="form-label">City / Town / Village <span className="text-accent">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Chennai"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="form-label">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Languages */}
              <div>
                <label className="form-label">Languages Known</label>
                <input
                  type="text"
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tamil, English, Hindi"
                />
              </div>

              {/* Education */}
              <div>
                <label className="form-label">Highest Level of Education Completed</label>
                <select
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School (10th)</option>
                  <option value="Higher Secondary">Higher Secondary (12th)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="Doctorate">Doctorate / PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Heard About */}
              <div className="md:col-span-2">
                <label className="form-label">How did you hear about DHARMAM?</label>
                <select
                  name="heardAbout"
                  value={form.heardAbout}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select an option</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend / Family">Friend / Family</option>
                  <option value="College / School">College / School</option>
                  <option value="News / Media">News / Media</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Event">Event / Camp</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Why Volunteer */}
              <div className="md:col-span-2">
                <label className="form-label">Why are you interested in volunteering with DHARMAM? <span className="text-accent">*</span></label>
                <textarea
                  name="whyVolunteer"
                  value={form.whyVolunteer}
                  onChange={handleChange}
                  className="form-input resize-none"
                  rows={3}
                  placeholder="Share your motivation..."
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all group"
              >
                Next: Volunteer Details
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Volunteer Details */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">Volunteer Details</h2>
            <p className="text-foreground-muted text-sm mb-8">Help us understand how you'd like to contribute.</p>

            <div className="space-y-7">
              {/* Goals */}
              <div>
                <label className="form-label">Goals for Volunteering</label>
                <textarea
                  name="goals"
                  value={form.goals}
                  onChange={handleChange}
                  className="form-input resize-none"
                  rows={3}
                  placeholder="What do you hope to achieve or contribute through volunteering?"
                />
              </div>

              {/* Preferred Roles */}
              <div>
                <label className="form-label mb-3 block">Preferred Volunteer Roles</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {roleOptions.map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                        roles.includes(role)
                          ? 'border-primary bg-primary-light text-primary' :'border-border text-foreground-muted hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={roles.includes(role)}
                        onChange={() => toggleRole(role)}
                        className="sr-only"
                      />
                      {roles.includes(role) && <Icon name="CheckIcon" size={14} className="text-primary flex-shrink-0" />}
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="form-label mb-3 block">Skills</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="checkbox-item p-2 rounded-lg hover:bg-primary-light transition-colors">
                      <input
                        type="checkbox"
                        checked={skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <span className="text-foreground font-medium">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="form-label mb-3 block">Availability</label>
                <div className="flex gap-3 flex-wrap">
                  {['Weekdays', 'Weekends'].map((a) => (
                    <label
                      key={a}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border cursor-pointer transition-all font-medium text-sm ${
                        availability.includes(a)
                          ? 'border-primary bg-primary text-white' :'border-border text-foreground-muted hover:border-primary'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={availability.includes(a)}
                        onChange={() => toggleAvailability(a)}
                        className="sr-only"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>

              {/* Shifts */}
              <div>
                <label className="form-label mb-3 block">Volunteer Shift Preference</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: 'Morning Shift', time: '9:30 AM – 1:00 PM', icon: 'SunIcon' },
                    { label: 'Afternoon Shift', time: '1:00 PM – 5:00 PM', icon: 'CloudIcon' },
                    { label: 'Evening Shift', time: '5:00 PM – 8:00 PM', icon: 'MoonIcon' },
                  ].map((shift) => (
                    <label
                      key={shift.label}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        shifts.includes(shift.label)
                          ? 'border-primary bg-primary-light' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={shifts.includes(shift.label)}
                        onChange={() => toggleShift(shift.label)}
                        className="sr-only"
                      />
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${shifts.includes(shift.label) ? 'bg-primary' : 'bg-primary-light'}`}>
                        <Icon name={shift.icon as "SunIcon"} size={18} className={shifts.includes(shift.label) ? 'text-white' : 'text-primary'} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${shifts.includes(shift.label) ? 'text-primary' : 'text-foreground'}`}>{shift.label}</div>
                        <div className="text-xs text-foreground-muted">{shift.time}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Events Only */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      specialEventsOnly ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                    }`}
                    onClick={() => setSpecialEventsOnly(!specialEventsOnly)}
                  >
                    {specialEventsOnly && <Icon name="CheckIcon" size={12} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Available only for special events (camps, drives, annual programs)
                  </span>
                </label>
              </div>

              {/* Declaration */}
              <div className="bg-primary-light rounded-2xl p-5 border border-border">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  By submitting this application, I confirm that the information provided is accurate and I commit to fulfilling my volunteer responsibilities with dedication and integrity. I understand that DHARMAM Charitable Trust may contact me at the details provided.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                <Icon name="ArrowLeftIcon" size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-accent group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Icon name="PaperAirplaneIcon" size={18} />
                {loading ? 'Submitting...' : 'Submit Application'}
                {!loading && <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}