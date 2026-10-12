import type { Metadata } from "next";
import ContactUs from "../ContactUs";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function Page() {
  return <ContactUs />;
}
