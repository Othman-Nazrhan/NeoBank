import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { theme } from '../theme';
import CurrencyConverter from '../components/CurrencyConverter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 100, // Add padding to account for bottom tab bar
  },
  converterCard: theme.commonStyles.card,
});

export default function CurrencyScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={theme.gradients.background as [string, string]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Currency Converter</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <X size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollView}>
          <View style={styles.converterCard}>
            <CurrencyConverter />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
