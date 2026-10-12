'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import SelectedEventCards from '@/components/pages/events/SelectedEventCards';
import UpcomingEventPreviews from '@/components/pages/events/UpcomingEventPreviews';
import PastEvents from '@/components/pages/events/PastEvents';

function EventsContent() {
    const searchParams = useSearchParams();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(
        null
    );

    // Pick up a `?selected=<slug>` deep link (e.g. from the home page).
    useEffect(() => {
        setSelectedEventSlug(searchParams.get('selected'));
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

        // A date selection replaces an event selected via the URL.
        setSelectedEventSlug(null);

        // Wait for the selected EventCard to render
        setTimeout(scrollToSelectedEvents, 0);
    };

    // Once the selected event card has rendered, scroll it into view.
    useEffect(() => {
        if (!selectedEventSlug) return;

        const timeout = setTimeout(scrollToSelectedEvents, 300);

        return () => clearTimeout(timeout);
    }, [selectedEventSlug]);

    return (
        <Container>
            <div className='space-y-12 md:space-y-24 py-12'>

                <div className='space-y-12'>
                    <div className='text-center space-y-6'>
                        <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-primary'>
                            Upcoming Events
                        </h1>
                    </div>

                    <UpcomingEventPreviews
                        onDateSelect={handleDateSelect}
                    />
                </div>

                <SelectedEventCards
                    selectedDate={selectedDate}
                    selectedEventSlug={selectedEventSlug}
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
