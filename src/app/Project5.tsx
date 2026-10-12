import CaseStudy, { type CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  id: 5,
  title: (
    <>
      Enterprise Operations
      <br />
      Management System
    </>
  ),
  tagline: "A unified platform to streamline business operations, people, processes and resources across the organization.",
  tags: ["Operation Management", "Workflow Automation", "Employee Management", "Analytics & Reporting"],
  image: "/Projectscount/Project5.png",

  overview:
    "A comprehensive operations management system designed to streamline employee management, project tracking, resource allocation, approvals and day-to-day business operations in a single, centralized platform.",
  details: [
    { icon: "user", label: "Role", value: "Full Stack Development" },
    { icon: "calendar", label: "Duration", value: "4 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "Web Application, Workflow Automation, Dashboard Design" },
  ],

  challenge:
    "The organization was managing multiple tools for HR, projects, approvals and resources, leading to data silos, delayed approvals, lack of transparency and inefficient tracking of operations.",
  challengePoints: [
    { icon: "database", tone: "red", title: "Scattered Systems", text: "Multiple tools for HR, projects, assets and approvals causing data silos." },
    { icon: "clock", tone: "green", title: "Delayed Processes", text: "Manual approvals and inefficient workflows leading to delays." },
    { icon: "users", tone: "purple", title: "Lack of Visibility", text: "No real-time tracking of operations, resources and team productivity." },
  ],

  solution:
    "We developed a unified operations management platform with role-based access, automated workflows, real-time tracking, and interactive dashboards to streamline organizational operations.",
  solutionSteps: [
    { icon: "users", tone: "blue", title: "User Management", text: "Role-based access and team structure" },
    { icon: "check", tone: "green", title: "Task & Project Management", text: "Track tasks, projects and deadlines" },
    { icon: "gear", tone: "orange", title: "Workflow Automation", text: "Automate approvals and operational processes" },
    { icon: "database", tone: "purple", title: "Resource Management", text: "Manage assets, resources and allocations" },
    { icon: "chart", tone: "blue", title: "Analytics & Reporting", text: "Real-time insights and customizable reports" },
  ],

  technologies: [
    { logo: "aws", name: "AWS", role: "Cloud Infrastructure" },
    { logo: "postgres", name: "PostgreSQL", role: "Database Management" },
    { logo: "react", name: "React", role: "Frontend Development" },
    { logo: "node", name: "Node.js", role: "Backend Development" },
    { logo: "docker", name: "Docker", role: "Containerization & Deployment" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "40%", text: "Faster approvals" },
    { icon: "clock", tone: "orange", title: "60%", text: "Improved operational efficiency" },
    { icon: "check", tone: "green", title: "30%", text: "Better resource utilization" },
    { icon: "trend", tone: "blue", title: "50%", text: "Higher team productivity" },
  ],
};

export default function Project5() {
  return <CaseStudy data={data} />;
}
