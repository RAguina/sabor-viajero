"use client";

import { useState } from "react";
import { routesData } from "@/app/data/routes";
import { Timer, TrendingUp, MapPin, ChevronRight } from "lucide-react";
import { getDifficultyColor } from "@/app/utils/getDifficultyColor";

export default function RouteDetailView({ id }: { id: string }) {
  const route = routesData.find((r) => r.id === id);
  const [activeStop, setActiveStop] = useState(0);

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-400">
        Ruta no encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <img
          src={route.image}
          alt={route.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Si querés botón de volver, usar useRouter (igual que los otros views) */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {route.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                <span>{route.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(route.difficulty)}`}
                >
                  {route.difficulty === "easy"
                    ? "Fácil"
                    : route.difficulty === "medium"
                    ? "Medio"
                    : "Difícil"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{route.stops.length} paradas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Sobre esta ruta</h2>
              <p className="text-gray-600 mb-6">{route.description}</p>

              <h3 className="text-xl font-semibold mb-4">Itinerario detallado</h3>
              <div className="space-y-4">
                {route.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      activeStop === index
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveStop(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                          activeStop === index
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-lg">{stop.name}</h4>
                          <span className="text-sm text-gray-500">
                            {stop.duration}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{stop.type}</p>
                        <p className="text-gray-700">{stop.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Información de la ruta</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Horario estimado</p>
                  <p className="font-medium">{route.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duración total</p>
                  <p className="font-medium">{route.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nivel de dificultad</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(route.difficulty)}`}
                  >
                    {route.difficulty === "easy"
                      ? "Fácil - Para todos"
                      : route.difficulty === "medium"
                      ? "Medio - Algo de caminata"
                      : "Difícil - Buena condición física"}
                  </span>
                </div>
              </div>
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Precio por persona</span>
                  <span className="text-3xl font-bold text-orange-500">
                    {route.price}€
                  </span>
                </div>
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                  Reservar esta ruta
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Incluye degustaciones en todas las paradas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
