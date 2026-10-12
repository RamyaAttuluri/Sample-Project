"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import GetInTouch from "../GetInTouch/GetInTouch";
import { ArrowUpRight, ChevronsRight, Hatch, PageHero, SectionHeading, TextLink } from "../Shared";

const expertise = [
  {
    title: "Product Consulting",
    text: "Strategically position your digital products for success with actionable insights and market expertise.",
    img: "/Home/image1.png",
  },
  {
    title: "Legacy System Migration",
    text: "Seamlessly transform outdated systems to enhance efficiency, scalability, and performance.",
    img: "/Home/image2.png",
  },
  {
    title: "Automated Teams",
    text: "Drive productivity with fully autonomous, high-performing development teams for scalable solutions.",
    img: "/Home/image3.png",
  },
  {
    title: "Engineering Consulting",
    text: "Overcome challenges and foster innovation with expert guidance from our engineering professionals.",
    img: "/Home/image4.png",
  },
  {
    title: "ERP Implementation",
    text: "Deploy robust, customized ERP solutions to optimize and streamline your operations.",
    img: "/Home/image5.png",
  },
  {
    title: "Cybersecurity Services",
    text: "Protect your digital assets with industry-leading security solutions, including comprehensive vulnerability assessments.",
    img: "/Home/image6.png",
  },
];

const stats = [
  { value: "95%", label: "Client Satisfaction Rate" },
  { value: "300+", label: "Successful Projects Delivered" },
  { value: "40%", label: "Faster MVP Delivery" },
  { value: "10+", label: "Years of Combined Expertise" },
];

const reasons = [
  {
    title: "Global Reach",
    text: "Serving clients worldwide, from startups to enterprises.",
    img: "/Home/image7.png",
  },
  {
    title: "Scalable Solutions",
    text: "Flexible services tailored to businesses of all sizes.",
    img: "/Home/image8.png",
  },
  {
    title: "Expertise You Can Trust",
    text: "Decades of experience delivering quality solutions for complex problems.",
    img: "/Home/image9.png",
  },
];

const stories = [
  {
    title: "Streamlined Operations with Custom ERP",
    text: "ABC Company delivered exactly what we needed—a scalable and secure ERP system that streamlined our operations. Their team's professionalism and expertise were evident every step of the way.",
    author: "Manager, Global Retail Company",
  },
  {
    title: "MVP Delivered Ahead of Schedule",
    text: "As a startup, we were looking for a reliable partner to build our MVP. ABC Company exceeded our expectations, delivering a bug-free product ahead of schedule. Their team felt like an extension of ours!",
    author: "Founder, FinTech Startup",
  },
  {
    title: "Seamless Legacy System Migration",
    text: "The legacy system migration ABC Company handled for us was seamless. We were impressed with their attention to detail, proactive communication, and ability to complete the project with zero downtime.",
    author: "CTO, Healthcare Enterprise",
  },
];

const faqs = [
  {
    q: "What industries do you serve?",
    a: "We serve clients across industries, including technology, healthcare, finance, retail, and more.",
  },
  {
    q: "Can your solutions scale with my business?",
    a: "Yes. Every solution we build is designed to grow with you, from early-stage MVPs to enterprise-scale platforms.",
  },
  {
    q: "How do you ensure security and reliability?",
    a: "We follow industry best practices, run regular security audits and vulnerability assessments, and back our systems with a 99.9% uptime guarantee.",
  },
  {
    q: "Do you offer dedicated teams for ongoing projects?",
    a: "Absolutely. Our dedicated and automated teams integrate with your workflow to support long-term development and maintenance.",
  },
];


/* ---------- client logos ---------- */

const clients: { name: string; icon: ReactNode }[] = [
  {
    name: "Boltshift",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#2f6ff0" />
        <path d="M18 5l-9 13h6l-2 9 9-13h-6l2-9z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Lightbox",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#1f2a3a" strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3l11 6v14l-11 6-11-6V9l11-6z" />
        <path d="M5 9l11 6 11-6M16 15v14" />
      </svg>
    ),
  },
  {
    name: "FeatherDev",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#22b07d" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        <path d="M14 6h14M8 12h18M4 18h18M10 24h10" />
      </svg>
    ),
  },
  {
    name: "Spherule",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#7a3fe0" strokeWidth="2.5" aria-hidden="true">
        <circle cx="16" cy="16" r="13" />
        <path d="M16 3a13 13 0 0 1 0 26M16 3a13 13 0 0 0 0 26M3 16h26" />
      </svg>
    ),
  },
  {
    name: "GlobalBank",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#2f6ff0" />
        <circle cx="16" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: "Nietzsche",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" stroke="#f26a2e" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={16 + Math.cos(a) * 5}
              y1={16 + Math.sin(a) * 5}
              x2={16 + Math.cos(a) * 13}
              y2={16 + Math.sin(a) * 13}
            />
          );
        })}
      </svg>
    ),
  },
];

