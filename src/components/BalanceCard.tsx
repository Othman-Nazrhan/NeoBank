import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

interface BalanceCardProps {
  balance: number;
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  totalBalance: {
    color: '#94A3B8',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
    fontSize: 18,
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
      colors={['#3A86FF', '#1E293B']}
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
