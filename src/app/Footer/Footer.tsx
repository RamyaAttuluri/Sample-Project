"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Header/Header";

const navigation = [
  { label: "About Us", href: "/About" },
  { label: "Case Studies", href: "/Projects" },
  { label: "Careers", href: "#" },
  { label: "Contact Us", href: "/Contact" },
  { label: "T&C", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const services = [
  "Digital Engineering",
  "Enterprise Solutions",
  "AI, Data & Automation",
  "Business operations & BPO",
  "ODC & Dedicated Teams",
  "Workforce & Staffing",
];

const socials = [
  {
    label: "Facebook",
    path: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.1v3h2.5V21h2.9z",
  },
  {
    label: "Twitter",
    path: "M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.4 11.7 11.7 0 0 0 8.3 20c7.5 0 11.7-6.2 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2z",
  },
  {
    label: "LinkedIn",
    path: "M6.9 8.6H3.6V20h3.3V8.6zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.5c0-3-1.6-5.1-4.4-5.1-1.4 0-2.4.7-2.9 1.5V8.6H9.9V20h3.3v-5.8c0-1.5.4-2.9 2.2-2.9s1.8 1.7 1.8 3V20h3.2v-6.5z",
  },
  {
    label: "Instagram",
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7v7.2c-.1 2.4-1.3 3.6-3.7 3.7H8.4c-2.4-.1-3.6-1.3-3.7-3.7V8.4c.1-2.4 1.3-3.6 3.7-3.7.9-.1 1.2-.1 3.6-.1zM12 3c-2.4 0-2.7 0-3.7.1C5 3.2 3.2 5 3.1 8.3 3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.3 1.9 5.1 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7C20.8 5 19 3.2 15.7 3.1 14.7 3 14.4 3 12 3z",
  },
];

export default function Footer() {
  const pathname = usePathname();

  // Case-study pages (/Projects/ProjectsView/Project1 … Project12) are shown without the footer.
  if (/^\/Projects\/ProjectsView\/Project\d+$/.test(pathname)) return null;

  return (
    <footer className="relative w-full overflow-hidden">
      {/* soft colour glows behind the footer */}
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-glow-blue-soft opacity-50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-glow-orange-soft opacity-50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-60 w-60 rounded-full bg-glow-yellow-soft opacity-40 blur-3xl" aria-hidden="true" />

      <div className="relative page-container">
        <div className="border-t border-line-strong" />

        <div className="grid gap-12 py-12 md:grid-cols-[1.6fr_0.7fr_1fr] md:gap-16">
          <div>
            <Link href="/" className="flex items-center gap-3 text-ink">
              <Logo size={36} />
              <span className="text-3xl tracking-tight">GGST Innovations</span>
            </Link>
            <p className="mt-6 max-w-md type-copy text-muted">
              We offers a comprehensive suite of digital marketing services that cover all aspects of our online
              presence. From SEO and social media marketing to content creation and PPC advertising, they have the
              expertise and resources to handle our diverse marketing needs.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-ink shadow-raised transition-colors hover:bg-hover hover:text-on-primary"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg text-ink">Navigation</h3>
            <ul className="mt-5 space-y-3 font-mono text-sm text-muted">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-ink">Services</h3>
            <ul className="mt-5 space-y-3 font-mono text-sm text-muted">
              {services.map((item) => (
                <li key={item}>
                  <Link href="/OurServices" className="hover:text-hover">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line-strong" />
        <p className="py-6 text-center font-mono text-sm text-muted">
          © ABC Company 2024 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
