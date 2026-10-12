import type { Metadata } from "next";
import GetInTouch from "../GetInTouch/GetInTouch";
import { PageHero, SectionHeading } from "../Shared";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUs() {
  return (
    <main className="relative w-full overflow-hidden">
      <PageHero
        title="Get In Touch"
        subtitle="Let's create the future of your business together."
        intro="Whether you need consulting, development, or robust digital solutions, ABC Company is here to help."
        primary={{ label: "Contact Us", href: "#contact-form" }}
        secondary={{ label: "View Our Services", href: "/OurServices" }}
      />

      {/* ===== Contact form ===== */}
      <section id="contact-form" className="relative mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6">
        <SectionHeading
          title="Our Expertise"
          text="We specialize in delivering tailored solutions to address your business needs across these key areas:"
        />

        <ContactForm />
      </section>

      <GetInTouch />
    </main>
  );
}
