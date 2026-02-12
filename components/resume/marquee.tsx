"use client"

import { motion } from "framer-motion"

const keywords = [
  "Product Management",
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
  "GTM Strategy",
  "Stakeholders",
  "Cross-functional",
  "Product Vision",
  "Value Proposition",
  "Customer Journey",
  "Analytics",
  "Metrics",
  "Prioritization",
  "Product Strategy",
  "Feature Development",
  "GenAI",
  "LLM",
  "Prompt Engineering",
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
    <div className="relative overflow-hidden py-6 bg-secondary/30 border-y border-border">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap animate-marquee"
        style={{ width: "fit-content" }}
      >
        {[...keywords, ...keywords].map((keyword, index) => (
          <span
            key={`${keyword}-${index}`}
            className="text-sm font-mono text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
          >
            {keyword}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
