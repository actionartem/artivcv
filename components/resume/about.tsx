"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export function About() {
  const { t } = useLanguage()

  const aboutRu = `Руководитель IT-проектов с опытом реализации проектов разного масштаба: от комплексных государственных контрактов до коммерческих B2B-продуктов, e-commerce, крипто-проектов и сервисов онлайн-услуг.

Управляю полным жизненным циклом IT-проектов: сбор и уточнение требований, оценка, планирование, постановка задач, контроль реализации, релизы, внедрение и сопровождение. Имею технический и управленческий бэкграунд, понимаю разработку, интеграции, API, клиент-серверную и микросервисную архитектуру.

Спроектировал и внедрил GenAI/LLM-агентов для автоматизации рабочих процессов: классификация инцидентов, создание тикетов, подготовка релизной документации, анализ данных по контуру 400 000+ камер и работа с технической документацией.`

  const aboutEn = `IT Project Manager with experience delivering projects of different scale: from state contracts to commercial B2B products, e-commerce, crypto projects, and online service platforms.

I manage the full lifecycle of IT projects: requirements, estimation, planning, task management, delivery control, releases, rollout, and support. I combine technical and managerial background with strong understanding of integrations, APIs, and distributed architectures.

I designed and implemented GenAI/LLM agents to automate incident triage, ticket creation, release documentation, large-scale contour analytics, and work with technical documentation.`

  return (
    <section id="about" className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
            >
              <User className="w-4 h-4" />
              {t("Обо мне", "About Me")}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {t("Кто я", "Who I Am")}
            </h2>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-8 md:p-12 rounded-3xl bg-card border border-border"
          >
            <div className="relative">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-line">
                {t(aboutRu, aboutEn)}
              </p>
            </div>

            {/* Decorative bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
