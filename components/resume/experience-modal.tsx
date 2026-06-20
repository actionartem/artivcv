"use client"

import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Building2, ChevronDown, ExternalLink } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experience: {
    company: string
    companyEn: string
    logo?: string
    role: string
    roleEn: string
    period: string
    periodEn: string
    duration: string
    durationEn: string
    descriptionRu: string
    descriptionEn: string
    website?: string
  } | null
}

type ExperienceContentBlock =
  | { type: "heading" | "paragraph"; text: string }
  | { type: "list"; items: string[] }

function parseExperienceContent(value: string): ExperienceContentBlock[] {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const blocks: ExperienceContentBlock[] = []

  for (const line of lines) {
    if (line.startsWith("-")) {
      const item = line.slice(1).trim()
      const previous = blocks.at(-1)

      if (previous?.type === "list") {
        previous.items.push(item)
      } else {
        blocks.push({ type: "list", items: [item] })
      }
      continue
    }

    blocks.push({
      type: line.endsWith(":") ? "heading" : "paragraph",
      text: line,
    })
  }

  return blocks
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!experience || typeof document === "undefined") return null

  const contentBlocks = parseExperienceContent(t(experience.descriptionRu, experience.descriptionEn))

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="experience-modal__backdrop"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: .32, ease: [.22, 1, .36, 1] }}
            className="experience-modal__card"
            role="dialog"
            aria-modal="true"
            aria-label={t(`Опыт работы в ${experience.company}`, `Experience at ${experience.companyEn}`)}
          >
            {/* Header */}
            <div className="experience-modal__header">
              <div className="experience-modal__heading">
                <span className="experience-modal__eyebrow">EXPERIENCE / DETAIL</span>
                <div className="experience-modal__identity">
                  {/* Logo placeholder */}
                  <div className="experience-modal__logo">
                    {experience.logo ? (
                      <Image
                        src={experience.logo}
                        alt={t(experience.company, experience.companyEn)}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="experience-modal__logo-placeholder">
                        <Building2 />
                      </div>
                    )}
                  </div>
                  <div className="experience-modal__title">
                    <h3>
                      {t(experience.company, experience.companyEn)}
                    </h3>
                    <p>
                      {t(experience.role, experience.roleEn)}
                    </p>
                  </div>
                </div>
                <div className="experience-modal__meta">
                  <span>
                    <Calendar />
                    {t(experience.period, experience.periodEn)}
                  </span>
                  <span className="experience-modal__duration">
                    {t(experience.duration, experience.durationEn)}
                  </span>
                </div>
                {experience.website && (
                  <div className="experience-modal__links">
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noreferrer"
                      className="experience-modal__link"
                    >
                      <ExternalLink />
                      {t("Сайт компании", "Company site")}
                    </a>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="experience-modal__close"
                aria-label={t("Закрыть", "Close")}
              >
                <X />
              </motion.button>
            </div>

            {/* Content */}
            <div className="experience-modal__content">
              <div className="experience-modal__copy">
                {contentBlocks.map((block, index) => {
                  if (block.type === "heading") {
                    return <h4 key={`${block.type}-${index}`}>{block.text}</h4>
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={`${block.type}-${index}`}>
                        {block.items.map((item, itemIndex) => (
                          <li key={`${itemIndex}-${item}`}>{item}</li>
                        ))}
                      </ul>
                    )
                  }

                  return <p key={`${block.type}-${index}`}>{block.text}</p>
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="experience-modal__footer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="experience-modal__collapse"
              >
                <ChevronDown />
                {t("Свернуть", "Collapse")}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
