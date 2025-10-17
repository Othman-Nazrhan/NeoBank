import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

export default function Card3D() {
  const { theme, cards } = useStore();
  const currentTheme = getTheme(theme);

  // Sample card data if no cards exist
  const sampleCard = cards.length > 0 ? cards[0] : {
    number: '1234567890123456',
    expiry: '12/25',
    cvv: '123',
    isVirtual: true,
  };

  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotationX.value}deg` },
      { rotateY: `${rotationY.value}deg` },
      { scale: scale.value },
      { perspective: 1000 },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const handlePress = () => {
    rotationX.value = withSpring(rotationX.value === 0 ? 180 : 0);
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
          {
            backgroundColor: currentTheme.primary,
            shadowColor: currentTheme.primary,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 15,
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>NeoBank</Text>
          <View style={styles.virtualBadge}>
            <Text style={styles.virtualBadgeText}>
              {sampleCard.isVirtual ? 'VIRTUAL' : 'PHYSICAL'}
            </Text>
          </View>
        </View>

        <View style={styles.cardNumber}>
          <Text style={styles.numberText}>{formatCardNumber(sampleCard.number)}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.label}>VALID THRU</Text>
            <Text style={styles.value}>{sampleCard.expiry}</Text>
          </View>
          <View>
            <Text style={styles.label}>CVV</Text>
            <Text style={styles.value}>{sampleCard.cvv}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  card: {
    width: 288,
    height: 176,
    borderRadius: 24,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  cardType: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  virtualBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  virtualBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  cardNumber: {
    marginBottom: 16,
  },
  numberText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginBottom: 4,
  },
  value: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
