export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: 'budget' | 'mid' | 'high' | 'luxury';
  rating: number;
  image: string;
  location: string;
  description: string;
  hours: string;
  phone: string;
  specialties: string[];
  reviews: number;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  price: number;
  category: string;
  image: string;
  description: string;
  capacity: number;
  available: number;
}

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
