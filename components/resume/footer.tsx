"use client"

import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} {localize(resumeData.identity.fullName, language)}</p>
        <p>{localize(resumeData.identity.role, language)}, {localize(resumeData.identity.location, language)}</p>
      </div>
    </footer>
  )
}
