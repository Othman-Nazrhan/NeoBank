// Extend types for nativewind
declare module 'react-native' {
  interface TouchableOpacityProps {
    className?: string;
  }
}

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { PanGestureHandler, State, PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { useStore } from '../store';

export default function Card3D() {
  const { cards } = useStore();

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
  const flipRotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const isFlipped = useRef(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotationX.value}deg` },
      { rotateY: `${rotationY.value}deg` },
      { scale: scale.value },
      { perspective: 1000 },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const flipStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipRotation.value}deg` }],
  }));

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    rotationY.value = interpolate(translationX, [-100, 100], [-15, 15], Extrapolate.CLAMP);
    rotationX.value = interpolate(translationY, [-100, 100], [15, -15], Extrapolate.CLAMP);
  };

  const handleGestureStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      rotationX.value = withSpring(0, { damping: 15, stiffness: 100 });
      rotationY.value = withSpring(0, { damping: 15, stiffness: 100 });
    }
  };

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    glowOpacity.value = withTiming(0.3, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
    glowOpacity.value = withTiming(0, { duration: 200 });
  };

  const handleDoubleTap = () => {
    isFlipped.current = !isFlipped.current;
    flipRotation.value = withSpring(isFlipped.current ? 180 : 0, { damping: 20, stiffness: 100 });
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <View className="items-center mb-4">
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleGestureStateChange}
      >
        <Animated.View style={flipStyle}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={handleDoubleTap}
            delayLongPress={500}
            className="active:opacity-90"
            activeOpacity={0.9}
          >
            <Animated.View
              className="w-72 h-44 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
              style={animatedStyle}
            >
              {/* Glow effect */}
              <Animated.View
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"
                style={glowStyle}
              />

              {/* Front of card */}
              <Animated.View
                className="absolute inset-0 p-6"
                style={{
                  transform: [{ rotateY: '0deg' }],
                  backfaceVisibility: 'hidden',
                }}
              >
                <View className="flex-row justify-between items-center mb-8">
                  <Text className="text-white text-xl font-bold">NeoBank</Text>
                  <View className="bg-white/20 px-3 py-1.5 rounded-xl">
                    <Text className="text-white text-xs font-medium">
                      {sampleCard.isVirtual ? 'VIRTUAL' : 'PHYSICAL'}
                    </Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-white text-xl font-bold tracking-wider">
                    {formatCardNumber(sampleCard.number)}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-white/70 text-xs mb-1">VALID THRU</Text>
                    <Text className="text-white text-sm font-bold">{sampleCard.expiry}</Text>
                  </View>
                  <View>
                    <Text className="text-white/70 text-xs mb-1">CVV</Text>
                    <Text className="text-white text-sm font-bold">***</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Back of card */}
              <Animated.View
                className="absolute inset-0 p-6 bg-gradient-to-br from-gray-800 to-black rounded-3xl"
                style={{
                  transform: [{ rotateY: '180deg' }],
                  backfaceVisibility: 'hidden',
                }}
              >
                <View className="bg-black rounded-xl p-4 mt-8">
                  <Text className="text-white text-xs font-bold mb-2">SECURITY CODE</Text>
                  <View className="bg-white h-8 rounded flex-row items-center px-2">
                    <Text className="text-black text-sm font-mono">{sampleCard.cvv}</Text>
                  </View>
                  <Text className="text-white/70 text-xs mt-4 text-center">
                    This card is property of NeoBank. If found, please return to nearest branch.
                  </Text>
                </View>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
      <Text className="text-secondary-600 dark:text-secondary-400 text-sm mt-2 text-center">
        Tap and hold to flip • Drag to tilt
      </Text>
    </View>
  );
}
