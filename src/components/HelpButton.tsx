import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { openPhoneDialer } from '../utils/phoneDialer';
import { colors, fontSizes, spacing, borderRadius } from '../styles/theme';

interface HelpButtonProps {
  phoneNumber: string;
}

export const HelpButton: React.FC<HelpButtonProps> = ({ phoneNumber }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => openPhoneDialer(phoneNumber)}
      accessibilityRole="button"
      accessibilityLabel="Call caregiver for help"
    >
      <Text style={styles.text}>Call for Help</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.helpButtonBackground,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.button,
    fontWeight: 'bold',
  },
});
