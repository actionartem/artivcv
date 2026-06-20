"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="resume-footer">
      <div className="resume-footer__content">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="resume-footer__row"
        >
          <p>
            © {currentYear} {t("Иванов Артем Антонович", "Artem Ivanov")}
          </p>
          <span>END / CV</span>
          <p>{t("Руководитель IT проектов", "IT Project Manager")} / {t("Москва", "Moscow")}</p>
        </motion.div>
      </div>
    </footer>
  )
}
