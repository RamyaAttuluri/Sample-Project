import type { Metadata } from "next";
import OurService from "../OurService";

export const metadata: Metadata = {
  title: "Our Services",
};

export default function Page() {
  return <OurService />;
}
