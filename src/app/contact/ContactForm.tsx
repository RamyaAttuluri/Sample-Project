"use client";

import { useState, type FormEvent } from "react";
import { ChevronsRight, Hatch } from "../Shared";

const services = [
  "Digital Engineering",
  "Enterprise Solutions",
  "AI, Data & Automation",
  "Business operations & BPO",
  "ODC & Dedicated Teams",
  "Workforce & Staffing",
];

const field =
  "mt-2 w-full border border-line-input bg-transparent px-3 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-focus";
const label = "font-mono text-xs text-ink";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send the form data to your backend / email service here.
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-12 grid max-w-4xl gap-x-6 gap-y-7 sm:grid-cols-2">
      <Hatch className="left-[30%] top-10 hidden h-10 w-16 md:block" />
      <Hatch className="right-[25%] top-0 hidden h-8 w-14 md:block" />

      <label className={label}>
        First Name
        <input name="firstName" required autoComplete="given-name" className={field} />
      </label>
      <label className={label}>
        Last Name
        <input name="lastName" required autoComplete="family-name" className={field} />
      </label>

      <label className={label}>
        Service
        <div className="relative">
          <select name="service" required defaultValue="" className={`${field} appearance-none pr-10 invalid:text-muted`}>
            <option value="" disabled>
              Select Service
            </option>
            {services.map((s) => (
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </label>
      <label className={label}>
        Budget
        <input name="budget" className={field} />
      </label>

      <label className={`${label} sm:col-span-2`}>
        Subject
        <input name="subject" required className={field} />
      </label>

      <label className={`${label} sm:col-span-2`}>
        Message
        <textarea name="message" required rows={7} className={`${field} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          className="flex items-center gap-3 btn-primary"
        >
          Send Message
          <ChevronsRight />
        </button>
        {sent && (
          <p role="status" className="font-mono text-sm text-accent">
            Thank you! We&apos;ll get back to you soon.
          </p>
        )}
      </div>
    </form>
  );
}
