import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project11: CaseStudyData = {
  id: 11,
  name: "AI-Assisted Verification & Human-in-the-Loop Automation",
  title: (
    <>
      AI-Assisted Verification &amp;
      <br />
      Human-in-the-Loop
      <br />
      Automation
    </>
  ),
  tagline: "Combining AI and human expertise for high-accuracy data verification, validation and processing.",
  tags: ["OCR", "Data Validation", "Human-in-the-Loop", "Automation", "AI/ML", "Enterprise"],
  image: "/Projectscount/Project11.png",

  overview:
    "An AI-assisted verification platform that extracts, validates and verifies data from various documents, with a human-in-the-loop review process to ensure high accuracy and compliance.",
  details: [
    { icon: "user", label: "Role", value: "AI/ML & Full Stack Development" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "OCR, Data Validation, Human-in-the-Loop, Automation" },
  ],

  challenge:
    "Manual verification of documents was time-consuming, error-prone and lacked consistency, especially for complex or low-quality documents, leading to delays, compliance risks and operational inefficiencies.",
  challengePoints: [
    { icon: "file", tone: "red", title: "Document Variation", text: "Multiple formats, layouts and low-quality scans." },
    { icon: "search", tone: "purple", title: "Low Extraction Accuracy", text: "Errors in extracted data required manual verification." },
    { icon: "clock", tone: "green", title: "High Processing Time", text: "Manual verification was slow and resource-intensive." },
  ],

  solution:
    "We built an AI-assisted verification platform using OCR and machine learning to extract and validate data, with a human-in-the-loop system for low-confidence cases, ensuring high accuracy and compliance.",
  solutionSteps: [
    { icon: "file", tone: "purple", title: "Document Ingestion", text: "Upload documents in multiple formats" },
    { icon: "scan", tone: "orange", title: "OCR & Data Extraction", text: "Extract text and key data using AI" },
    { icon: "check", tone: "green", title: "AI Validation", text: "Validate data with rule-based and ML models" },
    { icon: "users", tone: "purple", title: "Human Review", text: "Low-confidence cases sent for manual verification" },
    { icon: "database", tone: "blue", title: "Final Output", text: "Store verified data and send to downstream systems" },
  ],

  technologies: [
    { logo: "postgres", name: "PostgreSQL", role: "Database" },
    { logo: "python", name: "Python", role: "Backend Development" },
    { logo: "docker", name: "Docker", role: "Containerization" },
    { logo: "tesseract", name: "Tesseract OCR", role: "Text Extraction" },
    { logo: "tensorflow", name: "TensorFlow", role: "ML Models" },
    { logo: "opencv", name: "OpenCV", role: "Image Processing" },
    { logo: "fastapi", name: "FastAPI", role: "APIs & Services" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "75%", text: "Reduction in manual effort" },
    { icon: "clock", tone: "green", title: "3x", text: "Faster data processing" },
    { icon: "check", tone: "orange", title: "98%", text: "Data accuracy and reliability" },
    { icon: "users", tone: "blue", title: "60%", text: "Lower operational cost" },
  ],
};

export const metadata: Metadata = {
  title: project11.name,
};

export default function Project11() {
  return <CaseStudy data={project11} />;
}
