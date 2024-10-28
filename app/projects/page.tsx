import CEPDescription from '@/components/pages/projects/CEPDescription';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';
import ProjectCard from '@/components/pages/projects/ProjectCard';

export default function Projects() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <CEPDescription />
                    <ProjectCard
                        title='Mobile Mailing App'
                        category='App Development'
                        description="Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc."
                        link='https://apps.apple.com/app/id1588848488'
                    />
                </Container>
            </main>
        </>
    );
}
