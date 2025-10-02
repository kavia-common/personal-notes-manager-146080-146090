import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import NotesListScreen from '../screens/NotesListScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import { Colors } from '../theme';

export type RootStackParamList = {
  NotesList: undefined;
  NoteDetail: { id: number };
  NoteEditor: { mode: 'create' | 'edit'; id?: number };
};

export type NotesListNavProp = StackNavigationProp<RootStackParamList, 'NotesList'>;
export type NoteDetailNavProp = StackNavigationProp<RootStackParamList, 'NoteDetail'>;
export type NoteEditorNavProp = StackNavigationProp<RootStackParamList, 'NoteEditor'>;

export type NoteDetailRouteProp = RouteProp<RootStackParamList, 'NoteDetail'>;
export type NoteEditorRouteProp = RouteProp<RootStackParamList, 'NoteEditor'>;

const Stack = createStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.secondary,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="NotesList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotesList" component={NotesListScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
