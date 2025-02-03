export type EventStatus = 'upcoming' | 'past';

export interface Event {
    readonly title: string;
    readonly date: Date;
    readonly description: string;
    readonly category: string;
    readonly registrationLink?: string;
    readonly image?: string;
    readonly status: EventStatus;
}

export interface EventCardProps extends Omit<Event, 'date'> {
    readonly month: string;
    readonly day: string;
} 