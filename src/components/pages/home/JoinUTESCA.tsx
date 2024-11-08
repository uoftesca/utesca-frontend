const JoinUTESCA: React.FC = () => {
    return (
        <div className='w-full text-center space-y-6'>
            <h1 className='text-2xl font-bold tracking-normal md:text-4xl text-accent'>
               Join UTESCA
            </h1>
            <p className='text-base text-subtle mx-auto'>
                We begin our VP recruitment in early summer, followed by director recruitment. Check out our "Meet Our Team" section for available roles, and stay tuned to our mailing list and social media for updates—especially as we approach the hiring cycle.            </p>
            <p className='text-base text-subtle'>
                If you are interested in collaborating with us, please contact
                us at{' '}
                <a
                    href='mailto:uoft.esca@gmail.com'
                    className='font-bold hover:underline hover:text-accent transition-colors duration-200 ease-in-out'
                >
                    uoft.esca@gmail.com
                </a>
                .
            </p>
        </div>
    );
};

export default JoinUTESCA;
