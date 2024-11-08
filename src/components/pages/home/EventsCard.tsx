import { SquareArrowOutUpRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface EventsCardProps {
    img: string;
    title: string;
    link: string;
    className?: string;
}

// export function EventsCard({ img, title, link, className }: EventsCardProps) {
export function EventsCard({ img, title }: EventsCardProps) {

    return (
        <Card className='bg-transparent border-none shadow-none w-96'>
            <CardContent className='p-0 flex flex-col items-start'>
                <Avatar className='w-96 h-64 mb-1 rounded-lg'>
                    <AvatarImage
                        src={img}
                        alt={'img'}
                        className='object-cover'
                    />
                </Avatar>
                <div className='w-full flex justify-between items-center'>
                    <p className='font-semibold text-subtle text-sm'>{title}</p>
                    <SquareArrowOutUpRight className='font-semibold text-subtle text-sm' />
                </div>
            </CardContent>
        </Card>
    );
}

