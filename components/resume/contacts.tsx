"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { localize, resumeData } from "@/lib/resume-data"

export function Contacts() {
  const { language, t } = useLanguage()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (resetRef.current) clearTimeout(resetRef.current)
  }, [])

  const copyContact = async (key: string, value: string) => {
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
      textarea.remove()
    }

    if (resetRef.current) clearTimeout(resetRef.current)
    setCopiedKey(key)
    resetRef.current = setTimeout(() => setCopiedKey(null), 1800)
  }

  return (
    <section id="contacts" className="section contacts-section" aria-labelledby="contacts-title">
      <div className="section__inner contacts-section__layout">
        <div className="contacts-section__heading">
          <h2 id="contacts-title">{t("Давайте обсудим задачу", "Let’s discuss the role")}</h2>
          <p>{t("Открыт к предложениям по управлению IT-проектами. Москва, удалённый, гибридный или офисный формат.", "Open to IT project management opportunities in Moscow, remote, hybrid, or office formats.")}</p>
        </div>

        <div className="contact-list">
          {resumeData.contacts.map((contact) => (
            <div className="contact-row" key={contact.id}>
              <span>{localize(contact.label, language)}</span>
              <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined}>
                {contact.value}<ArrowUpRight aria-hidden="true" />
              </a>
              <button type="button" onClick={() => copyContact(contact.id, contact.copyValue)} aria-label={t(`Скопировать ${localize(contact.label, language)}`, `Copy ${localize(contact.label, language)}`)}>
                {copiedKey === contact.id ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                <span aria-live="polite">{copiedKey === contact.id ? t("Скопировано", "Copied") : t("Копировать", "Copy")}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
