'use client';
import React, { useState, useEffect } from 'react';
import { Restaurant } from '../types';
import { StarRating } from './StarRating';
import { Heart, MapPin, Phone, Clock, ChefHat, ChevronRight } from 'lucide-react';
import { getPriceSymbol } from '../utils/getPriceSymbol';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RestaurantDetailView = ({ restaurant }: { restaurant: Restaurant }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(restaurant.id));
  }, [restaurant.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((f: string) => f !== restaurant.id)
      : [...favorites, restaurant.id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={1200}
          height={384}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button
          onClick={() => router.push('/restaurants')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="h-6 w-6 rotate-180" />
        </button>
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <StarRating rating={restaurant.rating} />
              <span className="text-lg">{restaurant.reviews} reseñas</span>
              <span className="text-2xl">{getPriceSymbol(restaurant.priceRange)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'info'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Información
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'menu'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Especialidades
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reseñas
              </button>
            </div>
          </div>
          <div className="p-8">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sobre nosotros</h3>
                  <p className="text-gray-600">{restaurant.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <span>{restaurant.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span>{restaurant.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>{restaurant.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tipo de cocina</h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.cuisine.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'menu' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Nuestras Especialidades</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurant.specialties.map((specialty, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <ChefHat className="h-6 w-6 text-orange-600" />
                      </div>
                      <span className="font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Reseñas de clientes</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <p className="font-medium">Usuario {i + 1}</p>
                          <StarRating rating={4 + Math.random()} />
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Excelente experiencia gastronómica. La comida estaba deliciosa y el servicio fue impecable.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-8 py-6">
            <button className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Hacer una reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantDetailView;
