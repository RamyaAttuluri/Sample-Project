import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project1: CaseStudyData = {
  id: 1,
  name: "Enterprise FinTech & Compliance Platform",
  title: (
    <>
      Enterprise FinTech
      <br />& Compliance Platform
    </>
  ),
  tagline: "Building Smarter financial workflow through automation and integrated systems.",
  tags: ["FinTech", "Automation", "Enterprise"],
  image: "/Projectscount/Project1.png",

  overview:
    "A full-stack enterprise platform designed to simplify financial and regulatory operation through centralized dashboards, data processing, authorized integrations, workflow automation, and compliance monitoring",
  details: [
    { icon: "user", label: "Role", value: "Product & Engineering" },
    { icon: "calendar", label: "Duration", value: "6+ Months" },
    { icon: "building", label: "Industry", value: "Financial Services" },
    { icon: "layers", label: "Services", value: "Full Stack Development" },
  ],

  challenge:
    "Organizations handling financial and regulatory processes often work across multiple portals and internal systems, leading to manual data entry, repetitive verification, and limited visibility.",
  challengePoints: [
    { icon: "file", tone: "red", title: "Multiple Portals", text: "Data spread across different government and internal systems" },
    { icon: "layers", tone: "purple", title: "Manual processes", text: "Repetitive data entry and document preparation" },
    { icon: "eye", tone: "green", title: "Lack of Visibility", text: "Difficult to track status and maintain accurate records." },
  ],

  solution:
    "We developed a centralized web application that integrates dashboards, APIs, data processing, document workflows, and monitoring capabilities into a single interface.",
  solutionSteps: [
    { icon: "database", tone: "blue", title: "Data Collection", text: "Collect data from multiple sources and portals." },
    { icon: "gear", tone: "purple", title: "Processing", text: "Automate data validation and processing." },
    { icon: "file", tone: "orange", title: "Workflow", text: "Route tasks and approvals automatically." },
    { icon: "shield", tone: "green", title: "Compliance", text: "Ensure regulatory compliance with real-time tracking and reports." },
  ],

  technologies: [
    { logo: "react", name: "React.js", role: "Frontend" },
    { logo: "node", name: "Node.js", role: "Backend" },
    { logo: "mongodb", name: "MongoDB", role: "Database" },
    { logo: "aws", name: "AWS", role: "Cloud" },
    { logo: "python", name: "Python", role: "Automation" },
    { logo: "api", name: "REST APIs", role: "Integrations" },
  ],

  impact: [
    { icon: "bolt", tone: "purple", title: "Centralized Operations", text: "Unified platform for financial workflows" },
    { icon: "chart", tone: "orange", title: "Reduced Manual Work", text: "Automated repetitive tasks." },
    { icon: "eye", tone: "green", title: "Better Visibility", text: "Real-time tracking of compliance status" },
    { icon: "expand", tone: "blue", title: "Scalable Foundation", text: "Supports future growth and integrations." },
  ],
};

export const metadata: Metadata = {
  title: project1.name,
};

export default function Project1() {
  return <CaseStudy data={project1} />;
}
