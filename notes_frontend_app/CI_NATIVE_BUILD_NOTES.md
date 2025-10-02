# CI Native Android Build Notes

If your CI runs a Gradle task directly (e.g., `./gradlew assembleDebug`) you must first generate the native Android project from the Expo app.

Steps:
1) Install dependencies
   npm ci

2) Generate native Android project
   npm run prebuild:android
   # This runs: expo prebuild --platform android

3) Build with Gradle
   cd android
   ./gradlew assembleDebug

Why this is needed:
- This repository is an Expo-managed workflow project. It does not include the `android/` or `ios/` native folders by default. Running `expo prebuild` creates those folders and the `./gradlew` script required by the Gradle build step.

Local development:
- You can run the app without prebuild using Metro: `npm start` and then open it in Expo Go on your device/emulator.
