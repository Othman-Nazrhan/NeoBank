import { Appearance } from 'react-native';

export const lightTheme = {
  background: '#ffffff',
  text: '#0f172a',
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#10b981',
  card: '#f8fafc',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  surface: '#ffffff',
  neon: '#00d4ff', // Modern neon accent
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    neon: 'linear-gradient(135deg, #00d4ff 0%, #090979 100%)',
    sunset: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

export const darkTheme = {
  background: '#0f172a',
  text: '#f8fafc',
  primary: '#60a5fa',
  secondary: '#94a3b8',
  accent: '#34d399',
  card: '#1e293b',
  border: '#334155',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  surface: '#0f172a',
  neon: '#00d4ff', // Modern neon accent
  gradient: {
    primary: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    secondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    accent: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    neon: 'linear-gradient(135deg, #00d4ff 0%, #090979 100%)',
    sunset: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

export const getTheme = (theme: 'light' | 'dark') => {
  return theme === 'light' ? lightTheme : darkTheme;
};

export const getSystemTheme = () => {
  return Appearance.getColorScheme() || 'light';
};
