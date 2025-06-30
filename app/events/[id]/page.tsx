import { eventsData } from '../../data/events';
import { notFound } from 'next/navigation';
import EventDetailView from '../../components/EventDetailView';
import type { Metadata } from 'next';

// SEO dinámico por evento
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = eventsData.find(e => e.id === params.id);
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

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = eventsData.find(e => e.id === params.id);
  if (!event) return notFound();
  return <EventDetailView event={event} />;
}
