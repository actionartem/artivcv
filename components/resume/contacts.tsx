"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Phone, Mail, Send, MapPin, Briefcase, MessageCircle } from "lucide-react"
import { useRef, useState } from "react"

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
    value: "prmgartiv@gmail.com",
    copyValue: "prmgartiv@gmail.com",
    copyLabelRu: "Почта скопирована",
    copyLabelEn: "Email copied",
  },
]

const workFormats = [
  { ru: "удалённо", en: "remote" },
  { ru: "гибрид", en: "hybrid" },
  { ru: "офис", en: "office" },
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
    <section id="contacts" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            {t("Контакты", "Contacts")}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("Связаться со мной", "Get in Touch")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Открыт к интересным предложениям и проектам",
              "Open to interesting offers and projects"
            )}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-3xl bg-card border border-border mb-8"
          >
            {/* Contact Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {contacts.map((contact, index) => {
                const className =
                  "group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-center"

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
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${className} relative`}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <contact.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {t(contact.labelRu, contact.labelEn)}
                      </p>
                      <p className="font-medium text-foreground text-sm truncate">
                        {contact.value}
                      </p>
                      {copiedKey === contact.value && copiedMessage ? (
                        <span className="absolute -top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground shadow-sm">
                          {copiedMessage}
                        </span>
                      ) : null}
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
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={className}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <contact.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {t(contact.labelRu, contact.labelEn)}
                    </p>
                    <p className="font-medium text-foreground text-sm truncate">
                      {contact.value}
                    </p>
                  </motion.a>
                )
              })}
            </div>

            {/* Location & Work Format */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("Город", "City")}</p>
                  <p className="font-medium text-foreground">{t("Москва", "Moscow")}</p>
                </div>
              </motion.div>

              {/* Work Format */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-secondary/30 border border-border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    {t("Формат работы", "Work format")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {workFormats.map((format) => (
                    <span
                      key={format.en}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary"
                    >
                      {t(format.ru, format.en)}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.a
              href="https://t.me/artivtw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Send className="w-5 h-5" />
              {t("Написать в Telegram", "Message on Telegram")}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
