import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../styles/theme';

interface NavigationControlsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  total,
  onNext,
  onPrevious,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <View style={styles.container}>
      {!isFirst ? (
        <TouchableOpacity style={styles.button} onPress={onPrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.indicator}>
        {currentIndex + 1} of {total}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>{isLast ? 'Done' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginVertical: spacing.lg,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  buttonText: {
    fontSize: fontSizes.button,
    color: colors.blue,
    fontWeight: 'bold',
  },
  indicator: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  placeholder: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minWidth: 100,
  },
});
