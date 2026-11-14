import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography, euro } from '../theme';
import { alerts } from '../data';

/**
 * Écran générique des rubriques non encore développées.
 * Chaque rubrique affiche son titre et la liste de ce qu'elle
 * contiendra, pour que la maquette reste lisible.
 */
export default function AlertsScreen() {
  return (
    <View style={styles.root}>
      {alerts.map((a) => (
        <View key={a.id} style={styles.card}>
          <Text style={[styles.level, a.level === 'urgent' && styles.urgent]}>
            {a.level === 'urgent' ? 'Urgent' : 'Info'}
          </Text>
          <Text style={styles.title}>{a.title}</Text>
          <Text style={styles.detail}>{a.detail}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  level: { ...typography.label, color: colors.accent },
  urgent: { color: colors.warning },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  detail: { color: colors.textMuted, fontSize: 12 },
});
