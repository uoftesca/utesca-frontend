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
    const [hasSelectedEvents, setHasSelectedEvents] = useState(false);

    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <UpcomingEvents onEventsChange={setHasSelectedEvents} />
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
                            <EventDetails />
                            <PastEvents />
                        </div>
                    </motion.div>
                </Container>
            </main>
            <Footer />
        </>
    );
}
