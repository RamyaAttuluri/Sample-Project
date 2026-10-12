import Image from "next/image";
import { SectionHeading } from "../Shared";

/* "Get in Touch Today" section — drop <GetInTouch /> at the bottom of any page. */

const contacts = [
  { title: "Email Us", text: "contact@abccompany.com", href: "mailto:contact@abccompany.com", img: "/Home/image10.png" },
  { title: "Call Us", text: "+1 (XXX) XXX-XXXX", href: "tel:+1XXXXXXXXXX", img: "/Home/image11.png" },
  { title: "Visit Us", text: "123, Main Road, London, UK.", href: undefined, img: "/Home/image12.png" },
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
