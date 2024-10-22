import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='max-w-[912px] mx-auto pt-12 md:pt-24 pb-12 md:pb-24 px-6 md:px-10'>
            <div className='space-y-12 md:space-y-24'>{children}</div>
        </div>
    );
};

export default Container;
