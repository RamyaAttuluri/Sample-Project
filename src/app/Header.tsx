"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronsRight } from "./Shared";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

/** Company badge from public/logo/logo.jpeg, cropped to its circle. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="relative inline-block shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
      <Image
        src="/logo/logo.jpeg"
        alt="GGST Innovations logo"
        fill
        sizes={`${size * 2}px`}
        className="scale-[1.28] object-cover"
      />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <Logo />
          <span className="text-lg font-medium tracking-tight">GGST Innovations</span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {navLinks.map((link, i) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <div key={link.href} className="flex items-center">
                {i > 0 && <span className="mx-6 h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />}
                <Link
                  href={link.href}
                  className={`text-nav transition-colors ${
                    active ? "text-accent underline underline-offset-4" : "text-ink hover:text-hover"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center gap-3 btn-primary lg:flex"
        >
          Get a consultation
          <ChevronsRight />
        </Link>

        <button
          type="button"
          className="p-2 text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="mx-4 flex flex-col gap-1 border border-line-soft bg-surface/90 p-4 backdrop-blur lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2 ${active ? "text-accent underline underline-offset-4" : "text-ink"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-3 bg-primary px-4 py-3 text-sm font-medium text-on-primary"
          >
            Get a consultation
            <ChevronsRight />
          </Link>
        </nav>
      )}
    </header>
  );
}
