import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { getTheme } from '../utils/theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function AIAssistant() {
  const { theme, transactions } = useStore();
  const currentTheme = getTheme(theme);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I\'m your AI financial assistant. How can I help you today?', isUser: false },
  ]);
  const [inputText, setInputText] = useState('');

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('spend') || lowerMessage.includes('expense')) {
      const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      return `You've spent €${totalExpenses.toFixed(2)} this month. Your top spending categories are: ${getTopCategories().join(', ')}.`;
    }

    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const savings = totalIncome - totalExpenses;
      return `Your current savings rate is ${totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0}%. Consider saving 20% of your income for better financial health.`;
    }

    if (lowerMessage.includes('budget')) {
      return 'To create a budget, track your income and expenses, categorize your spending, and set limits for each category. I can help you analyze your current spending patterns.';
    }

    if (lowerMessage.includes('invest')) {
      return 'For investing, consider your risk tolerance and financial goals. Diversify your portfolio and consider long-term investments. Consult a financial advisor for personalized advice.';
    }

    return 'I\'m here to help with your financial questions. Try asking about your spending, savings, budgeting, or investment advice!';
  };

  const getTopCategories = (): string[] => {
    const categorySpending = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(inputText),
      isUser: false,
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage,
      { backgroundColor: item.isUser ? currentTheme.primary : currentTheme.card }
    ]}>
      <Text style={[
        styles.messageText,
        { color: item.isUser ? 'white' : currentTheme.text }
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>AI Financial Assistant</Text>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Ask me about your finances..."
          placeholderTextColor={currentTheme.secondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: currentTheme.primary }]} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
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
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
