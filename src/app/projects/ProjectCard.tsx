import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PageHero } from "../Shared";

export type Project = {
  title: string;
  challenge: string;
  solution: string;
  img: string;
  href: string;
};

/** One project card: image, title, Challenge, Solution and "Read Full Case study". The whole card is the link. */
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link href={p.href} className="group flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={p.img}
          alt={p.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-6 text-2xl leading-snug text-accent">{p.title}</h3>

      <h4 className="mt-4 text-lg text-ink-soft">Challenge</h4>
      <p className="mt-2 type-caption text-muted">{p.challenge}</p>

      <h4 className="mt-4 text-lg text-ink-soft">Solution</h4>
      <p className="mt-2 type-caption text-muted">{p.solution}</p>

      <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm tracking-wide text-accent group-hover:text-ink">
        Read Full Case study <ArrowUpRight />
      </span>
    </Link>
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
