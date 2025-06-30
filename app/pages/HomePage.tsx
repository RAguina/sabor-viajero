'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Award,
  Zap,
  Heart,
  MapPin,
  ArrowRight,
  CalendarDays,
  Timer,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { restaurantsData } from '../data/restaurants';
import { eventsData } from '../data/events';
import { routesData } from '../data/routes';
import { StarRating } from '../components/StarRating';
import { getPriceSymbol } from '../utils/getPriceSymbol';
import { getDifficultyColor } from '../utils/getDifficultyColor';

const HomePage = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Filtros en memoria para restaurantes, eventos, rutas destacados por búsqueda
  const filterString = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const query = filterString(searchQuery);

  const filteredRestaurants = restaurantsData.filter(
    r =>
      filterString(r.name).includes(query) ||
      r.cuisine.some(c => filterString(c).includes(query)) ||
      filterString(r.location).includes(query)
  );
  const filteredEvents = eventsData.filter(
    e =>
      filterString(e.title).includes(query) ||
      filterString(e.description).includes(query) ||
      filterString(e.location).includes(query) ||
      filterString(e.category).includes(query)
  );
  const filteredRoutes = routesData.filter(
    r =>
      filterString(r.name).includes(query) ||
      filterString(r.description).includes(query)
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Descubre los Mejores Sabores
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Restaurantes, eventos y rutas gastronómicas en un solo lugar
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Busca restaurantes, eventos o rutas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
              <Search className="absolute right-4 top-4 h-6 w-6 text-gray-500" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                +500 Restaurantes
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Award className="h-4 w-4" />
                Eventos Exclusivos
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Rutas Curadas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Restaurantes Destacados</h2>
            <button
              onClick={() => router.push('/restaurants')}
              className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(query ? filteredRestaurants : restaurantsData).slice(0, 3).map(restaurant => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(restaurant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm">
                      {getPriceSymbol(restaurant.priceRange)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {restaurant.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {restaurant.cuisine.map((c, i) => (
                      <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <StarRating rating={restaurant.rating} />
                    <span className="text-sm text-gray-500">{restaurant.reviews} reseñas</span>
                  </div>
                </div>
              </div>
            ))}
            {(query && filteredRestaurants.length === 0) && (
              <div className="col-span-full text-gray-500 py-12 text-center">No se encontraron restaurantes.</div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Próximos Eventos</h2>
            <button
              onClick={() => router.push('/events')}
              className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(query ? filteredEvents : eventsData).slice(0, 3).map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {typeof event.date === 'string'
                        ? new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        : event.date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-orange-500">{event.price}€</span>
                    <span className={`text-sm ${event.available < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {event.available} plazas disponibles
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {(query && filteredEvents.length === 0) && (
              <div className="col-span-full text-gray-500 py-12 text-center">No se encontraron eventos.</div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Rutas Populares</h2>
            <button
              onClick={() => router.push('/routes')}
              className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(query ? filteredRoutes : routesData).slice(0, 2).map(route => (
              <div
                key={route.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/routes/${route.id}`)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
                    <p className="text-gray-600 mb-4">{route.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="h-4 w-4 text-gray-500" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(route.difficulty)}`}>
                          {route.difficulty === 'easy'
                            ? 'Fácil'
                            : route.difficulty === 'medium'
                            ? 'Medio'
                            : 'Difícil'}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-500">{route.price}€</span>
                      <span className="text-sm text-gray-500">{route.stops.length} paradas</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {(query && filteredRoutes.length === 0) && (
              <div className="col-span-full text-gray-500 py-12 text-center">No se encontraron rutas.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
