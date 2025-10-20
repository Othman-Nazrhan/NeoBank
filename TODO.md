# Refactoring Plan: Centralize Styling with Theme Constants

## Information Gathered
- theme.ts has basic color, typography, spacing, borderRadius, and shadow definitions, but components use hardcoded values.
- Hardcoded colors (e.g., '#3A86FF', '#94A3B8'), gradients, and styles are scattered across components and screens.
- This causes inconsistencies and maintenance issues.

## Plan
- [x] **src/theme.ts**: Add new constants for gradients, common card styles, and reusable styles.
- [x] **src/components/BalanceCard.tsx**: Replace hardcoded colors and styles with theme constants.
- [x] **src/components/TransactionListItem.tsx**: Replace hardcoded colors and styles with theme constants.
- [x] **src/screens/Dashboard.tsx**: Update to use theme for colors, spacing, etc.
- [x] **src/screens/CardScreen.tsx**: Replace hardcoded styles with theme constants.
- [x] **src/screens/Analytics.tsx**: Replace hardcoded styles with theme constants.
- [x] **src/screens/Chat.tsx**: Replace hardcoded styles with theme constants.
- [x] **src/navigation/AppNavigator.tsx**: Update tab bar styles to use theme constants.

## Dependent Files to be Edited
- theme.ts
- BalanceCard.tsx
- TransactionListItem.tsx
- Dashboard.tsx
- CardScreen.tsx
- Analytics.tsx
- Chat.tsx
- AppNavigator.tsx

## Followup Steps
- [x] Run TypeScript check (`npx tsc --noEmit`) to ensure no errors.
- [x] Test app functionality and styling to verify changes.
