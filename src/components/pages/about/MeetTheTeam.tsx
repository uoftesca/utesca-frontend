import React from 'react';
import Team from './Team';

/**
 * VisionAndMission component displays the vision and mission statement.
 */
const MeetTheTeam: React.FC = () => {
    return (
        <div className='text-center justify-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                Meet the Executive Team.
            </h1>
            <p className='text-base text-subtle'>
                These are the people that make up the UTESCA team. Want to join
                us? Come to one of our events.
            </p>
            <Team />
        </div>
    );
};

export default MeetTheTeam;
