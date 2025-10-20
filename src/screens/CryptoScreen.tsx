import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { useStore } from '../store/useStore';
import CryptoList from '../components/CryptoList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.xl,
  },
  stockCard: theme.commonStyles.card,
  stockTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.5)',
  },
  stockSymbol: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },
  stockPrice: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
  },
  stockChange: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: theme.typography.fontSize.base,
    textAlign: 'center',
  },
});

export default function CryptoScreen() {
  const { stockData, isLoadingStock, stockError, fetchStockData, fetchCryptoData } = useStore();

  React.useEffect(() => {
    fetchStockData();
    fetchCryptoData();
  }, []);

  return (
    <LinearGradient colors={theme.gradients.background as [string, string]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Markets</Text>

          {/* Stock Market Data */}
          <View style={styles.stockCard}>
            <Text style={styles.stockTitle}>Stock Market</Text>
            {isLoadingStock ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            ) : stockError ? (
              <Text style={styles.errorText}>{stockError}</Text>
            ) : (
              stockData?.map((stock, index) => (
                <View key={index} style={styles.stockRow}>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                  <View>
                    <Text style={styles.stockPrice}>${stock.price}</Text>
                    <Text style={[styles.stockChange, { color: parseFloat(stock.change) >= 0 ? '#4CAF50' : '#F44336' }]}>
                      {stock.change}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Crypto Market Data */}
          <CryptoList />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
