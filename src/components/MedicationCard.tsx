import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Medication } from '../data/mockData';
import { colors, fontSizes, spacing, checkboxSize, borderRadius } from '../styles/theme';

interface MedicationCardProps {
  medication: Medication;
  isTaken: boolean;
  onToggleTaken: () => void;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  isTaken,
  onToggleTaken,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{medication.emoji}</Text>
      <Text style={styles.name}>{medication.name}</Text>
      <Text style={styles.schedule}>
        {medication.scheduledDay} at {medication.scheduledTime}
      </Text>
      <TouchableOpacity
        style={[styles.checkbox, isTaken && styles.checkboxChecked]}
        onPress={onToggleTaken}
        accessibilityRole="checkbox"
        accessibilityLabel={`${medication.name} taken`}
        accessibilityState={{ checked: isTaken }}
      >
        {isTaken && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  schedule: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: checkboxSize,
    height: checkboxSize,
    borderWidth: 3,
    borderColor: colors.checkboxBorder,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.checkboxChecked,
    borderColor: colors.checkboxChecked,
  },
  checkmark: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
