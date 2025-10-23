# TODO: Fix BalanceCard Component Animation

- [x] Refactor BalanceCard.tsx to use react-native-reanimated for smoother animation
  - [x] Import Animated from react-native-reanimated
  - [x] Replace useState with useSharedValue for animated balance
  - [x] Use useEffect to trigger animation with withTiming on balance change
  - [x] Use Animated.Text for balance display with animated style
  - [x] Remove manual setInterval logic
- [x] Run tests to verify the fix works
