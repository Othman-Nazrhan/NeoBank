import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';
import Chart from '../components/Chart';

export default function Analytics() {
  const {
    theme,
    transactions,
    bankTransactions,
    isLoadingTransactions,
    transactionsError,
    fetchBankTransactions,
    bankAccounts
  } = useStore();
  const currentTheme = getTheme(theme);

  useEffect(() => {
    if (bankAccounts.length > 0) {
      fetchBankTransactions(bankAccounts[0].id);
    }
  }, [bankAccounts]);

  const allTransactions = bankTransactions.length > 0
    ? bankTransactions.map(t => ({
        id: t.id,
        amount: Math.abs(t.details.value.amount),
        description: t.details.description,
        date: t.details.posted,
        category: t.details.type,
        type: t.details.value.amount > 0 ? 'income' : 'expense' as const,
      }))
    : transactions;

  const totalIncome = allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const categorySpending = allTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const topCategories = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Financial Analytics</Text>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.statLabel, { color: currentTheme.text }]}>Total Income</Text>
          <Text style={[styles.statValue, { color: currentTheme.accent }]}>€{totalIncome.toFixed(2)}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.statLabel, { color: currentTheme.text }]}>Total Expenses</Text>
          <Text style={[styles.statValue, { color: 'red' }]}>€{totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.statLabel, { color: currentTheme.text }]}>Savings Rate</Text>
          <Text style={[styles.statValue, { color: currentTheme.primary }]}>{savingsRate.toFixed(1)}%</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Spending Overview</Text>
        <Chart />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Top Spending Categories</Text>
        {topCategories.map(([category, amount]) => (
          <View key={category} style={[styles.categoryItem, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.categoryName, { color: currentTheme.text }]}>{category}</Text>
            <Text style={[styles.categoryAmount, { color: 'red' }]}>€{amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.recommendationsContainer}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>AI Recommendations</Text>
        <View style={[styles.recommendationCard, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.recommendationText, { color: currentTheme.text }]}>
            Based on your spending, consider setting aside €{(totalIncome * 0.2).toFixed(2)} for savings this month.
          </Text>
        </View>
        <View style={[styles.recommendationCard, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.recommendationText, { color: currentTheme.text }]}>
            Your highest spending category is {topCategories[0]?.[0] || 'N/A'}. Try to reduce expenses here by 10%.
          </Text>
        </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    marginBottom: 20,
  },
  recommendationCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
