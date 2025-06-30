"use client";

import { useState } from "react";
import Link from "next/link";
import { routesData } from "@/app/data/routes";
import { Timer, TrendingUp, MapPin, Clock, ChevronRight } from "lucide-react";
import { getDifficultyColor } from "@/app/utils/getDifficultyColor";

export default function RoutesListView() {
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const filteredRoutes = routesData
    .filter((route) => !difficultyFilter || route.difficulty === difficultyFilter)
    .sort((a, b) => {
      if (priceSort === "asc") return a.price - b.price;
      if (priceSort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rutas Gastronómicas
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Descubre itinerarios cuidadosamente curados para explorar lo mejor de la gastronomía local
          </p>
          <div className="flex flex-wrap gap-4">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las dificultades</option>
              <option value="easy">Fácil</option>
              <option value="medium">Medio</option>
              <option value="hard">Difícil</option>
            </select>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Ordenar por precio</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredRoutes.map((route) => (
            <Link
              key={route.id}
              href={`/routes/${route.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{route.name}</h3>
                      <p className="text-gray-600 mb-4">{route.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-orange-500">
                        {route.price}€
                      </span>
                      <p className="text-sm text-gray-500">por persona</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Duración</p>
                        <p className="font-medium">{route.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Dificultad</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            route.difficulty
                          )}`}
                        >
                          {route.difficulty === "easy"
                            ? "Fácil"
                            : route.difficulty === "medium"
                            ? "Medio"
                            : "Difícil"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Paradas</p>
                        <p className="font-medium">{route.stops.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Horario</p>
                        <p className="font-medium">{route.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Paradas incluidas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {route.stops.map((stop, index) => (
                        <div key={stop.id} className="flex items-center gap-2">
                          <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-700">{stop.name}</span>
                          {index < route.stops.length - 1 && (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
