import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors, Layout, Typography, Shadows } from '../theme';
import { createNote, getNote, updateNote } from '../db/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NoteEditorNavProp, NoteEditorRouteProp } from '../navigation/AppNavigator';

export default function NoteEditorScreen() {
  const navigation = useNavigation<NoteEditorNavProp>();
  const route = useRoute<NoteEditorRouteProp>();
  const mode: 'create' | 'edit' = route.params?.mode ?? 'create';
  const id: number | undefined = route.params?.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const load = async () => {
      if (mode === 'edit' && id) {
        const existing = await getNote(id);
        if (existing) {
          setTitle(existing.title);
          setContent(existing.content);
        }
      }
    };
    load();
  }, [mode, id]);

  const onSave = async () => {
    const t = title.trim();
    const c = content.trim();
    if (!t && !c) {
      Alert.alert('Empty note', 'Please add a title or content.');
      return;
    }

    if (mode === 'edit' && id) {
      await updateNote(id, t || 'Untitled', c);
      navigation.goBack();
    } else {
      await createNote(t || 'Untitled', c);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{mode === 'edit' ? 'Edit Note' : 'New Note'}</Text>
          <TouchableOpacity onPress={onSave} style={[styles.headerBtn, styles.saveBtn]}>
            <Text style={[styles.headerBtnText, { color: '#fff' }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={Colors.muted}
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
          <TextInput
            placeholder="Start typing..."
            placeholderTextColor={Colors.muted}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            style={styles.bodyInput}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: Platform.select({ ios: 54, android: 24, default: 16 }),
    paddingBottom: 12,
    paddingHorizontal: Layout.padding,
    backgroundColor: Colors.surface,
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveBtn: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  headerBtnText: {
    ...Typography.body,
    fontWeight: '600',
  },
  headerTitle: {
    ...Typography.title,
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: Layout.padding,
  },
  titleInput: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.smallRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 12,
    ...Shadows.soft,
  },
  bodyInput: {
    minHeight: 280,
    backgroundColor: Colors.surface,
    borderRadius: Layout.smallRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 22,
    ...Shadows.soft,
  },
});
