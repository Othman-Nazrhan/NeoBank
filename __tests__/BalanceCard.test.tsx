/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import BalanceCard from '../src/components/BalanceCard';

// Mock react-native
jest.mock('react-native', () => {
  const React = require('react');
  return {
    View: (props: any) => React.createElement('div', props, props.children),
    Text: (props: any) => React.createElement('span', props, props.children),
    StyleSheet: {
      create: (styles: any) => styles,
      flatten: (styles: any) => styles,
    },
    Platform: {
      OS: 'ios',
    },
  };
}, { virtual: true });

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => children,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const React = require('react');
  return {
    useSharedValue: jest.fn((initialValue) => ({ value: initialValue })),
    withTiming: jest.fn((toValue) => toValue),
    useAnimatedStyle: jest.fn(() => ({})),
    Animated: {
      View: ({ children }: any) => React.createElement('span', {}, children),
      Text: ({ children, style }: any) => React.createElement('span', { style }, children),
    },
  };
});

// Mock setTimeout and setInterval for animation
jest.useFakeTimers();

// Set NODE_ENV to 'test' to skip animation in component
process.env.NODE_ENV = 'test';

// Mock the theme
jest.mock('../src/theme', () => ({
  theme: {
    colors: {
      primary: '#3A86FF',
      text: {
        secondary: '#94A3B8',
      },
      white: '#FFFFFF',
    },
    gradients: {
      primary: ['#3A86FF', '#1E293B'],
    },
    typography: {
      fontSize: {
        sm: 14,
        '4xl': 36,
        lg: 18,
        xs: 12,
      },
    },
    spacing: {
      xl: 32,
      sm: 8,
      lg: 24,
    },
    borderRadius: {
      '3xl': 32,
    },
    shadows: {
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  },
}));

describe('BalanceCard', () => {
  it('should be defined', () => {
    expect(BalanceCard).toBeDefined();
  });

  it('renders with correct balance', () => {
    const { container } = render(<BalanceCard balance={5000} />);

    expect(container.textContent).toContain('Total Balance');
    expect(container.textContent).toContain('$5,000.00');
  });

  it('renders with initial balance of 0', () => {
    const { container } = render(<BalanceCard balance={0} />);

    expect(container.textContent).toContain('Total Balance');
    expect(container.textContent).toContain('$0.00');
  });

  it('displays available and pending amounts', () => {
    const { container } = render(<BalanceCard balance={5000} pending={1000} />);

    expect(container.textContent).toContain('Available');
    expect(container.textContent).toContain('$4,000.00');
    expect(container.textContent).toContain('Pending');
    expect(container.textContent).toContain('$1,000.00');
  });

  it('displays available and pending amounts with default pending', () => {
    const { container } = render(<BalanceCard balance={5000} />);

    expect(container.textContent).toContain('Available');
    expect(container.textContent).toContain('$5,000.00');
    expect(container.textContent).toContain('Pending');
    expect(container.textContent).toContain('$0.00');
  });
});
