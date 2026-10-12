import Image from "next/image";
import Link from "next/link";
import GetInTouch from "./GetInTouch";
import { ArrowUpRight, PageHero, SectionHeading, TextLink } from "./Shared";

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

export type Project = {
  title: string;
  challenge: string;
  solution: string;
  img: string;
  href: string;
};

/** One project card: image, title, Challenge, Solution and "Read Full Case study" link. */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image src={p.img} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      </div>
      <h3 className="mt-6 text-2xl leading-snug text-accent">{p.title}</h3>

      <h4 className="mt-4 text-lg text-ink-soft">Challenge</h4>
      <p className="mt-2 type-caption text-muted">{p.challenge}</p>

      <h4 className="mt-4 text-lg text-ink-soft">Solution</h4>
      <p className="mt-2 type-caption text-muted">{p.solution}</p>

      <Link
        href={p.href}
        className="mt-5 inline-flex items-center gap-2 font-mono text-sm tracking-wide text-accent hover:text-ink"
      >
        Read Full Case study <ArrowUpRight />
      </Link>
    </article>
  );
}

/** Hero shared by the Projects and "View More" pages. */
export function ProjectsHero() {
  return (
    <PageHero
      title="Projects"
      subtitle="Proven Success Across Industries"
      intro="Explore how ABC Company has empowered businesses worldwide with tailored engineering solutions that deliver measurable results."
    />
  );
}

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

        <TextLink href="/projects/view">View More</TextLink>
      </section>

      <GetInTouch />
    </main>
  );
}
