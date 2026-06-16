# Medementia

A medication tracking app designed for dementia patients and elderly users.

Medementia is a React Native / Expo (TypeScript) app that presents one medication
at a time using large, high-contrast, calm UI. It avoids cognitive overload by
showing a single clear action per screen, and includes a persistent help button
that calls a trusted caregiver directly. All data is local — no backend, no login,
and no internet connection required after install.

## What the app does

- **Daily medication view** — Shows a personalized greeting ("Welcome Sally!"),
  the current date, and one medication card at a time with a pill emoji, name,
  schedule, and a large checkbox to mark it as taken.
- **Simple navigation** — Step through medications one by one with large
  "Previous" / "Next" buttons (no carousels, menus, or icon-only controls).
- **Health check screen** — A friendly yes/no prompt. "YES" opens the phone
  dialer to call the caregiver; "NO" returns to the medications.
- **Help button** — Always available at the bottom of the screen to call the
  caregiver instantly.

## Tech stack

- Expo SDK 53
- React Native 0.79 / React 19
- TypeScript
- React Navigation (native stack)
- Jest + React Native Testing Library + fast-check (property-based tests)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)
- For iOS: macOS with Xcode and the iOS Simulator
- For Android: Android Studio with an emulator, or a physical device
- Optional: the [Expo Go](https://expo.dev/go) app on your phone

## Run it locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo dev server:

   ```bash
   npm start
   ```

   Then press `i` for the iOS Simulator, `a` for the Android emulator, or `w`
   for web. You can also scan the QR code with the Expo Go app on your phone.

   To launch a platform directly:

   ```bash
   npm run ios      # iOS Simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

## Run the tests

```bash
npm test
```

## Project structure

```
src/
  components/   Greeting, MedicationCard, HelpButton, NavigationControls
  screens/      MedicationScreen, HealthCheckScreen
  data/         mockData.ts (medications, patient, caregiver)
  utils/        phoneDialer, dateFormatter
  styles/       theme.ts (colors, fonts, spacing)
  __tests__/    test setup
App.tsx         Expo entry point and navigation
```

## Notes

- All medication, patient, and caregiver data is mock data stored locally in
  `src/data/mockData.ts`.
- The app requires no authentication and works offline after installation.
