import { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface OverviewCardProps {
    Icon: LucideIcon;
    title: string;
    text: string;
    className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ Icon, title, text, className }) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center p-6'>
                <Icon className='w-12 h-12 text-accent mb-4' />
                <p className='text-center text-lg text-accent font-bold' > {title} </p>
                <p className='text-subtle text-center text-sm'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default OverviewCard;
