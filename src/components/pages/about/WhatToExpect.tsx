import React from 'react';

/**
 * VisionAndMission component displays the vision and mission statement.
 */
const WhatToExpect: React.FC = () => {
    return (
        <div className='text-center justify-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                What to Expect
            </h1>
            <p className='text-base text-subtle'>
                At UTESCA, we believe in combining engineering design and
                student creativity to solve problems faced by our community
                today with pro-bono consulting. We are excited to leverage our
                technical and analytical skills to develop innovative solutions
                to your problems.
            </p>
        </div>
    );
};

export default WhatToExpect;
