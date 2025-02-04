'use client';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import WhatDoesUTESCADo from '@/components/pages/home/WhatDoesUTESCADo';
import { PartneredWith } from '@/components/pages/home/PartneredWith';
import WhatIsCEP from '@/components/pages/home/WhatIsCEP';
import Stats from '@/components/pages/home/Stats';
import JoinUTESCA from '@/components/pages/home/JoinUTESCA';
import PastEvents from '@/components/pages/events/PastEvents';

export default function Home() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <Stats />
                    <WhatDoesUTESCADo />
                    <PartneredWith />
                    <WhatIsCEP />
                    <PastEvents />
                    <JoinUTESCA />
                </Container>
            </main>
            <Footer />
        </>
    );
}
