import CEPDescription from '@/components/pages/projects/CEPDescription';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';

export default function Projects() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <CEPDescription />
                </Container>
            </main>
        </>
    );
}
