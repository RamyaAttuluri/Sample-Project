import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project7: CaseStudyData = {
  id: 7,
  name: "NLP & LLM Intelligence Platform",
  title: (
    <>
      NLP &amp; LLM
      <br />
      Intelligence Platform
    </>
  ),
  tagline: "Unlocking the power of enterprise knowledge with AI-driven search, automation and intelligent insights.",
  tags: ["NLP", "Large Language Model", "RAG", "Data Engineering"],
  image: "/Projectscount/Project7.png",

  overview:
    "An AI-powered platform that leverages NLP and Large Language Models to help organizations search, analyze and extract insights from their enterprise data including documents, reports, and internal knowledge bases.",
  details: [
    { icon: "user", label: "Role", value: "AI/ML & Backend Development" },
    { icon: "calendar", label: "Duration", value: "6 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "NLP, LLM Integration, RAG, Document Processing, AI Agents" },
  ],

  challenge:
    "Organizations had large volumes of unstructured data spread across documents, emails, and internal systems, making it difficult to find accurate information, generate insights, and improve productivity.",
  challengePoints: [
    { icon: "file", tone: "red", title: "Unstructured Data", text: "Data from banks, payment gateways, credit bureaus and internal systems." },
    { icon: "search", tone: "purple", title: "Poor Search", text: "Missing values, duplicate records and different data formats." },
    { icon: "clock", tone: "green", title: "Time Consuming", text: "Time-consuming reconciliations and lack of real-time insights." },
  ],

  solution:
    "We developed an NLP and LLM-powered platform using RAG (Retrieval Augmented Generation) to enable natural language search, document understanding and intelligent insights with source references.",
  solutionSteps: [
    { icon: "file", tone: "purple", title: "Document Ingestion", text: "Upload documents from multiple sources" },
    { icon: "chat", tone: "orange", title: "Text Processing", text: "Extract, chunk and create embeddings" },
    { icon: "database", tone: "green", title: "Vector Search", text: "Store in vector DB for semantic search" },
    { icon: "chip", tone: "purple", title: "LLM & RAG", text: "Generate accurate responses with source references" },
    { icon: "chart", tone: "blue", title: "Insights & Actions", text: "Provide summaries, reports and automation workflows" },
  ],

  technologies: [
    { logo: "docker", name: "Docker", role: "Containerization" },
    { logo: "openai", name: "OpenAI", role: "LLM Models" },
    { logo: "postgres", name: "PostgreSQL", role: "Data Storage" },
    { logo: "fastapi", name: "FastAPI", role: "APIs & Services" },
    { logo: "python", name: "Python", role: "Backend Development" },
    { logo: "pinecone", name: "Pinecone", role: "Vector Database" },
    { logo: "langchain", name: "LangChain", role: "LLM Integration" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "60%", text: "Faster information access" },
    { icon: "clock", tone: "green", title: "40%", text: "Increase in team productivity" },
    { icon: "check", tone: "orange", title: "80%", text: "Reduction in manual effort" },
    { icon: "chart", tone: "blue", title: "70%", text: "Improved decision making with accurate insights" },
  ],
};

export const metadata: Metadata = {
  title: project7.name,
};

export default function Project7() {
  return <CaseStudy data={project7} />;
}
