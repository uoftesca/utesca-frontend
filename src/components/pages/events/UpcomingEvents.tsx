'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Event } from '@/types/event';
import { fetchEvents, getEventsForDate, formatEventDate } from '@/utils/events';
import EventCard from './EventCard';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UpcomingEventsProps {
    onEventsChange: (hasEvents: boolean) => void;
    selectedDate: Date | undefined;
    onDateSelect: (date: Date | undefined) => void;
    defaultMonth?: Date;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
    onEventsChange,
    selectedDate,
    onDateSelect,
    defaultMonth,
}) => {
    const [events, setEvents] = React.useState<Event[]>([]);
    const [selectedEvents, setSelectedEvents] = React.useState<Event[]>([]);
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
        defaultMonth || new Date()
    );

    React.useEffect(() => {
        if (selectedDate) {
            setCurrentMonth(selectedDate);
        }
    }, [selectedDate]);

    React.useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await fetchEvents();
            setEvents(allEvents.filter((event) => event.status === 'upcoming'));
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

    const eventDates = events.map((event) => event.date);

    return (
        <div className='space-y-12'>
            <div className='text-center space-y-6'>
                <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                    Upcoming Events
                </h1>
                <div className='flex justify-center'>
                    <Calendar
                        mode='single'
                        selected={selectedDate}
                        onSelect={onDateSelect}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        className='rounded-md border w-fit'
                        classNames={{
                            day_selected:
                                'rounded-md text-white hover:text-white',
                            day_today: 'border-2 border-accent text-black',
                            day: cn(
                                buttonVariants({ variant: 'ghost' }),
                                'h-9 w-9 p-0 font-normal aria-selected:opacity-100 [&:not([aria-selected]):hover]:bg-accent [&:not([aria-selected]):hover]:text-white rounded-md'
                            ),
                        }}
                        modifiers={{
                            event: eventDates,
                        }}
                        modifiersClassNames={{
                            event: 'font-bold bg-accent/10 text-accent',
                        }}
                    />
                </div>
            </div>

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
                            className={`grid gap-6 ${
                                selectedEvents.length === 1
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
                                        key={`${
                                            event.title
                                        }-${event.date.toISOString()}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
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
