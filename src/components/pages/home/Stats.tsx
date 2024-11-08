import StatsCard from './StatsCard';

const Stats: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <div className='flex flex-col items-center gap-6'>
                <div className='max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6'>
                    <StatsCard
                        title='Student Executives'
                        num='30'
                        text=''
                    />
                    <StatsCard
                        title='Projects Completed'
                        num='25'
                        text='since 2020'
                    />
                    <StatsCard
                    title='Engaged with'
                    num='10'
                    text='undergraduate disciplines'
                    />
                </div>
            </div>
        </div>
    );
};

export default Stats;
