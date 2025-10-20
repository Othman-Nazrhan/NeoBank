import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const spendingData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1400 },
  { month: 'Mar', amount: 1100 },
  { month: 'Apr', amount: 1600 },
  { month: 'May', amount: 1300 },
  { month: 'Jun', amount: 1800 },
];

const categories = [
  { name: 'Food & Dining', amount: 450, color: '#FF6B6B' },
  { name: 'Transportation', amount: 320, color: '#4ECDC4' },
  { name: 'Entertainment', amount: 280, color: '#45B7D1' },
  { name: 'Shopping', amount: 380, color: '#FFA07A' },
  { name: 'Bills & Utilities', amount: 520, color: '#98D8C8' },
];

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  chartCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  categoriesCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 16,
    padding: 24,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.5)',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryName: {
    color: 'white',
    fontSize: 16,
  },
  categoryAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function Analytics() {
  const chartOpacity = useSharedValue(0);
  React.useEffect(() => {
    chartOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedChartStyle = useAnimatedStyle(() => ({
    opacity: chartOpacity.value,
  }));

  return (
    <LinearGradient colors={['#0B132B', '#1E293B']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Analytics</Text>

          {/* Spending Trend Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Spending Trend</Text>
            <Animated.View style={animatedChartStyle}>
              <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
                Chart visualization would be implemented here with Victory Native
              </Text>
            </Animated.View>
          </View>

          {/* Spending Categories */}
          <View style={styles.categoriesCard}>
            <Text style={styles.categoriesTitle}>Spending by Category</Text>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[styles.categoryColor, { backgroundColor: category.color }]}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>${category.amount}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
