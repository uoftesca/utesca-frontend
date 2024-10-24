'use client';

import * as React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ProjectProps {
    title: string;
    category: string;
    description: string;
}

export default function ProjectComponent({
    title,
    category,
    description,
}: ProjectProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='w-full max-w-md border rounded-lg shadow-sm'
        >
            <div className='p-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <CollapsibleTrigger asChild>
                            <Button variant='ghost' size='sm' className='p-0'>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        isOpen ? 'transform rotate-180' : ''
                                    }`}
                                />
                            </Button>
                        </CollapsibleTrigger>
                        <h3 className='text-lg font-semibold'>{title}</h3>
                    </div>
                    <span className='text-sm text-gray-500'>{category}</span>
                </div>
                <CollapsibleContent className='mt-2'>
                    <p className='text-sm text-gray-600'>{description}</p>
                </CollapsibleContent>
            </div>
            <div className='flex justify-end p-2 bg-gray-50 rounded-b-lg'>
                <Button variant='ghost' size='sm'>
                    <ExternalLink className='h-4 w-4' />
                </Button>
            </div>
        </Collapsible>
    );
}
