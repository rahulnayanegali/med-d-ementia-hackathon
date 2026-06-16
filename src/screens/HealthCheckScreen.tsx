import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mockData } from '../data/mockData';
import { openPhoneDialer } from '../utils/phoneDialer';
import { colors, fontSizes, spacing, borderRadius } from '../styles/theme';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HealthCheck'>;
};

export const HealthCheckScreen: React.FC<Props> = ({ navigation }) => {
  const { caregiver } = mockData;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😊</Text>
      <Text style={styles.prompt}>
        Do you have any questions or concerns right now?
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.yesButton]}
        onPress={() => openPhoneDialer(caregiver.phoneNumber)}
        accessibilityRole="button"
        accessibilityLabel="Yes, call caregiver"
      >
        <Text style={styles.buttonText}>YES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.noButton]}
        onPress={() => navigation.navigate('Medication')}
        accessibilityRole="button"
        accessibilityLabel="No, go back to medications"
      >
        <Text style={styles.buttonText}>NO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  prompt: {
    fontSize: fontSizes.heading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 40,
  },
  button: {
    width: '80%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  yesButton: {
    backgroundColor: colors.green,
  },
  noButton: {
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.button,
    fontWeight: 'bold',
  },
});
