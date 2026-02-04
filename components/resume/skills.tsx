"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Zap, Heart, Brain, Users } from "lucide-react"
import { useState } from "react"

const hardSkills = [
  { ru: "Управление портфелем продуктов", en: "Product Portfolio Management" },
  { ru: "Управление ресурсами", en: "Resource Management" },
  { ru: "Сквозная аналитика", en: "End-to-end Analytics" },
  { ru: "Управление бэклогом", en: "Backlog Management" },
  { ru: "Разработка и внедрение KPI", en: "KPI Development & Implementation" },
  { ru: "Управление изменениями", en: "Change Management" },
  { ru: "Бизнес-анализ", en: "Business Analysis" },
  { ru: "Scrum / Kanban", en: "Scrum / Kanban" },
  { ru: "OKR / KPI фреймворки", en: "OKR / KPI Frameworks" },
  { ru: "Product Discovery", en: "Product Discovery" },
  { ru: "A/B тестирование", en: "A/B Testing" },
  { ru: "Юнит-экономика", en: "Unit Economics" },
  { ru: "Customer Development", en: "Customer Development" },
  { ru: "SQL / Аналитические запросы", en: "SQL / Analytical Queries" },
]

const softSkills = [
  { ru: "Лидерство", en: "Leadership" },
  { ru: "Коммуникация", en: "Communication" },
  { ru: "Переговоры", en: "Negotiation" },
  { ru: "Критическое мышление", en: "Critical Thinking" },
  { ru: "Адаптивность", en: "Adaptability" },
  { ru: "Принятие решений", en: "Decision Making" },
  { ru: "Тайм-менеджмент", en: "Time Management" },
  { ru: "Презентации", en: "Presentations" },
  { ru: "Фасилитация", en: "Facilitation" },
  { ru: "Разрешение конфликтов", en: "Conflict Resolution" },
  { ru: "Системное мышление", en: "Systems Thinking" },
  { ru: "Делегирование", en: "Delegation" },
  { ru: "Кросс-функциональное взаимодействие", en: "Cross-functional Collaboration" },
]

export function Skills() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"hard" | "soft">("hard")

  const tabs = [
    { id: "hard" as const, labelRu: "Hard Skills", labelEn: "Hard Skills", icon: Zap },
    { id: "soft" as const, labelRu: "Soft Skills", labelEn: "Soft Skills", icon: Heart },
  ]

  const currentSkills = activeTab === "hard" ? hardSkills : softSkills

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />

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
            <Brain className="w-4 h-4" />
            {t("Навыки", "Skills")}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("Hard и Soft Skills", "Hard & Soft Skills")}
          </h2>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-secondary/50 border border-border">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-primary rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {t(tab.labelRu, tab.labelEn)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.en}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-sm font-medium text-foreground cursor-default transition-all shadow-sm hover:shadow-md"
              >
                {t(skill.ru, skill.en)}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
