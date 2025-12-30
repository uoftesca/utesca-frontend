import { Event, EventStatus, ImagePosition } from '@/types/event';
import { RegistrationFormSchema } from '@/types/registration';

interface ApiEventResponse {
    id: string;
    slug: string;
    title: string;
    dateTime: string;
    description: string;
    category: string;
    registrationLink?: string;
    registrationDeadline?: string | null;
    registrationFormSchema?: unknown;
    imageUrl?: string;
    imagePosition?: string | number;
    albumLink?: string;
}

interface ApiEventsResponse {
    events: ApiEventResponse[];
}

function isUpcoming(date: Date): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date >= now;
}

export async function fetchEvents() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${apiUrl}/events`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`events fetch failed: ${res.status}`);
    }

    const data: ApiEventsResponse = await res.json();

    return (data.events || []).map((e: ApiEventResponse) => {
        if (!e.slug) {
            throw new Error('events fetch failed: missing slug');
        }

        // Parse dateTime from ISO string to Date (already in Toronto time)
        const d = new Date(e.dateTime);
        const status: EventStatus = isUpcoming(d) ? 'upcoming' : 'past';

        // Convert imagePosition to proper type
        let imagePosition: ImagePosition | undefined = undefined;
        if (e.imagePosition !== undefined) {
            if (typeof e.imagePosition === 'number') {
                imagePosition = e.imagePosition;
            } else if (typeof e.imagePosition === 'string') {
                // Check if it's a valid ImagePosition string
                if (e.imagePosition === 'center' || e.imagePosition === 'top' || e.imagePosition === 'bottom') {
                    imagePosition = e.imagePosition;
                } else {
                    // Try to parse as number
                    const parsed = Number.parseFloat(e.imagePosition);
                    if (!Number.isNaN(parsed)) {
                        imagePosition = parsed;
                    }
                }
            }
        }

        const registrationFormSchema =
            e.registrationFormSchema as RegistrationFormSchema | undefined;

        return {
            title: e.title,
            slug: e.slug,
            date: d,
            description: e.description || '',
            category: e.category || '',
            registrationLink: e.registrationLink,
            registrationDeadline: e.registrationDeadline ?? null,
            registrationFormSchema: registrationFormSchema ?? null,
            image: e.imageUrl, // Map imageUrl to image
            imagePosition,
            albumLink: e.albumLink,
            status,
        } as Event;
    });
}

export function getEventsForDate(events: Event[], date: Date): Event[] {
    return events.filter((event) => {
        const eventDate = new Date(event.date);
        // Use local date methods since dates are stored in Toronto time
        return eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate();
    });
}

export function formatEventDate(date: Date): { month: string; day: string } {
    // Use local time since dates are stored in Toronto time
    return {
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate().toString().padStart(2, '0'),
    };
}
