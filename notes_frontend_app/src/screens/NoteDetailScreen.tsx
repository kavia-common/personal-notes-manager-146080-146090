import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Colors, Layout, Typography, Shadows } from '../theme';
import { deleteNote, getNote, Note } from '../db/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NoteDetailNavProp, NoteDetailRouteProp } from '../navigation/AppNavigator';

export default function NoteDetailScreen() {
  const navigation = useNavigation<NoteDetailNavProp>();
  const route = useRoute<NoteDetailRouteProp>();
  const id: number = route.params.id;

  const [note, setNote] = useState<Note | null>(null);

  const load = async () => {
    const n = await getNote(id);
    setNote(n);
  };

  useEffect(() => {
    load();
  }, [id]);

  const onDelete = () => {
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(id);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topActions}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.actionBtn}>
          <Text style={styles.actionText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NoteEditor', { mode: 'edit', id })}
            style={[styles.actionBtn, { marginRight: 10, backgroundColor: Colors.primary }]}
          >
            <Text style={[styles.actionText, { color: '#fff' }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={[styles.actionBtn, { backgroundColor: Colors.error }]}>
            <Text style={[styles.actionText, { color: '#fff' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{note.title || 'Untitled'}</Text>
        <Text style={styles.meta}>Last updated {note.updated_at?.replace('T', ' ')}</Text>
        <Text style={styles.body}>{note.content || 'No content'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Layout.padding },
  loading: { ...Typography.body, paddingTop: 24 },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  actionText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Layout.cardPadding,
    ...Shadows.card,
  },
  title: {
    ...Typography.title,
    fontSize: 24,
    marginBottom: 6,
  },
  meta: {
    ...Typography.small,
    marginBottom: 14,
  },
  body: {
    ...Typography.body,
    lineHeight: 22,
  },
});
