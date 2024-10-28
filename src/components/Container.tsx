import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='min-h-screen max-w-[912px] mx-auto py-12 md:py-24'>
            <div className='space-y-12 md:space-y-24'>{children}</div>
        </div>
    );
};

export default Container;
