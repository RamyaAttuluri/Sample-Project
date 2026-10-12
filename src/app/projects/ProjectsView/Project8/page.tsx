import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project8: CaseStudyData = {
  id: 8,
  name: "AI Document Intelligence Platform",
  title: (
    <>
      AI Document
      <br />
      Intelligence Platform
    </>
  ),
  tagline: "Automating document processing with AI for faster, smarter and more accurate information extraction.",
  tags: ["OCR", "Document Processing", "AI/ML", "Automation", "Human-in-the-Loop"],
  image: "/Projectscount/Project8.png",

  overview:
    "An AI-powered document intelligence platform that automates the extraction, classification and validation of data from various document types, reducing manual effort and improving accuracy.",
  details: [
    { icon: "user", label: "Role", value: "AI/ML & Full Stack Development" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "OCR, NLP, Document Processing, Workflow Automation" },
  ],

  challenge:
    "An AI-powered document intelligence platform that automates the extraction, classification and validation of data from various document types, reducing manual effort and improving accuracy.",
  challengePoints: [
    { icon: "file", tone: "red", title: "Diverse Document Formats", text: "Multiple document types with different layouts and structures" },
    { icon: "alert", tone: "purple", title: "Low Extraction Accuracy", text: "Manual errors and inconsistent data extraction." },
    { icon: "clock", tone: "green", title: "High Processing Time", text: "Time consuming verification and approval workflows." },
  ],

  solution:
    "We built an end-to-end document intelligence platform using OCR, NLP and machine learning to automatically extract, classify and validate data with a human-in-the-loop review process for higher accuracy.",
  solutionSteps: [
    { icon: "file", tone: "purple", title: "Document Ingestion", text: "Upload or scan documents from multiple sources" },
    { icon: "scan", tone: "orange", title: "OCR & Text Extraction", text: "Extract text and key information using AI" },
    { icon: "database", tone: "green", title: "Classification", text: "Automatically classify document type" },
    { icon: "gear", tone: "purple", title: "Data Validation", text: "Validate extracted data with business rules" },
    { icon: "users", tone: "blue", title: "Human Review", text: "Review low-confidence results with an approval workflow" },
    { icon: "link", tone: "red", title: "Integration", text: "Send data to enterprise systems via APIs" },
  ],

  technologies: [
    { logo: "docker", name: "Docker", role: "Containerization" },
    { logo: "opencv", name: "OpenCV", role: "Image Processing" },
    { logo: "postgres", name: "PostgreSQL", role: "Database" },
    { logo: "fastapi", name: "FastAPI", role: "APIs & Services" },
    { logo: "python", name: "Python", role: "Backend Development" },
    { logo: "tensorflow", name: "TensorFlow", role: "ML Models" },
    { logo: "tesseract", name: "Tesseract OCR", role: "Text Extraction" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "70%", text: "Reduction in manual effort" },
    { icon: "clock", tone: "green", title: "3X", text: "Faster document processing" },
    { icon: "check", tone: "orange", title: "98%+", text: "Extraction accuracy" },
    { icon: "chart", tone: "blue", title: "70%", text: "Lower processing cost" },
  ],
};

export const metadata: Metadata = {
  title: project8.name,
};

export default function Project8() {
  return <CaseStudy data={project8} />;
}
