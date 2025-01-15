import { GraduationCap, Handshake, BriefcaseBusiness } from 'lucide-react';

import MissionCard from '@/components/pages/about/MissionCard';

const VisionAndMission: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                Our Vision & Mission
            </h1>
            <p className='text-base text-subtle mx-auto'>
                UTESCA began with a simple idea: How can we bring engineering
                students together to give back to our local community? Over
                time, this has evolved into our three core offerings:
            </p>
            <div className='flex flex-col items-center gap-6'>
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                    <MissionCard
                        Icon={BriefcaseBusiness}
                        title='Pro-Bono Service'
                        text='to develop engineering based consulting solutions for local organizations'
                    />
                    <MissionCard
                        Icon={Handshake}
                        title='Foster Connections'
                        text='between students and industry professionals'
                    />
                    <MissionCard
                        Icon={GraduationCap}
                        title='Professional Development'
                        text='events for UofT students to improve soft and technical skills'
                    />
                </div>
            </div>
        </div>
    );
};

export default VisionAndMission;
