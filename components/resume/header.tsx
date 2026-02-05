"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { Moon, Sun, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { id: "hero", ru: "Иванов Артем", en: "Artem Ivanov" },
  { id: "about", ru: "Обо мне", en: "About" },
  { id: "experience", ru: "Опыт", en: "Experience" },
  { id: "contacts", ru: "Контакты", en: "Contacts" },
]

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Name - clickable to top */}
        <motion.button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-primary font-mono text-sm font-bold">ИА</span>
          </div>
          <span className="font-medium text-foreground hidden sm:block">
            {t("Иванов Артем", "Artem Ivanov")}
          </span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.slice(1).map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {t(item.ru, item.en)}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="relative flex items-center bg-secondary/50 rounded-full p-1 border border-border">
            <motion.div
              className="absolute h-7 w-10 bg-primary rounded-full"
              animate={{
                x: language === "ru" ? 0 : 40,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setLanguage("ru")}
              className={`relative z-10 px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                language === "ru" ? "text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-label="Русский"
            >
              <img
                src="/flags/ru.svg"
                alt="Флаг России"
                className="w-4 h-4 object-cover"
                loading="lazy"
              />
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`relative z-10 px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                language === "en" ? "text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-label="English"
            >
              <img
                src="/flags/gb.svg"
                alt="Флаг Великобритании"
                className="w-4 h-4 object-cover"
                loading="lazy"
              />
            </button>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.slice(1).map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  {t(item.ru, item.en)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
