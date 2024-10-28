import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

export default function Home() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <p>Add content inside here</p>
                </Container>
            </main>
            <Footer />
        </>
    );
}
