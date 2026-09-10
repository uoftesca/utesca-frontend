'use client';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import UpcomingEvents from '@/components/pages/events/UpcomingEvents';
import EventDetails from '@/components/pages/events/EventDetails';
import PastEvents from '@/components/pages/events/PastEvents';
import { useState } from 'react';

export default function Event() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );

    const handleDateSelect = (date: Date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);

        // Wait for the selected EventCard to render
        setTimeout(() => {
            const eventContainer = document.querySelector(
                '[data-selected-events]'
            );

            if (eventContainer) {
                eventContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 0);
    };

    return (
        <>
            <NavBar />

            <main>
                <Hero />

                <Container>
                    <div className='space-y-12 md:space-y-24 py-12'>

                        <div className='space-y-12'>
                            <div className='text-center space-y-6'>
                                <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-primary'>
                                    Upcoming Events
                                </h1>
                            </div>

                            <EventDetails
                                onDateSelect={handleDateSelect}
                            />
                        </div>

                        <UpcomingEvents
                            onEventsChange={() => { }}
                            selectedDate={selectedDate}
                        />

                        <PastEvents />

                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}