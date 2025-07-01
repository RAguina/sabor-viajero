import { routesData } from '../../data/routes';
import { notFound } from 'next/navigation';
import RouteDetailView from '../../components/RouteDetailView';
import type { Metadata } from 'next';

// SEO dinámico por ruta
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const route = routesData.find(r => r.id === params.id);
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

export default function RouteDetail({ params }: { params: { id: string } }) {
  const route = routesData.find(r => r.id === params.id);
  if (!route) return notFound();
  return <RouteDetailView route={route} />;
}
