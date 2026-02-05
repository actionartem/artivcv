"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Languages as LanguagesIcon } from "lucide-react"

const languages = [
  {
    nameRu: "Русский",
    nameEn: "Russian",
    levelRu: "Родной",
    levelEn: "Native",
    flag: "🇷🇺",
  },
  {
    nameRu: "Английский",
    nameEn: "English",
    levelRu: "B2",
    levelEn: "B2 — Upper-Intermediate",
    flag: "🇬🇧",
  },
]

export function LanguagesSection() {
  const { t } = useLanguage()

  return (
    <section id="languages" className="relative py-16 overflow-hidden">
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
            <LanguagesIcon className="w-4 h-4" />
            {t("Языки", "Languages")}
          </motion.span>
        </motion.div>

        {/* Languages Grid */}
        <div className="max-w-2xl mx-auto grid gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.nameEn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Flag */}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {lang.flag}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {t(lang.nameRu, lang.nameEn)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(lang.levelRu, lang.levelEn)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
