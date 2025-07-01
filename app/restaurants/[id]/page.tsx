import { restaurantsData } from '../../data/restaurants';
import { notFound } from 'next/navigation';
import RestaurantDetailView from '../../components/RestaurantDetailView';
import type { Metadata } from 'next';

// Dinámico: SEO específico para cada restaurante
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const restaurant = restaurantsData.find(r => r.id === resolvedParams.id);
  if (!restaurant) return {};

  return {
    title: `${restaurant.name} | Restaurante | Sabor Viajero`,
    description: restaurant.description,
    openGraph: {
      title: restaurant.name,
      description: restaurant.description,
      type: "article",
      images: [
        {
          url: restaurant.image,
          width: 1200,
          height: 630,
          alt: restaurant.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: restaurant.name,
      description: restaurant.description,
      images: [restaurant.image],
    },
  };
}

// Página restaurante
export default async function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const restaurant = restaurantsData.find(r => r.id === resolvedParams.id);
  if (!restaurant) return notFound();
  return <RestaurantDetailView restaurant={restaurant} />;
}