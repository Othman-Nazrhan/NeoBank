import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

export default function Chart() {
  const { theme, transactions } = useStore();
  const currentTheme = getTheme(theme);

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

  return (
    <View style={[styles.frameContainer, { backgroundColor: currentTheme.card }]}>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: currentTheme.text }]}
        >
          Spending by Category
        </Text>
        <VictoryPie
          data={pieData}
          colorScale={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
          style={{
            labels: {
              fontSize: 12,
              fill: currentTheme.text,
            },
          }}
          width={300}
          height={300}
          innerRadius={50}
        />

        <Text
          style={[styles.title, { color: currentTheme.text, marginTop: 24 }]}
        >
          Monthly Savings
        </Text>
        <VictoryChart width={300} height={200}>
          <VictoryAxis
            style={{
              axis: { stroke: currentTheme.border },
              tickLabels: { fill: currentTheme.text },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: currentTheme.border },
              tickLabels: { fill: currentTheme.text },
            }}
          />
          <VictoryBar
            data={barData}
            style={{
              data: { fill: currentTheme.primary },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 8,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
