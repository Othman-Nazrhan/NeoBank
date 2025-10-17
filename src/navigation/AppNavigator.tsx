import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens (will create them next)
import Dashboard from '../screens/Dashboard';
import Accounts from '../screens/Accounts';
import Transfers from '../screens/Transfers';
import Analytics from '../screens/Analytics';
import Settings from '../screens/Settings';
import AIAssistant from '../screens/AIAssistant';
import Investments from '../screens/Investments';
import PredictiveAnalytics from '../screens/PredictiveAnalytics';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Accounts" component={Accounts} />
      <Tab.Screen name="Transfers" component={Transfers} />
      <Tab.Screen name="Investments" component={Investments} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="AIAssistant" component={AIAssistant} />
        <Stack.Screen name="PredictiveAnalytics" component={PredictiveAnalytics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
