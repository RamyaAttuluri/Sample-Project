import type { Metadata } from "next";
import Projectsview from "../../Projectsview";

export const metadata: Metadata = {
  title: "All Projects",
};

export default function Page() {
  return <Projectsview />;
}
