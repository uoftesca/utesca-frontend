import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import ProjectsList from "@/components/pages/projects/ProjectsList";
import { projects } from "@/data/projects";

export default function ProjectExamples() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container>
          <div id="projects" className="scroll-mt-24">
            <ProjectsList projects={projects} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}