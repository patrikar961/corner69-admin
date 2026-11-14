import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../App';
import { Card, KpiCard } from '../components/Card';
import { Tile } from '../components/Tile';
import { Doodles } from '../components/Doodles';
import { buildSparkline, colors, euro, glow, radius, spacing, typography } from '../theme';
import { kpi, revenueSeries, revenueTotal } from '../data';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Period = '7j' | '30j' | 'tout';

const PERIODS: Period[] = ['7j', '30j', 'tout'];
const PERIOD_LABEL: Record<Period, string> = { '7j': '7J', '30j': '30J', tout: 'TOUT' };

const CHART_W = 320;
const CHART_H = 110;

export default function DashboardScreen() {
  const navigation = useNavigation<Nav>();
  const [period, setPeriod] = useState<Period>('30j');

  const chart = useMemo(() => buildSparkline(revenueSeries[period], CHART_W, CHART_H, 10), [period]);

  return (
    <View style={styles.root}>
      <Doodles.Background />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* En-tête : le logo remplace le titre de la barre de navigation */}
        <View style={styles.header}>
          <Text style={styles.appSubtitle}>ADMINISTRATION</Text>
        </View>

        <Text style={styles.section}>Statistiques</Text>
        <View style={styles.kpiRow}>
          <KpiCard
            label="Aujourd’hui"
            value={euro(kpi.today)}
            caption={`${kpi.todayOrders} nouvelles commandes`}
            highlight
          />
          <KpiCard label="Ce mois" value={euro(kpi.month)} caption={`${kpi.monthOrders} commandes`} />
        </View>

        <Text style={styles.section}>Gestion</Text>
        <View style={styles.grid}>
          <View style={styles.gridCol}>
            <Tile
              glyph="🛍"
              title="Commandes"
              subtitle="2 en attente"
              badge={2}
              onPress={() => navigation.navigate('Orders')}
            />
            <Tile
              glyph="📦"
              title="Livraisons"
              subtitle="3 à envoyer"
              onPress={() => navigation.navigate('Deliveries')}
            />
            <Tile
              glyph="👤"
              title="Clients"
              subtitle="Fidélité"
              onPress={() => navigation.navigate('Customers')}
            />
            <Tile
              glyph="⚙"
              title="Paramètres"
              subtitle="Configuration"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
          <View style={styles.gridCol}>
            <Tile
              glyph="📈"
              title="Statistiques"
              subtitle="Analyses"
              onPress={() => navigation.navigate('Statistics')}
            />
            <Tile
              glyph="🏷"
              title="Produits"
              subtitle="Catalogue"
              onPress={() => navigation.navigate('Products')}
            />
            <Tile
              glyph="⚠"
              title="Alertes"
              subtitle="1 urgence"
              badge={1}
              onPress={() => navigation.navigate('Alerts')}
            />
            <Tile
              glyph="🏪"
              title="Ma Boutique"
              subtitle="Infos & statut"
              onPress={() => navigation.navigate('Shop')}
            />
          </View>
        </View>

        {/* Carte graphique */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Évolution des ventes</Text>
          <Text style={styles.chartTotal}>Revenus · {euro(revenueTotal[period])}</Text>

          <View style={styles.chartWrap}>
            <Svg width={CHART_W} height={CHART_H}>
              <Defs>
                <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={colors.accent} stopOpacity="0.45" />
                  <Stop offset="1" stopColor={colors.accent} stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Path d={chart.area} fill="url(#fill)" />
              <Path
                d={chart.line}
                fill="none"
                stroke={colors.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          <View style={styles.periodRow}>
            {PERIODS.map((p) => {
              const active = p === period;
              return (
                <Pressable
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={[styles.periodBtn, active && styles.periodBtnActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text style={[styles.periodText, active && styles.periodTextActive]}>
                    {PERIOD_LABEL[p]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  header: { alignItems: 'center', marginBottom: spacing.sm },
  appSubtitle: { ...typography.label, color: colors.textMuted },
  section: { ...typography.label, color: colors.textMuted, marginTop: spacing.sm },
  kpiRow: { flexDirection: 'row', gap: spacing.md },
  grid: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  gridCol: { flex: 1, gap: spacing.md },
  chartCard: { marginTop: spacing.sm, paddingBottom: spacing.lg },
  chartTitle: { ...typography.label, color: colors.textMuted, textAlign: 'center' },
  chartTotal: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  chartWrap: { marginTop: spacing.md, alignItems: 'center' },
  periodRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 3,
    gap: 3,
  },
  periodBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  periodBtnActive: { backgroundColor: colors.accent, ...glow(colors.accent, 10) },
  periodText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  periodTextActive: { color: '#0F1114' },
});
