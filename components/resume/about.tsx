"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export function About() {
  const { t } = useLanguage()

  const aboutRu = `Руководитель продукта с опытом развития B2B и B2C продуктов, запуска новых направлений и управления сложными цифровыми контурами - от коммерческих сервисов до государственных систем. Отвечаю за продукт end-to-end: стратегия, приоритизация, roadmap, delivery, запуск, эксплуатация и масштабирование.

Сильная сторона - сочетание продуктового мышления с глубокой технической вовлечённостью. Умею одинаково уверенно работать с бизнесом, заказчиком и технической командой: находить точки роста, упрощать пользовательские сценарии, снижать операционные потери и доводить инициативы до измеримого результата.

За последние роли управлял кросс-функциональными командами 25+ человек, выстроил предсказуемый релизный контур, помог закрыть 800+ часов техдолга без просадки по новым обязательствам, увеличил конверсию ключевого сценария на ~25%, запускал продукты на новых рынках и выводил новые digital-продукты от идеи до коммерческой сделки и готового продукта.`

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
