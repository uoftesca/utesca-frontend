import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='max-w-5xl mx-auto px-8 md:px-0 py-12 md:py-18 pb-24'>
            <div className='space-y-12 md:space-y-24'>{children}</div>
        </div>
    );
};

export default Container;
