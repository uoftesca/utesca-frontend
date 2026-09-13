'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import UpcomingEvents from '@/components/pages/events/UpcomingEvents';
import EventDetails from '@/components/pages/events/EventDetails';
import PastEvents from '@/components/pages/events/PastEvents';

function EventsContent() {
    const searchParams = useSearchParams();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [registerSlug, setRegisterSlug] = useState<string | null>(null);

    // Pick up a `?register=<slug>` deep link (e.g. from the home page).
    useEffect(() => {
        setRegisterSlug(searchParams.get('register'));
    }, [searchParams]);

    const scrollToSelectedEvents = () => {
        const eventContainer = document.querySelector(
            '[data-selected-events]'
        );

        if (eventContainer) {
            eventContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    const handleDateSelect = (date: Date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);

        // Picking a different event/date on the page overrides any
        // registration form that was auto-opened via a `?register=` deep link.
        setRegisterSlug(null);

        // Wait for the selected EventCard to render
        setTimeout(scrollToSelectedEvents, 0);
    };

    // Arriving from a "Register" link (e.g. the home page): once UpcomingEvents
    // has had a chance to fetch and render the opened card, scroll it into view.
    useEffect(() => {
        if (!registerSlug) return;

        const timeout = setTimeout(scrollToSelectedEvents, 300);

        return () => clearTimeout(timeout);
    }, [registerSlug]);

    return (
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
                    registerSlug={registerSlug}
                />

                <PastEvents />

            </div>
        </Container>
    );
}

export default function Event() {
    return (
        <>
            <NavBar />

            <main>
                <Hero />

                <Suspense fallback={null}>
                    <EventsContent />
                </Suspense>
            </main>

            <Footer />
        </>
    );
}
