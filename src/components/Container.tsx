import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='w-11/12 max-w-[1800px] mx-auto px-8 md:px-4 py-12 md:py-18 pb-24'>
            <div className='space-y-12 md:space-y-24'>{children}</div>
        </div>
    );
};

export default Container;
