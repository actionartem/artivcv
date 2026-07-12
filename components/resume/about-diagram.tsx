"use client"

import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function AboutDiagram() {
  const { language, t } = useLanguage()
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="section__inner about-section__grid">
        <div className="section-heading">
          <h2 id="about-title">{t("Обо мне", "About")}</h2>
          <p>{localize(resumeData.about.lead, language)}</p>
        </div>

        <div className="about-section__body">
          <div className="about-section__copy">
            {resumeData.about.paragraphs.map((paragraph) => (
              <p key={paragraph.ru}>{localize(paragraph, language)}</p>
            ))}
          </div>
          <div className="about-section__focus">
            <h3>{t("Основные направления", "Core focus")}</h3>
            <ul>
              {resumeData.about.focus.map((item) => (
                <li key={item.en}>{localize(item, language)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
