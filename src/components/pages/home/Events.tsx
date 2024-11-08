import { EventsCard } from './EventsCard';
import SeeMore from './SeeMore';

const Events: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                Events
            </h1>
            <div className='flex flex-col items-center gap-6'>
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6'>
                    <EventsCard
                        img='/events/tempevents.png'
                        title='Ace the Case Deloitte'
                        link=''
                    />
                    <EventsCard
                        img='/events/tempevents.png'
                        title='Consulting for a Day PWC'
                        link=''
                    />
                </div>
                <EventsCard
                    img='/events/tempevents.png'
                    title='Networking and Panel Events'
                    link=''
                    className='md:w-[calc(50%-12px)]'
                />

                <div className='col-span-1 md:col-span-1 flex justify-center items-center'>
                        <SeeMore
                            link='/events'
                            className='w-48 h-12 flex justify-center items-center'
                        />
                    </div>

            </div>
        </div>
    );
};

export default Events;
