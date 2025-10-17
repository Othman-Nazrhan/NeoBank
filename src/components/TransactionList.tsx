import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const { theme } = useStore();
  const currentTheme = getTheme(theme);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View
      style={[
        styles.transactionItem,
        {
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }
      ]}
    >
      <View style={styles.transactionInfo}>
        <Text
          style={[styles.description, { color: currentTheme.text }]}
        >
          {item.description}
        </Text>
        <Text
          style={[styles.category, { color: currentTheme.secondary }]}
        >
          {item.category}
        </Text>
        <Text
          style={[styles.date, { color: currentTheme.secondary }]}
        >
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: item.type === 'income' ? currentTheme.accent : currentTheme.error }
        ]}
      >
        {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
