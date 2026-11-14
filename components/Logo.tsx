import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, glow, typography } from '../theme';

type Props = {
  /** Hauteur de capitale, en points. */
  size?: number;
  /** Affiche la barre de chargement sous le lettrage. */
  showBar?: boolean;
  /** Remplissage de la barre, de 0 à 1. */
  progress?: number;
  /** Sous-titre optionnel (ex. « ADMINISTRATION »). */
  subtitle?: string;
  style?: ViewStyle;
};

/**
 * Logo « CORNER69 » : capitales très grasses légèrement inclinées, « 69 » en
 * vert néon avec halo, barre de chargement dessous.
 *
 * L'inclinaison vient de `transform: skewX`, pas d'une police italique.
 * Le halo est posé sur un <View> wrapper, pas sur le <Text> : sur Android,
 * `shadowColor` / `shadowRadius` sont ignorés par le rendu du texte.
 */
export function Logo({
  size = 42,
  showBar = true,
  progress = 0.45,
  subtitle,
  style,
}: Props) {
  const letter = { fontSize: size, fontWeight: '900' as const, letterSpacing: -0.5 };
  const barWidth = size * 7.2;
  const ratio = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.row}>
        <Text style={[letter, styles.white, styles.skew]}>CORNER</Text>
        {/* Halo porté par la View : seul moyen fiable sur les deux plateformes. */}
        <View style={[styles.glowWrap, glow(colors.accent, size * 0.4)]}>
          <Text style={[letter, styles.green, styles.skew]}>69</Text>
        </View>
      </View>

      {showBar && (
        // Pas d'overflow:'hidden' ici : il rognerait le halo de la barre.
        <View style={[styles.bar, { width: barWidth, marginTop: size * 0.22 }]}>
          <View style={styles.barTrack} />
          <View style={[styles.barFill, { width: barWidth * ratio }]} />
        </View>
      )}

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  white: { color: colors.text },
  green: { color: colors.accent, marginLeft: 2 },
  // L'italique penché de la maquette.
  skew: { transform: [{ skewX: '-9deg' }] },
  glowWrap: {
    // Annule l'effet de bord du halo sur la mise en page.
    backgroundColor: 'transparent',
  },
  bar: {
    height: 5,
    justifyContent: 'flex-start',
  },
  barTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
    ...glow(colors.accent, 8),
  },
  subtitle: { ...typography.label, color: colors.textMuted, marginTop: 6 },
});
