/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        secondary: '#0D0D0D',
        accent: '#00E5FF',
        highlight: '#8A2BE2',
        subtext: '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 229, 255, 0.35), 0 0 60px rgba(0, 229, 255, 0.15)',
        'neon-purple': '0 0 20px rgba(138, 43, 226, 0.35), 0 0 60px rgba(138, 43, 226, 0.15)',
        'neon-sm': '0 0 10px rgba(0, 229, 255, 0.25)',
        glass: '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':
          'radial-gradient(circle at 20% 20%, rgba(0,229,255,0.08), transparent 40%), radial-gradient(circle at 80% 10%, rgba(138,43,226,0.08), transparent 35%), linear-gradient(180deg, #050505 0%, #0D0D0D 100%)',
        'accent-gradient': 'linear-gradient(135deg, #00E5FF, #8A2BE2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'orbit': 'orbit 15s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(50px, -30px) rotate(90deg)' },
          '50%': { transform: 'translate(20px, -60px) rotate(180deg)' },
          '75%': { transform: 'translate(-30px, -30px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
