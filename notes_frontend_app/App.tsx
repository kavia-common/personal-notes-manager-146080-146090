import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { getDb } from './src/db/database';

export default function App() {
  // Initialize database early
  useEffect(() => {
    getDb().catch((e) => console.warn('DB init error', e));
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}
