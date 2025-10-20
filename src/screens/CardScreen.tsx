import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CreditCard, Eye, EyeOff } from 'lucide-react-native';
import { theme } from '../theme';
import { useStore } from '../store/useStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 320,
    height: 208,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius['3xl'],
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing['2xl'],
  },
  cardNumber: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: 'monospace',
    marginBottom: theme.spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailSection: {},
  label: {
    color: '#D1D5DB',
    fontSize: theme.typography.fontSize.xs,
    textTransform: 'uppercase',
  },
  value: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
  },
  instruction: {
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: theme.spacing['2xl'],
    fontSize: theme.typography.fontSize.lg,
  },
});

export default function CardScreen() {
  const { paymentData, isLoadingPayment, paymentError, fetchPaymentData } = useStore();
  const [showCardNumber, setShowCardNumber] = React.useState(false);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      rotateY.value = event.translationX / 10;
      rotateX.value = -event.translationY / 10;
    })
    .onEnd(() => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { perspective: 1000 },
    ],
  }));

  const toggleCardNumber = () => {
    setShowCardNumber(!showCardNumber);
  };

  const simulatePayment = async () => {
    await fetchPaymentData();
    if (paymentData && paymentData.length > 0) {
      Alert.alert('Payment Simulated', `Payment of $${paymentData[0].amount} processed successfully!`);
    } else {
      Alert.alert('Payment Simulation', 'No payment data available. Please check your API key.');
    }
  };

  return (
    <LinearGradient colors={theme.gradients.background as [string, string]} style={styles.container}>
      <View style={styles.centerContainer}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <LinearGradient
              colors={['#3A86FF', '#1E293B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <View style={styles.header}>
                <CreditCard size={24} color="#E2E8F0" />
                <TouchableOpacity onPress={toggleCardNumber}>
                  {showCardNumber ? <EyeOff size={20} color="#E2E8F0" /> : <Eye size={20} color="#E2E8F0" />}
                </TouchableOpacity>
              </View>

              <Text style={styles.cardNumber}>
                {showCardNumber ? '1234 5678 9012 3456' : '**** **** **** 3456'}
              </Text>

              <View style={styles.detailsRow}>
                <View style={styles.detailSection}>
                  <Text style={styles.label}>Card Holder</Text>
                  <Text style={styles.value}>Othman xxxx</Text>
                </View>
                <View style={styles.detailSection}>
                  <Text style={styles.label}>Expires</Text>
                  <Text style={styles.value}>12/26</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </GestureDetector>

        <Text style={styles.instruction}>
          Tap and drag to tilt the card
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xl,
            borderRadius: theme.borderRadius.lg,
            marginTop: theme.spacing.xl,
          }}
          onPress={simulatePayment}
          disabled={isLoadingPayment}
        >
          {isLoadingPayment ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={{ color: theme.colors.white, fontSize: theme.typography.fontSize.base, fontWeight: '600' }}>
              Simulate Payment
            </Text>
          )}
        </TouchableOpacity>

        {paymentError && <Text style={{ color: '#FF6B6B', textAlign: 'center', marginTop: theme.spacing.lg }}>{paymentError}</Text>}
      </View>
    </LinearGradient>
  );
}
