import { GraduationCap, Handshake, Users } from 'lucide-react';

import MissionCard from '@/components/pages/about/MissionCard';

const VisionAndMission: React.FC = () => {
    return (
        <div className='container mx-auto text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                Our Vision & Mission
            </h1>
            <p className='text-base text-subtle mx-auto'>
                UTESCA began with a simple idea: How can we bring engineering
                students together to give back to our local community? Over
                time, this has evolved into our three core offerings:
            </p>
            <div className='flex flex-col items-center space-y-6'>
                <div className='w-full flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-6 md:space-y-0'>
                    <MissionCard
                        Icon={Users}
                        text='Pro-bono engineering-based consulting solutions for local organizations'
                        className='md:w-[calc(50%-12px)]'
                    />
                    <MissionCard
                        Icon={Handshake}
                        text='Fostering connections with industry professionals'
                        className='md:w-[calc(50%-12px)]'
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
