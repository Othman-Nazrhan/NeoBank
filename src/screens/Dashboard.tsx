import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    if (bankAccounts.length > 0) {
      // Fetch transactions for the first account
      fetchBankTransactions(bankAccounts[0].id);
    }
  }, [bankAccounts]);

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
      }))
    : transactions.slice(0, 5);

  return (
    <View className="flex-1 bg-gradient-primary rounded-4xl shadow-large mx-4 my-2 overflow-hidden">
      <ScrollView className="flex-1 p-6">
        <View className="mb-6 animate-slide-up">
          <Text className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
            Dashboard
          </Text>
          <Text className="text-5xl font-bold text-primary-600 dark:text-primary-400">
            €{totalBalance.toFixed(2)}
          </Text>
          <Text className="text-lg text-secondary-600 dark:text-secondary-400">
            Total Balance
          </Text>
        </View>

        <View className="mb-6 animate-scale-in">
          <Card3D />
        </View>

        <View className="mb-6 bg-card-light dark:bg-card-dark rounded-3xl p-4 shadow-medium animate-fade-in">
          <Text className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Spending by Category
          </Text>
          <Chart />
        </View>

        <View className="mb-6 bg-card-light dark:bg-card-dark rounded-3xl p-4 shadow-medium animate-fade-in">
          <Text className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Recent Transactions
          </Text>
          {isLoadingBankAccounts && <ActivityIndicator size="small" className="text-primary-500" />}
          {bankAccountsError && <Text className="text-red-500 text-sm mb-3">{bankAccountsError}</Text>}
          <TransactionList transactions={displayTransactions} />
        </View>
      </ScrollView>
    </View>
  );
}
