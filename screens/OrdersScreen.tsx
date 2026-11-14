import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, euro, radius, spacing, typography } from '../theme';
import { Order, orders, STATUS_COLOR, STATUS_LABEL } from '../data';

const FILTERS = ['toutes', 'en_attente', 'preparation', 'expediee', 'livree'] as const;
type Filter = (typeof FILTERS)[number];

export default function OrdersScreen() {
  const [filter, setFilter] = useState<Filter>('toutes');

  const list = useMemo(
    () => (filter === 'toutes' ? orders : orders.filter((o) => o.status === filter)),
    [filter]
  );

  const total = useMemo(() => list.reduce((sum, o) => sum + o.total, 0), [list]);

  return (
    <View style={styles.root}>
      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = f === filter;
          const label = f === 'toutes' ? 'Toutes' : STATUS_LABEL[f];
          return (
            <Pressable key={f} onPress={() => setFilter(f)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.summary}>
        {list.length} commande{list.length > 1 ? 's' : ''} · {euro(total)}
      </Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <OrderRow order={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Aucune commande pour ce filtre.</Text>}
      />
    </View>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Text style={styles.ref}>{order.id}</Text>
        <Text style={styles.client}>
          {order.client} · {order.items} article{order.items > 1 ? 's' : ''}
        </Text>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.total}>{euro(order.total)}</Text>
        <View style={[styles.pill, { backgroundColor: `${STATUS_COLOR[order.status]}22` }]}>
          <Text style={[styles.pillText, { color: STATUS_COLOR[order.status] }]}>
            {STATUS_LABEL[order.status]}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: '#0F1114' },
  summary: { ...typography.label, color: colors.textMuted, paddingHorizontal: spacing.lg },
  list: { padding: spacing.lg, gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rowLeft: { flex: 1 },
  rowRight: { alignItems: 'flex-end', gap: 6 },
  ref: { color: colors.text, fontWeight: '800', fontSize: 15 },
  client: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  total: { color: colors.text, fontWeight: '700', fontSize: 14 },
  pill: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  pillText: { fontSize: 10, fontWeight: '800' },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
