/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F5F7A',
          hover: '#2F7FA3',
          light: '#E6F2F8',
          dark: '#174B61',
        },
        accent: {
          DEFAULT: '#F07A2B',
          hover: '#d96820',
          light: '#FFF5EE',
        },
        foreground: {
          DEFAULT: '#333333',
          muted: '#6B7280',
          light: '#9CA3AF',
        },
        border: {
          DEFAULT: '#D1E8F2',
          dark: '#B0D4E8',
        },
        card: '#FFFFFF',
        'stone-bg': '#EAEAE5',
      },
      fontFamily: {
        display: ['DM Sans', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'counter': 'countUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      boxShadow: {
        'primary': '0 12px 40px -12px rgba(31, 95, 122, 0.3)',
        'accent': '0 12px 40px -12px rgba(240, 122, 43, 0.3)',
        'card': '0 4px 24px -4px rgba(31, 95, 122, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};