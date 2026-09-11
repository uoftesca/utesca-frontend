"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Reveal from "@/components/Reveal";
import {
  Brain,
  Code2,
  Cog,
  BarChart3,
  Cpu,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export const PROJECT_SECTIONS = [
  "AI & Machine Learning",
  "Software & Digital Solutions",
  "Automation & Systems",
  "Data & Analytics",
  "Robotics & Hardware",
  "Simulation & Virtual Reality",
] as const;

export type ProjectSection = (typeof PROJECT_SECTIONS)[number];

const SECTION_ICON: Record<ProjectSection, LucideIcon> = {
  "AI & Machine Learning": Brain,
  "Software & Digital Solutions": Code2,
  "Automation & Systems": Cog,
  "Data & Analytics": BarChart3,
  "Robotics & Hardware": Cpu,
  "Simulation & Virtual Reality": Boxes,
};

interface Project {
  title: string;
  category: string;
  section: ProjectSection;
  description: string;
  img?: string;
  link?: string;
  status: "current" | "past";
}

interface ProjectsListProps {
  readonly projects: readonly Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [flippedKey, setFlippedKey] = useState<string | null>(null);
  return (
    <div className="space-y-16">
      {/* <h1>
        Consulting Engineering Projects Explore the impact of our Consulting
        Engineering Projects (CEP) at UTESCA. Our students offer a range of
        technical skills to solve technical engineering problems and develop the
        best engineering-based solution with our pro bono service.
      </h1> */}
      {PROJECT_SECTIONS.map((section) => {
        const sectionProjects = projects.filter(
          (project) => project.section === section,
        );

        if (sectionProjects.length === 0) return null;

        const Icon = SECTION_ICON[section];

        return (
          <section key={section} className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-8 w-1.5 shrink-0 rounded-full bg-primary" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-br from-primary to-primary/55 bg-clip-text text-transparent pb-1">
                {section}
              </h2>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <span className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionProjects.map((project, i) => (
                <Reveal key={project.title} delay={i * 60}>
                  <ProjectCard {...project} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
