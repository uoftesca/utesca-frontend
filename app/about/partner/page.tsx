import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

import PartnerWithUs from '@/components/pages/projects/PartnerWithUs';

export default function PartnerPage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <PartnerWithUs />
                </Container>
            </main>
            <Footer />
        </>
    );
}