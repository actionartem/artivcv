"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Target, Eye, Rocket, Handshake, Truck, Code } from "lucide-react"

const competencies = [
  {
    icon: Eye,
    titleRu: "Видение продукта",
    titleEn: "Product Vision",
    descRu: "Формирую ценностное предложение, создаю роадмап и приоритизирую бэклог.",
    descEn: "I shape the value proposition, build the roadmap, and prioritize the backlog.",
  },
  {
    icon: Target,
    titleRu: "Discovery",
    titleEn: "Discovery",
    descRu: "Собираю сигналы от клиентов, продаж и поддержки, формулирую гипотезы и критерии успеха.",
    descEn: "I collect signals from customers, sales, and support, define hypotheses, and set success criteria.",
  },
  {
    icon: Rocket,
    titleRu: "Развитие",
    titleEn: "Growth",
    descRu: "Улучшаю ключевые сценарии, повышаю конверсию и удержание, запускаю новые направления.",
    descEn: "I improve key scenarios, drive conversion and retention, and launch new directions.",
  },
  {
    icon: Handshake,
    titleRu: "B2B-развитие",
    titleEn: "B2B Development",
    descRu: "Выстраиваю партнёрства и контракты, готовлю пресейл-сценарии, упаковываю продукт для внедрений.",
    descEn: "I build partnerships and contracts, prepare presale scenarios, and package the product for implementation.",
  },
  {
    icon: Truck,
    titleRu: "Delivery",
    titleEn: "Delivery",
    descRu: "Управляю кросс-функциональной командой, релизами, качеством, эксплуатацией и инцидентами.",
    descEn: "I manage a cross-functional team, releases, quality, operations, and incidents.",
  },
  {
    icon: Code,
    titleRu: "Технический бэкграунд",
    titleEn: "Technical Background",
    descRu: "Глубокий технический бэкграунд помогает говорить с разработкой на одном языке и находить больше точек взаимопонимания.",
    descEn: "My deep technical background helps me speak the same language as engineering and find more common ground.",
  },
]

export function Competencies() {
  const { t } = useLanguage()

  return (
    <section id="competencies" className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
          >
            <Target className="w-4 h-4" />
            {t("Ключевые компетенции", "Key Competencies")}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("Компетенции", "Competencies")}
          </h2>
        </motion.div>

        {/* Competencies Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {competencies.map((comp, index) => (
            <motion.div
              key={comp.titleEn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <comp.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t(comp.titleRu, comp.titleEn)}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(comp.descRu, comp.descEn)}
              </p>

              {/* Decorative line */}
              <div className="mt-4 h-0.5 w-12 bg-primary/20 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
