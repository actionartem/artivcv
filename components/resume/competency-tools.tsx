"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ProjectMatrixBackground } from "./project-matrix-background"

type ToolLogo = { src: string; alt: string; className?: string }
type Tool = { name: string; nameEn?: string; logos?: ToolLogo[] }
type Domain = {
  id: string
  index: string
  titleRu: string
  titleEn: string
  descriptionRu: string
  descriptionEn: string
  competenciesRu: string[]
  competenciesEn: string[]
  tools: Tool[]
}

const domains: Domain[] = [
  {
    id: "product",
    index: "01",
    titleRu: "Product & Project",
    titleEn: "Product & Project",
    descriptionRu: "Формирую видение, собираю требования и превращаю их в управляемый roadmap и backlog.",
    descriptionEn: "I shape the vision, collect requirements, and turn them into a manageable roadmap and backlog.",
    competenciesRu: ["Product vision и discovery", "Roadmap и приоритизация", "B2B, пресейлы и стейкхолдеры"],
    competenciesEn: ["Product vision and discovery", "Roadmap and prioritization", "B2B, presales, and stakeholders"],
    tools: [
      { name: "Jira", logos: [{ src: "/logos/tools/jira.svg", alt: "Jira logo" }] },
      { name: "Confluence", logos: [{ src: "/logos/tools/confluence.svg", alt: "Confluence logo" }] },
      { name: "Notion", logos: [{ src: "/logos/tools/notion.svg", alt: "Notion logo" }] },
      { name: "Miro", logos: [{ src: "/logos/tools/miro.svg", alt: "Miro logo" }] },
      { name: "Figma", logos: [{ src: "/logos/tools/figma.svg", alt: "Figma logo" }] },
      { name: "YouTrack", logos: [{ src: "/logos/tools/youtrack.svg", alt: "YouTrack logo" }] },
      { name: "Trello", logos: [{ src: "/logos/tools/trello.svg", alt: "Trello logo" }] },
      { name: "Asana", logos: [{ src: "/logos/tools/asana.svg", alt: "Asana logo" }] },
    ],
  },
  {
    id: "analytics",
    index: "02",
    titleRu: "Аналитика & Growth",
    titleEn: "Analytics & Growth",
    descriptionRu: "Работаю с метриками, воронками и данными, чтобы находить точки роста и проверять гипотезы.",
    descriptionEn: "I use metrics, funnels, and data to find growth opportunities and validate hypotheses.",
    competenciesRu: ["Продуктовые метрики", "Гипотезы и критерии успеха", "SQL, отчётность и визуализация"],
    competenciesEn: ["Product metrics", "Hypotheses and success criteria", "SQL, reporting, and visualization"],
    tools: [
      { name: "Google Analytics", logos: [{ src: "/logos/tools/google-analytics.svg", alt: "Google Analytics logo" }] },
      { name: "Tableau", logos: [{ src: "/logos/tools/tableau.svg", alt: "Tableau logo" }] },
      { name: "DataLens", logos: [{ src: "/logos/tools/datalens.svg", alt: "DataLens logo" }] },
      { name: "SQL", logos: [{ src: "/logos/tools/sql.svg", alt: "SQL logo" }] },
      {
        name: "Excel / Google Sheets",
        logos: [
          { src: "/logos/tools/microsoft.svg", alt: "Microsoft Excel logo", className: "is-small" },
          { src: "/logos/tools/google-sheets.svg", alt: "Google Sheets logo", className: "is-small" },
        ],
      },
      { name: "Яндекс.Метрика", nameEn: "Yandex Metrica", logos: [{ src: "/logos/tools/yandex-metrica.svg", alt: "Яндекс.Метрика logo" }] },
      { name: "Power BI", logos: [{ src: "/logos/tools/power-bi.svg", alt: "Логотип Power BI" }] },
      { name: "Amplitude", logos: [{ src: "/logos/tools/amplitude.svg", alt: "Логотип Amplitude" }] },
    ],
  },
  {
    id: "delivery",
    index: "03",
    titleRu: "Delivery & Tech",
    titleEn: "Delivery & Tech",
    descriptionRu: "Координирую разработку, тестирование и эксплуатацию - от постановки задачи до production.",
    descriptionEn: "I coordinate development, testing, and operations from task definition to production.",
    competenciesRu: ["Кросс-функциональные команды", "Релизы, качество и риски", "API, интеграции и технический контур"],
    competenciesEn: ["Cross-functional teams", "Releases, quality, and risks", "APIs, integrations, and technical landscape"],
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
    index: "04",
    titleRu: "AI & Automation",
    titleEn: "AI & Automation",
    descriptionRu: "Проектирую AI-ассистентов и агентные сценарии для аналитики, документации и операций.",
    descriptionEn: "I design AI assistants and agent workflows for analytics, documentation, and operations.",
    competenciesRu: ["AI-ассистенты и агенты", "Локальные модели и безопасный контур", "Автоматизация аналитики и документов"],
    competenciesEn: ["AI assistants and agents", "Local models and secure environments", "Analytics and document automation"],
    tools: [
      { name: "ChatGPT", logos: [{ src: "/logos/tools/chatgpt.svg", alt: "ChatGPT logo" }] },
      { name: "Claude", logos: [{ src: "/logos/tools/claude.svg", alt: "Claude logo" }] },
      { name: "GitHub Copilot", logos: [{ src: "/logos/tools/github-copilot.svg", alt: "GitHub Copilot logo" }] },
      { name: "Cursor", logos: [{ src: "/logos/tools/cursor.svg", alt: "Cursor logo" }] },
      { name: "Perplexity AI", logos: [{ src: "/logos/tools/perplexity.svg", alt: "Perplexity AI logo" }] },
      { name: "OpenClaw", logos: [{ src: "/logos/tools/openclaw.png", alt: "Логотип OpenClaw" }] },
      { name: "Codex", logos: [{ src: "/logos/tools/codex.png", alt: "Логотип Codex" }] },
      { name: "Midjourney", logos: [{ src: "/logos/tools/midjourney.svg", alt: "Midjourney logo" }] },
    ],
  },
]

