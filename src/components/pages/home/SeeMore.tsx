import { Card, CardContent } from '@/components/ui/card';

interface SeeMoreProps {
    link: string;
    className?: string;
}

const SeeMore: React.FC<SeeMoreProps> = ({ link, className }) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm ${className}`}>
            <CardContent className='flex flex-col items-center p-6'>
                <a className='text-subtle text-center text-sm' href={link}>See More...</a>
            </CardContent>
        </Card>
    );
};

export default SeeMore;
