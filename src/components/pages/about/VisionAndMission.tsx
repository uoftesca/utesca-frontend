import { GraduationCap, Handshake, BriefcaseBusiness } from 'lucide-react';

import MissionCard from '@/components/pages/about/MissionCard';
import Reveal from '@/components/Reveal';

const VisionAndMission: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-primary'>
                Our Vision & Mission
            </h1>
            <p className='text-lg text-muted-foreground mx-auto max-w-5xl'>
                UTESCA began with a simple idea: How can we bring engineering
                students together to give back to our local community? Over
                time, this has evolved into our three core offerings:
            </p>
            <div className='flex flex-col items-center gap-6'>
                <div className='w-full grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                    <Reveal delay={0} className='w-full max-w-sm h-full'>
                        <MissionCard
                            Icon={BriefcaseBusiness}
                            title='Pro-Bono Service'
                            text='To develop engineering based consulting solutions for local organizations'
                        />
                    </Reveal>
                    <Reveal delay={100} className='w-full max-w-sm h-full'>
                        <MissionCard
                            Icon={Handshake}
                            title='Foster Connections'
                            text='Between students and industry professionals'
                        />
                    </Reveal>
                    <Reveal delay={200} className='w-full max-w-sm h-full'>
                        <MissionCard
                            Icon={GraduationCap}
                            title='Professional Development'
                            text='Events for UofT students to improve soft and technical skills'
                        />
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default VisionAndMission;
