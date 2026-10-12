import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project9: CaseStudyData = {
  id: 9,
  name: "AI Customer Operations Agent",
  title: (
    <>
      AI Customer
      <br />
      Operations Agent
    </>
  ),
  tagline: "Intelligent customer support with AI agents for faster, smarter and more efficient customer operations.",
  tags: ["OCR", "Document Processing", "AI/ML", "Automation", "Human-in-the-Loop"],
  image: "/Projectscount/Project9.png",

  overview:
    "An AI-powered customer operations platform designed to automate customer support, handle queries intelligently, classify tickets, and provide faster, more accurate responses using LLMs and real-time data integration.",
  details: [
    { icon: "user", label: "Role", value: "AI/ML & Full Stack Development" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "AI Agent, NLP, RAG, Ticketing System, Automation" },
  ],

  challenge:
    "The support team was overwhelmed with a high volume of customer queries, leading to delayed responses, inconsistent answers, and manual ticket handling.",
  challengePoints: [
    { icon: "chat", tone: "purple", title: "High Query Volume", text: "Thousands of daily queries across multiple channels." },
    { icon: "clock", tone: "green", title: "Delayed Response", text: "Slow resolution time due to manual handling" },
    { icon: "file", tone: "red", title: "Inconsistent Information", text: "Different responses for similar queries, causing customer dissatisfaction." },
  ],

  solution:
    "We built an AI-powered customer operations platform using LLMs, RAG and automation to handle queries, classify tickets, provide accurate responses and escalate complex issues to human agents.",
  solutionSteps: [
    { icon: "chat", tone: "orange", title: "User Query", text: "Customer asks a question via chat, email or form" },
    { icon: "robot", tone: "green", title: "Intent Detection", text: "AI detects intent and extracts key details" },
    { icon: "file", tone: "purple", title: "Relevant Answer", text: "Fetch accurate information using RAG from knowledge base" },
    { icon: "ticket", tone: "purple", title: "Ticket Handling", text: "Create, classify and assign tickets automatically" },
    { icon: "users", tone: "blue", title: "Human Escalation", text: "Escalate complex queries to human agents when needed" },
  ],

  technologies: [
    { logo: "redis", name: "Redis", role: "Caching" },
    { logo: "postgres", name: "PostgreSQL", role: "Database" },
    { logo: "fastapi", name: "FastAPI", role: "APIs & Services" },
    { logo: "python", name: "Python", role: "Backend Development" },
    { logo: "pinecone", name: "Pinecone", role: "Vector Database" },
    { logo: "langchain", name: "LangChain", role: "LLM Integration" },
    { logo: "openai", name: "OpenAI", role: "LLM Models" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "60%", text: "Faster response time" },
    { icon: "clock", tone: "green", title: "40%", text: "Reduction in support workload" },
    { icon: "check", tone: "orange", title: "95%", text: "Customer satisfaction" },
    { icon: "users", tone: "blue", title: "50%", text: "Lower operational cost" },
  ],
};

export const metadata: Metadata = {
  title: project9.name,
};

export default function Project9() {
  return <CaseStudy data={project9} />;
}
