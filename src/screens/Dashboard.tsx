import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BalanceCard from '../components/BalanceCard';
import TransactionListItem from '../components/TransactionListItem';
import { useStore } from '../store/useStore';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  spendingCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
  spendingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressValue: {
    fontSize: 14,
    color: 'white',
    marginLeft: 'auto',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3A86FF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  insightCard: {
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  transactionsSection: {
    marginTop: 24,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
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
    <LinearGradient colors={['#0B132B', '#1E293B']} style={styles.gradient}>
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
