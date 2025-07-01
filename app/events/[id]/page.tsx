import { eventsData } from '../../data/events';
import { notFound } from 'next/navigation';
import EventDetailView from '../../components/EventDetailView';
import type { Metadata } from 'next';

// SEO dinámico por evento
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const event = eventsData.find(e => e.id === resolvedParams.id);
  if (!event) return {};

  return {
    title: `${event.title} | Evento Gastronómico | Sabor Viajero`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = eventsData.find(e => e.id === resolvedParams.id);
  if (!event) return notFound();
  return <EventDetailView event={event} />;
}