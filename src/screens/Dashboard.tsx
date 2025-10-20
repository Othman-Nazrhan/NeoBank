import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BalanceCard from '../components/BalanceCard';
import TransactionListItem from '../components/TransactionListItem';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  greeting: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.xl,
  },
  spendingCard: theme.commonStyles.card,
  spendingTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  progressValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
    marginLeft: 'auto',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  progressText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  insightCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  insightTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    fontSize: theme.typography.fontSize.sm,
    color: '#D1D5DB',
  },
  transactionsSection: {
    marginTop: theme.spacing.xl,
  },
  transactionsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
});

export default function Dashboard() {
  const { balance, transactions } = useStore();

  const progressValue = useSharedValue(0);
  React.useEffect(() => {
    progressValue.value = withTiming(0.75, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  const spendingData = [
    { x: 'Jan', y: 1200 },
    { x: 'Feb', y: 1400 },
    { x: 'Mar', y: 1100 },
    { x: 'Apr', y: 1600 },
    { x: 'May', y: 1300 },
    { x: 'Jun', y: 1800 },
  ];

  return (
    <LinearGradient colors={theme.gradients.background as [string, string]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Greeting */}
          <Text style={styles.greeting}>Good morning, Othman!</Text>

          {/* Balance Card */}
          <BalanceCard balance={balance} />

          {/* Monthly Spending Progress */}
          <View style={styles.spendingCard}>
            <Text style={styles.spendingTitle}>Monthly Spending</Text>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressValue}>75%</Text>
            </View>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, animatedStyle]} />
            </View>
            <Text style={styles.progressText}>$2,250 / $3,000</Text>
          </View>

          {/* AI Insight Card */}
          <LinearGradient
            colors={['rgba(58, 134, 255, 0.2)', 'rgba(58, 134, 255, 0.1)']}
            style={styles.insightCard}
          >
            <Text style={styles.insightTitle}>AI Insight</Text>
            <Text style={styles.insightText}>
              Your spending on dining is 20% higher this month. Consider setting a budget to save more.
            </Text>
          </LinearGradient>

          {/* Recent Transactions */}
          <View style={styles.transactionsSection}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            {transactions.slice(0, 5).map((transaction, index) => (
              <TransactionListItem key={index} transaction={transaction} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
