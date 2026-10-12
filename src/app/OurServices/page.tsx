import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GetInTouch from "../GetInTouch/GetInTouch";
import { ArrowUpRight, PageHero, SectionHeading, TextLink } from "../Shared";

export const metadata: Metadata = {
  title: "Our Services",
};

type Service = { title: string; text: string; img: string };

const services: Service[] = [
  {
    title: "Product Consulting",
    text: "Strategically position your digital products for success with actionable insights and market expertise.",
    img: "/OurService/image1.png",
  },
  {
    title: "Legacy System Migration",
    text: "Seamlessly transform outdated systems to enhance efficiency, scalability, and performance.",
    img: "/OurService/image2.png",
  },
  {
    title: "Automated Teams",
    text: "Drive productivity with fully autonomous, high-performing development teams for scalable solutions.",
    img: "/OurService/image3.png",
  },
  {
    title: "Engineering Consulting",
    text: "Overcome challenges and foster innovation with expert guidance from our engineering professionals.",
    img: "/OurService/image4.png",
  },
  {
    title: "ERP Implementation",
    text: "Deploy robust, customized ERP solutions to optimize and streamline your operations.",
    img: "/OurService/image5.png",
  },
  {
    title: "Cybersecurity Services",
    text: "Protect your digital assets with industry-leading security solutions, including comprehensive vulnerability assessments.",
    img: "/OurService/image6.png",
  },
];

/** One row of three service cards; the middle card sits a little higher, as in the design. */
function ServiceRow({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
      {items.map((item, i) => (
        <div key={item.title} className={i === 1 ? "lg:-mt-6" : "lg:mt-6"}>
          <div className="relative aspect-[5/4] w-full">
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <h3 className="mt-6 text-2xl text-accent">{item.title}</h3>
          <p className="mt-3 type-copy text-muted">{item.text}</p>
          <Link href="/Contact" className="mt-4 inline-flex items-center gap-2 font-mono text-2xs text-muted hover:text-hover">
            Learn More <ArrowUpRight />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function OurService() {
  return (
    <main className="relative w-full overflow-hidden">
      <PageHero
        title="Our Services"
        subtitle="Transforming Businesses with Tailored Engineering Solutions"
        intro="From startups to multinational enterprises, our services are designed to address your unique challenges and help you achieve measurable success."
        secondary={{ label: "View Our Services", href: "#our-expertise" }}
      />

      {/* ===== Our Expertise ===== */}
      <section id="our-expertise" className="relative page-container scroll-mt-8 py-section">
        <SectionHeading
          title="Our Expertise"
          text="We specialize in delivering tailored solutions to address your business needs across these key areas:"
        />

        <div className="mt-16">
          <ServiceRow items={services.slice(0, 3)} />
        </div>

        <TextLink href="/Contact">Get a consultation</TextLink>

        <div className="mt-16">
          <ServiceRow items={services.slice(3)} />
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
