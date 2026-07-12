"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function Education() {
  const { language, t } = useLanguage()

  return (
    <section id="education" className="section education-section" aria-labelledby="education-title">
      <div className="section__inner education-section__layout">
        <div className="section-heading section-heading--compact">
          <h2 id="education-title">{t("Образование", "Education")}</h2>
        </div>

        <div className="education-list">
          {resumeData.education.map((education) => (
            <article className="education-item" key={education.id}>
              <div className="education-item__logo"><Image src="/UrFULogo_U.jpg" alt="УрФУ" fill sizes="56px" /></div>
              <div className="education-item__main">
                <span>{education.year}</span>
                <h3>{localize(education.university, language)}</h3>
                <p>{localize(education.city, language)}</p>
              </div>
              <dl className="education-item__program">
                <div><dt>{t("Факультет", "Faculty")}</dt><dd>{localize(education.faculty, language)}</dd></div>
                <div><dt>{t("Специальность", "Specialization")}</dt><dd>{localize(education.specialty, language)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
