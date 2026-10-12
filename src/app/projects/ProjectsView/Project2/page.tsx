import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project2: CaseStudyData = {
  id: 2,
  name: "SmartOps AI",
  title: "SmartOps AI",
  tagline: "Intelligent Business Automation Platform",
  tags: ["AI Agents", "Automation", "Enterprise"],
  image: "/Projectscount/Project2.png",

  overview:
    "SmartOps AI is an intelligent business automation platform designed to streamline internal operations, integrate enterprise systems, and improve productivity using AI-powered workflows.",
  details: [
    { icon: "user", label: "Role", value: "Product & Engineering" },
    { icon: "calendar", label: "Duration", value: "4+ Months" },
    { icon: "building", label: "Industry", value: "Enterprise Services" },
    { icon: "layers", label: "Services", value: "AI Automation, Full Stack Development" },
  ],

  challenge:
    "Organizations were using multiple disconnected tools for different operations, leading to manual processes, data silos, repetitive tasks, and low operational efficiency.",
  challengePoints: [
    { icon: "database", tone: "red", title: "Disconnected Systems", text: "Multiple Tools with no integration." },
    { icon: "clock", tone: "purple", title: "Repetitive Manual Work", text: "Time-Consuming tasks across teams" },
    { icon: "eye", tone: "green", title: "Lack of Real-time Visibility", text: "Difficult to track operations and performance" },
  ],

  solution:
    "SmartOps AI centralizes business operations into an intelligent platform with AI agents, automated workflows, and seamless integrations to eliminate manual work and provide real-time monitoring.",
  solutionSteps: [
    { icon: "database", tone: "blue", title: "Data Integration", text: "Connect and unify data from multiple systems." },
    { icon: "chip", tone: "purple", title: "AI Agent", text: "Automate business tasks using AI agents." },
    { icon: "file", tone: "orange", title: "Workflow Automation", text: "Execute and orchestrate automated processes" },
    { icon: "link", tone: "green", title: "System Integrations", text: "Integrate with existing tools and platforms." },
    { icon: "monitor", tone: "red", title: "Real-time Monitoring", text: "Track performance and get real-time insights." },
  ],

  technologies: [
    { logo: "react", name: "React.js", role: "Frontend" },
    { logo: "node", name: "Node.js", role: "API Services" },
    { logo: "mongodb", name: "MongoDB", role: "Database" },
    { logo: "aws", name: "AWS", role: "Cloud" },
    { logo: "python", name: "Python", role: "Backend" },
    { logo: "openai", name: "OpenAI", role: "AI Agent" },
    { logo: "webhooks", name: "Webhooks", role: "Integrations" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "Centralized Operations", text: "Unified platform for financial workflows" },
    { icon: "clock", tone: "orange", title: "Reduced Manual Work", text: "Automated repetitive tasks." },
    { icon: "check", tone: "green", title: "Better Visibility", text: "Real-time tracking of compliance status" },
    { icon: "trend", tone: "blue", title: "Scalable Foundation", text: "Supports future growth and integrations." },
  ],
};

export const metadata: Metadata = {
  title: project2.name,
};

export default function Project2() {
  return <CaseStudy data={project2} />;
}
