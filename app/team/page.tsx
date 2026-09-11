import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import MeetTheTeam from '@/components/pages/about/MeetTheTeam';

export default function TeamPage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <MeetTheTeam />
                </Container>
            </main>
            <Footer />
        </>
    );
}