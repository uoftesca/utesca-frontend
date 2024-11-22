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
            className='w-full rounded-lg bg-transparent relative'
        >
            <div className='p-0 space-y-4'>
                <div className='flex flex-col items-start gap-4'>
                    <div className='relative w-full h-56 rounded-lg bg-secondary'>
                        {img && (
                            <Image
                                src={img}
                                alt={title}
                                fill
                                className='object-cover rounded-lg select-none'
                                draggable={false}
                            />
                        )}
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-3'>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='p-0 h-auto [&_svg]:size-3'
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
                <CollapsibleContent className="transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <div className='flex items-stretch justify-between'>
                        <p className='text-subtle'>{description}</p>
                        <div className='inline-flex items-end'>
                            {link && (
                                <a
                                    href={link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        className:
                                            '!p-0 [&_svg]:size-5 !items-end',
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
