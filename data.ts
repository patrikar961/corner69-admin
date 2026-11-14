/**
 * Données de démonstration.
 * Remplacez chaque fonction par votre appel API — la forme des objets est
 * celle attendue par les écrans, rien d'autre à changer.
 */

export type Order = {
  id: string;
  client: string;
  total: number;
  status: 'en_attente' | 'preparation' | 'expediee' | 'livree' | 'annulee';
  createdAt: string; // ISO
  items: number;
};

export const STATUS_LABEL: Record<Order['status'], string> = {
  en_attente: 'En attente',
  preparation: 'En préparation',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
};

export const STATUS_COLOR: Record<Order['status'], string> = {
  en_attente: '#F5A524',
  preparation: '#7DD3FC',
  expediee: '#C6F000',
  livree: '#4ADE80',
  annulee: '#6B7280',
};

export const orders: Order[] = [
  { id: 'C69-1041', client: 'Amina B.', total: 64.9, status: 'en_attente', items: 3, createdAt: '2026-11-14T20:12:00Z' },
  { id: 'C69-1040', client: 'Karim T.', total: 55.1, status: 'en_attente', items: 2, createdAt: '2026-11-14T19:40:00Z' },
  { id: 'C69-1039', client: 'Léa M.', total: 112.0, status: 'preparation', items: 5, createdAt: '2026-11-14T18:05:00Z' },
  { id: 'C69-1038', client: 'Sofiane R.', total: 28.5, status: 'expediee', items: 1, createdAt: '2026-11-14T11:22:00Z' },
  { id: 'C69-1037', client: 'Nadia K.', total: 87.3, status: 'livree', items: 4, createdAt: '2026-11-13T21:15:00Z' },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
};

export const products: Product[] = [
  { id: 'P-01', name: 'Pizza Margherita', price: 11.5, stock: 42, category: 'Pizza' },
  { id: 'P-02', name: 'Pizza Reine', price: 13.0, stock: 31, category: 'Pizza' },
  { id: 'P-03', name: 'Menu Tacos XL', price: 9.9, stock: 8, category: 'Tacos' },
  { id: 'P-04', name: 'Tiramisu maison', price: 5.5, stock: 0, category: 'Dessert' },
  { id: 'P-05', name: 'Limonade artisanale', price: 3.2, stock: 120, category: 'Boisson' },
];

export type Kpi = { today: number; todayOrders: number; month: number; monthOrders: number };

export const kpi: Kpi = {
  today: 120.0,
  todayOrders: 2,
  month: 2480.0,
  monthOrders: 41,
};

/** Séries du graphique « Évolution des ventes », par période. */
export const revenueSeries: Record<'7j' | '30j' | 'tout', number[]> = {
  '7j': [180, 240, 210, 320, 290, 410, 480],
  '30j': [420, 380, 520, 610, 580, 740, 860, 1020, 1400, 1650, 1850],
  tout: [300, 520, 480, 700, 900, 1150, 1400, 1850, 2100, 2480],
};

export const revenueTotal: Record<'7j' | '30j' | 'tout', number> = {
  '7j': 508.0,
  '30j': 1850.0,
  tout: 9460.0,
};

export const alerts = [
  { id: 'A-1', level: 'urgent' as const, title: 'Stock épuisé — Tiramisu maison', detail: 'Réapprovisionner sous 24 h' },
  { id: 'A-2', level: 'info' as const, title: '2 commandes en attente', detail: 'À valider depuis Commandes' },
];
