"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ExternalLink, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

type ExperienceItem = (typeof resumeData.experiences)[number]

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experience: ExperienceItem | null
}

type ContentBlock =
  | { type: "heading" | "paragraph"; text: string }
  | { type: "list"; items: string[] }

function parseContent(value: string): ContentBlock[] {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const blocks: ContentBlock[] = []

  for (const line of lines) {
    if (line.startsWith("-")) {
      const item = line.slice(1).trim()
      const previous = blocks.at(-1)
      if (previous?.type === "list") previous.items.push(item)
      else blocks.push({ type: "list", items: [item] })
    } else {
      blocks.push({ type: line.endsWith(":") ? "heading" : "paragraph", text: line })
    }
  }

  return blocks
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const { language, t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      previousFocus?.focus()
    }
  }, [isOpen, onClose])

  if (typeof document === "undefined") return null

  const blocks = experience ? parseContent(localize(experience.description, language)) : []

  return createPortal(
    <AnimatePresence>
      {isOpen && experience && (
        <motion.div className="experience-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} onMouseDown={onClose}>
          <motion.div
            ref={dialogRef}
            className="experience-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="experience-modal__header">
              <div className="experience-modal__identity">
                <div className="experience-modal__logo"><Image src={experience.logo} alt="" fill sizes="52px" /></div>
                <div>
                  <h2 id="experience-modal-title">{localize(experience.company, language)}</h2>
                  <p>{localize(experience.role, language)}</p>
                </div>
              </div>
              <button ref={closeRef} type="button" className="experience-modal__close" onClick={onClose} aria-label={t("Закрыть", "Close")}><X aria-hidden="true" /></button>
            </header>

            <div className="experience-modal__meta">
              <span>{localize(experience.period, language)}</span>
              <span>{localize(experience.duration, language)}</span>
              <a href={experience.website} target="_blank" rel="noreferrer">{t("Сайт компании", "Company site")}<ExternalLink aria-hidden="true" /></a>
            </div>

            <div className="experience-modal__content">
              {blocks.map((block, index) => {
                if (block.type === "heading") return <h3 key={`${block.type}-${index}`}>{block.text}</h3>
                if (block.type === "list") return <ul key={`${block.type}-${index}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
                return <p key={`${block.type}-${index}`}>{block.text}</p>
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
