import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: 'crypto' | 'stock' | 'etf';
  price: number;
  change: number;
  changePercent: number;
  holdings?: number;
}

export default function Investments() {
  const { theme, cryptoCoins, fetchCryptoPrices, stocks, fetchStocks, etfs, fetchETFs } = useStore();
  const currentTheme = getTheme(theme);

  useEffect(() => {
    fetchCryptoPrices();
    fetchStocks();
    fetchETFs();
  }, []);

  const stockInvestments: Investment[] = stocks.map(stock => ({
    id: stock.id,
    symbol: stock.symbol,
    name: stock.name,
    type: 'stock' as const,
    price: stock.current_price,
    change: stock.current_price * (stock.price_change_percentage_24h / 100),
    changePercent: stock.price_change_percentage_24h,
  }));

  const etfInvestments: Investment[] = etfs.map(etf => ({
    id: etf.id,
    symbol: etf.symbol,
    name: etf.name,
    type: 'etf' as const,
    price: etf.current_price,
    change: etf.current_price * (etf.price_change_percentage_24h / 100),
    changePercent: etf.price_change_percentage_24h,
  }));

  const cryptoInvestments: Investment[] = cryptoCoins.map(coin => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    type: 'crypto' as const,
    price: coin.current_price,
    change: coin.current_price * (coin.price_change_percentage_24h / 100),
    changePercent: coin.price_change_percentage_24h,
  }));

  const allInvestments = [...cryptoInvestments, ...stockInvestments, ...etfInvestments];

  const renderInvestment = ({ item }: { item: Investment }) => (
    <TouchableOpacity style={[styles.investmentItem, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
      <View style={styles.investmentInfo}>
        <Text style={[styles.symbol, { color: currentTheme.text }]}>{item.symbol}</Text>
        <Text style={[styles.name, { color: currentTheme.secondary }]}>{item.name}</Text>
        <Text style={[styles.type, { color: currentTheme.secondary }]}>{item.type.toUpperCase()}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={[styles.price, { color: currentTheme.text }]}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: item.change >= 0 ? '#4CAF50' : '#F44336' }]}>
          {item.change >= 0 ? '+' : ''}${item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Investments</Text>

      <FlatList
        data={allInvestments}
        renderItem={renderInvestment}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  investmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  investmentInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    marginTop: 2,
  },
  type: {
    fontSize: 12,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
  },
});
