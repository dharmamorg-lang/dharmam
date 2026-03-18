'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages(data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (msg: ContactMessage) => {
    if (msg.is_read) {
      setSelected(msg);
      return;
    }
    try {
      const supabase = createClient();
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m));
      setSelected({ ...msg, is_read: true });
    } catch {
      setSelected(msg);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Contact Messages</h1>
          <p className="text-foreground-muted text-sm mt-1">
            {messages.length} total · <span className="text-orange-600 font-medium">{unreadCount} unread</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-foreground-muted">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide hidden lg:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide">Subject</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-muted text-xs uppercase tracking-wide hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => markAsRead(msg)}
                    className={`border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${!msg.is_read ? 'bg-orange-50/50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${msg.is_read ? 'bg-gray-300' : 'bg-orange-500'}`} />
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{msg.name}</td>
                    <td className="px-4 py-3 text-foreground-muted hidden md:table-cell">{msg.email}</td>
                    <td className="px-4 py-3 text-foreground-muted hidden lg:table-cell">{msg.phone || '—'}</td>
                    <td className="px-4 py-3 text-foreground max-w-xs truncate">{msg.subject}</td>
                    <td className="px-4 py-3 text-foreground-muted text-xs hidden md:table-cell whitespace-nowrap">{formatDate(msg.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{selected.subject}</h3>
                <p className="text-sm text-foreground-muted mt-0.5">{formatDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">Name</p>
                  <p className="text-sm text-foreground font-medium">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div>
                    <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-sm text-foreground">{selected.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Message</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</div>
              </div>
              <div className="flex justify-end">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
