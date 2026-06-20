"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { ArrowUpRight, Briefcase, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react"
import { useRef, useState } from "react"
import { ProjectMatrixBackground } from "./project-matrix-background"

const contacts = [
  {
    icon: Phone,
    labelRu: "Телефон",
    labelEn: "Phone",
    value: "+7 (999) 559-83-22",
    copyValue: "+7 (999) 559-83-22",
    copyLabelRu: "Телефон скопирован",
    copyLabelEn: "Phone copied",
  },
  {
    icon: Send,
    labelRu: "Telegram",
    labelEn: "Telegram",
    value: "@artivtw",
    href: "https://t.me/artivtw",
  },
  {
    icon: Mail,
    labelRu: "Email",
    labelEn: "Email",
    value: "actionartem@gmail.com",
    copyValue: "actionartem@gmail.com",
    copyLabelRu: "Почта скопирована",
    copyLabelEn: "Email copied",
  },
]

const workFormats = [
  { ru: "удалённо", en: "remote" },
  { ru: "гибрид", en: "hybrid" },
  { ru: "офис", en: "office" },
  { ru: "разъездная", en: "travel" },
]

export function Contacts() {
  const { t } = useLanguage()

  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async (
    value: string,
    messageRu: string,
    messageEn: string,
    key: string,
  ) => {
    if (typeof navigator === "undefined") return

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else {
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }

    setCopiedKey(key)
    setCopiedMessage(t(messageRu, messageEn))
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedKey(null)
      setCopiedMessage(null)
    }, 1800)
  }

  return (
    <section id="contacts" className="contact-terminal">
      <ProjectMatrixBackground mode="words" />

      <div className="contact-terminal__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-terminal__header"
        >
          <span>06 / CONTACT</span>
          <h2>
            {t("Связаться со мной", "Get in Touch")}
          </h2>
          <p>
            {t(
              "Открыт к предложениям по управлению IT-проектами",
              "Open to IT project leadership opportunities"
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-panel"
        >
            <div className="contact-panel__head">
              <span>AVAILABLE / MOSCOW</span>
              <span>{t("Выберите удобный способ связи", "Choose a contact method")}</span>
            </div>

            <div className="contact-panel__grid">
              {contacts.map((contact, index) => {
                const className = "contact-method"

                if (contact.copyValue) {
                  return (
                    <motion.button
                      key={contact.value}
                      type="button"
                      onClick={() =>
                        handleCopy(
                          contact.copyValue,
                          contact.copyLabelRu ?? "Скопировано",
                          contact.copyLabelEn ?? "Copied",
                          contact.value,
                        )
                      }
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className={className}
                    >
                      <div className="contact-method__icon">
                        <contact.icon aria-hidden="true" />
                      </div>
                      <div className="contact-method__copy">
                        <span>
                        {t(contact.labelRu, contact.labelEn)}
                        </span>
                        <strong>{contact.value}</strong>
                      </div>
                      <span className={`contact-method__action${copiedKey === contact.value ? " is-copied" : ""}`}>
                        {copiedKey === contact.value ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                        {copiedKey === contact.value && copiedMessage ? copiedMessage : t("Копировать", "Copy")}
                      </span>
                    </motion.button>
                  )
                }

                return (
                  <motion.a
                    key={contact.value}
                    href={contact.href}
                    target={contact.href?.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={className}
                  >
                    <div className="contact-method__icon">
                      <contact.icon aria-hidden="true" />
                    </div>
                    <div className="contact-method__copy">
                      <span>{t(contact.labelRu, contact.labelEn)}</span>
                      <strong>{contact.value}</strong>
                    </div>
                    <span className="contact-method__action">
                      <ArrowUpRight aria-hidden="true" />
                      {t("Открыть", "Open")}
                    </span>
                  </motion.a>
                )
              })}
            </div>

            <div className="contact-panel__meta">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="contact-meta-card"
              >
                <MapPin aria-hidden="true" />
                <div>
                  <span>{t("Город", "City")}</span>
                  <strong>{t("Москва", "Moscow")}</strong>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="contact-format-card"
              >
                <div className="contact-format-card__title">
                  <Briefcase aria-hidden="true" />
                  <span>{t("Формат работы", "Work format")}</span>
                </div>
                <div className="contact-format-card__values">
                  {workFormats.map((format) => (
                    <span key={format.en}>
                      {t(format.ru, format.en)}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  )
}
