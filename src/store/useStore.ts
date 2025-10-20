import { create } from 'zustand';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

interface StoreState {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateBalance: (amount: number) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Starbucks Coffee',
    amount: -5.75,
    date: 'Today',
    type: 'debit',
    category: 'Food',
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 3500.00,
    date: 'Yesterday',
    type: 'credit',
    category: 'Income',
  },
  {
    id: '3',
    description: 'Uber Ride',
    amount: -12.50,
    date: '2 days ago',
    type: 'debit',
    category: 'Transportation',
  },
  {
    id: '4',
    description: 'Amazon Purchase',
    amount: -89.99,
    date: '3 days ago',
    type: 'debit',
    category: 'Shopping',
  },
  {
    id: '5',
    description: 'Electric Bill',
    amount: -120.00,
    date: '4 days ago',
    type: 'debit',
    category: 'Bills',
  },
];

export const useStore = create<StoreState>((set) => ({
  balance: 12450.25,
  transactions: mockTransactions,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
      balance: transaction.type === 'credit'
        ? state.balance + transaction.amount
        : state.balance - Math.abs(transaction.amount),
    })),
  updateBalance: (amount) =>
    set((state) => ({
      balance: amount,
    })),
}));
