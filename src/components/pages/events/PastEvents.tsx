import { EventsCard } from '../home/EventsCard';

const PastEvents: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                Past Events
            </h1>
            <div className='flex flex-col items-center gap-6'>
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6'>
                    <EventsCard
                        img='/events/acethecase.jpg'
                        title='Ace the Case Deloitte'
                        link=''
                    />
                    <EventsCard
                        img='/events/consultantforaday.jpg'
                        title='Consultant for a Day PWC'
                        link=''
                    />
                </div>
                <EventsCard
                    img='/events/networkingandpanel.jpg'
                    title='Networking and Panel Events'
                    link=''
                    className='md:w-[calc(50%-12px)]'
                />
            </div>
        </div>
    );
};

export default PastEvents;
