"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function HeroPrototype() {
  const { language, t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? false : { opacity: 0, y: 14 }

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__inner">
        <div className="hero-section__copy">
          <motion.p initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="hero-section__role">
            {localize(resumeData.identity.role, language)}
          </motion.p>
          <motion.h1 id="hero-title" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.05 }}>
            {localize(resumeData.identity.name, language)}
          </motion.h1>
          <motion.p initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1 }} className="hero-section__intro">
            {localize(resumeData.identity.intro, language)}
          </motion.p>
          <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.15 }} className="hero-section__actions">
            <a className="button button--primary" href="#experience">
              {t("Посмотреть опыт", "View experience")}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a className="button button--text" href="#contacts">
              {t("Связаться", "Contact")}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(8% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.12 }}
          className="hero-portrait"
        >
          <Image src="/artem-avatar.png" alt={localize(resumeData.identity.fullName, language)} fill priority sizes="(max-width: 767px) 72vw, 360px" />
        </motion.figure>

        <ul className="hero-directions" aria-label={t("Профессиональные направления", "Professional focus areas")}>
          {resumeData.directions.map((direction) => (
            <li key={direction.title}>
              <strong>{direction.title}</strong>
              <span>{localize(direction.description, language)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
