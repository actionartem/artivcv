"use client"

import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send, Briefcase, Calendar, Building2 } from "lucide-react"
import { useRef, useState } from "react"

export function Hero() {
  const { t } = useLanguage()

  const contacts = [
    {
      icon: Phone,
      label: "+7 (999) 559-83-22",
      copyValue: "+7 (999) 559-83-22",
      copyLabelRu: "Телефон скопирован",
      copyLabelEn: "Phone copied",
    },
    {
      icon: Send,
      label: "@artivtw",
      href: "https://t.me/artivtw",
    },
    {
      icon: Mail,
      label: "prmgartiv@gmail.com",
      copyValue: "prmgartiv@gmail.com",
      copyLabelRu: "Почта скопирована",
      copyLabelEn: "Email copied",
    },
  ]

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

  const workFormats = [
    { ru: "удалённо", en: "remote" },
    { ru: "гибрид", en: "hybrid" },
    { ru: "офис", en: "office" },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 animate-grid" />
      
      {/* Decorative Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <motion.line
          x1="10%"
          y1="20%"
          x2="30%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="90%"
          y1="10%"
          x2="70%"
          y2="90%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.circle
          cx="85%"
          cy="25%"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.rect
          x="5%"
          y="60%"
          width="60"
          height="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </svg>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("Открыт к предложениям", "Open to opportunities")}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance"
            >
              {t("Иванов Артем", "Artem Ivanov")}
              <span className="block text-primary">{t("Антонович", "Antonovich")}</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-6"
            >
              {t("Руководитель продукта с опытом работы 5+ лет", "Product Manager with 5+ years of experience")}
            </motion.p>

            {/* Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("Возраст", "Age")}</p>
                  <p className="font-medium text-foreground">31 {t("год", "y.o.")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("Город", "City")}</p>
                  <p className="font-medium text-foreground">{t("Москва", "Moscow")}</p>
                </div>
              </div>
            </motion.div>

            {/* Work Format */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {t("Формат работы", "Work format")}
              </p>
              <div className="flex flex-wrap gap-2">
                {workFormats.map((format, index) => (
                  <motion.span
                    key={format.ru}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {t(format.ru, format.en)}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3"
            >
              {contacts.map((contact, index) => {
                const className =
                  "flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"

                if (contact.copyValue) {
                  return (
                    <motion.button
                      key={contact.label}
                      type="button"
                      onClick={() =>
                        handleCopy(
                          contact.copyValue,
                          contact.copyLabelRu ?? "Скопировано",
                          contact.copyLabelEn ?? "Copied",
                          contact.label,
                        )
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${className} relative`}
                    >
                      <contact.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground">{contact.label}</span>
                      {copiedKey === contact.label && copiedMessage ? (
                        <span className="absolute -top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground shadow-sm">
                          {copiedMessage}
                        </span>
                      ) : null}
                    </motion.button>
                  )
                }

                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href?.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={className}
                  >
                    <contact.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-foreground">{contact.label}</span>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right: Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-primary/10"
              />
              
              {/* Photo container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden group"
              >
                {/* Placeholder content */}
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-primary/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("Место для фото", "Photo placeholder")}
                  </p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
