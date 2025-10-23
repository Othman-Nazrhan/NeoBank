import React from 'react';
import { render } from '@testing-library/react-native';
import TransactionListItem from '../src/components/TransactionListItem';

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  ArrowUpRight: () => null,
  ArrowDownLeft: () => null,
  Coffee: () => null,
  Car: () => null,
  ShoppingBag: () => null,
  Home: () => null,
  Gamepad2: () => null,
  Heart: () => null,
}));





describe('TransactionListItem', () => {
  it('should be defined', () => {
    expect(TransactionListItem).toBeDefined();
  });

  it('renders debit transaction correctly', () => {
    const transaction = {
      id: '1',
      description: 'Coffee Shop',
      amount: 5.50,
      date: '2023-01-01',
      type: 'debit' as const,
      category: 'food',
    };

    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText('Coffee Shop')).toBeTruthy();
    expect(getByText('2023-01-01')).toBeTruthy();
    expect(getByText('-$5.50')).toBeTruthy();
  });

  it('renders credit transaction correctly', () => {
    const transaction = {
      id: '2',
      description: 'Salary',
      amount: 3000.00,
      date: '2023-01-01',
      type: 'credit' as const,
      category: 'income',
    };

    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText('Salary')).toBeTruthy();
    expect(getByText('2023-01-01')).toBeTruthy();
    expect(getByText('+$3000.00')).toBeTruthy();
  });

  it('renders health category transaction correctly', () => {
    const transaction = {
      id: '3',
      description: 'Doctor Visit',
      amount: 150.00,
      date: '2023-01-01',
      type: 'debit' as const,
      category: 'health',
    };

    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText('Doctor Visit')).toBeTruthy();
    expect(getByText('2023-01-01')).toBeTruthy();
    expect(getByText('-$150.00')).toBeTruthy();
  });
});
