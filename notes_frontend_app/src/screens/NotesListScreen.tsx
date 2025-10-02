import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Colors, Layout } from '../theme';
import { FAB, NoteCard, TopBar, EmptyState } from '../components/UI';
import { getAllNotes, searchNotes, Note } from '../db/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NotesListNavProp } from '../navigation/AppNavigator';

export default function NotesListScreen() {
  const navigation = useNavigation<NotesListNavProp>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    try {
      const data = query ? await searchNotes(query) : await getAllNotes();
      setNotes(data);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [query])
  );

  useEffect(() => {
    const t = setTimeout(() => load(), 200);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <View style={styles.container}>
      <TopBar title="My Notes" />
      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={Colors.muted}
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            content={item.content}
            onPress={() => navigation.navigate('NoteDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyState message="No notes yet. Create your first note!" />}
        refreshControl={
          <RefreshControl tintColor={Colors.primary} refreshing={refreshing} onRefresh={load} />
        }
      />
      <FAB
        testID="fab-add-note"
        onPress={() => navigation.navigate('NoteEditor', { mode: 'create' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchWrap: {
    paddingHorizontal: Layout.padding,
    paddingTop: 12,
    paddingBottom: 8,
  },
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContent: {
    padding: Layout.padding,
    paddingTop: 8,
  },
});
