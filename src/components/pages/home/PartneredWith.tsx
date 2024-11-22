import Image from 'next/image';

import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';

const partners = [
    {
        logo: '/partners/accenture.png',
    },
    {
        logo: '/partners/bcg.png',
    },
    {
        logo: '/partners/deloitte.png',
    },
    {
        logo: '/partners/ey.png',
    },
    {
        logo: '/partners/google.png',
    },
    {
        logo: '/partners/ibm.png',
    },
    {
        logo: '/partners/kearney.png',
    },
    {
        logo: '/partners/kpmg.png',
    },
    {
        logo: '/partners/lidd.png',
    },
    {
        logo: '/partners/oliverwyman.png',
    },
    {
        logo: '/partners/oracle.png',
    },
    {
        logo: '/partners/pwc.svg',
    },
    {
        logo: '/partners/synergypartners.jpeg',
    },
    {
        logo: '/partners/tesla.png',
    }
];

const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
const secondRow = partners.slice(Math.ceil(partners.length / 2));

const PartnerCard = ({
    img,
}: {
    img: string;
}) => {
    return (
        <figure
            className={cn(
                'relative w-24 flex items-center justify-center overflow-hidden rounded-xl p-4 select-none'
            )}
        >
            <div className='flex items-center justify-center'>
                <Image
                    className='object-cover pointer-events-none'
                    width={64}
                    height={24}
                    alt={`logo`}
                    src={img}
                    draggable={false}
                />
            </div>
        </figure>
    );
};

export function PartneredWith() {
    return (
        <div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
            <Marquee className='[--duration:10s]'>
                {firstRow.map((partner) => (
                    <PartnerCard
                        key={partner.logo}
                        img={partner.logo}
                    />
                ))}
            </Marquee>
            <Marquee reverse className='[--duration:10s]' style={{textAlign: 'center'}}>
                {secondRow.map((partner) => (
                    <PartnerCard
                        key={partner.logo}
                        img={partner.logo}
                    />
                ))}
            </Marquee>
            <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background'></div>
            <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background'></div>
        </div>
    );
}
