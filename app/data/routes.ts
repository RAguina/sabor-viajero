// Tipos locales para evitar imports cruzados
export interface RouteStop {
  id: string;
  name: string;
  type: string;
  duration: string;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  image: string;
  description: string;
  stops: RouteStop[];
  estimatedTime: string;
}

export const routesData: Route[] = [
  {
    id: '1',
    name: 'Sabores del Barrio Latino',
    duration: '3 horas',
    difficulty: 'easy',
    price: 40,
    image: 'https://images.unsplash.com/photo-1555992336-03a23f3c7e79?w=800',
    description: 'Descubre los secretos culinarios del barrio más bohemio de la ciudad.',
    estimatedTime: '10:00 - 13:00',
    stops: [
      {
        id: '1',
        name: 'Café Libertad',
        type: 'Desayuno',
        duration: '45 min',
        description: 'Café de especialidad y pasteles artesanales',
      },
      {
        id: '2',
        name: 'Mercado de San Miguel',
        type: 'Mercado',
        duration: '1 hora',
        description: 'Degustación de productos locales',
      },
      {
        id: '3',
        name: 'Taberna El Sur',
        type: 'Tapas',
        duration: '45 min',
        description: 'Las mejores tapas tradicionales',
      },
    ],
  },
  {
    id: '2',
    name: 'Tour Gastronómico Premium',
    duration: '5 horas',
    difficulty: 'medium',
    price: 120,
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    description: 'Experiencia exclusiva por los restaurantes con estrella Michelin.',
    estimatedTime: '12:00 - 17:00',
    stops: [
      {
        id: '1',
        name: 'Restaurant Arzak',
        type: 'Alta Cocina',
        duration: '2 horas',
        description: '3 estrellas Michelin',
      },
      {
        id: '2',
        name: 'DiverXO',
        type: 'Vanguardia',
        duration: '2 horas',
        description: 'Cocina experimental',
      },
      {
        id: '3',
        name: 'Champagne Bar',
        type: 'Maridaje',
        duration: '1 hora',
        description: 'Selección de champagnes premium',
      },
    ],
  },
  // Puedes agregar más rutas siguiendo el mismo formato
];
