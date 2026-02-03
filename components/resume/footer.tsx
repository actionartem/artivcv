"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <p>
            © {currentYear} {t("Иванов Артем Антонович", "Artem Ivanov")}
          </p>
          <p>
            {t("Руководитель продукта", "Product Manager")} • {t("Москва", "Moscow")}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
