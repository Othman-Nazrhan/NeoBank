import { create } from 'zustand';
import {
  fetchExchangeRates,
  fetchBankAccounts,
  fetchBankTransactions,
  fetchCryptoPrices,
  fetchStocks,
  fetchETFs,
  ExchangeRates,
  BankAccount,
  BankTransaction,
  CryptoCoin,
  Stock,
  ETF
} from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Account {
  id: string;
  type: 'checking' | 'savings' | 'crypto';
  balance: number;
  currency: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

interface Card {
  id: string;
  number: string;
  expiry: string;
  cvv: string;
  isVirtual: boolean;
  isBlocked: boolean;
}

interface AppState {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  cards: Card[];
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  exchangeRates: ExchangeRates | null;
  isLoadingRates: boolean;
  ratesError: string | null;
  bankAccounts: BankAccount[];
  isLoadingBankAccounts: boolean;
  bankAccountsError: string | null;
  bankTransactions: BankTransaction[];
  isLoadingTransactions: boolean;
  transactionsError: string | null;
  cryptoCoins: CryptoCoin[];
  isLoadingCrypto: boolean;
  cryptoError: string | null;
  stocks: Stock[];
  isLoadingStocks: boolean;
  stocksError: string | null;
  etfs: ETF[];
  isLoadingETFs: boolean;
  etfsError: string | null;
  setUser: (user: User) => void;
  addAccount: (account: Account) => void;
  addTransaction: (transaction: Transaction) => void;
  addCard: (card: Card) => void;
  setAuthenticated: (auth: boolean) => void;
  toggleTheme: () => void;
  fetchExchangeRates: () => Promise<void>;
  setExchangeRates: (rates: ExchangeRates) => void;
  setLoadingRates: (loading: boolean) => void;
  setRatesError: (error: string | null) => void;
  fetchBankAccounts: () => Promise<void>;
  setBankAccounts: (accounts: BankAccount[]) => void;
  setLoadingBankAccounts: (loading: boolean) => void;
  setBankAccountsError: (error: string | null) => void;
  fetchBankTransactions: (accountId: string) => Promise<void>;
  setBankTransactions: (transactions: BankTransaction[]) => void;
  setLoadingTransactions: (loading: boolean) => void;
  setTransactionsError: (error: string | null) => void;
  fetchCryptoPrices: () => Promise<void>;
  setCryptoCoins: (coins: CryptoCoin[]) => void;
  setLoadingCrypto: (loading: boolean) => void;
  setCryptoError: (error: string | null) => void;
  fetchStocks: () => Promise<void>;
  setStocks: (stocks: Stock[]) => void;
  setLoadingStocks: (loading: boolean) => void;
  setStocksError: (error: string | null) => void;
  fetchETFs: () => Promise<void>;
  setETFs: (etfs: ETF[]) => void;
  setLoadingETFs: (loading: boolean) => void;
  setETFsError: (error: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  accounts: [],
  transactions: [],
  cards: [],
  isAuthenticated: false,
  theme: 'light',
  exchangeRates: null,
  isLoadingRates: false,
  ratesError: null,
  bankAccounts: [],
  isLoadingBankAccounts: false,
  bankAccountsError: null,
  bankTransactions: [],
  isLoadingTransactions: false,
  transactionsError: null,
  cryptoCoins: [],
  isLoadingCrypto: false,
  cryptoError: null,
  stocks: [],
  isLoadingStocks: false,
  stocksError: null,
  etfs: [],
  isLoadingETFs: false,
  etfsError: null,
  setUser: (user) => set({ user }),
  addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
  addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  fetchExchangeRates: async () => {
    set({ isLoadingRates: true, ratesError: null });
    try {
      const data = await fetchExchangeRates();
      set({ exchangeRates: data.rates, isLoadingRates: false });
    } catch (error) {
      set({ ratesError: 'Failed to fetch exchange rates', isLoadingRates: false });
    }
  },
  setExchangeRates: (rates) => set({ exchangeRates: rates }),
  setLoadingRates: (loading) => set({ isLoadingRates: loading }),
  setRatesError: (error) => set({ ratesError: error }),
  fetchBankAccounts: async () => {
    set({ isLoadingBankAccounts: true, bankAccountsError: null });
    try {
      const accounts = await fetchBankAccounts();
      set({ bankAccounts: accounts, isLoadingBankAccounts: false });
    } catch (error) {
      set({ bankAccountsError: 'Failed to fetch bank accounts', isLoadingBankAccounts: false });
    }
  },
  setBankAccounts: (accounts) => set({ bankAccounts: accounts }),
  setLoadingBankAccounts: (loading) => set({ isLoadingBankAccounts: loading }),
  setBankAccountsError: (error) => set({ bankAccountsError: error }),
  fetchBankTransactions: async (accountId) => {
    set({ isLoadingTransactions: true, transactionsError: null });
    try {
      const transactions = await fetchBankTransactions(accountId);
      set({ bankTransactions: transactions, isLoadingTransactions: false });
    } catch (error) {
      set({ transactionsError: 'Failed to fetch transactions', isLoadingTransactions: false });
    }
  },
  setBankTransactions: (transactions) => set({ bankTransactions: transactions }),
  setLoadingTransactions: (loading) => set({ isLoadingTransactions: loading }),
  setTransactionsError: (error) => set({ transactionsError: error }),
  fetchCryptoPrices: async () => {
    set({ isLoadingCrypto: true, cryptoError: null });
    try {
      const coins = await fetchCryptoPrices();
      set({ cryptoCoins: coins, isLoadingCrypto: false });
    } catch (error) {
      set({ cryptoError: 'Failed to fetch crypto prices', isLoadingCrypto: false });
    }
  },
  setCryptoCoins: (coins) => set({ cryptoCoins: coins }),
  setLoadingCrypto: (loading) => set({ isLoadingCrypto: loading }),
  setCryptoError: (error) => set({ cryptoError: error }),
  fetchStocks: async () => {
    set({ isLoadingStocks: true, stocksError: null });
    try {
      const stocks = await fetchStocks();
      set({ stocks, isLoadingStocks: false });
    } catch (error) {
      set({ stocksError: 'Failed to fetch stocks', isLoadingStocks: false });
    }
  },
  setStocks: (stocks) => set({ stocks }),
  setLoadingStocks: (loading) => set({ isLoadingStocks: loading }),
  setStocksError: (error) => set({ stocksError: error }),
  fetchETFs: async () => {
    set({ isLoadingETFs: true, etfsError: null });
    try {
      const etfs = await fetchETFs();
      set({ etfs, isLoadingETFs: false });
    } catch (error) {
      set({ etfsError: 'Failed to fetch ETFs', isLoadingETFs: false });
    }
  },
  setETFs: (etfs) => set({ etfs }),
  setLoadingETFs: (loading) => set({ isLoadingETFs: loading }),
  setETFsError: (error) => set({ etfsError: error }),
}));
