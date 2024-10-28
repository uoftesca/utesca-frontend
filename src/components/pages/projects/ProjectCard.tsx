'use client';

import * as React from 'react';
import { ExternalLink, Triangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';

interface ProjectProps {
    title: string;
    category: string;
    description: string;
    img?: string;
    link?: string;
}

export default function ProjectComponent({
    title,
    category,
    description,
    img,
    link = '',
}: ProjectProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='w-full max-w-md rounded-lg bg-transparent relative'
        >
            <div className='p-0 space-y-4'>
                <div className='flex flex-col items-start gap-4'>
                    <div className='relative w-full h-56 rounded-lg bg-secondary'>
                        {img && (
                            <Image
                                src={img}
                                alt={title}
                                fill
                                className='object-cover rounded-lg'
                            />
                        )}
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-3'>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='p-0 [&_svg]:size-3'
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
                        <span className='text-subtle italic'>{category}</span>
                    </div>
                </div>
                <CollapsibleContent>
                    <div className='flex items-stretch justify-between'>
                        <p className='text-subtle'>{description}</p>
                        <div className='flex items-end justify-center'>
                            {link && (
                                <a
                                    href={link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        className: 'p-0 [&_svg]:size-5',
                                    })}
                                >
                                    <ExternalLink className='w-full h-full' />
                                </a>
                            )}
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
