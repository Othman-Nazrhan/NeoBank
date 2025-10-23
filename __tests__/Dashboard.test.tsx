// Mock react-native
jest.mock('react-native', () => ({
  SafeAreaView: ({ children }: any) => children,
  ScrollView: ({ children }: any) => children,
  View: ({ children, style }: any) => <div style={style}>{children}</div>,
  Text: ({ children, style }: any) => <span style={style}>{children}</span>,
  TouchableOpacity: ({ children, onPress, style }: any) => <button onClick={onPress} style={style}>{children}</button>,
  StyleSheet: { create: (styles: any) => styles },
}));

// Mock the navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock the store
jest.mock('../src/store/useStore', () => ({
  useStore: jest.fn(),
}));

// Mock BalanceCard
jest.mock('../src/components/BalanceCard', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock TransactionListItem
jest.mock('../src/components/TransactionListItem', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => children,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useAnimatedStyle: jest.fn(),
  useSharedValue: jest.fn(),
  withTiming: jest.fn(),
  Animated: {
    View: 'Animated.View',
  },
}));

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  DollarSign: 'DollarSign',
  ArrowUpRight: 'ArrowUpRight',
  ArrowDownLeft: 'ArrowDownLeft',
  Coffee: 'Coffee',
  Car: 'Car',
  ShoppingBag: 'ShoppingBag',
  Home: 'Home',
  Gamepad2: 'Gamepad2',
}));

// Mock the theme
jest.mock('../src/theme', () => ({
  theme: {
    colors: {
      primary: '#3A86FF',
      background: {
        start: '#0B132B',
        end: '#1E293B',
      },
      text: {
        primary: '#E2E8F0',
        secondary: '#94A3B8',
      },
      card: {
        background: 'rgba(30, 41, 59, 0.8)',
        border: 'rgba(148, 163, 184, 0.1)',
      },
      accent: {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      white: '#FFFFFF',
      black: '#000000',
    },
    gradients: {
      primary: ['#3A86FF', '#1E293B'],
      background: ['#0B132B', '#1E293B'],
    },
    typography: {
      fontFamily: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
      },
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
    },
    commonStyles: {
      card: {
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      },
      input: {
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      button: {
        backgroundColor: '#3A86FF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    api: {
      loadingColor: '#3A86FF',
      errorColor: '#EF4444',
      successColor: '#10B981',
    },
  },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import Dashboard from '../src/screens/Dashboard';
import { useStore } from '../src/store/useStore';

describe('Dashboard', () => {
  it('should be defined', () => {
    expect(Dashboard).toBeDefined();
  });
});
