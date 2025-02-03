import { Event, EventStatus } from '@/types/event';

interface RawEvent {
    title: string;
    date: string;
    description: string;
    category: string;
    registrationLink: string;
    image: string;
}

interface EventsData {
    events: RawEvent[];
}

function isUpcoming(date: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date >= now;
}

export async function fetchEvents(): Promise<Event[]> {
    const response = await fetch('/events/events.json');
    const data: EventsData = await response.json();
    
    return data.events.map((rawEvent) => {
        const eventDate = new Date(rawEvent.date + 'T00:00:00');
        return {
            ...rawEvent,
            date: eventDate,
            status: isUpcoming(eventDate) ? 'upcoming' as EventStatus : 'past' as EventStatus,
            registrationLink: rawEvent.registrationLink || undefined,
            image: rawEvent.image || undefined,
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