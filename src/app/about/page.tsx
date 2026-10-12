import type { Metadata } from "next";
import Image from "next/image";
import GetInTouch from "../GetInTouch/GetInTouch";
import { Hatch, PageHero, SectionHeading, TextLink } from "../Shared";

export const metadata: Metadata = {
  title: "About Us",
};

const timeline = [
  {
    year: "2025",
    title: "The Beginning",
    text: "GGST Innovations was established with a vision to build a diversified technology company driven by innovations, engineering, and digital transformation.",
  },
  {
    year: "2026",
    title: "Expanding Expertise",
    text: "Expanded into key business units across Digital Engineering, AI data & Automation, Cloud & Infrastructure, Enterprise Solutions, and Product & Design",
  },
  {
    year: "2027",
    title: "National Scale",
    text: "Our next phase focuses on expanding our presence across India, strengthening delivery capabilities, and building large technology teams to serve businesses across industries",
  },
  {
    year: "2020",
    title: "Global Enterprise",
    text: "GGST aims to expand its global footprint with international offices and stronger partnerships across markets including the USA, Europe, and the Middle East",
  },
  {
    year: "2021",
    title: "Industry Leadership",
    text: "Our long term vision is to become a globally recognised technology enterprise, delivering innovative digital products, AI powered solutions, cloud service, and enterprise technology at scale.",
  },
];

const values = [
  { title: "Innovation", text: "Pioneering solutions tailored to your unique needs.", img: "/AboutUs/image13.png" },
  { title: "Reliability", text: "Delivering on promises with precision and excellence.", img: "/AboutUs/image14.png" },
  { title: "Collaboration", text: "Partnering with clients to achieve shared success.", img: "/AboutUs/image15.png" },
  { title: "Integrity", text: "Building trust through transparency and accountability.", img: "/AboutUs/image16.png" },
];

const team = [
  { name: "Timothy Franey", role: "Co-Founder, ABC Company", img: "/AboutUs/image17.png" },
  { name: "Sandy Buckridge", role: "Co-Founder, ABC Company", img: "/AboutUs/image18.png" },
  { name: "Carroll Keeling", role: "Co-Founder, ABC Company", img: "/AboutUs/image19.png" },
  { name: "Johanna Kassulke", role: "Co-Founder, ABC Company", img: "/AboutUs/image20.png" },
  { name: "Leslie Willms", role: "Co-Founder, ABC Company", img: "/AboutUs/image21.png" },
];

const perks = [
  {
    title: "Inclusive Environment",
    text: "We celebrate diversity and foster a culture of respect and collaboration",
    img: "/AboutUs/image22.png",
  },
  {
    title: "Flexible Work Options",
    text: "Work remotely, on-site, or in a hybrid setup that suits your lifestyle.",
    img: "/AboutUs/image23.png",
  },
  {
    title: "Recognition & Rewards",
    text: "Your contributions are valued, and we celebrate achievements big and small.",
    img: "/AboutUs/image24.png",
  },
];

export default function AboutUs() {
  return (
    <main className="relative w-full overflow-hidden">
      <PageHero
        title="About Us"
        subtitle="Driving Innovation, Empowering Businesses Worldwide"
        intro="At ABC Company, we are more than just a service provider—we're your trusted partner in engineering success. With decades of experience and a commitment to excellence, we deliver tailored solutions that help businesses, from startups to global enterprises, achieve their goals."
      />

      {/* ===== Our Story (timeline) ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Our Story"
          text="From a growing Technology company to diversified global enterprise. GGSt Innovations is building a technology ecosystem where multiple business units work together to create scalable digital products, intelligent solutions, enterprise platforms, and technology services."
        />

        <div className="relative mt-12">
          {/* vertical line: left edge on mobile, centre on desktop */}
          <div className="absolute top-0 bottom-0 left-4 w-rule bg-accent md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <Hatch className="left-[18%] top-24 hidden h-24 w-20 md:block" />
          <Hatch className="left-[68%] top-0 hidden h-20 w-16 md:block" />

          {timeline.map((item, i) => {
            const right = i % 2 === 0;
            return (
              <div key={item.title} className="relative grid py-6 md:grid-cols-2">
                <div
                  className={`relative pl-24 ${
                    right ? "md:col-start-2 md:pl-24" : "md:col-start-1 md:pl-0 md:pr-24 md:text-right"
                  }`}
                >
                  {/* tick + year sitting against the line */}
                  <div
                    className={`absolute top-12 left-4 flex items-center gap-2 font-mono text-xs text-accent ${
                      right ? "md:left-0" : "md:left-auto md:right-0 md:flex-row-reverse"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="h-rule w-3 bg-accent" />
                    <span>{item.year}</span>
                    <span className="h-rule w-4 bg-accent" />
                  </div>

                  <div className={`max-w-xs ${right ? "" : "md:ml-auto"}`}>
                    <h3 className="text-2xl text-accent">{item.title}</h3>
                    <p className="mt-3 type-copy text-muted">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== What We Stand For ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="What We Stand For"
          text="Our unwavering values shape our approach to delivering impactful solutions."
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title}>
              <div className="relative aspect-[6/5] w-full">
                <Image src={v.img} alt={v.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-contain" />
              </div>
              <h3 className="mt-6 text-2xl text-accent">{v.title}</h3>
              <p className="mt-3 type-copy text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Meet Our Team ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Meet Our Team"
          text="Our global team of experienced engineers, consultants, and project managers is the backbone of ABC Company. With a shared passion for problem-solving and innovation, we're dedicated to delivering exceptional results for every client."
        />

        {/* 2 people centred on the first row, 3 on the second */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-6 md:gap-x-10 md:gap-y-20">
          {team.map((m, i) => (
            <div key={m.name} className={`md:col-span-2 ${i === 0 ? "md:col-start-2" : ""}`}>
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden">
                <Image src={m.img} alt={m.name} fill sizes="(min-width: 768px) 280px, 50vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-xl text-accent">{m.name}</h3>
              <p className="mt-2 font-mono text-xs text-muted">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Join Us ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Join Us"
          text="Looking for a career where you can innovate and make an impact? ABC Company is always on the lookout for passionate individuals to join our growing team."
        />

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-3 md:items-start">
          {perks.map((p, i) => (
            <div key={p.title} className={i === 1 ? "md:-mt-8" : "md:mt-8"}>
              <div className="relative aspect-square w-full">
                <Image src={p.img} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
              </div>
              <h3 className="mt-6 text-2xl text-accent">{p.title}</h3>
              <p className="mt-3 type-copy text-muted">{p.text}</p>
              {i === 1 && (
                <div className="hidden md:block">
                  <TextLink href="#">Join our team</TextLink>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <TextLink href="#">Join our team</TextLink>
        </div>
      </section>

      {/* ===== Quote ===== */}
      <section className="relative page-container py-24 text-center">
        <Hatch className="left-[15%] bottom-16 hidden h-24 w-20 md:block" />
        <Hatch className="right-[25%] bottom-20 hidden h-24 w-20 md:block" />
        <blockquote className="relative mx-auto max-w-4xl text-3xl leading-snug tracking-tight text-ink sm:text-5xl">
          “Our focus is on creating products and services that empower businesses, streamline operations, and foster
          growth in the digital era.”
        </blockquote>
        <p className="relative mt-10 type-caption text-accent">
          Panduka Weerasekara
          <br />
          Co-Founder, ABC Company.
        </p>
      </section>

      <GetInTouch />
    </main>
  );
}
