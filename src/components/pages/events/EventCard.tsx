import * as React from 'react';
import { ExternalLink, Triangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Image from 'next/image';
import { EventCardProps, ImagePosition } from '@/types/event';

export default function EventCard({
    title,
    month,
    day,
    category,
    description,
    image,
    imagePosition = 'center',
    registrationLink,
    driveLink,
    status,
    isExpanded = false,
}: EventCardProps & { isExpanded?: boolean }) {
    const [isOpen, setIsOpen] = React.useState(isExpanded);

    React.useEffect(() => {
        setIsOpen(isExpanded);
    }, [isExpanded]);

    const getImageStyle = (position: ImagePosition): React.CSSProperties => {
        if (typeof position === 'number') {
            return {
                objectPosition: `center ${position}px`,
            };
        }
        return {};
    };

    const getImageClassName = (position: ImagePosition): string => {
        if (typeof position === 'number') {
            return 'object-cover rounded-lg select-none';
        }
        return `object-cover rounded-lg select-none object-${position}`;
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='w-full rounded-lg bg-transparent relative'
        >
            <div className='p-0 space-y-4'>
                <div className='flex flex-col items-start gap-4'>
                    {driveLink ? (
                        <a
                            href={driveLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='block relative w-full h-56 rounded-lg bg-secondary cursor-pointer overflow-hidden'
                        >
                            {image ? (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className={getImageClassName(imagePosition)}
                                    style={getImageStyle(imagePosition)}
                                    draggable={false}
                                />
                            ) : (
                                <div className='flex items-center justify-center w-full h-full'>
                                    <div className='text-center'>
                                        <div className='text-2xl font-bold'>
                                            {month}
                                        </div>
                                        <div className='text-4xl'>{day}</div>
                                    </div>
                                </div>
                            )}
                        </a>
                    ) : (
                        <div className='relative w-full h-56 rounded-lg bg-secondary'>
                            {image ? (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className={getImageClassName(imagePosition)}
                                    style={getImageStyle(imagePosition)}
                                    draggable={false}
                                />
                            ) : (
                                <div className='flex items-center justify-center w-full h-full'>
                                    <div className='text-center'>
                                        <div className='text-2xl font-bold'>
                                            {month}
                                        </div>
                                        <div className='text-4xl'>{day}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-3'>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='p-0 h-auto [&_svg]:size-3 hover:bg-transparent'
                                >
                                    <Triangle
                                        className={`transition-transform duration-200 fill-current ${
                                            isOpen ? 'rotate-180' : 'rotate-90'
                                        }`}
                                    />
                                </Button>
                            </CollapsibleTrigger>
                            <h3 className='font-normal'>{title}</h3>
                        </div>
                        <span className='text-subtle italic text-right'>
                            {category}
                        </span>
                    </div>
                </div>
                <CollapsibleContent className='transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
                    <div className='flex items-stretch justify-between text-left'>
                        <div className='flex-1 space-y-4'>
                            <p className='text-subtle text-left whitespace-pre-line'>
                                {description}
                            </p>
                            {status === 'upcoming' && (
                                <p className='text-sm text-subtle text-left'>
                                    {registrationLink
                                        ? 'Registration available'
                                        : 'Registration not available yet'}
                                </p>
                            )}
                        </div>
                        <div className='inline-flex items-end ml-4'>
                            {registrationLink && (
                                <Button
                                    variant='link'
                                    size='icon'
                                    className='p-0 m-0 w-fit h-fit'
                                    asChild
                                >
                                    <a
                                        href={registrationLink}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <ExternalLink />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
