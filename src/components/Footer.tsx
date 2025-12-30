import { Mail } from 'lucide-react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const socialLinks = {
    facebook: 'https://www.facebook.com/uoftesca/',
    instagram: 'https://www.instagram.com/utesca/',
    linkedin: 'https://www.linkedin.com/company/utescaconsulting/',
} as const;

export default function Footer() {
    return (
        <footer className='bg-sidebar text-sidebar-foreground'>
            <div className='container mx-auto px-8 py-8 md:py-12'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                    <div className='space-y-4'>
                        <h2 className='text-xl font-bold'>
                            University of Toronto Engineering Student Consulting
                            Association
                        </h2>
                    </div>
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>
                            Contact Us
                        </h3>
                        <ul className='space-y-2 text-sm'>
                            <li className='flex items-center gap-2'>
                                <Mail className='h-4 w-4' />
                                <a
                                    href='mailto:uoft.esca@gmail.com'
                                    className='hover:underline'
                                >
                                    uoft.esca@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>
                            Follow Us
                        </h3>
                        <div className='flex space-x-4'>
                            <Link
                                href={socialLinks.instagram}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition-colors duration-200 ease-in-out hover:text-primary'
                            >
                                <span className='sr-only'>Instagram</span>
                                <FaInstagram className='h-6 w-6' />
                            </Link>
                            <Link
                                href={socialLinks.linkedin}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition-colors duration-200 ease-in-out hover:text-primary'
                            >
                                <span className='sr-only'>LinkedIn</span>
                                <FaLinkedin className='h-6 w-6' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mt-8 border-t border-primary-foreground/10 pt-8 text-center text-sm'>
                    <p>
                        &copy; {new Date().getFullYear()} University of Toronto
                        Engineering Student Consulting Association. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
