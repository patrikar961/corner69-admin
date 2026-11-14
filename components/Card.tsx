import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}) {
  const inner = <View style={[styles.card, style]}>{children}</View>;
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : undefined)}>
      {inner}
    </Pressable>
  );
}

/** Carte KPI : libellé majuscule, valeur, sous-titre. */
export function KpiCard({
  label,
  value,
  caption,
  highlight = false,
}: {
  label: string;
  value: string;
  caption: string;
  highlight?: boolean;
}) {
  return (
    <Card style={styles.kpi}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={[styles.kpiValue, highlight && { color: colors.accent }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.kpiCaption}>{caption}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.75 },
  kpi: { flex: 1, alignItems: 'center' },
  kpiLabel: { ...typography.label, color: colors.textMuted, marginBottom: spacing.md },
  kpiValue: { ...typography.kpi, color: colors.text },
  kpiCaption: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm, fontSize: 12 },
});
