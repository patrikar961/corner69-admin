import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, radius, spacing, typography } from '../theme';

const COPY: Record<string, string> = {
  Statistics: 'Analyses détaillées : chiffre d’affaires, panier moyen, top produits.',
  Deliveries: 'Suivi des livraisons : à envoyer, en cours, livrées.',
  Customers: 'Fiches clients, historique de commandes et programme de fidélité.',
  Alerts: 'Stock bas, commandes en retard, incidents de paiement.',
  Settings: 'Compte, paiement, livraison, notifications et équipe.',
  Shop: 'Horaires, adresse, statut d’ouverture et infos publiques de la boutique.',
};

/**
 * Écran générique : le socle de navigation est en place, il ne reste qu'à
 * remplacer ce composant par l'écran réel au fur et à mesure.
 */
export default function PlaceholderScreen() {
  const route = useRoute();
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{route.name}</Text>
        <Text style={styles.text}>{COPY[route.name] ?? 'Écran à construire.'}</Text>
        <Text style={styles.hint}>
          Branchez votre API ici — la mise en page et le thème sont déjà prêts.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  text: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  hint: { ...typography.label, color: colors.textFaint, marginTop: spacing.sm },
});
