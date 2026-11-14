import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, euro, radius, spacing, typography } from '../theme';
import { products, Product } from '../data';

export default function ProductsScreen() {
  const inStock = products.filter((p) => p.stock > 0).length;

  return (
    <View style={styles.root}>
      <Text style={styles.summary}>
        {products.length} produits · {inStock} en stock
      </Text>
      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductRow product={item} />}
      />
    </View>
  );
}

function ProductRow({ product }: { product: Product }) {
  const out = product.stock === 0;
  const low = product.stock > 0 && product.stock <= 10;
  const stockColor = out ? '#F87171' : low ? colors.warning : colors.accent;

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{euro(product.price)}</Text>
        <Text style={[styles.stock, { color: stockColor }]}>
          {out ? 'Épuisé' : `${product.stock} en stock`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  summary: { ...typography.label, color: colors.textMuted, padding: spacing.lg, paddingBottom: 0 },
  list: { padding: spacing.lg, gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  category: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { color: colors.text, fontWeight: '700', fontSize: 14 },
  stock: { fontSize: 11, fontWeight: '700', marginTop: 3 },
});
