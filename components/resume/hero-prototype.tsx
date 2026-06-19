"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ProjectMatrixBackground } from "./project-matrix-background"

const principles = [
  {
    title: "Product & Delivery",
    ru: "Веду продукт от идеи до стабильного релиза",
    en: "I lead products from idea to stable release",
  },
  {
    title: "Team & Process",
    ru: "Выстраиваю работу кросс-функциональных команд",
    en: "I build effective cross-functional teamwork",
  },
  {
    title: "Complex Systems",
    ru: "Управляю интеграциями, рисками и эксплуатацией",
    en: "I manage integrations, risks, and operations",
  },
  {
    title: "AI & Automation",
    ru: "Внедряю AI в рабочие и аналитические процессы",
    en: "I embed AI into operational and analytical workflows",
  },
]

export function HeroPrototype() {
  const { t } = useLanguage()
  const [briefExpanded, setBriefExpanded] = useState(false)
  const [copiedContact, setCopiedContact] = useState<string | null>(null)
  const briefRef = useRef<HTMLElement>(null)
  const copyResetRef = useRef<number | null>(null)

  useEffect(() => {
    const closeBrief = (event: PointerEvent) => {
      if (briefRef.current && !briefRef.current.contains(event.target as Node)) {
        setBriefExpanded(false)
      }
    }

    document.addEventListener("pointerdown", closeBrief)
    return () => {
      document.removeEventListener("pointerdown", closeBrief)
      if (copyResetRef.current) window.clearTimeout(copyResetRef.current)
    }
  }, [])

  const copyContact = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedContact(key)
    if (copyResetRef.current) window.clearTimeout(copyResetRef.current)
    copyResetRef.current = window.setTimeout(() => setCopiedContact(null), 1400)
  }

  return (
    <section id="hero" className="hero-control-room">
      <ProjectMatrixBackground />

      <div className="hero-control-room__content">
        <div className="hero-control-room__grid">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="hero-eyebrow">
              {t("Руководитель IT-проектов / Product Lead", "IT Project Manager / Product Lead")}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .14 }} className="hero-title">
              <span>{t("Артем", "Artem")}</span>
              <span className="hero-title__outline">{t("Иванов", "Ivanov")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }} className="hero-statement">
              {t("Управляю IT-проектами и продуктами: планирую работу, координирую команду и отвечаю за результат.", "I manage IT projects and products: plan the work, coordinate the team, and take responsibility for the outcome.")}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .36 }} className="hero-actions">
              <button type="button" className="hero-action hero-action--primary" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
                {t("Смотреть опыт", "View experience")}<ArrowDownRight aria-hidden="true" />
              </button>
              <a className="hero-action hero-action--ghost" href="https://t.me/artivtw" target="_blank" rel="noreferrer">Telegram<ArrowUpRight aria-hidden="true" /></a>
            </motion.div>
          </div>

          <motion.aside
            ref={briefRef}
            initial={{ opacity: 0, x: 24, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: briefExpanded ? 1.16 : 1 }}
            transition={{ opacity: { delay: .32 }, x: { delay: .32 }, scale: { duration: .28, ease: "easeOut" } }}
            className={`hero-brief${briefExpanded ? " hero-brief--expanded" : ""}`}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a, button")) return
              setBriefExpanded((expanded) => !expanded)
            }}
          >
            <div className="hero-brief__avatar">
              <img src="/artem-avatar.png" alt={t("Артём Иванов", "Artem Ivanov")} />
              <div className="hero-brief__avatar-ring" aria-hidden="true" />
            </div>
            <p>{t("Управление продуктом, delivery и AI-автоматизация", "Product, delivery, and AI automation")}</p>
            <div className="hero-brief__contacts">
              <span className="hero-brief__contact"><MapPin aria-hidden="true" /> {t("Москва", "Moscow")}</span>
              <div className="hero-brief__contact">
                <a href="https://t.me/artivtw" target="_blank" rel="noreferrer"><Send aria-hidden="true" /> @artivtw</a>
                <button type="button" onClick={() => copyContact("telegram", "@artivtw")} aria-label={t("Скопировать Telegram", "Copy Telegram")} title={t("Скопировать", "Copy")}>
                  {copiedContact === "telegram" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
              <div className="hero-brief__contact">
                <a href="mailto:actionartem@gmail.com"><Mail aria-hidden="true" /> actionartem@gmail.com</a>
                <button type="button" onClick={() => copyContact("email", "actionartem@gmail.com")} aria-label={t("Скопировать почту", "Copy email")} title={t("Скопировать", "Copy")}>
                  {copiedContact === "email" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
              <div className="hero-brief__contact">
                <a href="tel:+79995598322"><Phone aria-hidden="true" /> +7 999 559-83-22</a>
                <button type="button" onClick={() => copyContact("phone", "+79995598322")} aria-label={t("Скопировать телефон", "Copy phone")} title={t("Скопировать", "Copy")}>
                  {copiedContact === "phone" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .48 }} className="hero-metrics">
          {principles.map((principle, index) => (
            <div className="hero-metric hero-principle" key={principle.title}>
              <span className="hero-metric__index">0{index + 1}</span>
              <strong>{principle.title}</strong>
              <span>{t(principle.ru, principle.en)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
