# CORNER69 — Application d'administration

Application mobile (React Native / Expo) reproduisant la maquette « CORNER69 Administration » :
thème sombre, accent vert néon, tableau de bord, commandes et catalogue produits.

## Démarrage

```bash
npm install
npx expo start
```

Puis `i` (iOS), `a` (Android) ou `w` (web). Sur téléphone : scannez le QR code avec Expo Go.

## Structure

```
App.tsx                     Navigation (Dashboard → Commandes, Produits, …)
otheme.ts                    Design system : couleurs, espacements, typo, glow, format €
data.ts                     Données de démonstration + types (Order, Product, Kpi…)
oapp.json                   Configuration Expo (nom, identifiants, thème sombre)
components/
  Logo.tsx                  Logo CORNER69 (lettrage incliné + halo + barre)
  Card.tsx                  Carte et carte KPI
  Tile.tsx                  Bouton de la grille « Gestion »
  Doodles.tsx               Fond « gribouillages » + pastille C69 + icône de tuile
screens/
  DashboardScreen.tsx       Statistiques, grille de gestion, graphique des ventes
  OrdersScreen.tsx          Liste des commandes avec filtres par statut
  ProductsScreen.tsx        Catalogue avec état du stock
  PlaceholderScreen.tsx     Écran générique pour les rubriques restantes
```

## Personnaliser

- **Couleurs / typo** → tout est dans `theme.ts`. Le vert est `colors.accent`.
- **Données** → `data.ts`. Remplacez les tableaux par vos appels API : la forme des
  objets est celle attendue par les écrans.
- **Graphique** → `buildSparkline()` dans `theme.ts` transforme un tableau de nombres
  en tracé SVG. Le sélecteur 7J / 30J / TOUT change la série utilisée.
- **Vraie police** → la maquette utilise une sans-serif très grasse.
  Ajoutez `expo-font` et chargez Poppins Black Italic / Montserrat ExtraBold Italic,
  puis remplacez les `fontWeight: '900'` dans `theme.ts`.

## Notes

- Le lettrage penché du logo est obtenu avec `transform: skewX(-9deg)` — pas besoin
  d'une police italique pour l'effet d'inclinaison.
- Le halo vert (`glow()`) utilise `shadowColor` + `shadowRadius`. Sur Android, l'effet
  est approximé par `elevation` : pour un vrai néon, préférez `react-native-shadow-2`
  ou une image de halo derrière le texte.
- Les icônes de la maquette sont des emojis pour rester sans dépendance. Pour des icônes
  nettes, installez `lucide-react-native` et remplacez les glyphes dans `screens/DashboardScreen.tsx`.
