import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Layout, Typography, Shadows } from '../theme';

type TopBarProps = {
  title: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
};

export function TopBar({ title, right, left }: TopBarProps) {
  return (
    <View style={styles.topbarWrapper}>
      <View style={styles.topbar}>
        <View style={styles.side}>{left}</View>
        <Text style={styles.topbarTitle}>{title}</Text>
        <View style={styles.side}>{right}</View>
      </View>
    </View>
  );
}

type FabProps = {
  onPress: () => void;
  icon?: React.ReactNode;
  testID?: string;
};

export function FAB({ onPress, icon, testID }: FabProps) {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.fab}
    >
      {icon ?? <Text style={styles.fabPlus}>＋</Text>}
    </TouchableOpacity>
  );
}

type NoteCardProps = {
  title: string;
  content: string;
  onPress?: () => void;
};

export function NoteCard({ title, content, onPress }: NoteCardProps) {
  const preview =
    content.length > 140 ? content.slice(0, 140).trim() + '…' : content;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <Text numberOfLines={1} style={styles.cardTitle}>
        {title || 'Untitled'}
      </Text>
      <Text numberOfLines={3} style={styles.cardBody}>
        {preview || 'No content'}
      </Text>
    </TouchableOpacity>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>🗒️</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topbarWrapper: {
    backgroundColor: Colors.background,
  },
  topbar: {
    paddingTop: Platform.select({ ios: 54, android: 24, default: 16 }),
    paddingBottom: 12,
    paddingHorizontal: Layout.padding,
    backgroundColor: Colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.soft,
  },
  topbarTitle: {
    ...Typography.title,
    flex: 1,
    textAlign: 'center',
  },
  side: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 58,
    height: 58,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.card,
  },
  fabPlus: {
    color: '#fff',
    fontSize: 30,
    marginTop: -2,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius,
    padding: Layout.cardPadding,
    marginBottom: Layout.gap,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  cardTitle: {
    ...Typography.body,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardBody: {
    ...Typography.body,
    color: Colors.muted,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },
  emptyText: {
    ...Typography.subtitle,
    fontSize: 16,
  },
});
