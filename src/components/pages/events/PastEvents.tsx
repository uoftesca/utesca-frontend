import * as React from 'react';
import { Event } from '@/types/event';
import { fetchEvents, formatEventDate } from '@/utils/events';
import EventCard from './EventCard';

const PastEvents: React.FC = () => {
    const [events, setEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await fetchEvents();
            const pastEvents = allEvents.filter((event) => {
                const cleanStatus = event.status.replace(/['"]+/g, '').trim();
                return cleanStatus === 'past';
            });
            setEvents(pastEvents);
        };
        loadEvents();
    }, []);

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent text-center'>
                Past Events
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {events.map((event) => {
                    const { month, day } = formatEventDate(event.date);
                    return (
                        <EventCard
                            key={`${event.title}-${event.date.toISOString()}`}
                            {...event}
                            month={month}
                            day={day}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PastEvents;
