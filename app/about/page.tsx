import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Container from '@/components/Container';
import WhatToExpect from '@/components/pages/about/WhatToExpect';
import VisionAndMission from '@/components/pages/about/VisionAndMission';
import MeetTheTeam from '@/components/pages/about/MeetTheTeam';
import WhatOthersHaveToSay from '@/components/pages/about/WhatOthersHaveToSay';

export default function AboutUs() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <VisionAndMission />
                    <WhatToExpect />
                    <MeetTheTeam />
                    <WhatOthersHaveToSay />
                </Container>
            </main>
        </>
    );
}
