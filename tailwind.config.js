/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3A86FF', // Bright electric blue
        secondary: '#0B132B', // Deep navy
        background: {
          light: '#F8FAFC', // Minimal white
          dark: '#0F172A', // Muted dark
        },
        accent: '#6EE7B7', // From gradient
        success: '#22C55E', // Soft green
        warning: '#f59e0b',
        error: '#EF4444', // Warm red
        text: {
          primary: '#E2E8F0', // Light gray
          secondary: '#94A3B8', // Dim gray
        },
        surface: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        card: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        border: {
          light: '#E2E8F0',
          dark: '#94A3B8',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(145deg, #3A86FF, #6EE7B7)', // Modern gradient
        'gradient-primary': 'linear-gradient(135deg, #3A86FF 0%, #0B132B 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0B132B 0%, #3A86FF 100%)',
        'gradient-surface': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        'gradient-card': 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
        'gradient-dark-primary': 'linear-gradient(135deg, #0F172A 0%, #0B132B 100%)',
        'gradient-dark-secondary': 'linear-gradient(135deg, #0B132B 0%, #0F172A 100%)',
        'gradient-dark-accent': 'linear-gradient(135deg, #3A86FF 0%, #6EE7B7 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'button-press': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'soft-glass': '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'sans': ['Inter', 'System', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['Space Grotesk', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'display': ['Satoshi', 'Poppins', 'System', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        'pill': '9999px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
