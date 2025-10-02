# CI Instructions for Native Android Build (Expo Managed)

This project uses the Expo managed workflow. Before any Gradle tasks are executed, the native Android project must be generated via prebuild.

Use the following script which is already defined in package.json:
- npm run build
  - Internally runs: npm run ci:android
    - expo prebuild --platform android
    - cd android && ./gradlew assembleDebug

If your CI previously ran `./gradlew` directly at repo root, switch to `npm run build` to ensure the native project exists.
