'use client';

import * as React from 'react';
import { Event } from '@/types/event';
import { fetchEvents, getEventsForDate, formatEventDate } from '@/utils/events';
import EventCard from './EventCard';
import { motion, AnimatePresence } from 'framer-motion';

interface UpcomingEventsProps {
    onEventsChange: (hasEvents: boolean) => void;
    selectedDate: Date | undefined;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
    onEventsChange,
    selectedDate,
}) => {
    const [events, setEvents] = React.useState<Event[]>([]);
    const [selectedEvents, setSelectedEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await fetchEvents();

            setEvents(
                allEvents.filter(
                    (event: Event) => event.status === 'upcoming'
                )
            );
        };

        loadEvents();
    }, []);

    React.useEffect(() => {
        if (selectedDate && events.length > 0) {
            const dateEvents = getEventsForDate(events, selectedDate);

            setSelectedEvents(dateEvents);
            onEventsChange(dateEvents.length > 0);
        } else {
            setSelectedEvents([]);
            onEventsChange(false);
        }
    }, [selectedDate, events, onEventsChange]);

    return (
        <div className='space-y-12'>

            <AnimatePresence mode='wait'>
                {selectedEvents.length > 0 && (
                    <motion.div
                        key='events-container'
                        data-selected-events
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className={`grid gap-6 ${selectedEvents.length === 1
                                ? 'grid-cols-1 place-items-center'
                                : 'grid-cols-1 md:grid-cols-2'
                                }`}
                        >
                            {selectedEvents.map((event) => {
                                const { month, day } = formatEventDate(
                                    event.date
                                );

                                return (
                                    <motion.div
                                        key={`${event.title}-${event.date.toISOString()}`}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className='w-full max-w-[390px]'
                                    >
                                        <EventCard
                                            {...event}
                                            month={month}
                                            day={day}
                                            isExpanded={true}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UpcomingEvents;