import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import MeetTheTeam from '@/components/pages/about/MeetTheTeam';

export default function TeamPage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero
                    imageSrc="/toronto-hero2.jpg"
                    imageClassName="object-[50%_62%]"
                    title="UTESCA"
                    titleClassName="text-6xl font-black tracking-tight md:text-8xl"
                />
                {/* Full-bleed scrapbook paper; MeetTheTeam handles its own content width. */}
                <MeetTheTeam />
            </main>
            <Footer />
        </>
    );
}
