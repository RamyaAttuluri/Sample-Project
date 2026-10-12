import GetInTouch from "./GetInTouch";
import { ProjectCard, ProjectsHero, type Project } from "./Projects";
import { SectionHeading, TextLink } from "./Shared";

/* Full project list — opened from "View More" on the Projects page. */

const projects: Project[] = [
  {
    title: "Enterprise FinTech & Compliance Platform",
    challenge:
      "Organizations handling financial and regulatory processes often work across multiple portals and internal systems. Manual data entry, repetitive verification, document preparation, and status tracking can consume significant operational time.",
    solution:
      "Developed a centralized web application that brings operational workflows into a single interface. The platform integrates frontend dashboards, backend APIs, databases, automated data collection, document workflows, and monitoring capabilities.",
    img: "/ProjectView/image27.png",
    href: "/projects/Project1",
  },
  {
    title: "SmartOps AI - Intelligent Business Automation Platform",
    challenge:
      "Many business processes require employees to repeatedly collect information, analyze data, make decisions, update systems, and communicate results.",
    solution:
      "Designed an AI-assisted operations platform where intelligent agents can execute predefined workflows while humans remain involved in approval and exception-handling stages.",
    img: "/ProjectView/image28.png",
    href: "/projects/Project2",
  },
  {
    title: "Enterprise Data Lake & ETL Platform",
    challenge:
      "Enterprise organizations often have data distributed across APIs, databases, files, and operational applications. Without a structured data pipeline, reporting and analytics become difficult and inconsistent.",
    solution:
      "Designed an ETL/ELT architecture using orchestration, distributed processing, Delta Lake storage, and warehouse-ready datasets.",
    img: "/ProjectView/image29.png",
    href: "/projects/Project3",
  },
  {
    title: "Telecom Network Analytics & Prediction",
    challenge:
      "Telecom networks generate large volumes of historical operational data. Understanding when particular nodes or network areas may experience increased demand can support better planning.",
    solution:
      "Built a data pipeline and machine-learning workflow that processes historical network information, engineers relevant features, and produces predictive insights.",
    img: "/ProjectView/image30.png",
    href: "/projects/Project4",
  },
  {
    title: "Enterprise Operations Management System",
    challenge:
      "Organizations often manage operational information across spreadsheets, emails, databases, and independent applications.",
    solution:
      "Built an enterprise application that centralizes operational workflows and provides role-based access to different users.",
    img: "/ProjectView/image31.png",
    href: "/projects/Project5",
  },
  {
    title: "FinTech Data Integration & Data Quality Platform",
    challenge:
      "Financial applications frequently consume data from different APIs, databases, files, and operational systems. Differences in formats and data quality can create downstream issues.",
    solution:
      "Created data-processing workflows capable of ingesting information from different sources and applying validation and transformation rules.",
    img: "/ProjectView/image32.png",
    href: "/projects/Project6",
  },
  {
    title: "NLP & LLM Intelligence Platform",
    challenge:
      "Traditional keyword-based search struggles when users need to understand the meaning and context of large amounts of information.",
    solution:
      "Designed an AI system capable of processing documents and user queries, retrieving relevant information, and generating context-aware responses.",
    img: "/ProjectView/image33.png",
    href: "/projects/Project7",
  },
  {
    title: "AI Document Intelligence Platform",
    challenge:
      "Organizations often receive invoices, forms, applications, certificates, and other documents in different formats. Manual extraction is repetitive and error-prone.",
    solution:
      "Built an AI-assisted document pipeline combining OCR, NLP, classification, extraction, validation, and human review.",
    img: "/ProjectView/image34.png",
    href: "/projects/Project8",
  },
  {
    title: "AI Customer Operations Agent",
    challenge:
      "Support teams spend significant time answering repetitive questions, searching internal information, categorizing requests, and routing issues.",
    solution:
      "Designed an AI agent capable of understanding customer requests, retrieving relevant information, generating responses, and routing complex cases to human employees.",
    img: "/ProjectView/image37.png",
    href: "/projects/Project9",
  },
  {
    title: "AI Web Automation & Data Extraction Platform",
    challenge:
      "Businesses often need to repeatedly collect information from websites and online systems. Manual collection can consume significant time.",
    solution:
      "Built automation workflows that navigate permitted web interfaces, collect information, parse content, validate results, and store structured data.",
    img: "/ProjectView/image40.png",
    href: "/projects/Project10",
  },
  {
    title: "AI-Assisted Verification & Human-in-the-Loop Automation",
    challenge:
      "Some business verification processes involve repetitive checks but also require human judgment when information is incomplete, ambiguous, or inconsistent.",
    solution:
      "Created a human-in-the-loop workflow where automation handles predictable processing while uncertain cases are routed to employees for review.",
    img: "/ProjectView/image39.png",
    href: "/projects/Project11",
  },
  {
    title: "Cloud-Native Kubernetes Application Platform",
    challenge:
      "As applications grow, manually managing application deployments, services, environments, and scaling becomes increasingly difficult.",
    solution:
      "Designed a containerized deployment architecture where applications are packaged into Docker containers and deployed through Kubernetes with automated CI/CD.",
    img: "/ProjectView/image38.png",
    href: "/projects/Project12",
  },
];

export default function Projectsview() {
  return (
    <main className="relative w-full overflow-hidden">
      <ProjectsHero />

      {/* ===== Featured Projects (full list) ===== */}
      <section className="relative page-container py-section">
        <SectionHeading
          title="Featured Projects"
          text="Discover how our tailored solutions have transformed businesses across industries."
        />

        <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <TextLink href="/projects">View Less</TextLink>
      </section>

      <GetInTouch />
    </main>
  );
}
