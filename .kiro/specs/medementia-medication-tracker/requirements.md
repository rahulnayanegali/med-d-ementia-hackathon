# Requirements Document

## Introduction

Medementia is a medication tracking application designed specifically for dementia patients and elderly users. The MVP delivers patient-facing screens built with React Native / Expo (TypeScript) targeting both iOS and Android. The app uses local/mock data with no backend, requires no authentication, and follows radical simplification design principles to ensure cognitive accessibility, safety, and familiarity for its target users.

Source wireframe: [Miro board](https://miro.com/app/board/uXjVHEj-K4E=/)

## Glossary

- **App**: The Medementia medication tracking mobile application built with React Native / Expo
- **Patient**: The dementia patient or elderly user who interacts with the App directly
- **Caregiver**: A pre-configured trusted contact whose phone number is stored locally for emergency calls
- **Daily_Medication_View**: The primary screen displaying the patient's greeting, current date/time, and medication cards for today
- **Medication_Card**: A visual card component displaying a single medication with pill image/emoji, schedule information, and a completion checkbox
- **Health_Check_Screen**: A screen presenting the patient with a simple yes/no prompt about health concerns
- **Phone_Dialer**: The native device phone dialer used to initiate calls to the caregiver
- **Mock_Data**: Local static data representing medications, schedules, and caregiver contact information
- **Help_Button**: A prominent button that initiates a direct phone call to the pre-configured caregiver number

## Requirements

### Requirement 1: Daily Medication View

**User Story:** As a patient, I want to see my medications for today in a simple, clear layout, so that I know what to take and when.

#### Acceptance Criteria

1. WHEN the App launches, THE Daily_Medication_View SHALL display a personalized greeting using the patient's first name (e.g., "Welcome Sally!").
2. WHEN the App launches, THE Daily_Medication_View SHALL display the current date and time in a prominent orienting header.
3. THE Daily_Medication_View SHALL display Medication_Cards for the current day loaded from Mock_Data.
4. THE Medication_Card SHALL display a pill image or emoji representing the medication.
5. THE Medication_Card SHALL display the medication name in large, clear sans-serif text.
6. THE Medication_Card SHALL display the scheduled day and time for the medication.
7. THE Medication_Card SHALL display a large checkbox that the patient can tap to mark the medication as taken.
8. WHEN the patient taps the checkbox on a Medication_Card, THE App SHALL visually indicate that the medication has been marked as taken.
9. THE Daily_Medication_View SHALL display a Help_Button at the bottom of the screen.

### Requirement 2: Medication Navigation

**User Story:** As a patient, I want to navigate between my medications one at a time, so that I am not overwhelmed by too much information on a single screen.

#### Acceptance Criteria

1. THE App SHALL present one primary Medication_Card per screen view to limit cognitive load.
2. THE App SHALL provide sequential navigation or pagination to move between Medication_Cards.
3. WHEN the patient navigates to the next medication, THE App SHALL display the next Medication_Card following the same layout pattern as the Daily_Medication_View.

### Requirement 3: Health Check Screen

**User Story:** As a patient, I want to quickly communicate whether I have health concerns, so that my caregiver can be contacted if needed.

#### Acceptance Criteria

1. THE Health_Check_Screen SHALL display a friendly emoji or avatar visual element.
2. THE Health_Check_Screen SHALL display the prompt text "Do you have any questions or concerns right now?" in large, readable sans-serif text.
3. THE Health_Check_Screen SHALL display two large YES and NO buttons as the only interaction options.
4. WHEN the patient taps the YES button, THE App SHALL open the Phone_Dialer with the pre-configured caregiver phone number.
5. WHEN the patient taps the NO button, THE App SHALL navigate the patient back to the Daily_Medication_View.

### Requirement 4: Help Button Emergency Call

**User Story:** As a patient, I want to quickly call my caregiver for help at any time, so that I feel safe and supported.

#### Acceptance Criteria

1. THE Help_Button SHALL be displayed persistently at the bottom of the Daily_Medication_View.
2. THE Help_Button SHALL use large, clear text labeling (not icon-only).
3. WHEN the patient taps the Help_Button, THE App SHALL open the Phone_Dialer with the pre-configured caregiver phone number.
4. THE App SHALL load the caregiver phone number from Mock_Data at launch.

### Requirement 5: Accessibility and Cognitive Design

**User Story:** As a patient with cognitive impairment, I want the app to be visually simple and calming, so that I can use it without confusion or frustration.

#### Acceptance Criteria

1. THE App SHALL use high-contrast styling with dark text on a white or cream background across all screens.
2. THE App SHALL use large, clear sans-serif fonts for all text content.
3. THE App SHALL present only one primary action per screen.
4. THE App SHALL avoid icon-only navigation elements and hamburger menus.
5. THE App SHALL avoid carousels, pop-up dialogs, animated transitions, and infinite scrolling.
6. THE App SHALL avoid dense text blocks and limit text to short, clear statements.
7. THE App SHALL use pill images or emojis as visual indicators alongside medication names.

### Requirement 6: Platform and Data

**User Story:** As a patient, I want the app to work on my phone without needing internet or a login, so that I can always access my medication information.

#### Acceptance Criteria

1. THE App SHALL run on both iOS and Android devices using React Native and Expo.
2. THE App SHALL function without requiring user authentication or a login screen.
3. THE App SHALL load all medication schedules, patient name, and caregiver contact information from Mock_Data stored locally on the device.
4. THE App SHALL function without a network connection after initial installation.
