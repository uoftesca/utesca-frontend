import * as React from 'react';
import { Event } from '@/types/event';
import { fetchEvents, formatEventDate } from '@/utils/events';
import EventCard from './EventCard';

const PastEvents: React.FC = () => {
    const [events, setEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await fetchEvents();
            const pastEvents = allEvents.filter((event: Event) => event.status === 'past');
            setEvents(pastEvents);
        };
        loadEvents();
    }, []);

    return (
        <div className='w-full text-center p-6 space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-primary'>
                Past Events
            </h1>
            <div className='flex flex-col items-center gap-6'>
                <div className='w-full flex flex-col md:flex-row flex-wrap justify-center gap-6'>
                    {events.map((event) => {
                        const { month, day } = formatEventDate(event.date);
                        return (
                            <div
                                key={`${
                                    event.title
                                }-${event.date.toISOString()}`}
                                className='w-full md:w-[calc(50%-12px)] max-w-[400px]'
                            >
                                <EventCard {...event} month={month} day={day} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PastEvents;
