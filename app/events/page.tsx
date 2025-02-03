'use client';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import UpcomingEvents from '@/components/pages/events/UpcomingEvents';
import EventDetails from '@/components/pages/events/EventDetails';
import PastEvents from '@/components/pages/events/PastEvents';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Event() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [hasSelectedEvents, setHasSelectedEvents] = useState(false);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);

        // Wait for next tick to ensure DOM has updated
        setTimeout(() => {
            const eventContainer = document.querySelector(
                '[data-selected-events]'
            );

            if (eventContainer) {
                const containerRect = eventContainer.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Calculate position to center the event container
                const scrollTo =
                    window.scrollY +
                    containerRect.top -
                    (windowHeight - containerRect.height) / 2;

                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        }, 0);
    };

    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <UpcomingEvents
                        onEventsChange={setHasSelectedEvents}
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />
                    <motion.div
                        initial={false}
                        animate={{
                            y: hasSelectedEvents ? 100 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                        }}
                    >
                        <div className='space-y-12 md:space-y-24 py-12'>
                            <EventDetails onDateSelect={handleDateSelect} />
                            <PastEvents />
                        </div>
                    </motion.div>
                </Container>
            </main>
            <Footer />
        </>
    );
}
