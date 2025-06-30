import type { Restaurant } from '../types';

export const restaurantsData: Restaurant[] = [
  {
    id: '1',
    name: 'La Cocina de María',
    cuisine: ['Española', 'Mediterránea'],
    priceRange: 'mid',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    location: 'Centro Histórico',
    description: 'Auténtica cocina española con un toque moderno. Especialidad en paellas y tapas tradicionales.',
    hours: '12:00 - 23:00',
    phone: '+34 912 345 678',
    specialties: ['Paella Valenciana', 'Gazpacho', 'Croquetas de Jamón'],
    reviews: 234
  },
  {
    id: '2',
    name: 'Street Food Paradise',
    cuisine: ['Internacional', 'Fusión'],
    priceRange: 'budget',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    location: 'Mercado Central',
    description: 'Food truck con los mejores sabores callejeros del mundo.',
    hours: '11:00 - 21:00',
    phone: '+34 678 901 234',
    specialties: ['Tacos', 'Ramen', 'Burgers Gourmet'],
    reviews: 189
  },
  {
    id: '3',
    name: 'Le Petit Bistro',
    cuisine: ['Francesa', 'Europea'],
    priceRange: 'high',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    location: 'Barrio de las Letras',
    description: 'Elegante bistró francés con una carta de vinos excepcional.',
    hours: '13:00 - 00:00',
    phone: '+34 915 678 901',
    specialties: ['Foie Gras', 'Bouillabaisse', 'Crème Brûlée'],
    reviews: 156
  },
  {
    id: '4',
    name: 'Sushi Zen',
    cuisine: ['Japonesa', 'Asiática'],
    priceRange: 'luxury',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    location: 'Salamanca',
    description: 'Experiencia omakase auténtica con pescado importado diariamente de Japón.',
    hours: '14:00 - 23:00',
    phone: '+34 914 567 890',
    specialties: ['Omakase', 'Sashimi Premium', 'Wagyu'],
    reviews: 98
  },
  {
    id: '5',
    name: 'Pasta & Amore',
    cuisine: ['Italiana'],
    priceRange: 'mid',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800',
    location: 'Malasaña',
    description: 'Trattoria familiar con pasta fresca hecha a diario.',
    hours: '13:00 - 23:30',
    phone: '+34 913 456 789',
    specialties: ['Carbonara', 'Truffle Risotto', 'Tiramisu'],
    reviews: 267
  }
];
