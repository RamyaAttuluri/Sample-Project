import Link from "next/link";
import type { ReactNode } from "react";

/* Reusable building blocks shared by every page (Home, About Us, ...). */

export function ChevronsRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l6 6-6 6M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The faint diagonal-stripe block used as decoration around sections. */
export function Hatch({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-hatch ${className}`}
    />
  );
}

export function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative">
      <h2 className="type-section text-ink">{title}</h2>
      <p className="mt-5 max-w-2xl type-copy text-ink">{text}</p>
      <Hatch className="right-0 top-full hidden h-8 w-24 md:block md:right-[30%]" />
    </div>
  );
}

/** Centered "Label »" link shown under a section. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link href={href} className="flex items-center gap-2 text-lg font-medium text-ink-soft transition-colors hover:text-hover">
        {children}
        <ChevronsRight />
      </Link>
    </div>
  );
}

/**
 * Page hero: big title, subtitle, right-aligned intro text with the
 * "Get a consultation" / "View Case Studies" buttons, over the blue-orange-yellow glow.
 * Anything passed as children is rendered below (e.g. the client logo row on Home).
 */
export function PageHero({
  title,
  subtitle,
  intro,
  primary = { label: "Get a consultation", href: "/Contact" },
  secondary = { label: "View Case Studies", href: "/Projects" },
  children,
}: {
  title: ReactNode;
  subtitle: string;
  intro: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative">

      <div className="relative page-container pt-12 pb-16 sm:pt-16">
        <h1 className="type-display text-ink">{title}</h1>
        <p className="mt-8 max-w-2xl type-copy text-ink">{subtitle}</p>

        <div className="mt-12 flex justify-end">
          <div className="max-w-md">
            <p className="type-copy text-ink">{intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Link
                href={primary.href}
                className="flex items-center gap-3 btn-primary"
              >
                {primary.label}
                <ChevronsRight />
              </Link>
              <Link href={secondary.href} className="text-sm font-medium text-ink underline underline-offset-4 hover:text-hover">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
