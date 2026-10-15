import Image from "next/image";
import { SectionHeading } from "../Shared";

/* "Get in Touch Today" section — drop <GetInTouch /> at the bottom of any page. */

const contacts = [
  { title: "Email Us", text: "ganeshsamineni@ggstinnovations.com", href: "mailto:ganeshsamineni@ggstinnovations.com", img: "/Home/image10.png" },
  { title: "Call Us", text: "+91 99080 54038", href: "tel:+919908054038", img: "/Home/image11.png" },
  { title: "Visit Us", text: "4th Floor, MPR Arcade, \nMadhapur, Hyderabad", href: undefined, img: "/Home/image12.png" },
];

export default function GetInTouch() {
  return (
    <section className="relative page-container py-section">
      <SectionHeading
        title="Get in Touch Today"
        text="Let's create the future of your business together. Whether you need consulting, development, or robust digital solutions, ABC Company is here to help."
      />

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {contacts.map((c) => (
          <div key={c.title}>
            <div className="relative aspect-[6/5] w-full">
              <Image src={c.img} alt={c.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
            </div>
            <h3 className="mt-6 text-2xl text-accent">{c.title}</h3>
            {c.href ? (
              <a href={c.href} className="mt-3 block font-mono text-sm text-muted hover:text-hover">
                {c.text}
              </a>
            ) : (
              <p className="mt-3 font-mono text-sm text-muted">{c.text}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
