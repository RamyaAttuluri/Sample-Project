import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project12: CaseStudyData = {
  id: 12,
  name: "Cloud-Native Kubernetes Application Platform",
  title: (
    <>
      Cloud-Native
      <br />
      Kubernetes Application
      <br />
      Platform
    </>
  ),
  tagline: "A scalable, secure and automated platform for deploying and managing enterprise applications on Kubernetes.",
  tags: ["Docker", "Kubernetes", "Cloud Deployment", "Infrastructure Automation", "Enterprise", "CI/CD"],
  image: "/Projectscount/Project12.png",

  overview:
    "A cloud-native platform to build, deploy and manage containerized applications using Kubernetes, enabling scalable, reliable and secure infrastructure for enterprise workloads.",
  details: [
    { icon: "user", label: "Role", value: "DevOps & Cloud Engineering" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "Enterprise Solutions" },
    { icon: "layers", label: "Services", value: "Docker, Kubernetes, Cloud Deployment, CI/CD, Infrastructure Automation" },
  ],

  challenge:
    "Manual deployments, environment inconsistencies and lack of scalability were causing frequent downtime and high operational effort across multiple applications and environments.",
  challengePoints: [
    { icon: "gear", tone: "red", title: "Manual Deployment", text: "Time-consuming and error-prone manual deployment process." },
    { icon: "grid", tone: "purple", title: "Environment Issues", text: "Inconsistent environments across development, staging and production." },
    { icon: "chart", tone: "green", title: "Scalability & Downtime", text: "Difficulty in scaling applications and frequent downtime during updates." },
  ],

  solution:
    "We built a cloud-native platform using Docker, Kubernetes and CI/CD pipelines to automate deployments, manage infrastructure and ensure high availability and scalability.",
  solutionSteps: [
    { icon: "cube", tone: "purple", title: "Containerization", text: "Containerize applications using Docker" },
    { icon: "gear", tone: "orange", title: "Kubernetes Orchestration", text: "Deploy and manage containers using Kubernetes" },
    { icon: "pipeline", tone: "green", title: "CI/CD Pipeline", text: "Automate build, test and deployment using GitHub Actions" },
    { icon: "cloud", tone: "purple", title: "Cloud Deployment", text: "Deploy on AWS with available and secure infrastructure" },
    { icon: "screen", tone: "blue", title: "Monitoring & Alerts", text: "Monitor performance and set up alerts for reliability" },
  ],

  technologies: [
    { logo: "githubactions", name: "GitHub Actions", role: "CI/CD" },
    { logo: "terraform", name: "Terraform", role: "Infrastructure as Code" },
    { logo: "docker", name: "Docker", role: "Containerization" },
    { logo: "grafana", name: "Grafana", role: "Visualization" },
    { logo: "prometheus", name: "Prometheus", role: "Monitoring" },
    { logo: "kubernetes", name: "Kubernetes", role: "Orchestration" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "70%", text: "Faster deployment" },
    { icon: "clock", tone: "green", title: "99.8%", text: "Uptime achieved" },
    { icon: "check", tone: "orange", title: "50%", text: "Reduction in operational effort" },
    { icon: "users", tone: "blue", title: "3X", text: "Better scalability" },
  ],
};

export const metadata: Metadata = {
  title: project12.name,
};

export default function Project12() {
  return <CaseStudy data={project12} />;
}
