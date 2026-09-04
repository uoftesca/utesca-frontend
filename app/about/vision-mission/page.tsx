import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import VisionAndMission from '@/components/pages/about/VisionAndMission';

export default function VisionMissionPage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <VisionAndMission />
                </Container>
            </main>
            <Footer />
        </>
    );
}