"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function StickyHeader() {
  const { language, setLanguage, t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.25 })
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = ["hero", ...resumeData.navigation.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.1, 0.35] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button
          type="button"
          className="site-header__brand"
          onClick={() => scrollToSection("hero")}
          aria-label={t("Наверх", "Back to top")}
        >
          <strong>{localize(resumeData.identity.name, language)}</strong>
          <span>IT Project Manager</span>
        </button>

        <nav className="site-header__nav" aria-label={t("Навигация по резюме", "Resume navigation") }>
          {resumeData.navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "is-active" : ""}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {localize(item.label, language)}
            </button>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="language-switch" aria-label={t("Выбор языка", "Language selection") }>
            <button type="button" className={language === "ru" ? "is-active" : ""} onClick={() => setLanguage("ru")} aria-pressed={language === "ru"}>RU</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <button
            type="button"
            className="site-header__menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={t(isMobileMenuOpen ? "Закрыть меню" : "Открыть меню", isMobileMenuOpen ? "Close menu" : "Open menu")}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="site-header__progress" aria-hidden="true">
        <motion.div style={{ scaleX: reduceMotion ? scrollYProgress : progress }} />
      </div>

      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            aria-label={t("Мобильная навигация", "Mobile navigation")}
          >
            {resumeData.navigation.map((item) => (
              <button key={item.id} type="button" className={activeSection === item.id ? "is-active" : ""} onClick={() => scrollToSection(item.id)}>
                {localize(item.label, language)}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
