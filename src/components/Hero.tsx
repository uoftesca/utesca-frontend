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
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                }}
            />
            <div
                className='hero-overlay'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }}
            ></div>
            <div className='absolute inset-0 flex items-center justify-left z-10'>
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
