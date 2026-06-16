import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mockData } from '../data/mockData';
import { Greeting } from '../components/Greeting';
import { MedicationCard } from '../components/MedicationCard';
import { NavigationControls } from '../components/NavigationControls';
import { HelpButton } from '../components/HelpButton';
import { formatDate, formatTime } from '../utils/dateFormatter';
import { colors, fontSizes, spacing } from '../styles/theme';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Medication'>;
};

export const MedicationScreen: React.FC<Props> = ({ navigation }) => {
  const { patient, caregiver, medications } = mockData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [takenMap, setTakenMap] = useState<Record<string, boolean>>({});
  const now = new Date();

  const clampedIndex = Math.max(0, Math.min(currentIndex, medications.length - 1));

  const handleNext = () => {
    if (currentIndex >= medications.length - 1) {
      navigation.navigate('HealthCheck');
    } else {
      setCurrentIndex(prev => Math.min(prev + 1, medications.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const toggleTaken = (id: string) => {
    setTakenMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (medications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No medications scheduled for today.</Text>
        <HelpButton phoneNumber={caregiver.phoneNumber} />
      </View>
    );
  }

  const currentMedication = medications[clampedIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Greeting name={patient.firstName} />
      <Text style={styles.date}>{formatDate(now)}</Text>
      <Text style={styles.time}>{formatTime(now)}</Text>
      <MedicationCard
        medication={currentMedication}
        isTaken={!!takenMap[currentMedication.id]}
        onToggleTaken={() => toggleTaken(currentMedication.id)}
      />
      <NavigationControls
        currentIndex={clampedIndex}
        total={medications.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <HelpButton phoneNumber={caregiver.phoneNumber} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  date: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  time: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSizes.heading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
