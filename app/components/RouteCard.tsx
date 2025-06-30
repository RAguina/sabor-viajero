// app/components/RouteCard.tsx
import React from "react";
import Image from "next/image";
import { Timer, TrendingUp } from "lucide-react";
import { getDifficultyColor } from "../utils/getDifficultyColor";

interface Route {
  id: string;
  name: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  image: string;
  description: string;
  stops: { id: string; name: string }[];
}

interface RouteCardProps {
  route: Route;
  onClick?: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={e => {
      if (e.key === "Enter" && onClick) onClick();
    }}
    aria-label={`Ver detalle de la ruta ${route.name}`}
  >
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 h-48 md:h-auto">
        <Image
          src={route.image}
          alt={route.name}
          width={400}
          height={192}
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
              {route.difficulty === "easy" ? "Fácil" : route.difficulty === "medium" ? "Medio" : "Difícil"}
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
);

export default RouteCard;
