'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { restaurantsData } from '../data/restaurants';
import { StarRating } from './StarRating';
import { Search, Filter, Heart, MapPin } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { useDebounce } from '../utils/useDebounce';
import { getPriceSymbol } from '../utils/getPriceSymbol';

const RestaurantsListView = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: '',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

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

  const filteredRestaurants = useMemo(() => {
    setLoading(true);
    const filtered = restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesCuisine = !filters.cuisine || restaurant.cuisine.includes(filters.cuisine);
      const matchesPrice = !filters.priceRange || restaurant.priceRange === filters.priceRange;
      const matchesRating = restaurant.rating >= filters.rating;
      return matchesSearch && matchesCuisine && matchesPrice && matchesRating;
    });
    setLoading(false);
    return filtered;
  }, [debouncedSearch, filters, restaurants]);

  const cuisines = Array.from(new Set(restaurants.flatMap(r => r.cuisine)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explora Restaurantes</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar por nombre o tipo de cocina..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filtros
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Filtrar por:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cocina</label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="budget">€ - Económico</option>
                  <option value="mid">€€ - Medio</option>
                  <option value="high">€€€ - Alto</option>
                  <option value="luxury">€€€€ - Lujo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puntuación Mínima: {filters.rating}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
              >
                <div className="relative h-64">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(restaurant.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm`}>
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
          </div>
        )}

        {filteredRestaurants.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron restaurantes con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsListView;
