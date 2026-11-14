import { TextStyle } from 'react-native';

/**
 * CORNER69 — Design system
 * Palette, typographie et ombres extraites de la maquette « Administration ».
 * Toutes les valeurs de l'app viennent d'ici : un seul endroit à changer.
 */

export const colors = {
  // Fonds
  background: '#0F1114', // fond général de l'écran
  surface: '#1C1F24', // cartes
  surfaceHigh: '#23262B', // cartes survolées / tuiles
  border: '#2A2E34',

  // Accent principal — le vert néon du logo
  accent: '#C6F000',
  accentSoft: 'rgba(198,240,0,0.14)', // icônes, fonds de tuiles
  accentGlow: 'rgba(198,240,0,0.35)', // halo (shadowColor)

  // Accent secondaire — alertes
  warning: '#F5A524',

  // Texte
  text: '#FFFFFF',
  textMuted: '#9AA1AB',
  textFaint: '#6B7280',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  // Poppins / Inter : à charger via expo-font si vous voulez la même graisse
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
  label: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,
  title: { fontSize: 26, fontWeight: '800', letterSpacing: 0.5 } as TextStyle,
  kpi: { fontSize: 30, fontWeight: '800' } as TextStyle,
  body: { fontSize: 14 } as TextStyle,
} as const;

/** Halo néon autour d'un élément (le glow du logo, réutilisé dans l'UI). */
export const glow = (color: string = colors.accent, strength = 12) => ({
  shadowColor: color,
  shadowOpacity: 0.55,
  shadowRadius: strength,
  shadowOffset: { width: 0, height: 0 },
  elevation: 8,
});

/** Formatage monétaire français : 1 234,56 € */
export const euro = (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

/** Ligne de tendance → chemin SVG. Utilisé par la carte de ventes. */
export const buildSparkline = (
  values: number[],
  width: number,
  height: number,
  padding = 8
): { line: string; area: string; max: number; min: number } => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = (width - padding * 2) / (values.length - 1);

  const points = values.map((v, i) => {
    const x = padding + i * stepX;
    const y = padding + (height - padding * 2) * (1 - (v - min) / span);
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${height} L${points[0][0].toFixed(1)},${height} Z`;
  return { line, area, max, min };
};
