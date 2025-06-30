'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CalendarDays, Clock, MapPin, Users, ChevronRight, Heart } from "lucide-react";
import { Event } from "../types";

type Props = { event: Event };

// Recomendado: puedes tipar props si usas TypeScript estricto
export default function EventDetailView({ event }: Props) {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Favoritos con localStorage
  useEffect(() => {
    if (!event) return;
    const saved = JSON.parse(localStorage.getItem("event-favorites") || "[]");
    setIsFavorite(saved.includes(event.id));
  }, [event]);

  const toggleFavorite = () => {
    if (!event) return;
    const saved = JSON.parse(localStorage.getItem("event-favorites") || "[]");
    let updated;
    if (isFavorite) {
      updated = saved.filter((x: string) => x !== event.id);
    } else {
      updated = [...saved, event.id];
    }
    localStorage.setItem("event-favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-400">
        Evento no encontrado.
      </div>
    );
  }

  // Robust date handling
  const dateObj = event.date instanceof Date ? event.date : new Date(event.date);

  const handleRegister = () => {
    setIsRegistered(true);
    setTimeout(() => {
      alert("¡Te has registrado exitosamente para este evento!");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <Image
        src={event.image}
        alt={event.title}
        width={1200}
        height={384}
        className="w-full h-full object-cover"
        priority
      />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button
          onClick={() => router.push("/events")}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Volver a eventos"
        >
          <ChevronRight className="h-6 w-6 rotate-180" />
        </button>
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Marcar como favorito"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {event.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Acerca del evento</h2>
              <p className="text-gray-600 mb-6">{event.description}</p>

              <h3 className="text-xl font-semibold mb-4">Programa del evento</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 text-right">
                    <p className="font-medium">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bienvenida y registro</p>
                    <p className="text-sm text-gray-600">Recepción de participantes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-right">
                    <p className="font-medium">
                      {(() => {
                        const parts = event.time.split(":");
                        const hour = parseInt(parts[0], 10);
                        return !isNaN(hour) ? `${hour + 1}:00` : "--:--";
                      })()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Actividad principal</p>
                    <p className="text-sm text-gray-600">Desarrollo del evento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">
                      {dateObj.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Hora</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Disponibilidad</p>
                    <p
                      className={`font-medium ${
                        event.available < 10
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {event.available} de {event.capacity} plazas disponibles
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Precio por persona</span>
                  <span className="text-3xl font-bold text-orange-500">{event.price}€</span>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={isRegistered || event.available === 0}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isRegistered
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : event.available === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isRegistered
                    ? "Registrado ✓"
                    : event.available === 0
                    ? "Agotado"
                    : "Registrarse"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
