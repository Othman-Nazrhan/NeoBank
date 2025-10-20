import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { theme } from '../theme';

interface BalanceCardProps {
  balance: number;
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

export default function BalanceCard({ balance }: BalanceCardProps) {
  const [displayBalance, setDisplayBalance] = React.useState(0);

  React.useEffect(() => {
    const startValue = 0;
    const endValue = balance;
    const duration = 1500;
    const steps = 60; // 60 FPS
    const increment = (endValue - startValue) / steps;
    const stepDuration = duration / steps;

    let currentValue = startValue;
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= endValue) {
        setDisplayBalance(endValue);
        clearInterval(interval);
      } else {
        setDisplayBalance(currentValue);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [balance]);

  return (
    <LinearGradient
      colors={theme.gradients.primary as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.totalBalance}>Total Balance</Text>
      <Text style={styles.balanceText}>${displayBalance.toFixed(2)}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Available</Text>
          <Text style={styles.value}>${balance.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.value}>$0.00</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
