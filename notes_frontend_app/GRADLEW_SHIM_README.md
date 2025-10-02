# Gradle Wrapper Shim

Some CI pipelines invoke `./gradlew` directly at the project root. This Expo-managed app does not include native folders until `expo prebuild` is run.

The included `gradlew` shim:
- Detects missing `android/gradlew`
- Runs `expo prebuild --platform android`
- Delegates to `android/gradlew` with all passed arguments

This allows legacy pipelines to keep calling `./gradlew assembleDebug` without changes.
