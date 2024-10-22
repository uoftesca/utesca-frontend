import { GraduationCap, Handshake, Users } from 'lucide-react';

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
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6'>
                    <MissionCard
                        Icon={Users}
                        text='Pro-bono engineering-based consulting solutions for local organizations'
                    />
                    <MissionCard
                        Icon={Handshake}
                        text='Fostering connections with industry professionals'
                    />
                </div>
                <MissionCard
                    Icon={GraduationCap}
                    text='Professional development events for UofT students'
                    className='md:w-[calc(50%-12px)]'
                />
            </div>
        </div>
    );
};

export default VisionAndMission;
