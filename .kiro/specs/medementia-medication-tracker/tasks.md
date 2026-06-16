# Implementation Plan: Medementia Medication Tracker

## Overview

Build a React Native / Expo (TypeScript) medication tracking app for dementia patients. The app shows one medication at a time with large, high-contrast UI, sequential navigation, a health check screen, and a persistent help button to call a caregiver. All data is local/mock with no backend or authentication.

## Tasks

- [x] 1. Project scaffolding and dependencies
  - [x] 1.1 Initialize Expo project and install dependencies
    - Initialize a new Expo project with TypeScript template
    - Install `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`
    - Install dev dependencies: `jest`, `@testing-library/react-native`, `fast-check` for property-based testing
    - Configure `tsconfig.json` with strict mode and path aliases
    - _Requirements: 6.1_

- [x] 2. Data layer and type definitions
  - [x] 2.1 Create TypeScript interfaces and mock data
    - Create `src/data/mockData.ts` with `Medication`, `Patient`, `Caregiver`, and `AppData` interfaces
    - Populate mock data with sample medications (Donepezil, Vitamin D, Blood Pressure), patient name ("Sally"), and caregiver phone number
    - _Requirements: 6.3, 1.3_

  - [ ]* 2.2 Write property test for mock data loading completeness
    - **Property 7: Mock data loading completeness**
    - **Validates: Requirements 6.3**
    - For any valid `AppData` object, verify that all fields (patient.firstName, caregiver.phoneNumber, medications array) are accessible without transformation loss

- [ ] 3. Utility functions
  - [ ] 3.1 Implement phone dialer utility
    - Create `src/utils/phoneDialer.ts`
    - Implement `openPhoneDialer(phoneNumber: string)` using `Linking.openURL` with platform-specific `tel:` / `telprompt:` URL schemes
    - Handle failure silently (no error dialogs shown to patient)
    - _Requirements: 3.4, 4.3_

  - [ ]* 3.2 Write property test for phone dialer correctness
    - **Property 6: Phone dialer receives correct caregiver number**
    - **Validates: Requirements 3.4, 4.3**
    - For any valid phone number string, verify the dialer utility is invoked with that exact number

  - [ ] 3.3 Implement date formatter utility
    - Create `src/utils/dateFormatter.ts`
    - Implement `formatDate(date: Date)` returning human-readable date (weekday, month, day, year)
    - Implement `formatTime(date: Date)` returning time in 12-hour format
    - _Requirements: 1.2_

- [ ] 4. Theme and styling
  - [ ] 4.1 Create theme constants
    - Create `src/styles/theme.ts` with color palette (warm cream background, near-black text, green/blue/red action colors)
    - Define font sizes (greeting: 32, heading: 28, body: 22, button: 24)
    - Define spacing scale and border radius values
    - Define checkbox size (56px)
    - _Requirements: 5.1, 5.2_

- [ ] 5. Shared components
  - [ ] 5.1 Implement Greeting component
    - Create `src/components/Greeting.tsx`
    - Accept `name` prop and render "Welcome {name}!" in large greeting font
    - Apply theme styles for high contrast and large sans-serif text
    - _Requirements: 1.1, 5.2_

  - [ ]* 5.2 Write property test for Greeting personalization
    - **Property 1: Greeting personalization**
    - **Validates: Requirements 1.1**
    - For any valid patient name string, verify the rendered output contains "Welcome " + name + "!"

  - [ ] 5.3 Implement MedicationCard component
    - Create `src/components/MedicationCard.tsx`
    - Accept `medication`, `isTaken`, and `onToggleTaken` props
    - Render medication emoji, name (large sans-serif), schedule (day and time), and large checkbox (56px)
    - Apply checked/unchecked visual states for the checkbox
    - Include accessibility role="checkbox" and accessibility label
    - _Requirements: 1.4, 1.5, 1.6, 1.7, 1.8, 5.7_

  - [ ]* 5.4 Write property test for MedicationCard display
    - **Property 2: Medication card displays all required information**
    - **Validates: Requirements 1.3, 1.4, 1.5, 1.6, 5.7**
    - For any Medication with non-empty fields, verify rendered output contains name, emoji, and schedule text

  - [ ]* 5.5 Write property test for checkbox toggle
    - **Property 3: Checkbox toggles medication taken state**
    - **Validates: Requirements 1.8**
    - For any medication in taken/not-taken state, verify tapping checkbox inverts the state

  - [ ] 5.6 Implement HelpButton component
    - Create `src/components/HelpButton.tsx`
    - Accept `phoneNumber` prop
    - Render large button with text "Call for Help" (not icon-only)
    - On press, call `openPhoneDialer` with the caregiver phone number
    - Include accessibility role="button" and accessibility label
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 5.7 Implement NavigationControls component
    - Create `src/components/NavigationControls.tsx`
    - Accept `currentIndex`, `total`, `onNext`, `onPrevious` props
    - Show "Previous" button only when index > 0
    - Show "Next" or "Done" depending on position
    - Show "{current} of {total}" indicator
    - Use large, clear text buttons (no icon-only navigation)
    - _Requirements: 2.2, 5.4_

