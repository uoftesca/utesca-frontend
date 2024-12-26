import SingleEventCard from "./SingleEventCard";

const EventDetails: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <div className='flex flex-col items-center gap-6'>
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                    <SingleEventCard
                        month='month'
                        date=' 10 '
                        name='name'
                        description='description'
                    />
                    <SingleEventCard
                        month='month'
                        date=' 10 '
                        name='name'
                        description='description'
                    />
                    <SingleEventCard
                        month='month'
                        date=' 10 '
                        name='name'
                        description='description'
                    />
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
