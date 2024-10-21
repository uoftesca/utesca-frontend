import Image from 'next/image';

export default function Hero() {
    return (
        <div className='relative h-[200px] md:h-[400px] w-full overflow-hidden'>
            <Image
                src='/toronto-skyline.jpg'
                alt='Toronto Skyline'
                fill
                sizes='100vw'
                priority={true}
                className='object-cover object-top'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 z-1'></div>
            <div className='absolute inset-0 flex items-center justify-left z-1'>
                <div className='text-white pl-8 md:pl-20'>
                    <h1 className='text-2xl md:text-4xl font-bold mb-2 leading-tight md:leading-tight'>
                        University of Toronto
                        <br />
                        Engineering Student
                        <br />
                        Consulting Association
                    </h1>
                </div>
            </div>
        </div>
    );
}
