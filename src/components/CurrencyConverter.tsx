import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.white,
    marginRight: theme.spacing.md,
  },
  currencyCode: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.white,
    fontWeight: '600',
    width: 50,
    textAlign: 'center',
  },
  convertButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  convertButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },

});

export default function CurrencyConverter() {
  const { currencyRate, isLoadingCurrency, currencyError, fetchCurrencyRate } = useStore();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid number.');
      return;
    }
    await fetchCurrencyRate(fromCurrency, toCurrency);
  };

  const convertedAmount = currencyRate && currencyRate.from === fromCurrency && currencyRate.to === toCurrency
    ? (Number(amount) * currencyRate.rate).toFixed(2)
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity onPress={() => setFromCurrency(fromCurrency === 'USD' ? 'EUR' : 'USD')}>
          <Text style={styles.currencyCode}>{fromCurrency}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Converted Amount"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={convertedAmount}
        />
        <TouchableOpacity onPress={() => setToCurrency(toCurrency === 'EUR' ? 'USD' : 'EUR')}>
          <Text style={styles.currencyCode}>{toCurrency}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.convertButton} onPress={handleConvert} disabled={isLoadingCurrency}>
        <Text style={styles.convertButtonText}>
          {isLoadingCurrency ? 'Converting...' : 'Convert'}
        </Text>
      </TouchableOpacity>
      {currencyError && <Text style={{ color: '#FF6B6B', textAlign: 'center', marginTop: theme.spacing.md }}>{currencyError}</Text>}

    </View>
  );
}
