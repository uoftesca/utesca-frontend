import { RegistrationFormSchema } from './registration';

export type EventStatus = 'upcoming' | 'past';

export type ImagePosition = 'center' | 'top' | 'bottom' | number;

export interface Event {
    readonly title: string;
    readonly slug: string;
    readonly date: Date;
    readonly description: string;
    readonly category: string;
    readonly registrationLink?: string;
    readonly registrationDeadline?: string | null;
    readonly registrationFormSchema?: RegistrationFormSchema | null;
    readonly image?: string;
    readonly imagePosition?: ImagePosition;
    readonly albumLink?: string;
    readonly status: EventStatus;
}

export interface EventCardProps extends Omit<Event, 'date'> {
    readonly month: string;
    readonly day: string;
}