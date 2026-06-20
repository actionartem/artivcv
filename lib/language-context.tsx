"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Language = "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (ru: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("resume-language")
    if (savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    document.documentElement.lang = language
    window.localStorage.setItem("resume-language", language)
  }, [isInitialized, language])

  const t = (ru: string, en: string) => (language === "ru" ? ru : en)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
