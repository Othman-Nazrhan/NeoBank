// Extend types for nativewind
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
}

import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis, VictoryLine } from 'victory';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useStore } from '../store';

export default function Chart() {
  const { transactions, theme } = useStore();

  const pieOpacity = useSharedValue(0);
  const barOpacity = useSharedValue(0);
  const lineOpacity = useSharedValue(0);

  React.useEffect(() => {
    pieOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    barOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
    lineOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
  }, []);

  // Prepare data for pie chart (spending by category)
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, amount], index) => ({
    x: category,
    y: amount,
    label: `${category}\n$${amount.toFixed(2)}`,
  }));

  // Prepare data for bar chart (income vs expenses over time - simplified)
  const monthlyData = [
    { month: 'Jan', income: 3000, expenses: 2500 },
    { month: 'Feb', income: 3200, expenses: 2700 },
    { month: 'Mar', income: 3100, expenses: 2600 },
    { month: 'Apr', income: 3300, expenses: 2800 },
    { month: 'May', income: 3400, expenses: 2900 },
  ];

  const barData = monthlyData.map(item => ({
    x: item.month,
    y: item.income - item.expenses,
  }));

  // Prepare data for line chart (balance trend)
  const balanceTrend = [
    { month: 'Jan', balance: 5000 },
    { month: 'Feb', balance: 5200 },
    { month: 'Mar', balance: 5100 },
    { month: 'Apr', balance: 5300 },
    { month: 'May', balance: 5400 },
  ];

  const pieAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pieOpacity.value,
  }));

  const barAnimatedStyle = useAnimatedStyle(() => ({
    opacity: barOpacity.value,
  }));

  const lineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: lineOpacity.value,
  }));

  const isDark = theme === 'dark';

  return (
    <View className="items-center">
      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold mb-4">
        Spending by Category
      </Text>
      <Animated.View style={pieAnimatedStyle}>
        <VictoryPie
          data={pieData}
          colorScale={isDark ? ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'] : ['#DC2626', '#059669', '#0891B2', '#16A34A', '#CA8A04']}
          style={{
            labels: {
              fontSize: 12,
              fill: isDark ? '#F1F5F9' : '#0F172A',
            },
          }}
          width={280}
          height={280}
          innerRadius={50}
          animate={{ duration: 1000, easing: 'bounce' }}
        />
      </Animated.View>

      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold mb-4 mt-6">
        Monthly Savings
      </Text>
      <Animated.View style={barAnimatedStyle}>
        <VictoryChart width={280} height={180} animate={{ duration: 1000 }}>
          <VictoryAxis
            style={{
              axis: { stroke: isDark ? '#475569' : '#E2E8F0' },
              tickLabels: { fill: isDark ? '#CBD5E1' : '#475569' },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: isDark ? '#475569' : '#E2E8F0' },
              tickLabels: { fill: isDark ? '#CBD5E1' : '#475569' },
            }}
          />
          <VictoryBar
            data={barData}
            style={{
              data: { fill: isDark ? '#60A5FA' : '#3B82F6' },
            }}
          />
        </VictoryChart>
      </Animated.View>

      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold mb-4 mt-6">
        Balance Trend
      </Text>
      <Animated.View style={lineAnimatedStyle}>
        <VictoryChart width={280} height={180} animate={{ duration: 1000 }}>
          <VictoryAxis
            style={{
              axis: { stroke: isDark ? '#475569' : '#E2E8F0' },
              tickLabels: { fill: isDark ? '#CBD5E1' : '#475569' },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: isDark ? '#475569' : '#E2E8F0' },
              tickLabels: { fill: isDark ? '#CBD5E1' : '#475569' },
            }}
          />
          <VictoryLine
            data={balanceTrend}
            style={{
              data: { stroke: isDark ? '#10B981' : '#059669', strokeWidth: 3 },
            }}
            interpolation="natural"
          />
        </VictoryChart>
      </Animated.View>
    </View>
  );
}
