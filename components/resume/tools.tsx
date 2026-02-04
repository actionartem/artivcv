"use client"

import Image from "next/image"
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
      { name: "Jira", logos: [{ src: "/logos/tools/jira.svg", alt: "Jira logo" }] },
      { name: "Confluence", logos: [{ src: "/logos/tools/confluence.svg", alt: "Confluence logo" }] },
      { name: "Notion", logos: [{ src: "/logos/tools/notion.svg", alt: "Notion logo" }] },
      { name: "Miro", logos: [{ src: "/logos/tools/miro.svg", alt: "Miro logo" }] },
      { name: "Figma", logos: [{ src: "/logos/tools/figma.svg", alt: "Figma logo" }] },
      { name: "Trello", logos: [{ src: "/logos/tools/trello.svg", alt: "Trello logo" }] },
      { name: "Asana", logos: [{ src: "/logos/tools/asana.svg", alt: "Asana logo" }] },
      { name: "YouTrack", logos: [{ src: "/logos/tools/youtrack.svg", alt: "YouTrack logo" }] },
    ],
  },
  {
    id: "analytics",
    labelRu: "Аналитика",
    labelEn: "Analytics",
    icon: BarChart3,
    tools: [
      { name: "Google Analytics", logos: [{ src: "/logos/tools/google-analytics.svg", alt: "Google Analytics logo" }] },
      { name: "Tableau", logos: [{ src: "/logos/tools/tableau.svg", alt: "Tableau logo" }] },
      { name: "DataLens", logos: [{ src: "/logos/tools/datalens.svg", alt: "DataLens logo" }] },
      { name: "SQL", logos: [{ src: "/logos/tools/sql.svg", alt: "SQL logo" }] },
      {
        name: "Excel / Google Sheets",
        logos: [
          {
            src: "/logos/tools/microsoft.svg",
            alt: "Microsoft Excel logo",
            className: "h-5 w-5",
          },
          {
            src: "/logos/tools/google-sheets.svg",
            alt: "Google Sheets logo",
            className: "h-5 w-5",
          },
        ],
      },
      { name: "Яндекс.Метрика", logos: [{ src: "/logos/tools/yandex-metrica.svg", alt: "Яндекс.Метрика logo" }] },
    ],
  },
  {
    id: "dev",
    labelRu: "Development",
    labelEn: "Development",
    icon: FileCode,
    tools: [
      { name: "GitHub", logos: [{ src: "/logos/tools/github.svg", alt: "GitHub logo" }] },
      { name: "GitLab", logos: [{ src: "/logos/tools/gitlab.svg", alt: "GitLab logo" }] },
      { name: "Bitbucket", logos: [{ src: "/logos/tools/bitbucket.svg", alt: "Bitbucket logo" }] },
      { name: "VS Code", logos: [{ src: "/logos/tools/vscode.svg", alt: "Visual Studio Code logo" }] },
      { name: "Postman", logos: [{ src: "/logos/tools/postman.svg", alt: "Postman logo" }] },
      { name: "Swagger", logos: [{ src: "/logos/tools/swagger.svg", alt: "Swagger logo" }] },
      { name: "Docker", logos: [{ src: "/logos/tools/docker.svg", alt: "Docker logo" }] },
      { name: "PostgreSQL", logos: [{ src: "/logos/tools/postgresql.svg", alt: "PostgreSQL logo" }] },
    ],
  },
  {
    id: "ai",
    labelRu: "AI Инструменты",
    labelEn: "AI Tools",
    icon: Sparkles,
    tools: [
      { name: "ChatGPT", logos: [{ src: "/logos/tools/chatgpt.svg", alt: "ChatGPT logo" }] },
      { name: "Claude", logos: [{ src: "/logos/tools/claude.svg", alt: "Claude logo" }] },
      { name: "GitHub Copilot", logos: [{ src: "/logos/tools/github-copilot.svg", alt: "GitHub Copilot logo" }] },
      { name: "Midjourney", logos: [{ src: "/logos/tools/midjourney.svg", alt: "Midjourney logo" }] },
      { name: "DALL-E", logos: [{ src: "/logos/tools/dall-e.svg", alt: "DALL-E logo" }] },
      { name: "Stable Diffusion", logos: [{ src: "/logos/tools/stable-diffusion.svg", alt: "Stable Diffusion logo" }] },
      { name: "Perplexity AI", logos: [{ src: "/logos/tools/perplexity.svg", alt: "Perplexity AI logo" }] },
      { name: "Cursor", logos: [{ src: "/logos/tools/cursor.svg", alt: "Cursor logo" }] },
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
          <div
            className={`grid gap-4 ${
              activeCategory === "analytics"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
            }`}
          >
            {currentCategory?.tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 text-center transition-all cursor-default"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="flex items-center justify-center gap-1">
                    {tool.logos.map((logo) => (
                      <Image
                        key={logo.src}
                        src={logo.src}
                        alt={logo.alt}
                        width={24}
                        height={24}
                        className={`${logo.className ?? "h-6 w-6"} object-contain`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {tool.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
