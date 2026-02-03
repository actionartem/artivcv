"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Wrench, Sparkles, LayoutGrid, BarChart3, FileCode } from "lucide-react"
import { useState } from "react"

const toolCategories = [
  {
    id: "pm",
    labelRu: "Product & Project",
    labelEn: "Product & Project",
    icon: LayoutGrid,
    tools: [
      "Jira", "Confluence", "Notion", "Miro", "Figma", "Trello",
      "Asana", "YouTrack"
    ],
  },
  {
    id: "analytics",
    labelRu: "Аналитика",
    labelEn: "Analytics",
    icon: BarChart3,
    tools: [
      "Google Analytics", "Mixpanel", "Tableau",
      "DataLens", "SQL", "Excel / Google Sheets",
      "Яндекс.Метрика"
    ],
  },
  {
    id: "dev",
    labelRu: "Development",
    labelEn: "Development",
    icon: FileCode,
    tools: [
      "GitHub", "GitLab", "Bitbucket", "VS Code",
      "Postman", "Swagger", "Docker", "PostgreSQL"
    ],
  },
  {
    id: "ai",
    labelRu: "AI Инструменты",
    labelEn: "AI Tools",
    icon: Sparkles,
    tools: [
      "ChatGPT", "Claude", "GitHub Copilot", "Midjourney",
      "DALL-E", "Stable Diffusion", "Perplexity AI", "Cursor"
    ],
  },
]

export function Tools() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("pm")

  const currentCategory = toolCategories.find((c) => c.id === activeCategory)

  return (
    <section id="tools" className="relative py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
          >
            <Wrench className="w-4 h-4" />
            {t("Инструменты", "Tools")}
          </motion.span>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            {t(
              "Инструменты, которые я использую для управления продуктами и проектами",
              "Tools I use for product and project management"
            )}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {toolCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {t(category.labelRu, category.labelEn)}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentCategory?.tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 text-center transition-all cursor-default"
              >
                {/* Tool Icon Placeholder */}
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-primary font-bold text-sm">
                    {tool.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {tool}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
