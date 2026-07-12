"use client"

import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function CompetencyTools() {
  const { language, t } = useLanguage()
  return (
    <section id="competencies" className="section competencies-section" aria-labelledby="competencies-title">
      <div className="section__inner">
        <div className="section-heading section-heading--narrow">
          <h2 id="competencies-title">{t("Компетенции", "Competencies")}</h2>
          <p>{t("Профессиональные области в порядке их роли в ежедневной работе. Инструменты остаются вторичным уровнем.", "Professional areas ordered by their role in daily work. Tools remain a secondary layer.")}</p>
        </div>

        <div className="competency-index">
          {resumeData.competencyDomains.map((domain) => (
            <article className="competency-row" key={domain.id}>
              <div className="competency-row__intro">
                <h3>{localize(domain.title, language)}</h3>
                <p>{localize(domain.description, language)}</p>
              </div>
              <ul className="competency-row__skills">
                {domain.competencies.map((item) => <li key={item.en}>{localize(item, language)}</li>)}
              </ul>
              <p className="competency-row__tools"><span>{t("Инструменты", "Tools")}</span>{domain.tools.join(", ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
