import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

import CEPDescription from '@/components/pages/projects/CEPDescription';
import PartnerWithUs from '@/components/pages/projects/PartnerWithUs';
import ProjectsList from '@/components/pages/projects/ProjectsList';

const projects = [
    {
        title: 'Mobile Mailing App',
        category: 'App Development',
        description:
            "Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc.",
        link: 'https://utesca-website.vercel.app',
        status: 'current',
        img: 'https://plus.unsplash.com/premium_photo-1682309526815-efe5d6225117?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Fine-Tuning Functions',
        category: 'Coding & 3D Modelling',
        description:
            'Delivered a functioning C# coding script in Unity 3D that would allow the company to fine-tune the CAD model for a 3D-printed plastic limb socket for patient prosthetics.',
        status: 'current',
        img: 'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Mobile Mailing App',
        category: 'App Development',
        description:
            "Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc.",
        link: 'https://apps.apple.com/app/id1588848488',
        status: 'past',
        img: 'https://plus.unsplash.com/premium_photo-1682309526815-efe5d6225117?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Fine-Tuning Functions',
        category: 'Coding & 3D Modelling',
        description:
            'Delivered a functioning C# coding script in Unity 3D that would allow the company to fine-tune the CAD model for a 3D-printed plastic limb socket for patient prosthetics.',
        status: 'past',
        img: 'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Online Shopping Platform',
        category: 'Web Development',
        description:
            'Developed a web-based shopping platform using Django/React, the team built a full stack system that handles database integrations, user management, authentication, product listings, searching, etc.',
        status: 'past',
        img: 'https://images.unsplash.com/photo-1668854249355-a3f7dc316d02?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'ESG Investment Insights',
        category: 'CSR, Finance',
        description:
            "Developed a prototype measurement and reporting system to track ESG initiatives' impact. Provided actionable recommendations to stimulate investment and enhance ROI for sustainable alternatives.",
        status: 'past',
        img: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Coffee Grading with ML',
        category: 'AI & Machine Learning',
        description:
            'Developed a Computer Vision System using an image processing and supervised learning algorithm, supported by a hardware system that was used for coffee bean grading.',
        status: 'past',
        img: 'https://images.unsplash.com/photo-1692299108318-5a6650eb6ae7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Carbon Sequestration',
        category: 'Environment, Data Analytics',
        description:
            'Reviewed multiple methods of carbon sequestration from research papers, and empirical methods for determining carbon levels. Developed a calculator that estimates the carbon dioxide released from vegetation.',
        status: 'past',
        img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
] as const;

export default function Projects() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Container>
                    <CEPDescription />
                    <ProjectsList projects={projects} />
                    <PartnerWithUs />
                </Container>
            </main>
            <Footer />
        </>
    );
}
