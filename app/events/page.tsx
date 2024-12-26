"use client"

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import UpcomingEvents from '@/components/pages/events/UpcomingEvents';
import EventDetails from '@/components/pages/events/EventDetails';
import PastEvents from '@/components/pages/events/PastEvents';

export default function Event() {

    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <UpcomingEvents/>
                    <EventDetails/>
                    <PastEvents/>
                </Container>
            </main>
            <Footer />
        </>
    );
}
