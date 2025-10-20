import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Bot } from 'lucide-react-native';
import { theme } from '../theme';

const mockResponses = [
  "Hello! I'm your AI financial assistant. How can I help you today?",
  "Based on your spending patterns, I recommend setting a budget for dining expenses.",
  "Your account balance looks healthy. Would you like me to suggest some investment options?",
  "I noticed you've been spending more on transportation. Consider using public transit or carpooling to save money.",
  "Great question! Your credit score is excellent at 780. Keep up the good work!",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.xl,
  },
  scrollView: {
    flex: 1,
    marginBottom: theme.spacing.lg,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  messageBubble: {
    maxWidth: 280,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  botMessageBubble: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderTopLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: theme.borderRadius['3xl'],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  textInput: {
    flex: 1,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
});

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI financial assistant. How can I help you today?", isBot: true },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { id: messages.length + 1, text: inputText, isBot: false };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          isBot: true,
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={theme.gradients.background as [string, string]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>AI Assistant</Text>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[styles.messageRow, message.isBot ? styles.botMessageRow : styles.userMessageRow]}
                >
                  {message.isBot && (
                    <View style={styles.botAvatar}>
                      <Bot size={16} color="#E2E8F0" />
                    </View>
                  )}
                  <View
                    style={[styles.messageBubble, message.isBot ? styles.botMessageBubble : styles.userMessageBubble]}
                  >
                    <Text style={styles.messageText}>{message.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask me anything about your finances..."
                placeholderTextColor="#94A3B8"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={styles.sendButton}
              >
                <Send size={18} color="#E2E8F0" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
