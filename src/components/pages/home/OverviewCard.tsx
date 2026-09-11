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
        <Card className={`bg-card border-none w-full max-w-sm h-full transition duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-start p-6'>
                <Icon className='w-12 h-12 text-primary mb-4' />
                <p className='text-left text-xl text-primary font-bold mb-2 font-heading' > {title} </p>
                <p className='text-muted-foreground text-center text-md'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default OverviewCard;
