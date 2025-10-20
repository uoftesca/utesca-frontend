import * as React from 'react';
import { Event } from '@/types/event';
import { fetchEvents, formatEventDate } from '@/utils/events';
import UpcomingEventPreview from './UpcomingEventPreview';

interface EventDetailsProps {
    onDateSelect: (date: Date) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ onDateSelect }) => {
    const [upcomingEvents, setUpcomingEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await fetchEvents();
            // Sort upcoming events by date and take the first three
            const nextEvents = allEvents
                .filter((event: Event) => event.status === 'upcoming')
                .sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime())
                .slice(0, 3);
            setUpcomingEvents(nextEvents);
        };
        loadEvents();
    }, []);

    return (
        <div className='w-full text-center space-y-6'>
            <div className='flex flex-col items-center gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center'>
                    {upcomingEvents.map((event) => {
                        const { month, day } = formatEventDate(event.date);
                        // Normalize UTC date to local timezone for calendar
                        const utcDate = event.date;
                        const normalizedDate = new Date(
                            utcDate.getUTCFullYear(),
                            utcDate.getUTCMonth(),
                            utcDate.getUTCDate()
                        );
                        return (
                            <UpcomingEventPreview
                                key={`${
                                    event.title
                                }-${event.date.toISOString()}`}
                                title={event.title}
                                month={month}
                                day={day}
                                date={normalizedDate}
                                onDateSelect={onDateSelect}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