/* ---------- page ---------- */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative w-full overflow-hidden">
      <PageHero
        title={
          <>
            Empowering
            <br />
            Global Businesses
          </>
        }
        subtitle="From startups to multinational corporations, we deliver scalable, reliable, and cost-effective services to address your unique challenges."
        intro="Transform your business with expert engineering, seamless migrations, and innovative digital solutions, no matter where you are."
      >
        <div className="mt-24 text-center">
          <p className="text-lg font-medium text-ink">Join in our ever growing client list</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                {c.icon}
                <span className="text-xl font-semibold tracking-tight text-ink">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* ===== Our Expertise ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Our Expertise"
          text="We specialize in delivering tailored solutions to address your business needs across these key areas:"
        />

        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, i) => (
            <div key={item.title} className={i % 3 === 1 ? "lg:mt-12" : ""}>
              <div className="relative aspect-[5/4] w-full">
                <Image src={item.img} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain" />
              </div>
              <h3 className="mt-6 text-2xl text-accent">{item.title}</h3>
              <p className="mt-3 type-copy text-muted">{item.text}</p>
              <Link href="/OurServices" className="mt-4 inline-flex items-center gap-2 font-mono text-2xs text-muted hover:text-hover">
                Learn More <ArrowUpRight />
              </Link>
            </div>
          ))}
        </div>

        <TextLink href="/Contact">Get a consultation</TextLink>
      </section>

      {/* ===== Our Impact ===== */}
      <section className="relative page-container py-section">
        <SectionHeading title="Our Impact" text="Discover the milestones that define our success." />

        <div className="relative mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          <Hatch className="left-[24%] top-16 h-28 w-20" />
          <Hatch className="left-[70%] top-12 h-28 w-20" />
          {stats.map((s) => (
            <div key={s.label} className="relative text-center">
              <p className="text-5xl font-medium tracking-tight text-ink sm:text-6xl">{s.value}</p>
              <p className="mt-4 font-mono text-xs text-ink sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-7xl font-medium tracking-tight text-accent sm:text-8xl">99.9%</p>
          <p className="mt-4 font-mono text-sm text-accent">Uptime Guarantee</p>
        </div>
      </section>

      {/* ===== Why Choose ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Why Choose ABC Company?"
          text="We provide end-to-end solutions to help businesses across industries overcome challenges, innovate, and scale."
        />

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {reasons.map((item, i) => (
            <div key={item.title} className={i === 1 ? "md:-mt-6" : ""}>
              <div className="relative aspect-square w-full">
                <Image src={item.img} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
              </div>
              <h3 className="mt-6 text-2xl text-accent">{item.title}</h3>
              <p className="mt-3 type-copy text-muted">{item.text}</p>
              {i === 1 && (
                <Link href="/Contact" className="mt-12 hidden items-center gap-2 text-lg font-medium text-ink-soft hover:text-hover md:inline-flex">
                  Get a consultation <ChevronsRight />
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <TextLink href="/Contact">Get a consultation</TextLink>
        </div>
      </section>

      {/* ===== Success Stories ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Success Stories"
          text="Explore how we've transformed challenges into opportunities, driving success for businesses across industries worldwide."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.title}>
              <h3 className="text-2xl leading-snug text-accent">{s.title}</h3>
              <p className="mt-4 type-copy text-muted">{s.text}</p>
              <p className="mt-4 font-mono text-sm text-accent">{s.author}</p>
            </div>
          ))}
        </div>

        <TextLink href="/Projects">View Case Studies</TextLink>
      </section>

      {/* ===== FAQs ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="FAQs"
          text="Find clear, concise answers about our services, processes, and how we help businesses achieve their goals."
        />

        <div className="mt-12 border-t border-line-strong">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-b border-line-strong">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg text-ink"
                >
                  {f.q}
                  <span className="text-2xl leading-none text-ink" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && <p className="pb-6 type-copy text-muted">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
