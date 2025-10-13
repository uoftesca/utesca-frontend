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

// utils/events.ts
export async function fetchEvents() {
  const res = await fetch('http://127.0.0.1:8001/api/v1/events', { cache: 'no-store' });
  if (!res.ok) throw new Error(`events fetch failed: ${res.status}`);
  const data = await res.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (data.events || []).map((e: any) => {
    const d = new Date(e.date);
    const status = d >= today ? 'upcoming' : 'past'; // <-- derive here
    return { ...e, date: d, status };
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