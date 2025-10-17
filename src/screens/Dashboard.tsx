// Extend types for nativewind
declare module 'react-native' {
  interface ScrollViewProps {
    className?: string;
  }
  interface ActivityIndicatorProps {
    className?: string;
  }
}

import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSpring, runOnJS } from 'react-native-reanimated';
import { useStore } from '../store';
import TransactionList from '../components/TransactionList';
import Chart from '../components/Chart';
import Card3D from '../components/Card3D';

export default function Dashboard() {
  const {
    theme,
    accounts,
    transactions,
    bankAccounts,
    bankTransactions,
    isLoadingBankAccounts,
    bankAccountsError,
    fetchBankAccounts,
    fetchBankTransactions
  } = useStore();

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(50);
  const balanceScale = useSharedValue(0.8);
  const balanceTranslateY = useSharedValue(0); // For hover effect
  const actionsOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(0); // For hover effect
  const chartOpacity = useSharedValue(0);
  const transactionsOpacity = useSharedValue(0);
  const iconScale1 = useSharedValue(1);
  const iconScale2 = useSharedValue(1);
  const iconScale3 = useSharedValue(1);
  const rippleOpacity1 = useSharedValue(0);
  const rippleOpacity2 = useSharedValue(0);
  const rippleOpacity3 = useSharedValue(0);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    if (bankAccounts.length > 0) {
      // Fetch transactions for the first account
      fetchBankTransactions(bankAccounts[0].id);
    }
  }, [bankAccounts]);

  useEffect(() => {
    // Staggered animations
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    headerTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));
    balanceScale.value = withDelay(400, withSpring(1, { damping: 12 }));
    actionsOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    cardOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    chartOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
    transactionsOpacity.value = withDelay(1200, withTiming(1, { duration: 500 }));
  }, []);

  const totalBalance = bankAccounts.length > 0
    ? bankAccounts.reduce((sum, account) => sum + account.balance.amount, 0)
    : accounts.reduce((sum, account) => sum + account.balance, 0);

  const displayTransactions = bankTransactions.length > 0
    ? bankTransactions.slice(0, 5).map(t => ({
        id: t.id,
        amount: t.details.value.amount,
        description: `${t.details.type}: ${t.details.description}`,
        date: t.details.posted,
        category: t.details.type,
        type: (t.details.value.amount > 0 ? 'income' : 'expense') as 'income' | 'expense',
        isHighlighted: t.details.value.amount > 100 || t.details.type === 'Salary', // Highlight large amounts or salaries
      }))
    : transactions.slice(0, 5).map(t => ({
        ...t,
        isHighlighted: t.amount > 100 || t.category === 'Salary', // Highlight large amounts or salaries
      }));

  // AI-driven personalization
  const personalizedGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const spendingInsight = useMemo(() => {
    if (displayTransactions.length === 0) return null;
    const totalSpent = displayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const avgSpending = totalSpent / displayTransactions.length;
    if (avgSpending < 50) return "You're spending wisely this week!";
    if (avgSpending < 100) return "Keep an eye on your expenses.";
    return "Consider reviewing your spending habits.";
  }, [displayTransactions]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const balanceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: balanceScale.value }, { translateY: balanceTranslateY.value }],
  }));

  const actionsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: actionsOpacity.value,
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const chartAnimatedStyle = useAnimatedStyle(() => ({
    opacity: chartOpacity.value,
  }));

  const transactionsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: transactionsOpacity.value,
  }));

  const icon1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale1.value }],
  }));

  const icon2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale2.value }],
  }));

  const icon3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale3.value }],
  }));

  return (
    <View className="flex-1 bg-gradient-to-br from-background-light via-surface-light to-background-light/80 dark:from-background-dark dark:via-surface-dark dark:to-background-dark/80 p-6 font-sans">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Animated.View style={headerAnimatedStyle} className="mb-8">
          <Text className="text-5xl font-display font-black text-secondary-900 dark:text-secondary-100 mb-3 tracking-tight">
            {personalizedGreeting}
          </Text>
          <Text className="text-xl text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
            Here's your financial overview
          </Text>
          <TouchableOpacity
            onPressIn={() => {
              balanceTranslateY.value = withSpring(-5, { damping: 15 });
            }}
            onPressOut={() => {
              balanceTranslateY.value = withSpring(0, { damping: 15 });
            }}
            activeOpacity={1}
          >
            <Animated.View style={balanceAnimatedStyle} className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 p-8 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-lg">
              <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <View className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
              <View className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              <Text className="text-white/90 text-sm font-semibold mb-2 tracking-wide">TOTAL BALANCE</Text>
              <Text className="text-white text-5xl font-mono font-black mb-2">€{totalBalance.toFixed(2)}</Text>
              <Text className="text-white/80 text-base font-medium">Available funds</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={actionsAnimatedStyle} className="mb-8">
          <Text className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Quick Actions
          </Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
              className="bg-gradient-accent p-6 rounded-pill shadow-glass flex-1 items-center active:scale-95 relative overflow-hidden"
              onPressIn={() => {
                iconScale1.value = withSpring(1.2, { damping: 10 });
                rippleOpacity1.value = withTiming(0.3, { duration: 200 });
              }}
              onPressOut={() => {
                iconScale1.value = withSpring(1, { damping: 10 });
                rippleOpacity1.value = withTiming(0, { duration: 200 });
              }}
            >
              <Animated.View className="absolute inset-0 bg-white rounded-pill" style={{ opacity: rippleOpacity1.value }} />
              <Animated.Text style={icon1AnimatedStyle} className="text-3xl mb-2">💳</Animated.Text>
              <Text className="text-white font-bold text-base">Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gradient-accent p-6 rounded-pill shadow-glass flex-1 items-center active:scale-95 relative overflow-hidden"
              onPressIn={() => {
                iconScale2.value = withSpring(1.2, { damping: 10 });
                rippleOpacity2.value = withTiming(0.3, { duration: 200 });
              }}
              onPressOut={() => {
                iconScale2.value = withSpring(1, { damping: 10 });
                rippleOpacity2.value = withTiming(0, { duration: 200 });
              }}
            >
              <Animated.View className="absolute inset-0 bg-white rounded-pill" style={{ opacity: rippleOpacity2.value }} />
              <Animated.Text style={icon2AnimatedStyle} className="text-3xl mb-2">📊</Animated.Text>
              <Text className="text-white font-bold text-base">Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gradient-accent p-6 rounded-pill shadow-glass flex-1 items-center active:scale-95 relative overflow-hidden"
              onPressIn={() => {
                iconScale3.value = withSpring(1.2, { damping: 10 });
                rippleOpacity3.value = withTiming(0.3, { duration: 200 });
              }}
              onPressOut={() => {
                iconScale3.value = withSpring(1, { damping: 10 });
                rippleOpacity3.value = withTiming(0, { duration: 200 });
              }}
            >
              <Animated.View className="absolute inset-0 bg-white rounded-pill" style={{ opacity: rippleOpacity3.value }} />
              <Animated.Text style={icon3AnimatedStyle} className="text-3xl mb-2">💸</Animated.Text>
              <Text className="text-white font-bold text-base">Transfer</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* 3D Card */}
        <TouchableOpacity
          onPressIn={() => {
            cardTranslateY.value = withSpring(-5, { damping: 15 });
          }}
          onPressOut={() => {
            cardTranslateY.value = withSpring(0, { damping: 15 });
          }}
          activeOpacity={1}
        >
          <Animated.View style={cardAnimatedStyle} className="mb-10">
            <Card3D />
          </Animated.View>
        </TouchableOpacity>

        {/* Charts Section */}
        <Animated.View style={chartAnimatedStyle} className="mb-10 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 shadow-glass border border-white/20 dark:border-white/10">
          <Text className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Spending Insights
          </Text>
          {spendingInsight && (
            <Text className="text-lg text-secondary-700 dark:text-secondary-300 mb-6 italic">
              {spendingInsight}
            </Text>
          )}
          <Chart />
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View style={transactionsAnimatedStyle} className="mb-10 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 shadow-glass border border-white/20 dark:border-white/10">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text className="text-primary-600 dark:text-primary-400 font-semibold text-base">View All →</Text>
            </TouchableOpacity>
          </View>
          {isLoadingBankAccounts && <ActivityIndicator size="large" className="text-primary-500 mb-6" />}
          {bankAccountsError && <Text className="text-red-500 text-sm mb-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl">{bankAccountsError}</Text>}
          <TransactionList transactions={displayTransactions} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}