export function CompetencyTools() {
  const { t, language } = useLanguage()
  const [activeId, setActiveId] = useState(domains[0].id)
  const activeDomain = domains.find((domain) => domain.id === activeId) ?? domains[0]

  return (
    <section id="competencies" className="capability-system">
      <ProjectMatrixBackground mode="workflows" />
      <div className="capability-system__content">
        <motion.header
          className="capability-system__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .55 }}
        >
          <span>04 / CAPABILITIES</span>
          <h2>{t("Компетенции", "Competencies")}</h2>
          <p>{t("Выберите направление - ниже покажу рабочий инструментарий для этого контура.", "Choose a domain to see the tools I use in that area.")}</p>
        </motion.header>

        <div className="capability-system__domains">
          {domains.map((domain, index) => {
            const isActive = domain.id === activeId
            const competencies = language === "ru" ? domain.competenciesRu : domain.competenciesEn
            return (
              <motion.button
                type="button"
                key={domain.id}
                className={`capability-domain${isActive ? " is-active" : ""}`}
                onClick={() => setActiveId(domain.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .42, delay: index * .06 }}
                aria-pressed={isActive}
              >
                <span className="capability-domain__index">{domain.index}</span>
                <h3>{t(domain.titleRu, domain.titleEn)}</h3>
                <p>{t(domain.descriptionRu, domain.descriptionEn)}</p>
                <ul>
                  {competencies.map((competency) => <li key={competency}>{competency}</li>)}
                </ul>
              </motion.button>
            )
          })}
        </div>

        <div className="capability-tools">
          <div className="capability-tools__head">
            <span>{t("Инструменты", "Tools")}</span>
            <strong>{t(activeDomain.titleRu, activeDomain.titleEn)}</strong>
            <span>{String(activeDomain.tools.length).padStart(2, "0")}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="capability-tools__grid"
              key={activeDomain.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: .26, ease: [.22, 1, .36, 1] }}
            >
              {activeDomain.tools.map((tool, index) => (
                <motion.div
                  className="capability-tool"
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * .025 }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="capability-tool__logos">
                    {tool.logos?.map((logo) => (
                        <Image
                          key={logo.src}
                          src={logo.src}
                          alt={logo.alt}
                          width={28}
                          height={28}
                          className={logo.className}
                        />
                      ))}
                  </div>
                  <strong>{language === "en" ? tool.nameEn ?? tool.name : tool.name}</strong>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
