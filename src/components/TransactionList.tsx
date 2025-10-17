import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useStore } from '../store';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
  isHighlighted?: boolean; // Add for adaptive highlights
}

interface TransactionListProps {
  transactions: Transaction[];
}

const AnimatedTransactionItem = ({ item, index }: { item: Transaction; index: number }) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(50);

  React.useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateX.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Food': '🍽️',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Bills': '💡',
      'Salary': '💰',
      'Freelance': '💻',
      'Investment': '📈',
    };
    return icons[category] || '💳';
  };

  return (
    <Animated.View style={animatedStyle} className="mb-3">
      <View className={`flex-row justify-between items-center p-4 bg-gradient-to-r from-card-light to-card-light/80 dark:from-card-dark dark:to-card-dark/80 border border-border-light dark:border-border-dark rounded-2xl shadow-lg ${item.isHighlighted ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''}`}>
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl items-center justify-center mr-3">
            <Text className="text-xl">{getCategoryIcon(item.category)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-secondary-900 dark:text-secondary-100 text-base font-bold mb-1">
              {item.description}
            </Text>
            <Text className="text-secondary-600 dark:text-secondary-400 text-sm mb-0.5">
              {item.category}
            </Text>
            <Text className="text-secondary-500 dark:text-secondary-500 text-xs">
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View className={`px-3 py-1 rounded-xl ${item.type === 'income' ? 'bg-accent-100 dark:bg-accent-900' : 'bg-red-100 dark:bg-red-900'}`}>
          <Text className={`text-sm font-bold ${item.type === 'income' ? 'text-accent-700 dark:text-accent-300' : 'text-red-600 dark:text-red-400'}`}>
            {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item, index }) => <AnimatedTransactionItem item={item} index={index} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="px-1"
    />
  );
}
