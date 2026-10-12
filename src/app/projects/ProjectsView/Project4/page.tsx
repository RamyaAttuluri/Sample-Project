import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project4: CaseStudyData = {
  id: 4,
  name: "Telecom Network Analytics & Prediction",
  title: (
    <>
      Telecom Network
      <br />
      Analytics &amp; Prediction
    </>
  ),
  tagline: "Transforming network data into actionable insights for better connectivity.",
  tags: ["Data Analytics", "Telecom", "Machine Learning", "Network Optimization"],
  image: "/Projectscount/Project4.png",

  overview:
    "A data-driven platform that analyzes telecom network performance, predicts potential network issues, and helps improve service quality using real-time and historical data.",
  details: [
    { icon: "user", label: "Role", value: "Data Engineering & Machine Learning" },
    { icon: "calendar", label: "Duration", value: "6 months" },
    { icon: "building", label: "Industry", value: "Telecom & Networking" },
    { icon: "layers", label: "Services", value: "Data Pipeline, Analytics, ML Models, Dashboard Design" },
  ],

  challenge:
    "Telecom providers face network congestion, frequent outages, and inefficient resource allocation due to massive data and lack of predictive insights.",
  challengePoints: [
    { icon: "signal", tone: "red", title: "Fragmented Data Sources", text: "Multiple Tools with no integration." },
    { icon: "database", tone: "purple", title: "Inconsistent Data Quality", text: "Missing values, duplicate records and different formats" },
    { icon: "clock", tone: "green", title: "Manual Processing", text: "Time-consuming manual data extraction and transformation." },
  ],

  solution:
    "We built an analytics platform that collects real-time network data, processes it using scalable pipelines, and applies machine learning models to predict network congestion and potential outages.",
  solutionSteps: [
    { icon: "antenna", tone: "blue", title: "Data Ingestion", text: "Collect data from towers, logs and network devices" },
    { icon: "nodes", tone: "purple", title: "Data Processing", text: "Clean, transform and store using Apache Spark" },
    { icon: "predict", tone: "orange", title: "Predictive Models", text: "ML models to predict congestion and outages" },
    { icon: "signal", tone: "green", title: "Network Optimization", text: "Provide actionable insights for better resource allocation" },
    { icon: "screen", tone: "blue", title: "Analytics Dashboard", text: "Real-time monitoring and alert system" },
  ],

  technologies: [
    { logo: "kafka", name: "Kafka", role: "Real-time Data Streaming" },
    { logo: "postgres", name: "PostgreSQL", role: "Data Storage" },
    { logo: "react", name: "React", role: "Dashboard Development" },
    { logo: "python", name: "Python", role: "Data Processing & ML" },
    { logo: "pyspark", name: "Apache Spark", role: "Big Data Processing" },
    { logo: "aws", name: "AWS", role: "Cloud Infrastructure" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "35%", text: "Reduction in network downtime" },
    { icon: "clock", tone: "orange", title: "50%", text: "Faster issue detection" },
    { icon: "trend", tone: "green", title: "20%", text: "Better resource utilization" },
    { icon: "users", tone: "blue", title: "40%", text: "Improved customer satisfaction" },
  ],
};

export const metadata: Metadata = {
  title: project4.name,
};

export default function Project4() {
  return <CaseStudy data={project4} />;
}
