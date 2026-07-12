"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Plus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"
import { ExperienceModal } from "./experience-modal"

type ExperienceItem = (typeof resumeData.experiences)[number]

export function ExperienceRoadmap() {
  const { language, t } = useLanguage()
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null)

  return (
    <section id="experience" className="section experience-section" aria-labelledby="experience-title">
      <div className="section__inner">
        <div className="section-heading section-heading--compact">
          <h2 id="experience-title">{t("Опыт работы", "Experience")}</h2>
        </div>

        <div className="experience-list">
          {resumeData.experiences.map((experience, index) => (
            <article className="experience-item" key={experience.id}>
              <div className="experience-item__rail" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>

              <header className="experience-item__header">
                <div className="experience-item__company">
                  <div className="experience-item__logo">
                    <Image src={experience.logo} alt="" fill sizes="48px" />
                  </div>
                  <div>
                    <h3>{localize(experience.company, language)}</h3>
                    <p>{localize(experience.role, language)}</p>
                  </div>
                </div>
                <div className="experience-item__period">
                  <strong>{localize(experience.period, language)}</strong>
                  <span>{localize(experience.duration, language)}</span>
                </div>
              </header>

              <div className="experience-item__content">
                <p className="experience-item__context">{localize(experience.context, language)}</p>
                <ul className="experience-item__highlights">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight.ru}>{localize(highlight, language)}</li>
                  ))}
                </ul>
                <div className="experience-item__actions">
                  <button type="button" onClick={() => setSelectedExperience(experience)}>
                    <Plus aria-hidden="true" />
                    {t("Подробнее", "Details")}
                  </button>
                  <a href={experience.website} target="_blank" rel="noreferrer">
                    {t("Сайт компании", "Company site")}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ExperienceModal isOpen={Boolean(selectedExperience)} onClose={() => setSelectedExperience(null)} experience={selectedExperience} />
    </section>
  )
}
