import InfoCard from './InfoCard';
import StatsCard1 from './StatsCard1';
import SeeMore from './SeeMore';

const WhatIsCEP: React.FC = () => {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-2xl text-center space-y-6'>
                <h1 className='text-3xl font-bold tracking-normal w-full md:text-4xl text-accent'>
                    What is CEP?
                </h1>
                <div className='flex flex-col items-center gap-6'>
                    <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                        <InfoCard
                            title='Consulting Engineering Project'
                            text='Consulting Engineering Projects help engineering students create value and impact for local businesses with projects spanning software automation, artificial intelligence, technology, healthcare, sustainability, data analytics, and more.'
                            className='col-span-1 md:col-span-2'
                        />
                        <StatsCard1
                            title='Teams of'
                            num='5-6'
                            text='students'
                        />
                    </div>
                </div>

                <div className='flex flex-col items-center w-full gap-6'>
                    <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                        <StatsCard1
                            num='6-8'
                            text='month client'
                            text1='facing program'
                            className='col-span-1 md:col-span-1'
                        />
                        <InfoCard
                            text='The service is entirely pro bono and acts as a learning opportunity for students to apply technical engineering skills in a professional setting while improving skills such as managing client relations'
                            className='col-span-1 md:col-span-2'
                        />
                    </div>
                    <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                        <InfoCard
                            text='Our students offer a range of technical skills to solve technical engineering problems and develop the best engineering-based solution with our pro bono service.'
                            className='col-span-1 md:col-span-3 w-full'
                        />
                    </div>
                </div>

                <div className='flex flex-col items-center gap-6'>
                    <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                        <InfoCard
                            text='Students will learn how to implement an engineering consulting strategy to solve problems in healthcare, AI, data analytics, sustainability, and many more industries!'
                            className='col-span-1 md:col-span-2'
                        />
                        <div className='col-span-1 md:col-span-1 flex justify-center items-center'>
                            <SeeMore
                                link='/projects'
                                className='w-48 h-12 flex justify-center items-center'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatIsCEP;
