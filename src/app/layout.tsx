import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Dharmam Charitable Trust — Empowering Lives Through Education',
  description: 'Dharmam Charitable Trust supports underprivileged children in Chennai through education, mentoring, healthcare, and community development programs since 2019.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Page Loader */}
        <div id="page-loader" suppressHydrationWarning style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1F5F7A',
          transition: 'opacity 0.5s ease, visibility 0.5s ease',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div style={{
            background: '#ffffff',
            borderRadius: 12,
            padding: 12,
            marginBottom: 20,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/assets/images/dharmam_logo-1773644296566.png"
              alt="Dharmam Charitable Trust"
              style={{ width: 120, height: 120, objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.2)',
            overflow: 'hidden',
          }}>
            <div id="loader-bar" style={{
              height: '100%',
              width: '0%',
              background: '#F07A2B',
              borderRadius: 2,
              animation: 'loaderProgress 1.2s ease forwards',
            }} />
          </div>
          <style>{`
            @keyframes loaderProgress {
              0% { width: 0%; }
              60% { width: 70%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Suppress loader on admin routes entirely
              if (window.location.pathname.startsWith('/admin')) {
                var loader = document.getElementById('page-loader');
                if (loader) { loader.style.display = 'none'; }
                return;
              }
              function hideLoader() {
                var loader = document.getElementById('page-loader');
                if (loader) {
                  loader.style.opacity = '0';
                  loader.style.visibility = 'hidden';
                  setTimeout(function() { loader.style.display = 'none'; }, 500);
                }
              }
              if (document.readyState === 'complete') {
                setTimeout(hideLoader, 1200);
              } else {
                window.addEventListener('load', function() {
                  setTimeout(hideLoader, 1200);
                });
              }
            })();
          `
        }} />
        <AuthProvider>{children}</AuthProvider>
</body>
    </html>
  );
}