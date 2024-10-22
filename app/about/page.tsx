import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';
import VisionAndMission from '@/components/VisionAndMission';

export default function AboutUs() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <VisionAndMission />
                </Container>
            </main>
        </>
    );
}
