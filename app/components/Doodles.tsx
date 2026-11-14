import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { colors, radius } from '../theme';

/**
 * Le fond « gribouillages » de la maquette : un motif discret répété.
 * Rendu en SVG, à 6 % d'opacité, il ne gêne jamais la lisibilité.
 * Remplacez ces tracés par votre propre motif vectoriel si vous en avez un.
 */
export function DoodleBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" opacity={0.06}>
        <G fill="none" stroke={colors.text} strokeWidth={1.5}>
          {/* étoile / éclair */}
          <Path d="M60 40 l10 26 l24 2 l-18 16 l6 25 l-22 -14 l-22 14 l6 -25 l-18 -16 l24 -2 z" />
          {/* fusée */}
          <G transform="translate(200, 90)">
            <Path d="M12 0 C20 12 20 26 12 34 C4 26 4 12 12 0 z" />
            <Path d="M6 30 L0 42 L10 38 z" />
            <Path d="M18 30 L24 42 L14 38 z" />
          </G>
          {/* part de pizza */}
          <G transform="translate(300, 40)">
            <Path d="M0 0 L44 0 L22 38 z" />
            <Circle cx="18" cy="12" r="4" />
            <Circle cx="28" cy="18" r="3" />
          </G>
          {/* tasse de café */}
          <G transform="translate(90, 200)">
            <Path d="M0 0 h32 v24 a10 10 0 0 1 -10 10 h-12 a10 10 0 0 1 -10 -10 z" />
            <Path d="M32 6 a9 9 0 0 1 0 16" />
          </G>
          {/* appareil photo */}
          <G transform="translate(210, 240)">
            <Rect x="0" y="0" width="44" height="30" rx="6" />
            <Circle cx="22" cy="15" r="9" />
          </G>
          {/* ballon */}
          <G transform="translate(320, 210)">
            <Circle cx="16" cy="16" r="16" />
            <Path d="M16 32 v14" />
          </G>
        </G>
      </Svg>
    </View>
  );
}

/** Pastille « C69 » du bandeau supérieur. */
function Avatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>C69</Text>
    </View>
  );
}

/** Icône de tuile : carré arrondi vert, glyphe centré. */
export function TileIcon({ glyph, tinted = true }: { glyph: string; tinted?: boolean }) {
  return (
    <View style={[styles.tile, tinted && styles.tileTinted]}>
      <Text style={styles.tileGlyph}>{glyph}</Text>
    </View>
  );
}

export const Doodles = { Background: DoodleBackground, Avatar, TileIcon };

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.accent, fontWeight: '800', fontSize: 13 },
  tile: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHigh,
  },
  tileTinted: { backgroundColor: colors.accentSoft },
  tileGlyph: { fontSize: 20, color: colors.accent },
});
