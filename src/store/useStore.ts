import { create } from 'zustand';
import axios from 'axios';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

interface StockData {
  symbol: string;
  price: string;
  change: string;
}

interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface BankingData {
  balance: number;
  transactions: Transaction[];
}

interface AIResponse {
  message: string;
}

interface PaymentData {
  id: string;
  amount: number;
  status: string;
}

interface StoreState {
  balance: number;
  transactions: Transaction[];
  stockData: StockData[] | null;
  isLoadingStock: boolean;
  stockError: string | null;
  currencyRate: CurrencyRate | null;
  isLoadingCurrency: boolean;
  currencyError: string | null;
  cryptoData: CryptoData[] | null;
  isLoadingCrypto: boolean;
  cryptoError: string | null;
  bankingData: BankingData | null;
  isLoadingBanking: boolean;
  bankingError: string | null;
  aiResponse: AIResponse | null;
  isLoadingAI: boolean;
  aiError: string | null;
  paymentData: PaymentData[] | null;
  isLoadingPayment: boolean;
  paymentError: string | null;
  addTransaction: (transaction: Transaction) => void;
  updateBalance: (amount: number) => void;
  fetchStockData: () => Promise<void>;
  fetchCurrencyRate: (from: string, to: string) => Promise<void>;
  fetchCryptoData: () => Promise<void>;
  fetchBankingData: () => Promise<void>;
  fetchAIResponse: (message: string) => Promise<void>;
  fetchPaymentData: () => Promise<void>;
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

export const useStore = create<StoreState>((set, get) => ({
  balance: 12450.25,
  transactions: mockTransactions,
  stockData: null,
  isLoadingStock: false,
  stockError: null,
  currencyRate: null,
  isLoadingCurrency: false,
  currencyError: null,
  cryptoData: null,
  isLoadingCrypto: false,
  cryptoError: null,
  bankingData: null,
  isLoadingBanking: false,
  bankingError: null,
  aiResponse: null,
  isLoadingAI: false,
  aiError: null,
  paymentData: null,
  isLoadingPayment: false,
  paymentError: null,
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
  fetchStockData: async () => {
    set({ isLoadingStock: true, stockError: null });
    try {
      // Mock stock data for demonstration
      const mockStockData: StockData[] = [
        { symbol: 'AAPL', price: '150.25', change: '+2.50' },
        { symbol: 'GOOGL', price: '2750.80', change: '-15.20' },
        { symbol: 'MSFT', price: '305.60', change: '+1.80' },
      ];
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ stockData: mockStockData, isLoadingStock: false });
    } catch (error) {
      set({ stockError: 'Failed to fetch stock data', isLoadingStock: false });
    }
  },
  fetchCurrencyRate: async (from: string, to: string) => {
    set({ isLoadingCurrency: true, currencyError: null });
    try {
      const response = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
      const rate = response.data.result;
      set({ currencyRate: { from, to, rate }, isLoadingCurrency: false });
    } catch (error) {
      set({ currencyError: 'Failed to fetch currency rate', isLoadingCurrency: false });
    }
  },
  fetchCryptoData: async () => {
    set({ isLoadingCrypto: true, cryptoError: null });
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      set({ cryptoData: response.data, isLoadingCrypto: false });
    } catch (error) {
      set({ cryptoError: 'Failed to fetch crypto data', isLoadingCrypto: false });
    }
  },
  fetchBankingData: async () => {
    set({ isLoadingBanking: true, bankingError: null });
    try {
      // Mock API call for Open Bank Project
      const response = await axios.get('https://api.openbankproject.com/obp/v3.1.0/banks/rbs/accounts/public');
      // Assuming response structure, adjust as needed
      const bankingData: BankingData = {
        balance: get().balance,
        transactions: get().transactions,
      };
      set({ bankingData, isLoadingBanking: false });
    } catch (error) {
      set({ bankingError: 'Failed to fetch banking data', isLoadingBanking: false });
    }
  },
  fetchAIResponse: async (message: string) => {
    set({ isLoadingAI: true, aiError: null });
    try {
      // Use OpenAI API or Hugging Face
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with actual key
          'Content-Type': 'application/json',
        },
      });
      const aiMessage = response.data.choices[0].message.content;
      set({ aiResponse: { message: aiMessage }, isLoadingAI: false });
    } catch (error) {
      set({ aiError: 'Failed to fetch AI response', isLoadingAI: false });
    }
  },
  fetchPaymentData: async () => {
    set({ isLoadingPayment: true, paymentError: null });
    try {
      // Mock payment data for demonstration
      const mockPaymentData: PaymentData[] = [
        { id: 'pi_1234567890', amount: 50.00, status: 'succeeded' },
        { id: 'pi_0987654321', amount: 25.50, status: 'pending' },
        { id: 'pi_1122334455', amount: 100.00, status: 'succeeded' },
      ];
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ paymentData: mockPaymentData, isLoadingPayment: false });
    } catch (error) {
      set({ paymentError: 'Failed to fetch payment data', isLoadingPayment: false });
    }
  },
}));
