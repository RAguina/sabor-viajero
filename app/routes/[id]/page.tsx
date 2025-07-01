import { routesData } from '../../data/routes';
import { notFound } from 'next/navigation';
import RouteDetailView from '../../components/RouteDetailView';
import type { Metadata } from 'next';

// SEO dinámico por ruta
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const route = routesData.find(r => r.id === resolvedParams.id);
  if (!route) return {};

  return {
    title: `${route.name} | Ruta Gastronómica | Sabor Viajero`,
    description: route.description,
    openGraph: {
      title: route.name,
      description: route.description,
      type: "article",
      images: [
        {
          url: route.image,
          width: 1200,
          height: 630,
          alt: route.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.name,
      description: route.description,
      images: [route.image],
    },
  };
}

export default async function RouteDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const route = routesData.find(r => r.id === resolvedParams.id);
  if (!route) return notFound();
  return <RouteDetailView route={route} />;
}