- [ ] 6. Screen components
  - [ ] 6.1 Implement MedicationScreen
    - Create `src/screens/MedicationScreen.tsx`
    - Manage `currentIndex` and `takenMap` state locally
    - Display Greeting, current date/time, single MedicationCard, NavigationControls, and HelpButton
    - On "Next" past last medication, navigate to HealthCheckScreen
    - On "Previous" at first medication, disable/hide previous button
    - Clamp index to valid range for error safety
    - _Requirements: 1.1, 1.2, 1.3, 1.7, 1.8, 1.9, 2.1, 2.2, 2.3, 4.1, 4.4_

  - [ ]* 6.2 Write property test for single medication card visibility
    - **Property 4: Single medication card visibility**
    - **Validates: Requirements 2.1**
    - For any medication list (length > 0) and any valid index, verify exactly one MedicationCard is rendered

  - [ ]* 6.3 Write property test for sequential navigation correctness
    - **Property 5: Sequential navigation correctness**
    - **Validates: Requirements 2.3**
    - For list of length N and index i (0 ≤ i < N-1), verify "next" shows medication at i+1; for index i (0 < i ≤ N-1), verify "previous" shows medication at i-1

  - [ ] 6.4 Implement HealthCheckScreen
    - Create `src/screens/HealthCheckScreen.tsx`
    - Display friendly emoji (😊), prompt text "Do you have any questions or concerns right now?" in large sans-serif
    - Display two large YES and NO buttons
    - YES button opens phone dialer with caregiver number
    - NO button navigates back to MedicationScreen
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.3_

- [ ] 7. Checkpoint - Core components verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Navigation and app entry
  - [ ] 8.1 Set up App.tsx with stack navigator
    - Create/update `App.tsx` as the Expo entry point
    - Configure `NavigationContainer` with `createNativeStackNavigator`
    - Register MedicationScreen (initial) and HealthCheckScreen
    - Set `headerShown: false` and `animation: 'none'` (no animated transitions per accessibility requirements)
    - _Requirements: 5.5, 6.1, 6.2_

- [ ] 9. Integration and final wiring
  - [ ] 9.1 Wire all components and verify end-to-end flow
    - Ensure MedicationScreen loads mock data at startup
    - Verify navigation flow: Medication → HealthCheck → Medication
    - Verify Help button functions from MedicationScreen
    - Verify all styling matches theme (high-contrast, large fonts, no dense text)
    - Handle empty medication list edge case with calm message
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.4, 3.5, 4.3, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.4_

  - [ ]* 9.2 Write integration tests for navigation and data flow
    - Test app renders MedicationScreen on launch
    - Test navigation from last medication to HealthCheckScreen
    - Test NO button returns to MedicationScreen
    - Test Help button triggers phone dialer
    - _Requirements: 2.3, 3.4, 3.5, 4.3_

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit/integration tests validate specific examples and edge cases
- All code uses TypeScript with React Native / Expo
- No backend, no authentication, no network dependency after install
- Error states are invisible or self-recovering (no dialogs/popups shown to patient)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.3", "4.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "5.1", "5.3", "5.6", "5.7"] },
    { "id": 3, "tasks": ["5.2", "5.4", "5.5", "6.1", "6.4"] },
    { "id": 4, "tasks": ["6.2", "6.3", "8.1"] },
    { "id": 5, "tasks": ["9.1"] },
    { "id": 6, "tasks": ["9.2"] }
  ]
}
```
