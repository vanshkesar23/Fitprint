/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4c6ff',
          300: '#a89fff',
          400: '#8b78ff',
          500: '#6C63FF',
          600: '#5a50e0',
          700: '#4840bb',
          800: '#373096',
          900: '#262071',
        },
        accent: {
          cyan: '#00D4FF',
          magenta: '#FF2D78',
          violet: '#6C63FF',
          gold: '#FFD700',
        },
        dark: {
          950: '#020208',
          900: '#050510',
          800: '#0a0a1f',
          700: '#0f0f2e',
          600: '#151535',
          500: '#1a1a40',
        },
        glass: 'rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #050510 0%, #0a0a1f 50%, #050510 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,212,255,0.05) 100%)',
        'glow-violet': 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'scan-line': 'scan-line 2s linear infinite',
        'data-flow': 'data-flow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108,99,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(108,99,255,0.8), 0 0 80px rgba(0,212,255,0.3)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(108,99,255,0.3)',
        'glow': '0 0 20px rgba(108,99,255,0.4)',
        'glow-lg': '0 0 40px rgba(108,99,255,0.5)',
        'glow-cyan': '0 0 20px rgba(0,212,255,0.4)',
        'glow-magenta': '0 0 20px rgba(255,45,120,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
