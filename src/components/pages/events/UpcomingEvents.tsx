'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';

const UpcomingEvents: React.FC = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='text-center space-y-6'>
                <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                    Upcoming Events
                </h1>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md border text-center align-center'
                    classNames={{
                        day_selected: 'rounded-md text-white hover:text-white', // Style for selected day
                        day_today: 'border-2 border-accent text-black', // Style for today's date
                    }}
                />
            </div>
        </div>
    );
};

export default UpcomingEvents;
