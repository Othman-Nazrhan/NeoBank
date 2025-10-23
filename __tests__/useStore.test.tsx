import { renderHook, act } from '@testing-library/react-native';
import { useStore } from '../src/store/useStore';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('useStore', () => {
  it('should be defined', () => {
    expect(useStore).toBeDefined();
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.balance).toBe(12450.25);
    expect(result.current.transactions).toHaveLength(5);
  });

  it('should add transaction correctly', () => {
    const { result } = renderHook(() => useStore());

    const initialBalance = result.current.balance;
    const initialTransactionsLength = result.current.transactions.length;

    act(() => {
      result.current.addTransaction({
        id: '6',
        description: 'Test Transaction',
        amount: 100,
        date: 'Today',
        type: 'credit',
        category: 'Test',
      });
    });

    expect(result.current.balance).toBe(initialBalance + 100);
    expect(result.current.transactions).toHaveLength(initialTransactionsLength + 1);
  });

  it('should update balance correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.updateBalance(15000);
    });

    expect(result.current.balance).toBe(15000);
  });

  it('should handle debit transaction', () => {
    const { result } = renderHook(() => useStore());

    const initialBalance = result.current.balance;

    act(() => {
      result.current.addTransaction({
        id: '7',
        description: 'Debit Transaction',
        amount: 50,
        date: 'Today',
        type: 'debit',
        category: 'Test',
      });
    });

    expect(result.current.balance).toBe(initialBalance - 50);
  });
});
