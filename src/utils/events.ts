import { Event, EventStatus } from '@/types/event';

interface RawEvent {
    title: string;
    date: string;
    description: string;
    category: string;
    registrationLink?: string;
    image?: string;
    imagePosition?: string | number;
    driveLink?: string;
}

function isUpcoming(date: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date >= now;
}

export async function fetchEvents() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`events fetch failed: ${res.status}`);
    const data = await res.json();

    return (data.events || []).map((e: RawEvent) => {
        const d = new Date(e.date);
        const status: EventStatus = isUpcoming(d) ? 'upcoming' : 'past';
        return {
            title: e.title,
            date: d,
            description: e.description,
            category: e.category,
            registrationLink: e.registrationLink,
            image: e.image,
            imagePosition: e.imagePosition,
            driveLink: e.driveLink,
            status,
        };
    });
}

export function getEventsForDate(events: Event[], date: Date): Event[] {
    return events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getUTCFullYear() === date.getUTCFullYear() &&
            eventDate.getUTCMonth() === date.getUTCMonth() &&
            eventDate.getUTCDate() === date.getUTCDate();
    });
}

export function formatEventDate(date: Date): { month: string; day: string } {
    return {
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate().toString().padStart(2, '0'),
    };
}