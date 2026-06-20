"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { Languages, Menu, Moon, Sun, X } from "lucide-react"

const navItems = [
  { id: "about", index: "02", ru: "Обо мне", en: "About" },
  { id: "experience", index: "03", ru: "Опыт", en: "Experience" },
  { id: "competencies", index: "04", ru: "Компетенции", en: "Capabilities" },
  { id: "education", index: "05", ru: "Образование", en: "Education" },
  { id: "contacts", index: "06", ru: "Контакты", en: "Contacts" },
]

export function StickyHeader() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 })
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateHeader = () => {
      frame = 0
      setIsScrolled(window.scrollY > 24)

      const viewportAnchor = window.innerHeight * 0.38
      let currentSection = "hero"

      for (const item of navItems) {
        const section = document.getElementById(item.id)
        if (section && section.getBoundingClientRect().top <= viewportAnchor) {
          currentSection = item.id
        }
      }

      setActiveSection(currentSection)
    }

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setIsMobileMenuOpen(false)
  }

  const activeItem = navItems.find((item) => item.id === activeSection)

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky-header${isScrolled ? " is-scrolled" : ""}`}
    >
      <div className="sticky-header__inner">
        <button
          type="button"
          className="sticky-header__brand"
          onClick={() => scrollToSection("hero")}
          aria-label={t("Наверх", "Back to top")}
        >
          <span>AI</span>
          <strong>{t("Артем Иванов", "Artem Ivanov")}</strong>
        </button>

        <nav className="sticky-header__nav" aria-label={t("Навигация по резюме", "Resume navigation")}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "is-active" : ""}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.index}</span>
              {t(item.ru, item.en)}
            </button>
          ))}
        </nav>

        <div className="sticky-header__actions">
          <div className="sticky-header__status" aria-live="polite">
            <span>{activeItem?.index ?? "01"}</span>
            <strong>{activeItem ? t(activeItem.ru, activeItem.en) : t("Начало", "Start")}</strong>
          </div>

          <button
            type="button"
            className="sticky-header__control sticky-header__language"
            onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            aria-label={t("Переключить на английский", "Switch to Russian")}
            title={t("Переключить на английский", "Switch to Russian")}
          >
            <Languages aria-hidden="true" />
            <span className={language === "ru" ? "is-active" : ""}>RU</span>
            <i>/</i>
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>

          <button
            type="button"
            className="sticky-header__control sticky-header__theme"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("Включить светлую тему", "Enable light theme") : t("Включить тёмную тему", "Enable dark theme")}
            title={theme === "dark" ? t("Светлая тема", "Light theme") : t("Тёмная тема", "Dark theme")}
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="sticky-header__menu"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-expanded={isMobileMenuOpen}
            aria-label={t("Открыть меню", "Open menu")}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="sticky-header__progress" aria-hidden="true">
        <motion.div style={{ scaleX: progress }} />
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="sticky-header__mobile-nav"
            aria-label={t("Мобильная навигация", "Mobile navigation")}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeSection === item.id ? "is-active" : ""}
                onClick={() => scrollToSection(item.id)}
              >
                <span>{item.index}</span>
                <strong>{t(item.ru, item.en)}</strong>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
