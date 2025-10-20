import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CreditCard, Eye, EyeOff } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailSection: {},
  label: {
    color: '#D1D5DB',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
    fontSize: 14,
  },
  instruction: {
    color: 'white',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
  },
});

export default function CardScreen() {
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

  return (
    <LinearGradient colors={['#0B132B', '#1E293B']} style={styles.container}>
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
      </View>
    </LinearGradient>
  );
}
