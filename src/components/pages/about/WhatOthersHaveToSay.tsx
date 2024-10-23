import { TestimonialMarquee } from '@/components/pages/about/TestinominalMarquee';

export default function WhatOthersHaveToSay() {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
                What Others Have To Say
            </h1>
            <TestimonialMarquee />
        </div>
    );
}
