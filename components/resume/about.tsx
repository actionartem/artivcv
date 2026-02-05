"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export function About() {
  const { t } = useLanguage()

  const aboutRu = `Я руководитель продукта с опытом развития коммерческих B2C и B2B-сервисов и ведения крупных технологических инициатив, включая государственные контуры. Развиваю продукты от идеи до стабильной эксплуатации: формирую видение и роадмап, приоритизирую бэклог на основе целей бизнеса и обратной связи, выстраиваю процессы релизов.

Я запускал новые направления, находил партнёров и заключал контракты, улучшал продуктовые сценарии вместе с командой разработки и маркетингом, веду поддержку эксплуатации продукта в крупном гос-контуре.`

  const aboutEn = `I am a product manager with experience in developing commercial B2C and B2B services and leading large technology initiatives, including government projects. I develop products from idea to stable operation: I form vision and roadmap, prioritize backlog based on business goals and feedback, build release processes.

I launched new directions, found partners and signed contracts, improved product scenarios together with the development team and marketing, I maintain product operation support in a large government project.`

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
