import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';
import { convertCurrency } from '../utils/api';

export default function Transfers() {
  const { theme, addTransaction, exchangeRates, isLoadingRates, ratesError, fetchExchangeRates } = useStore();
  const currentTheme = getTheme(theme);

  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (amount && exchangeRates) {
      const converted = convertCurrency(parseFloat(amount), fromCurrency, toCurrency, exchangeRates);
      setConvertedAmount(converted);
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleTransfer = () => {
    if (!amount || !recipient) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description: `Transfer to ${recipient}: ${description}`,
      date: new Date().toISOString(),
      category: 'Transfer',
      type: 'expense' as const,
    };

    addTransaction(transaction);
    Alert.alert('Success', 'Transfer completed successfully');
    setAmount('');
    setRecipient('');
    setDescription('');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Transfers & Payments</Text>

      <View style={styles.form}>
        <View style={styles.currencySection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Currency Exchange</Text>
          {isLoadingRates && <ActivityIndicator size="small" color={currentTheme.primary} />}
          {ratesError && <Text style={[styles.errorText, { color: 'red' }]}>{ratesError}</Text>}
          {exchangeRates && (
            <Text style={[styles.rateText, { color: currentTheme.text }]}>
              1 {fromCurrency} = {exchangeRates[toCurrency]?.toFixed(4) || 'N/A'} {toCurrency}
            </Text>
          )}
        </View>

        <View style={styles.currencyInputs}>
          <View style={styles.currencyInput}>
            <TextInput
              style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text, flex: 1 }]}
              placeholder="From Currency"
              placeholderTextColor={currentTheme.secondary}
              value={fromCurrency}
              onChangeText={setFromCurrency}
            />
            <TextInput
              style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text, flex: 2 }]}
              placeholder="Amount"
              placeholderTextColor={currentTheme.secondary}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.currencyInput}>
            <TextInput
              style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text, flex: 1 }]}
              placeholder="To Currency"
              placeholderTextColor={currentTheme.secondary}
              value={toCurrency}
              onChangeText={setToCurrency}
            />
            <TextInput
              style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text, flex: 2 }]}
              placeholder="Converted Amount"
              placeholderTextColor={currentTheme.secondary}
              value={convertedAmount ? convertedAmount.toFixed(2) : ''}
              editable={false}
            />
          </View>
        </View>

        <TextInput
          style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Recipient"
          placeholderTextColor={currentTheme.secondary}
          value={recipient}
          onChangeText={setRecipient}
        />

        <TextInput
          style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Description"
          placeholderTextColor={currentTheme.secondary}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.primary }]} onPress={handleTransfer}>
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Quick Actions</Text>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: currentTheme.accent }]}>
          <Text style={styles.buttonText}>Pay Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: currentTheme.secondary }]}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  form: {
    marginBottom: 30,
  },
  currencySection: {
    marginBottom: 20,
  },
  currencyInputs: {
    marginBottom: 20,
  },
  currencyInput: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
  },
  rateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActions: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});
