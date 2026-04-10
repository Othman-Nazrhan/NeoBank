# NeoBank - Dark Mode Premium UI (2025)

A modern, premium banking app built with Expo React Native, featuring a sleek dark mode design with glassmorphism effects, smooth animations, and AI-powered insights.

## Features

- **Dark Mode Premium Design**: Gradient backgrounds, glassmorphism effects, and premium UI components
- **4 Main Screens**: Dashboard, Card Management, Analytics, and AI Chat Assistant
- **Smooth Animations**: React Native Reanimated for micro-interactions and transitions
- **Interactive Charts**: Victory Native for data visualization
- **Virtual Card**: 3D tilt effects and secure card display
- **AI Assistant**: Mock chat interface for financial advice
- **State Management**: Zustand for simple, efficient state handling

## Tech Stack

- **Framework**: Expo SDK 48+ (Managed Workflow)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation v7
- **Animations**: React Native Reanimated
- **Charts**: Victory Native
- **Icons**: Lucide React Native
- **State**: Zustand
- **Blur Effects**: Expo Blur

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS: Xcode (macOS only)
- For Android: Android Studio

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NeoBank
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on device/simulator:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

### iOS Setup (macOS only)

If you encounter issues with iOS, you may need to install CocoaPods:

```bash
cd ios
pod install
cd ..
```

Then rebuild the app:
```bash
npx expo run:ios
```

## Project Structure

```
NeoBank/
├── App.tsx                    # Main app component with providers
├── app.json                   # Expo configuration
├── babel.config.js            # Babel config with NativeWind
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
├── index.ts                   # Entry point
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation setup (stack + tabs)
│   ├── screens/
│   │   ├── Dashboard.tsx      # Main dashboard with balance and transactions
│   │   ├── CardScreen.tsx     # Virtual card with 3D effects
│   │   ├── Analytics.tsx      # Charts and spending analysis
│   │   └── Chat.tsx           # AI assistant chat interface
│   ├── components/
│   │   ├── BalanceCard.tsx    # Animated balance display
│   │   └── TransactionListItem.tsx # Transaction list item
│   ├── store/
│   │   └── useStore.ts        # Zustand state management
│   └── theme.ts               # Colors and typography constants
└── assets/                    # Images, icons, and Lottie animations
    ├── loading.json           # Loading animation placeholder
    └── card-bg.png            # Card background placeholder
```

## Screens

### Dashboard
The main dashboard provides users with a comprehensive overview of their banking information, including account balance, recent transactions, and key financial metrics. Features smooth animations and interactive elements.

**Mockup**: ![Dashboard](https://via.placeholder.com/500x1000?text=Dashboard+Screen)

### Card Management
This screen allows users to manage their virtual and physical cards with 3D tilt effects. Users can view card details, enable/disable cards, and monitor transaction history for each card.

**Mockup**: ![Card Management](https://via.placeholder.com/500x1000?text=Card+Management+Screen)

### Analytics
The analytics screen presents detailed financial insights through interactive charts and graphs powered by Victory Native. Users can track spending patterns, income sources, and budget adherence over customizable time periods.

**Mockup**: ![Analytics](https://via.placeholder.com/500x1000?text=Analytics+Screen)

### AI Chat Assistant
An intelligent chat interface that provides personalized financial advice and answers to user queries. The AI assistant helps with transaction inquiries, budget recommendations, and general banking support.

**Mockup**: ![AI Chat](https://via.placeholder.com/500x1000?text=AI+Chat+Assistant+Screen)

## API Integration

This app uses mock data for demonstration. To integrate with real APIs:

### Recommended APIs

1. **Open Bank Project**: For banking data
   - API: https://api.openbankproject.com/
   - Documentation: https://www.openbankproject.com/

2. **ExchangeRate.host**: For currency conversion
   - API: https://api.exchangerate.host/
   - Free tier available

3. **Plaid**: For secure financial data access
   - API: https://plaid.com/
   - Sandbox environment for testing

### Implementation Example

```typescript
// src/store/useStore.ts
import axios from 'axios';

const API_BASE_URL = 'https://api.openbankproject.com';

export const useStore = create<StoreState>((set) => ({
  // ... existing state

  fetchTransactions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      set({ transactions: response.data });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  },

  // ... existing actions
}));
```

## Customization

### Colors and Theme

Edit `src/theme.ts` to customize colors, typography, and spacing.

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add route to `src/navigation/AppNavigator.tsx`
3. Update tab navigation if needed

### Animations

Use React Native Reanimated for custom animations. See existing components for examples.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

## Screens
### Dashboard
The main dashboard provides users with a comprehensive overview of their banking information, including account balance, recent transactions, and key financial metrics. Features smooth animations and interactive elements.
**Mockup**: ![Dashboard](https://via.placeholder.com/500x1000?text=Dashboard+Screen)
### Card Management
This screen allows users to manage their virtual and physical cards with 3D tilt effects. Users can view card details, enable/disable cards, and monitor transaction history for each card.
**Mockup**: ![Card Management](https://via.placeholder.com/500x1000?text=Card+Management+Screen)
### Analytics
The analytics screen presents detailed financial insights through interactive charts and graphs powered by Victory Native. Users can track spending patterns, income sources, and budget adherence over customizable time periods.
**Mockup**: ![Analytics](https://via.placeholder.com/500x1000?text=Analytics+Screen)
### AI Chat Assistant
An intelligent chat interface that provides personalized financial advice and answers to user queries. The AI assistant helps with transaction inquiries, budget recommendations, and general banking support.
**Mockup**: ![AI Chat](https://via.placeholder.com/500x1000?text=AI+Chat+Assistant+Screen)