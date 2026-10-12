import CaseStudy, { type CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  id: 10,
  title: (
    <>
      AI Web Automation &amp;
      <br />
      Data Extraction Platform
    </>
  ),
  tagline: "Automating data collection from web sources with AI for faster, accurate and scalable business insights.",
  tags: ["Web Automation", "Data Extraction", "AI & NLP", "Automation", "Data Preprocessing", "Enterprise"],
  image: "/Projectscount/Project10.png",

  overview:
    "An AI-powered web automation platform designed to extract, process and structure data from multiple web sources automatically, enabling organizations to access up-to-date and reliable information.",
  details: [
    { icon: "user", label: "Role", value: "AI/ML & Backend Development" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "Web Automation, Data Extraction, Data Processing, Pipeline Development" },
  ],

  challenge:
    "Manually collecting data from multiple websites was time-consuming, error-prone and difficult to scale due to changing website structures, anti-bot mechanisms and inconsistent data formats.",
  challengePoints: [
    { icon: "globe", tone: "red", title: "Dynamic Web Pages", text: "Frequent changes in website structure and anti-bot protections." },
    { icon: "search", tone: "purple", title: "Inconsistent Data", text: "Different formats and unstructured data across various sources." },
    { icon: "database", tone: "green", title: "Manual Effort", text: "High time and human effort to collect, clean and organize data." },
  ],

  solution:
    "We developed an AI-powered automation platform using Selenium/Playwright for web automation, integrated with AI for intelligent data extraction and validation, and automated pipelines for structured data storage.",
  solutionSteps: [
    { icon: "link", tone: "blue", title: "Web Automation", text: "Automate browsing pipelines for structured data storage" },
    { icon: "file", tone: "orange", title: "Data Extraction", text: "Extract relevant data using parsing and AI models" },
    { icon: "gear", tone: "green", title: "Data Cleaning", text: "Clean, standardize and validate extracted data" },
    { icon: "database", tone: "purple", title: "Data Storage", text: "Store in database or data lake" },
    { icon: "bell", tone: "blue", title: "Monitoring & Alerts", text: "Track job status and send alerts for failures" },
  ],

  technologies: [
    { logo: "postgres", name: "PostgreSQL", role: "Database Management" },
    { logo: "playwright", name: "Playwright", role: "Web Automation" },
    { logo: "python", name: "Python", role: "Scripting & Automation" },
    { logo: "docker", name: "Docker", role: "Containerization" },
    { logo: "selenium", name: "Selenium", role: "Browser Automation" },
    { logo: "openai", name: "OpenAI", role: "Data Extraction & Parsing" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "70%", text: "Reduction in manual effort" },
    { icon: "clock", tone: "green", title: "5x", text: "Faster data collection" },
    { icon: "check", tone: "orange", title: "95%", text: "Data accuracy and reliability" },
    { icon: "users", tone: "blue", title: "100+", text: "Web sources integrated" },
  ],
};

export default function Project10() {
  return <CaseStudy data={data} />;
}
