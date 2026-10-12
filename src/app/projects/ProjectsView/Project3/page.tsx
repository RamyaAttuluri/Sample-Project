import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project3: CaseStudyData = {
  id: 3,
  name: "Enterprise Data Lake & ETL Platform",
  title: (
    <>
      Enterprise Data Lake
      <br />& ETL Platform
    </>
  ),
  tagline: "Building reliable data pipeline for scalable analytics",
  tags: ["Data Engineering", "Big Data", "ETL"],
  image: "/Projectscount/Project3.png",

  overview:
    "A scalable data engineering platform designed to collect, transform, validate, store, and prepare data from multiple sources for analytics.",
  details: [
    { icon: "user", label: "Role", value: "Data Engineering" },
    { icon: "calendar", label: "Duration", value: "Project-based" },
    { icon: "building", label: "Industry", value: "Data & Analytics" },
    { icon: "layers", label: "Services", value: "ETL/ELT, Data Pipeline, Data Processing" },
  ],

  challenge:
    "Organizations had data spread across multiple systems, with inconsistent data formats and quality issues, leading to manual processing, delayed insights, and inefficient analytics.",
  challengePoints: [
    { icon: "database", tone: "red", title: "Fragmented Data Sources", text: "Multiple Tools with no integration." },
    { icon: "file", tone: "purple", title: "Inconsistent Data Quality", text: "Missing values, duplicate records and different formats" },
    { icon: "clock", tone: "green", title: "Manual Processing", text: "Time-consuming manual data extraction and transformation." },
  ],

  solution:
    "We built a centralized data engineering platform with automated pipelines for data ingestion, orchestration, transformation, validation, and analytics-ready storage using a modern data lake architecture.",
  solutionSteps: [
    { icon: "database", tone: "blue", title: "Data Sources", text: "Databases\nAPIs | Files\nThird-party tools" },
    { icon: "airflow", tone: "purple", title: "Apache Airflow", text: "Pipeline\nOrchestration\nScheduling" },
    { icon: "pyspark", tone: "orange", title: "PySpark", text: "Data\nTransformation\nProcessing" },
    { icon: "link", tone: "green", title: "Data Validation", text: "Quality Checks\nSchema\nValidation\nError Handling" },
    { icon: "deltalake", tone: "blue", title: "Delta Lake", text: "Scalable\nStorage\nGoverned Data\nACID\nTransactions" },
    { icon: "monitor", tone: "red", title: "Analytics", text: "BI Tools\nReports\nDashboards" },
  ],

  technologies: [
    { logo: "airflow", name: "Apache Airflow", role: "Pipeline orchestration" },
    { logo: "sql", name: "SQL", role: "Data Querying & Transformations" },
    { logo: "warehouse", name: "Data Warehouse", role: "Analytics & Reporting" },
    { logo: "python", name: "Python", role: "Scripting & Processing" },
    { logo: "pyspark", name: "PySpark", role: "Distributed Data Processing" },
    { logo: "deltalake", name: "Delta Lake", role: "Data Lake Storage" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "Centralized Data", text: "Unified Data for multiple Sources." },
    { icon: "clock", tone: "orange", title: "Automated Pipelines", text: "Reliable and scheduled data processing" },
    { icon: "check", tone: "green", title: "Better Data Quality", text: "Validation and consistent data for analytics" },
    { icon: "trend", tone: "blue", title: "Scalable Foundation", text: "Clean and structured datasets for BI and reporting" },
  ],
};

export const metadata: Metadata = {
  title: project3.name,
};

export default function Project3() {
  return <CaseStudy data={project3} />;
}
