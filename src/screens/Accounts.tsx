import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useStore } from '../store';

export default function Accounts() {
  const {
    theme,
    accounts,
    cards,
    bankAccounts,
    cryptoCoins,
    isLoadingBankAccounts,
    bankAccountsError,
    isLoadingCrypto,
    cryptoError,
    fetchBankAccounts,
    fetchCryptoPrices
  } = useStore();

  useEffect(() => {
    fetchBankAccounts();
    fetchCryptoPrices();
  }, []);

  const renderAccount = ({ item }: { item: any }) => (
    <View className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-4 mb-3 rounded-2xl shadow-medium">
      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold">{item.type}</Text>
      <Text className="text-primary-600 dark:text-primary-400 text-xl font-bold mt-1">€{item.balance.toFixed(2)}</Text>
    </View>
  );

  const renderCard = ({ item }: { item: any }) => (
    <View className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-4 mb-3 rounded-2xl shadow-medium">
      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold">**** **** **** {item.number.slice(-4)}</Text>
      <Text className={`text-sm mt-1 ${item.isBlocked ? 'text-red-500' : 'text-accent-600 dark:text-accent-400'}`}>
        {item.isBlocked ? 'Blocked' : 'Active'}
      </Text>
      <TouchableOpacity className="bg-primary-600 dark:bg-primary-500 p-3 rounded-xl mt-3 items-center shadow-button-press">
        <Text className="text-white font-bold">{item.isBlocked ? 'Unblock' : 'Block'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBankAccount = ({ item }: { item: any }) => (
    <View className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-4 mb-3 rounded-2xl shadow-medium">
      <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold">{item.label}</Text>
      <Text className="text-secondary-600 dark:text-secondary-400 text-sm mt-1">{item.type}</Text>
      <Text className="text-primary-600 dark:text-primary-400 text-xl font-bold mt-1">
        {item.balance.currency} {item.balance.amount.toFixed(2)}
      </Text>
    </View>
  );

  const renderCryptoCoin = ({ item }: { item: any }) => (
    <View className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-4 mb-3 rounded-2xl shadow-medium">
      <View className="flex-row items-center mb-3">
        <Image source={{ uri: item.image }} style={{ width: 40, height: 40, marginRight: 12, borderRadius: 20 }} />
        <View>
          <Text className="text-secondary-900 dark:text-secondary-100 text-lg font-bold">{item.name}</Text>
          <Text className="text-secondary-600 dark:text-secondary-400 text-sm">{item.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <Text className="text-primary-600 dark:text-primary-400 text-xl font-bold">${item.current_price.toFixed(2)}</Text>
      <Text className={`text-sm mt-1 ${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {item.price_change_percentage_24h >= 0 ? '+' : ''}{item.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark p-6">
      <Text className="text-secondary-900 dark:text-secondary-100 text-4xl font-bold mb-6 animate-slide-up">Accounts & Cards</Text>

      <Text className="text-secondary-900 dark:text-secondary-100 text-2xl font-bold mt-6 mb-4 animate-fade-in">Bank Accounts</Text>
      {isLoadingBankAccounts && <ActivityIndicator size="large" className="text-primary-500 mb-4" />}
      {bankAccountsError && <Text className="text-red-500 text-base mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">{bankAccountsError}</Text>}
      <FlatList
        data={bankAccounts}
        renderItem={renderBankAccount}
        keyExtractor={(item) => item.id}
        className="mb-6"
        showsVerticalScrollIndicator={false}
      />

      <Text className="text-secondary-900 dark:text-secondary-100 text-2xl font-bold mt-6 mb-4 animate-fade-in">Crypto Holdings</Text>
      {isLoadingCrypto && <ActivityIndicator size="large" className="text-primary-500 mb-4" />}
      {cryptoError && <Text className="text-red-500 text-base mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">{cryptoError}</Text>}
      <FlatList
        data={cryptoCoins}
        renderItem={renderCryptoCoin}
        keyExtractor={(item) => item.id}
        className="mb-6"
        showsVerticalScrollIndicator={false}
      />

      <Text className="text-secondary-900 dark:text-secondary-100 text-2xl font-bold mt-6 mb-4 animate-fade-in">Cards</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        className="mb-6"
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 p-5 rounded-3xl items-center mt-6 shadow-large animate-scale-in">
        <Text className="text-white font-bold text-xl">Generate Virtual Card</Text>
      </TouchableOpacity>
    </View>
  );
}


