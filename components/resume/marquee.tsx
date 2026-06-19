"use client"

import { motion } from "framer-motion"

const keywords = [
  "IT Project Management",
  "Roadmap",
  "Backlog",
  "Sprint",
  "Agile",
  "Scrum",
  "Discovery",
  "Delivery",
  "B2B",
  "B2C",
  "KPI",
  "OKR",
  "User Stories",
  "ITSM",
  "Release",
  "MVP",
  "A/B Testing",
  "Retention",
  "Conversion",
  "Risk Management",
  "Stakeholders",
  "Cross-functional",
  "Project Governance",
  "Value Proposition",
  "Customer Journey",
  "Analytics",
  "Metrics",
  "Prioritization",
  "Product Strategy",
  "Feature Development",
  "GenAI",
  "LLM",
  "Release Management",
  "RAG",
  "AI Agents",
  "AI Automation",
  "Multimodal AI",
  "Vector Search",
  "Fine-tuning",
  "AI Copilot",
]

export function Marquee() {
  return (
    <div className="resume-marquee">
      {/* Gradient masks */}
      <div className="resume-marquee__fade resume-marquee__fade--left" />
      <div className="resume-marquee__fade resume-marquee__fade--right" />
      
      <motion.div
        className="resume-marquee__track animate-marquee"
        style={{ width: "fit-content" }}
      >
        {[...keywords, ...keywords].map((keyword, index) => (
          <span
            key={`${keyword}-${index}`}
            className="resume-marquee__item"
          >
            {keyword}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
