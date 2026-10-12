import type { Metadata } from "next";
import CaseStudy, { type CaseStudyData } from "../CaseStudy";

const project6: CaseStudyData = {
  id: 6,
  name: "FinTech Data Integration & Data Quality Platform",
  title: (
    <>
      FinTech Data Integration &amp;
      <br />
      Data Quality Platform
    </>
  ),
  tagline: "Unifying financial data from multiple sources with automated data pipelines, validation and real-time quality checks.",
  tags: ["FinTech", "Automation", "Data Engineering", "Data Quality"],
  image: "/Projectscount/Project6.png",

  overview:
    "A data integration and data quality platform designed for financial organizations to collect, transform, validate and synchronize data from multiple sources such as banks, payment gateways, credit bureaus and internal systems.",
  details: [
    { icon: "user", label: "Role", value: "Data Engineering & Backend Development" },
    { icon: "calendar", label: "Duration", value: "5 Months" },
    { icon: "building", label: "Industry", value: "FinTech" },
    { icon: "layers", label: "Services", value: "Data Integration, ETL, Data Quality, Real-time Processing" },
  ],

  challenge:
    "Financial data was scattered across multiple sources with different formats, inconsistent data quality and manual processing, leading to delays, data mismatches and compliance risks.",
  challengePoints: [
    { icon: "database", tone: "red", title: "Multiple Data Sources", text: "Data from banks, payment gateways, credit bureaus and internal systems." },
    { icon: "file", tone: "purple", title: "Inconsistent Data Quality", text: "Missing values, duplicate records and different data formats." },
    { icon: "clock", tone: "green", title: "Manual Processing", text: "Time-consuming reconciliations and lack of real-time insights." },
  ],

  solution:
    "We built a centralized data integration platform with automated pipelines, data validation and real-time monitoring to ensure high-quality, consistent and compliant financial data.",
  solutionSteps: [
    { icon: "database", tone: "blue", title: "Data Ingestion", text: "Collect data from APIs, files and databases" },
    { icon: "gear", tone: "orange", title: "Data Transformation", text: "Clean, standardize and transform using PySpark" },
    { icon: "check", tone: "green", title: "Data Validation", text: "Run quality checks, rule-based validation and anomaly detection" },
    { icon: "file", tone: "purple", title: "Data Storage", text: "Store in Data Lake and Data Warehouse" },
    { icon: "chart", tone: "blue", title: "Analytics & Reports", text: "Real-time dashboards and regulatory reports" },
  ],

  technologies: [
    { logo: "airflow", name: "Apache Airflow", role: "Workflow Orchestration" },
    { logo: "aws", name: "AWS", role: "Cloud Infrastructure" },
    { logo: "postgres", name: "PostgreSQL", role: "Database Storage" },
    { logo: "deltalake", name: "Delta Lake", role: "Data Lake Storage" },
    { logo: "python", name: "Python", role: "Scripting & Processing" },
    { logo: "pyspark", name: "PySpark", role: "Data Transformation" },
  ],

  impact: [
    { icon: "chart", tone: "purple", title: "50%", text: "Reduction in manual effort" },
    { icon: "clock", tone: "green", title: "3X", text: "Faster data availability" },
    { icon: "check", tone: "orange", title: "99%+", text: "Data accuracy and consistency" },
    { icon: "chart", tone: "blue", title: "Better", text: "Regulatory compliance" },
  ],
};

export const metadata: Metadata = {
  title: project6.name,
};

export default function Project6() {
  return <CaseStudy data={project6} />;
}
