import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, Coffee, Car, ShoppingBag, Home, Gamepad2 } from 'lucide-react-native';
import { theme } from '../theme';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

interface TransactionListItemProps {
  transaction: Transaction;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.5)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#1F2937',
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
  },
  date: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    marginRight: theme.spacing.sm,
  },
  creditAmount: {
    color: theme.colors.accent.success,
  },
  debitAmount: {
    color: theme.colors.white,
  },
});

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
    case 'dining':
      return <Coffee size={20} color="#94A3B8" />;
    case 'transportation':
      return <Car size={20} color="#94A3B8" />;
    case 'shopping':
      return <ShoppingBag size={20} color="#94A3B8" />;
    case 'bills':
    case 'utilities':
      return <Home size={20} color="#94A3B8" />;
    case 'entertainment':
      return <Gamepad2 size={20} color="#94A3B8" />;
    default:
      return <ArrowUpRight size={20} color="#94A3B8" />;
  }
};

export default function TransactionListItem({ transaction }: TransactionListItemProps) {
  const isCredit = transaction.type === 'credit';

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          {getCategoryIcon(transaction.category)}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text style={[styles.amount, isCredit ? styles.creditAmount : styles.debitAmount]}>
          {isCredit ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </Text>
        {isCredit ? (
          <ArrowDownLeft size={16} color="#10B981" />
        ) : (
          <ArrowUpRight size={16} color="#EF4444" />
        )}
      </View>
    </View>
  );
}
