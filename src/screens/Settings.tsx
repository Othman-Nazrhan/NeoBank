import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function Settings() {
  const { theme, toggleTheme, setAuthenticated } = useStore();
  const currentTheme = getTheme(theme);

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access settings',
      });

      if (result.success) {
        Alert.alert('Success', 'Biometric authentication successful');
      } else {
        Alert.alert('Error', 'Biometric authentication failed');
      }
    } else {
      Alert.alert('Error', 'Biometric authentication not available');
    }
  };

  const handleSecureStore = async () => {
    try {
      await SecureStore.setItemAsync('user_token', 'sample_token');
      const token = await SecureStore.getItemAsync('user_token');
      Alert.alert('Success', `Token stored securely: ${token}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to store data securely');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    Alert.alert('Logged out', 'You have been logged out successfully');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Appearance</Text>
        <View style={[styles.settingItem, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.settingLabel, { color: currentTheme.text }]}>Dark Mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: currentTheme.border, true: currentTheme.primary }}
            thumbColor={theme === 'dark' ? currentTheme.accent : currentTheme.secondary}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Security</Text>
        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: currentTheme.card }]}
          onPress={handleBiometricAuth}
        >
          <Text style={[styles.settingLabel, { color: currentTheme.text }]}>Biometric Authentication</Text>
          <Text style={[styles.settingValue, { color: currentTheme.primary }]}>Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: currentTheme.card }]}
          onPress={handleSecureStore}
        >
          <Text style={[styles.settingLabel, { color: currentTheme.text }]}>Secure Storage</Text>
          <Text style={[styles.settingValue, { color: currentTheme.primary }]}>Test</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: 'red' }]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
