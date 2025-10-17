import axios from 'axios';

// API URLs
const EXCHANGE_RATE_HOST_URL = 'https://api.exchangerate.host/latest';
const OPEN_BANK_PROJECT_URL = 'https://api.openbankproject.com/obp/v4.0.0';
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

// Interfaces
export interface ExchangeRates {
  [key: string]: number;
}

export interface ExchangeRateResponse {
  rates: ExchangeRates;
  base: string;
  date: string;
}

export interface BankAccount {
  id: string;
  label: string;
  type: string;
  balance: {
    amount: number;
    currency: string;
  };
  bank_id: string;
}

export interface BankTransaction {
  id: string;
  this_account: {
    id: string;
  };
  other_account: {
    holder: {
      name: string;
    };
  };
  details: {
    type: string;
    description: string;
    posted: string;
    completed: string;
    new_balance: {
      amount: number;
      currency: string;
    };
    value: {
      amount: number;
      currency: string;
    };
  };
}

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface ETF {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

// Exchange Rate API (ExchangeRate.host)
export const fetchExchangeRates = async (base: string = 'USD'): Promise<ExchangeRateResponse> => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_HOST_URL}?base=${base}`);
    return {
      rates: response.data.rates,
      base: response.data.base,
      date: response.data.date,
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

// Open Bank Project API (for realistic banking data)
export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
  try {
    // Using a public sandbox/test endpoint
    const response = await axios.get(`${OPEN_BANK_PROJECT_URL}/my/accounts`, {
      headers: {
        'Authorization': 'DirectLogin token=your-token-here', // Would need actual token
        'Content-Type': 'application/json',
      },
    });
    return response.data.accounts || [];
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    // Return mock data if API fails
    return [
      {
        id: '1',
        label: 'Main Checking',
        type: 'checking',
        balance: { amount: 5420.50, currency: 'USD' },
        bank_id: 'bank1',
      },
      {
        id: '2',
        label: 'Savings Account',
        type: 'savings',
        balance: { amount: 12500.00, currency: 'USD' },
        bank_id: 'bank1',
      },
    ];
  }
};

export const fetchBankTransactions = async (accountId: string): Promise<BankTransaction[]> => {
  try {
    const response = await axios.get(`${OPEN_BANK_PROJECT_URL}/my/banks/bank1/accounts/${accountId}/transactions`, {
      headers: {
        'Authorization': 'DirectLogin token=your-token-here',
        'Content-Type': 'application/json',
      },
    });
    return response.data.transactions || [];
  } catch (error) {
    console.error('Error fetching bank transactions:', error);
    // Return mock data if API fails
    return [
      {
        id: '1',
        this_account: { id: accountId },
        other_account: { holder: { name: 'Grocery Store' } },
        details: {
          type: 'DEBIT',
          description: 'Weekly groceries',
          posted: new Date().toISOString(),
          completed: new Date().toISOString(),
          new_balance: { amount: 5420.50, currency: 'USD' },
          value: { amount: -85.30, currency: 'USD' },
        },
      },
    ];
  }
};

// CoinGecko API (for crypto data)
export const fetchCryptoPrices = async (coinIds: string[] = ['bitcoin', 'ethereum']): Promise<CryptoCoin[]> => {
  try {
    const ids = coinIds.join(',');
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return mock data if API fails
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 45000,
        market_cap: 850000000000,
        market_cap_rank: 1,
        price_change_percentage_24h: 2.5,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        current_price: 2500,
        market_cap: 300000000000,
        market_cap_rank: 2,
        price_change_percentage_24h: -1.2,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      },
    ];
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): number => {
  if (fromCurrency === toCurrency) return amount;

  // Convert to USD first, then to target currency
  const amountInUSD = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
  const convertedAmount = toCurrency === 'USD' ? amountInUSD : amountInUSD * rates[toCurrency];

  return convertedAmount;
};

// Mock API for stocks and ETFs
export const fetchStocks = async (): Promise<Stock[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: 'aapl',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      current_price: 150.25,
      market_cap: 2500000000000,
      price_change_percentage_24h: 1.69,
    },
    {
      id: 'googl',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      current_price: 2800.00,
      market_cap: 1800000000000,
      price_change_percentage_24h: -0.56,
    },
    {
      id: 'msft',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      current_price: 305.50,
      market_cap: 2300000000000,
      price_change_percentage_24h: 0.85,
    },
  ];
};

export const fetchETFs = async (): Promise<ETF[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: 'spy',
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF',
      current_price: 450.80,
      price_change_percentage_24h: 0.27,
    },
    {
      id: 'qqq',
      symbol: 'QQQ',
      name: 'Invesco QQQ ETF',
      current_price: 380.25,
      price_change_percentage_24h: -0.12,
    },
    {
      id: 'vti',
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      current_price: 220.15,
      price_change_percentage_24h: 0.45,
    },
  ];
};
