import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PartnerWithUs() {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl md:text-4xl text-accent font-bold'>
                Partner With Us
            </h1>
            <p className='text-base text-subtle'>
                We are currently seeking clients and advisors across the GTA for
                our Consulting Engineering Projects program. We believe that
                partnering with you would provide valuable resources and
                learning opportunities for our students.
            </p>
            <p className='text-base text-subtle'>
                Join forces with a dynamic team of 4-6 undergraduate engineering
                students. Our rigorous recruitment process ensures each team
                member brings technical expertise and passion to craft optimal
                solutions for your needs.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Card className='bg-card border-none'>
                    <CardHeader className='text-left pb-2'>
                        <CardTitle className='text-base'>
                            1. Reach Out
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-left'>
                        Contact UTESCA through their official channels, such as
                        their website or social media platforms, expressing
                        interest in partnership opportunities.
                    </CardContent>
                </Card>

                <Card className='bg-card border-none'>
                    <CardHeader className='text-left pb-2'>
                        <CardTitle className='text-base'>
                            2. Discuss Collaboration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-left'>
                        Contact UTESCA through their official channels, such as
                        their website or social media platforms, expressing
                        interest in partnership opportunities.
                    </CardContent>
                </Card>

                <Card className='bg-card border-none'>
                    <CardHeader className='text-left pb-2'>
                        <CardTitle className='text-base'>
                            3. Formalize Agreement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-left'>
                        After agreeing on terms and benefits, formalize the
                        partnership through a signed agreement outlining
                        expectations, contributions, and benefits for both
                        parties.
                    </CardContent>
                </Card>
            </div>
            <p className='text-base text-subtle'>
                If you are interested in collaborating with us, please contact
                us at{' '}
                <a
                    href='mailto:uoft.esca@gmail.com'
                    className='font-bold text-accent no-underline hover:underline'
                >
                    uoft.esca@gmail.com
                </a>
                .
            </p>
        </div>
    );
}
