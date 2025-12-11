import ProjectCard from './ProjectCard';

interface Project {
    title: string;
    category: string;
    description: string;
    img?: string;
    link?: string;
    status: 'current' | 'past';
}

interface ProjectsListProps {
    readonly projects: readonly Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
    const currentProjects = projects.filter(
        (project) => project.status === 'current'
    );
    const pastProjects = projects.filter(
        (project) => project.status === 'past'
    );

    return (
        <div className='space-y-12'>
            <section className='space-y-6'>
                <h2 className='text-2xl leading-none text-primary font-bold'>
                    Current Projects
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {currentProjects.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </section>

            <section className='space-y-6'>
                <h2 className='text-2xl text-primary font-bold'>
                    Past Projects
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {pastProjects.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </section>
        </div>
    );
}
