import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

export default function PredictiveAnalytics() {
  const { theme, transactions } = useStore();
  const currentTheme = getTheme(theme);

  // Simple trend analysis
  const analyzeTrends = () => {
    const monthlyData = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };
      if (transaction.type === 'income') {
        acc[month].income += transaction.amount;
      } else {
        acc[month].expense += transaction.amount;
      }
      return acc;
    }, {} as Record<number, { income: number; expense: number }>);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = months.map((month, index) => ({
      month,
      income: monthlyData[index]?.income || 0,
      expense: monthlyData[index]?.expense || 0,
    }));

    // Simple linear regression for prediction
    const expenses = chartData.map(d => d.expense);
    const n = expenses.length;
    const sumX = expenses.reduce((sum, _, i) => sum + i, 0);
    const sumY = expenses.reduce((sum, val) => sum + val, 0);
    const sumXY = expenses.reduce((sum, val, i) => sum + val * i, 0);
    const sumXX = expenses.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const nextMonthPrediction = slope * n + intercept;

    return { chartData, nextMonthPrediction };
  };

  const { chartData, nextMonthPrediction } = analyzeTrends();

  const insights = [
    {
      title: 'Next Month Expense Prediction',
      value: `$${nextMonthPrediction.toFixed(2)}`,
      description: 'Based on current spending trends',
    },
    {
      title: 'Spending Trend',
      value: nextMonthPrediction > (chartData[chartData.length - 1]?.expense || 0) ? 'Increasing' : 'Decreasing',
      description: 'Compared to last month',
    },
    {
      title: 'Savings Potential',
      value: '15-20%',
      description: 'Recommended savings rate',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Predictive Analytics</Text>

      <View style={[styles.chartContainer, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
        <Text style={[styles.chartTitle, { color: currentTheme.text }]}>Monthly Income vs Expenses</Text>
        <Text style={[styles.noChartText, { color: currentTheme.secondary }]}>Chart visualization coming soon</Text>
      </View>

      <View style={styles.insightsContainer}>
        {insights.map((insight, index) => (
          <View key={index} style={[styles.insightCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
            <Text style={[styles.insightTitle, { color: currentTheme.text }]}>{insight.title}</Text>
            <Text style={[styles.insightValue, { color: currentTheme.primary }]}>{insight.value}</Text>
            <Text style={[styles.insightDescription, { color: currentTheme.secondary }]}>{insight.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  chartContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noChartText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  insightCard: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  insightDescription: {
    fontSize: 12,
  },
});
