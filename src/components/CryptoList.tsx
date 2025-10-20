import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { useStore } from '../store/useStore';

const styles = StyleSheet.create({
  container: {
    ...theme.commonStyles.card,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.5)',
  },
  cryptoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoSymbol: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.white,
    marginRight: theme.spacing.md,
  },
  cryptoName: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
  },
  cryptoPrice: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.white,
    fontWeight: '600',
  },
  cryptoChange: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
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

export default function CryptoList() {
  const { cryptoData, isLoadingCrypto, cryptoError } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Market</Text>
      {isLoadingCrypto ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : cryptoError ? (
        <Text style={styles.errorText}>{cryptoError}</Text>
      ) : (
        <ScrollView>
          {cryptoData?.map((crypto) => (
            <View key={crypto.id} style={styles.cryptoItem}>
              <View style={styles.cryptoLeft}>
                <Text style={styles.cryptoSymbol}>{crypto.symbol.toUpperCase()}</Text>
                <Text style={styles.cryptoName}>{crypto.name}</Text>
              </View>
              <View>
                <Text style={styles.cryptoPrice}>${crypto.current_price.toFixed(2)}</Text>
                <Text style={[styles.cryptoChange, { color: crypto.price_change_percentage_24h >= 0 ? '#4CAF50' : '#F44336' }]}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
