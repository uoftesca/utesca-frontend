import ProjectCard from './ProjectCard';

export const PROJECT_SECTIONS = [
    'AI & Machine Learning',
    'Software & Digital Solutions',
    'Automation & Systems',
    'Data & Analytics',
    'Robotics & Hardware',
    'Simulation & Virtual Reality',
] as const;

export type ProjectSection = (typeof PROJECT_SECTIONS)[number];

interface Project {
    title: string;
    category: string;
    section: ProjectSection;
    description: string;
    img?: string;
    link?: string;
    status: 'current' | 'past';
}

interface ProjectsListProps {
    readonly projects: readonly Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
    return (
        <div className='space-y-16'>
            {PROJECT_SECTIONS.map((section) => {
                const sectionProjects = projects.filter(
                    (project) => project.section === section
                );

                if (sectionProjects.length === 0) return null;

                return (
                    <section key={section} className='space-y-6'>
                        <div className='flex items-baseline gap-3 border-b border-border pb-2'>
                            <h2 className='text-2xl leading-none text-primary font-bold'>
                                {section}
                            </h2>
                            {/* <span className='text-sm text-muted-foreground'>
                                ({sectionProjects.length})
                            </span> */}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {sectionProjects.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    {...project}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
