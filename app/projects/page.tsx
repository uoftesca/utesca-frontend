import Container from '@/components/Container';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';

import CEPDescription from '@/components/pages/projects/CEPDescription';
import ProjectsList from '@/components/pages/projects/ProjectsList';

const projects = [
    {
        title: 'Mobile Mailing App',
        category: 'App Development',
        description:
            "Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc.",
        link: 'https://utesca-website.vercel.app',
        status: 'current',
    },
    {
        title: 'Fine-Tuning Functions',
        category: 'Coding & 3D Modelling',
        description:
            'Delivered a functioning C# coding script in Unity 3D that would allow the company to fine-tune the CAD model for a 3D-printed plastic limb socket for patient prosthetics.',
        status: 'current',
    },
    {
        title: 'Mobile Mailing App',
        category: 'App Development',
        description:
            "Developed a fully functional calendar app (both iOS and Android) within the company's existing Mailing app - with functionalities including event creation, editing, invites etc.",
        link: 'https://apps.apple.com/app/id1588848488',
        status: 'past',
    },
    {
        title: 'Fine-Tuning Functions',
        category: 'Coding & 3D Modelling',
        description:
            'Delivered a functioning C# coding script in Unity 3D that would allow the company to fine-tune the CAD model for a 3D-printed plastic limb socket for patient prosthetics.',
        status: 'past',
    },
    {
        title: 'Online Shopping Platform',
        category: 'Web Development',
        description:
            'Developed a web-based shopping platform using Django/React, the team built a full stack system that handles database integrations, user management, authentication, product listings, searching, etc.',
        status: 'past',
    },
    {
        title: 'ESG Investment Insights',
        category: 'CSR, Finance',
        description:
            "Developed a prototype measurement and reporting system to track ESG initiatives' impact. Provided actionable recommendations to stimulate investment and enhance ROI for sustainable alternatives.",
        status: 'past',
    },
    {
        title: 'Coffee Grading with ML',
        category: 'AI & Machine Learning',
        description:
            'Developed a Computer Vision System using an image processing and supervised learning algorithm, supported by a hardware system that was used for coffee bean grading.',
        status: 'past',
    },
    {
        title: 'Carbon Sequestration',
        category: 'Environment, Data Analytics',
        description:
            'Reviewed multiple methods of carbon sequestration from research papers, and empirical methods for determining carbon levels. Developed a calculator that estimates the carbon dioxide released from vegetation.',
        status: 'past',
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
                </Container>
            </main>
        </>
    );
}
