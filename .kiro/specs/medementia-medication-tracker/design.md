# Design Document

## Introduction

This document describes the technical architecture for the Medementia Medication Tracker MVP — a React Native / Expo (TypeScript) application designed for dementia patients. The app presents daily medications one at a time with high-contrast, large-font UI and provides a direct-call help button. All data is local/mock with no backend or authentication.

## Architecture Overview

The app follows a simple flat component architecture with a single navigation stack. There are three screen-level components and a shared set of presentational components. State is minimal and local — medication "taken" status is held in component state (not persisted across sessions in MVP).

```
┌─────────────────────────────────────────────┐
│                   App.tsx                     │
│         (Expo entry, NavigationContainer)     │
├─────────────────────────────────────────────┤
│              Stack Navigator                  │
│  ┌───────────────┐  ┌────────────────────┐  │
│  │ MedicationScreen │  │ HealthCheckScreen │  │
│  └───────────────┘  └────────────────────┘  │
├─────────────────────────────────────────────┤
│              Shared Components                │
│  ┌──────────────┐ ┌───────────┐ ┌────────┐ │
│  │MedicationCard│ │ HelpButton│ │Greeting│ │
│  └──────────────┘ └───────────┘ └────────┘ │
├─────────────────────────────────────────────┤
│              Data Layer                       │
│  ┌──────────────────────────────────────┐   │
│  │         mockData.ts                   │   │
│  │  (medications, patient, caregiver)    │   │
│  └──────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│              Utilities                        │
│  ┌───────────────┐  ┌───────────────────┐   │
│  │  phoneDialer.ts│  │  dateFormatter.ts │   │
│  └───────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────┘
```

## Components

### Screen Components

#### MedicationScreen

The primary screen. Displays the greeting header, current date/time, one medication card at a time with pagination controls, and a persistent help button at the bottom.

```typescript
// screens/MedicationScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Greeting } from '../components/Greeting';
import { MedicationCard } from '../components/MedicationCard';
import { HelpButton } from '../components/HelpButton';
import { NavigationControls } from '../components/NavigationControls';
import { mockData } from '../data/mockData';
import { formatDate } from '../utils/dateFormatter';

export function MedicationScreen({ navigation }: { navigation: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [takenMap, setTakenMap] = useState<Record<string, boolean>>({});

  const medications = mockData.medications;
  const currentMedication = medications[currentIndex];

  const handleToggleTaken = (medicationId: string) => {
    setTakenMap((prev) => ({ ...prev, [medicationId]: !prev[medicationId] }));
  };

  const handleNext = () => {
    if (currentIndex < medications.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('HealthCheck');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Greeting name={mockData.patient.firstName} />
      <Text style={styles.dateText}>{formatDate(new Date())}</Text>
      <MedicationCard
        medication={currentMedication}
        isTaken={!!takenMap[currentMedication.id]}
        onToggleTaken={() => handleToggleTaken(currentMedication.id)}
      />
      <NavigationControls
        currentIndex={currentIndex}
        total={medications.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <HelpButton phoneNumber={mockData.caregiver.phoneNumber} />
    </View>
  );
}
```

#### HealthCheckScreen

A simple yes/no prompt screen with an emoji/avatar, question text, and two large buttons.

```typescript
// screens/HealthCheckScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { openPhoneDialer } from '../utils/phoneDialer';
import { mockData } from '../data/mockData';

export function HealthCheckScreen({ navigation }: { navigation: any }) {
  const handleYes = () => {
    openPhoneDialer(mockData.caregiver.phoneNumber);
  };

  const handleNo = () => {
    navigation.navigate('Medication');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😊</Text>
      <Text style={styles.promptText}>
        Do you have any questions or concerns right now?
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noButton} onPress={handleNo}>
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

### Presentational Components

#### Greeting

Renders the personalized greeting with the patient's first name.

```typescript
// components/Greeting.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return <Text style={styles.greeting}>Welcome {name}!</Text>;
}
```

#### MedicationCard

Displays a single medication with its emoji, name, schedule, and a large checkbox.

```typescript
// components/MedicationCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Medication } from '../data/mockData';

interface MedicationCardProps {
  medication: Medication;
  isTaken: boolean;
  onToggleTaken: () => void;
}

