import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { theme } from '../theme';
import { formatCurrency } from '../utils/formatNumber';

interface BalanceCardProps {
  balance: number;
  pending?: number;
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: theme.borderRadius['3xl'],
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  totalBalance: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  balanceText: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.xs,
    textTransform: 'uppercase',
  },
  value: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
  },
});

export default function BalanceCard({ balance, pending = 0 }: BalanceCardProps) {
  const animatedBalance = useSharedValue(balance);

  useEffect(() => {
    animatedBalance.value = withTiming(balance, { duration: 1500 });
  }, [balance, animatedBalance]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1, // Placeholder for potential future use
  }));

  const displayBalance = animatedBalance.value;

  return (
    <LinearGradient
      colors={theme.gradients.primary as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.totalBalance}>Total Balance</Text>
      <Text style={styles.balanceText}>
        {formatCurrency(displayBalance)}
      </Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Available</Text>
          <Text style={styles.value}>{formatCurrency(balance - pending)}</Text>
        </View>
        <View>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.value}>{formatCurrency(pending)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
