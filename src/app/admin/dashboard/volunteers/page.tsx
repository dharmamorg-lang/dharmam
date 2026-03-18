'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface VolunteerApplication {
  id: string;
  full_name: string;
  pronoun: string | null;
  dob: string | null;
  mobile: string;
  email: string;
  address: string | null;
  city: string;
  country: string | null;
  languages: string | null;
  education: string | null;
  how_heard: string | null;
  why_volunteer: string | null;
  goals: string | null;
  preferred_roles: string[] | null;
  skills: string[] | null;
  availability: string[] | null;
  shift: string[] | null;
  special_events_only: boolean;
  created_at: string;
}

export default function AdminVolunteersPage() {
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('volunteer_applications')
          .select('*')
          .order('created_at', { ascending: false });
        setApplications(data || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const toggleExpand = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Volunteer Applications</h1>
        <p className="text-foreground-muted text-sm mt-1">{applications.length} total applications</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-foreground-muted">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">No volunteer applications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Summary Row */}
              <button
                onClick={() => toggleExpand(app.id)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{app.full_name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{app.full_name}</p>
                    <p className="text-xs text-foreground-muted truncate">{app.email} · {app.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden md:block text-right">
                    <p className="text-xs text-foreground-muted">{app.city}{app.country ? `, ${app.country}` : ''}</p>
                    <p className="text-xs text-foreground-muted">{formatDate(app.created_at)}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expanded === app.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Details */}
              {expanded === app.id && (
                <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <DetailField label="Full Name" value={app.full_name} />
                    <DetailField label="Pronoun" value={app.pronoun} />
                    <DetailField label="Date of Birth" value={app.dob} />
                    <DetailField label="Mobile" value={app.mobile} />
                    <DetailField label="Email" value={app.email} />
                    <DetailField label="City" value={app.city} />
                    <DetailField label="Country" value={app.country} />
                    <DetailField label="Address" value={app.address} />
                    <DetailField label="Languages" value={app.languages} />
                    <DetailField label="Education" value={app.education} />
                    <DetailField label="How Heard" value={app.how_heard} />
                    <DetailField label="Submitted" value={formatDate(app.created_at)} />
                  </div>

                  {app.why_volunteer && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">Why Volunteer</p>
                      <p className="text-sm text-foreground bg-white rounded-xl p-3 border border-gray-100">{app.why_volunteer}</p>
                    </div>
                  )}
                  {app.goals && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">Goals</p>
                      <p className="text-sm text-foreground bg-white rounded-xl p-3 border border-gray-100">{app.goals}</p>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {app.preferred_roles && app.preferred_roles.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Preferred Roles</p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.preferred_roles.map((r) => (
                            <span key={r} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{r}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.skills && app.skills.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.skills.map((s) => (
                            <span key={s} className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.availability && app.availability.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Availability</p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.availability.map((a) => (
                            <span key={a} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.shift && app.shift.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Shift Preference</p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.shift.map((s) => (
                            <span key={s} className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {app.special_events_only && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-foreground-muted">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Available for special events only
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    <a
                      href={`mailto:${app.email}?subject=Your Volunteer Application at Dharmam`}
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      Reply via Email
                    </a>
                    <a
                      href={`tel:${app.mobile}`}
                      className="px-4 py-2 border border-border text-foreground text-xs font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
                    >
                      Call Applicant
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
