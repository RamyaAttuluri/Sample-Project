import type { Metadata } from "next";
import GetInTouch from "../GetInTouch/GetInTouch";
import { SectionHeading, TextLink } from "../Shared";
import { ProjectCard, ProjectsHero, type Project } from "./ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
};

const projects: Project[] = [
  {
    title: "Seamless Legacy System Migration for a Healthcare Enterprise",
    challenge: "The client's outdated system was causing inefficiencies, data loss, and scalability issues.",
    solution:
      "ABC Company developed a custom migration strategy, ensuring seamless data transfer, modernizing the infrastructure, and integrating the system with advanced analytics tools.",
    img: "/Projects/image24.png",
    href: "#",
  },
  {
    title: "Accelerating MVP Development for a FinTech Startup",
    challenge: "The startup needed a stable MVP within a tight timeline to secure investor funding.",
    solution:
      "Our automated teams delivered a bug-free MVP in just 6 weeks, using agile development practices to meet the client's requirements.",
    img: "/Projects/image25.png",
    href: "#",
  },
  {
    title: "Scalable ERP Implementation for a Retail Chain",
    challenge:
      "The retail client struggled with fragmented operations across multiple locations, affecting efficiency and reporting accuracy.",
    solution:
      "ABC Company implemented a customized ERP system, integrating inventory, sales, and finance operations into a single streamlined platform.",
    img: "/Projects/image26.png",
    href: "#",
  },
];

export default function Projects() {
  return (
    <main className="relative w-full overflow-hidden">
      <ProjectsHero />

      {/* ===== Featured Projects ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Featured Projects"
          text="Discover how our tailored solutions have transformed businesses across industries."
        />

        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <TextLink href="/Projects/ProjectsView">View More</TextLink>
      </section>

      <GetInTouch />
    </main>
  );
}
