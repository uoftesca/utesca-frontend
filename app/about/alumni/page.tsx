import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

export default function AlumniPage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <h1 className='text-2xl font-semibold'>Alumni</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
}