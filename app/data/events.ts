import { Event } from '../types';

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Festival de Vinos de Otoño',
    date: new Date('2025-07-15'),
    time: '18:00',
    location: 'Palacio de Cristal',
    price: 45,
    category: 'Degustación',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    description: 'Degustación de más de 50 vinos nacionales e internacionales con maridaje de quesos artesanales.',
    capacity: 200,
    available: 45
  },
  {
    id: '2',
    title: 'Taller de Sushi con Chef Takeshi',
    date: new Date('2025-07-20'),
    time: '16:00',
    location: 'Escuela de Cocina Central',
    price: 85,
    category: 'Taller',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
    description: 'Aprende las técnicas tradicionales del sushi con un maestro japonés.',
    capacity: 20,
    available: 3
  },
  {
    id: '3',
    title: 'Ruta de Tapas Nocturna',
    date: new Date('2025-07-10'),
    time: '20:00',
    location: 'Plaza Mayor',
    price: 35,
    category: 'Tour',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Recorrido por los mejores bares de tapas del centro histórico.',
    capacity: 30,
    available: 12
  }
];