export function MedicationCard({ medication, isTaken, onToggleTaken }: MedicationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{medication.emoji}</Text>
      <Text style={styles.name}>{medication.name}</Text>
      <Text style={styles.schedule}>
        {medication.scheduledDay} — {medication.scheduledTime}
      </Text>
      <TouchableOpacity
        style={[styles.checkbox, isTaken && styles.checkboxChecked]}
        onPress={onToggleTaken}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isTaken }}
        accessibilityLabel={`Mark ${medication.name} as ${isTaken ? 'not taken' : 'taken'}`}
      >
        <Text style={styles.checkboxText}>{isTaken ? '✓' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

#### HelpButton

A large, text-labeled button that triggers the native phone dialer.

```typescript
// components/HelpButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { openPhoneDialer } from '../utils/phoneDialer';

interface HelpButtonProps {
  phoneNumber: string;
}

export function HelpButton({ phoneNumber }: HelpButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => openPhoneDialer(phoneNumber)}
      accessibilityRole="button"
      accessibilityLabel="Call caregiver for help"
    >
      <Text style={styles.buttonText}>Call for Help</Text>
    </TouchableOpacity>
  );
}
```

#### NavigationControls

Previous/Next buttons for stepping through medications sequentially.

```typescript
// components/NavigationControls.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavigationControlsProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function NavigationControls({
  currentIndex,
  total,
  onNext,
  onPrevious,
}: NavigationControlsProps) {
  return (
    <View style={styles.container}>
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.indicator}>
        {currentIndex + 1} of {total}
      </Text>
      <TouchableOpacity style={styles.navButton} onPress={onNext}>
        <Text style={styles.navText}>
          {currentIndex < total - 1 ? 'Next' : 'Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Interfaces and Data Models

### Data Types

```typescript
// data/mockData.ts

export interface Medication {
  id: string;
  name: string;
  emoji: string;
  scheduledDay: string;
  scheduledTime: string;
}

export interface Patient {
  firstName: string;
}

export interface Caregiver {
  name: string;
  phoneNumber: string;
}

export interface AppData {
  patient: Patient;
  caregiver: Caregiver;
  medications: Medication[];
}

export const mockData: AppData = {
  patient: {
    firstName: 'Sally',
  },
  caregiver: {
    name: 'Dr. Smith',
    phoneNumber: '+15551234567',
  },
  medications: [
    {
      id: '1',
      name: 'Donepezil',
      emoji: '💊',
      scheduledDay: 'Monday',
      scheduledTime: '8:00 AM',
    },
    {
      id: '2',
      name: 'Vitamin D',
      emoji: '☀️',
      scheduledDay: 'Monday',
      scheduledTime: '8:00 AM',
    },
    {
      id: '3',
      name: 'Blood Pressure',
      emoji: '❤️',
      scheduledDay: 'Monday',
      scheduledTime: '12:00 PM',
    },
  ],
};
```

### Utility Functions

```typescript
// utils/phoneDialer.ts
import { Linking, Platform } from 'react-native';

export function openPhoneDialer(phoneNumber: string): void {
  const url = Platform.OS === 'ios'
    ? `telprompt:${phoneNumber}`
    : `tel:${phoneNumber}`;
  Linking.openURL(url);
}
```

```typescript
// utils/dateFormatter.ts

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
```

## Navigation Structure

```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicationScreen } from './screens/MedicationScreen';
import { HealthCheckScreen } from './screens/HealthCheckScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none', // No animated transitions per accessibility requirement
        }}
      >
        <Stack.Screen name="Medication" component={MedicationScreen} />
        <Stack.Screen name="HealthCheck" component={HealthCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Styling Strategy

All styles follow the cognitive accessibility requirements:

```typescript
// styles/theme.ts

export const theme = {
  colors: {
    background: '#FFFDF7',   // Warm cream
    text: '#1A1A1A',         // Near-black for high contrast
    primary: '#2E7D32',      // Green for positive actions
    secondary: '#1565C0',    // Blue for navigation
    danger: '#C62828',       // Red for help/emergency
    cardBackground: '#FFFFFF',
    border: '#E0E0E0',
    checkboxChecked: '#4CAF50',
  },
  fonts: {
    size: {
      greeting: 32,
      heading: 28,
      body: 22,
      button: 24,
      small: 18,
    },
    family: 'System', // Platform default sans-serif
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: 12,
  checkbox: {
    size: 56,
  },
};
```

## Error Handling

Given the target audience (dementia patients), error states must be invisible or self-recovering:

| Scenario | Handling |
|----------|----------|
| Mock data missing fields | Graceful fallback — show "Medication" if name is empty, show "📋" if emoji is missing |
| Phone dialer unavailable | Linking.openURL fails silently; no error modal shown to patient |
| Navigation index out of bounds | Clamp index to valid range [0, medications.length - 1] |
| Empty medication list | Show a calm message: "No medications scheduled today" |

No error dialogs, pop-ups, or technical messages are shown to the user under any circumstances.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Greeting personalization

*For any* valid patient first name string loaded from mock data, the Greeting component SHALL render a string that contains "Welcome " followed by that exact name followed by "!".

**Validates: Requirements 1.1**

### Property 2: Medication card displays all required information

*For any* Medication object with non-empty name, emoji, scheduledDay, and scheduledTime fields, the MedicationCard component SHALL render output containing the medication name, emoji, and schedule text.

**Validates: Requirements 1.3, 1.4, 1.5, 1.6, 5.7**

### Property 3: Checkbox toggles medication taken state

*For any* Medication in either taken or not-taken state, tapping the checkbox SHALL invert the taken state (taken becomes not-taken, not-taken becomes taken).

**Validates: Requirements 1.8**

### Property 4: Single medication card visibility

*For any* list of medications with length greater than zero and any valid current index, the MedicationScreen SHALL render exactly one MedicationCard at a time.

**Validates: Requirements 2.1**

### Property 5: Sequential navigation correctness

*For any* list of medications with length N and any current index i where 0 ≤ i < N-1, navigating "next" SHALL display the medication at index i+1, and for any index i where 0 < i ≤ N-1, navigating "previous" SHALL display the medication at index i-1.

**Validates: Requirements 2.3**

### Property 6: Phone dialer receives correct caregiver number

*For any* valid caregiver phone number string loaded from mock data, when the Help_Button or YES button is tapped, the phone dialer utility SHALL be invoked with that exact phone number.

**Validates: Requirements 3.4, 4.3**

### Property 7: Mock data loading completeness

*For any* valid AppData object containing a patient with firstName, a caregiver with phoneNumber, and a non-empty medications array, loading the mock data SHALL make all fields accessible to the consuming components without transformation loss.

**Validates: Requirements 6.3**
