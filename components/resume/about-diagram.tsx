"use client"

import { useLanguage } from "@/lib/language-context"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ProjectMatrixBackground } from "./project-matrix-background"

const profile = {
  ru: [
    "Руководитель IT-проектов с опытом управления полным циклом разработки и внедрения IT-решений: от сбора требований, оценки и планирования до релизов, запуска и сопровождения.",
    "Работал с государственными проектами, B2B-продуктами, e-commerce, fintech/crypto, онлайн-сервисами и внутренней автоматизацией. Управляю кросс-функциональными командами разработки, аналитики, тестирования, DevOps и поддержки. Уверенно работаю на стыке бизнеса, заказчика и технической команды.",
    "Ключевая экспертиза - управление сложными IT-проектами с большим количеством зависимостей, релизов, документации, интеграций и заинтересованных сторон. Понимаю SDLC, API, микросервисную архитектуру, клиент-серверные решения, production-процессы и технические ограничения разработки.",
  ],
  en: [
    "IT project leader experienced in managing the full development and implementation cycle: from requirements, estimation, and planning to releases, launch, and support.",
    "I have worked with government projects, B2B products, e-commerce, fintech and crypto, online services, and internal automation. I lead cross-functional development, analytics, QA, DevOps, and support teams, connecting business, customers, and engineering.",
    "My core expertise is managing complex IT projects with many dependencies, releases, documents, integrations, and stakeholders. I understand SDLC, APIs, microservice architecture, client-server solutions, production processes, and engineering constraints.",
  ],
}

const automation = {
  ru: [
    "Отдельное направление моей работы - внедрение AI-автоматизации и агентных систем в операционные процессы команды. Проектирую и настраиваю внутренние AI-ассистенты и агентные сценарии, которые помогают быстрее находить информацию в коде, задачах, технической документации и базе знаний, собирать контекст, готовить аналитические сводки, черновики документов, тикеты и материалы для релизов.",
    "Есть опыт настройки безопасного локального контура для работы с языковыми моделями: развёртывание на рабочем компьютере, работа в изолированном режиме без внешнего интернет-доступа, подключение к внутренним источникам данных, настройка правил работы с контекстом, шаблонов, памяти и сценариев под задачи команды. Использую AI-инструменты для ускорения операционных процессов, аналитики, подготовки документации, разбора инцидентов, поиска информации и повышения качества управленческих процессов.",
  ],
  en: [
    "A separate focus of my work is introducing AI automation and agent systems into team operations. I design internal AI assistants and workflows that search code, tasks, technical documentation, and knowledge bases, assemble context, and prepare summaries, document drafts, tickets, and release materials.",
    "I have experience building a secure local environment for language models: workstation deployment, isolated operation without external internet access, connections to internal data sources, and configuration of context rules, templates, memory, and team-specific scenarios. I use AI tools to accelerate operations, analytics, documentation, incident analysis, information retrieval, and management processes.",
  ],
}

const competencies = [
  ["Управление IT-проектами полного цикла", "Full-cycle IT project management", "Требования, оценка, планирование, backlog, roadmap, постановка задач, контроль реализации, тестирование, релизы, внедрение и сопровождение.", "Requirements, estimation, planning, backlog, roadmap, task management, delivery control, testing, releases, rollout, and support."],
  ["Delivery Management", "Delivery Management", "Координация разработки, аналитики, QA, DevOps, поддержки и внешних участников; релизное планирование, контроль готовности и вывод изменений в production.", "Coordination of development, analytics, QA, DevOps, support, and external participants; release planning and production rollout."],
  ["Stakeholder Management", "Stakeholder Management", "Коммуникации с заказчиками, бизнесом, подрядчиками и внутренними командами; договорённости, ожидания, сроки, риски и изменения.", "Communication with customers, business, contractors, and internal teams; agreements, expectations, timelines, risks, and changes."],
  ["Проектная и техническая документация", "Project and technical documentation", "СТ, ТЗ, ЧТЗ, API-описания, архитектурные материалы, ПМИ, руководства, тендерная документация, НМЦК и паспорт проекта.", "Specifications, API descriptions, architecture materials, test programs, manuals, tender documents, cost justification, and project passports."],
  ["Product / B2B", "Product / B2B", "Развитие продукта, roadmap, приоритизация backlog, пресейлы, пилоты, демонстрационные сценарии и запуск коммерческих внедрений.", "Product development, roadmap, backlog prioritization, presales, pilots, demo scenarios, and commercial launches."],
  ["Технический контур", "Technical landscape", "API, Swagger, Postman, SQL, PostgreSQL, MS SQL, Docker, Git, GitHub, GitLab, Bitbucket, микросервисы и клиент-серверная архитектура.", "APIs, Swagger, Postman, SQL, PostgreSQL, MS SQL, Docker, Git, GitHub, GitLab, Bitbucket, microservices, and client-server architecture."],
  ["AI / агентные системы", "AI / agent systems", "Рабочие AI-агенты, агентные пайплайны, локальные языковые модели, безопасный AI-контур, внутренние источники данных, память и контекст, поиск по коду и документации, автоматизация аналитики и обработки инцидентов.", "Operational AI agents, agent pipelines, local language models, secure environments, internal data sources, memory and context, search, analytics, and incident automation."],
  ["Методологии", "Methodologies", "Agile, Scrum, Kanban, Waterfall и PMBOK.", "Agile, Scrum, Kanban, Waterfall, and PMBOK."],
]

type AboutCard = "profile" | "automation" | "competencies"

export function AboutDiagram() {
  const { language, t } = useLanguage()
  const [activeCard, setActiveCard] = useState<AboutCard | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const profileCopy = language === "ru" ? profile.ru : profile.en
  const automationCopy = language === "ru" ? automation.ru : automation.en

  useEffect(() => {
    if (!activeCard) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCard(null)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", closeOnEscape)
    window.requestAnimationFrame(() => modalRef.current?.focus())

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [activeCard])

  const modalTitle = activeCard === "profile"
    ? t("Профиль и управленческая экспертиза", "Profile and management expertise")
    : activeCard === "automation"
      ? t("AI-автоматизация и агентные системы", "AI automation and agent systems")
      : t("Ключевые компетенции", "Core competencies")

  const cards = [
    {
      id: "profile" as AboutCard,
      number: "01",
      className: "about-node--profile",
      title: t("Профиль и управленческая экспертиза", "Profile and management expertise"),
      summary: t("Управляю полным циклом сложных IT-проектов - от требований и планирования до запуска и сопровождения. Координирую кросс-функциональные команды и связываю задачи бизнеса с технической реализацией.", "I manage the full cycle of complex IT projects, from requirements and planning to launch and support. I coordinate cross-functional teams and connect business goals with technical delivery."),
    },
    {
      id: "automation" as AboutCard,
      number: "02",
      className: "about-node--ai",
      title: t("AI-автоматизация и агентные системы", "AI automation and agent systems"),
      summary: t("Проектирую AI-ассистентов и агентные сценарии для поиска информации, аналитики, документации и обработки инцидентов. Настраиваю безопасные локальные контуры с внутренними источниками данных.", "I design AI assistants and agent workflows for information retrieval, analytics, documentation, and incident processing. I also configure secure local environments connected to internal data sources."),
    },
    {
      id: "competencies" as AboutCard,
      number: "03",
      className: "about-node--skills",
      title: t("Ключевые компетенции", "Core competencies"),
      summary: t("Project и Delivery Management, работа со стейкхолдерами, документацией и техническим контуром. Product/B2B, AI-агенты и методологии управления разработкой.", "Project and Delivery Management, stakeholder communication, documentation, and technical landscape. Product/B2B, AI agents, and software delivery methodologies."),
    },
  ]

  const rotateCarousel = (direction: -1 | 1) => {
    setCurrentIndex((index) => (index + direction + cards.length) % cards.length)
  }

  const getCardPosition = (index: number) => {
    const position = (index - currentIndex + cards.length) % cards.length
    return position === cards.length - 1 ? -1 : position
  }

  useEffect(() => {
    const rotateWithKeyboard = (event: KeyboardEvent) => {
      if (activeCard || (event.target as HTMLElement)?.matches("input, textarea, select, [contenteditable='true']")) return

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        rotateCarousel(-1)
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        rotateCarousel(1)
      }
    }

    window.addEventListener("keydown", rotateWithKeyboard)
    return () => window.removeEventListener("keydown", rotateWithKeyboard)
  }, [activeCard])

  return (
    <section id="about" className="about-diagram">
      <ProjectMatrixBackground mode="workflows" />
      <div className="about-diagram__content">
        <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="about-diagram__header">
          <span>02 / ABOUT</span>
          <h2>{t("Обо мне", "About me")}</h2>
        </motion.header>

        <div className="about-carousel">
          <div className="about-carousel__stage">
            {cards.map((card, index) => {
              const position = getCardPosition(index)
              const isActive = position === 0

              return (
                <motion.article
                  key={card.id}
                  className={`about-node about-carousel__item ${card.className}${isActive ? " about-carousel__item--active" : ""}`}
                  initial={false}
                  animate={{
                    x: position === 0 ? "-50%" : position < 0 ? "-116%" : "16%",
                    scale: isActive ? 1 : .82,
                    rotateY: position < 0 ? 16 : position > 0 ? -16 : 0,
                    opacity: isActive ? 1 : .46,
                    zIndex: isActive ? 3 : 1,
                  }}
                  transition={{ duration: .72, ease: [.22, 1, .36, 1] }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={.18}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55) rotateCarousel(1)
                    if (info.offset.x > 55) rotateCarousel(-1)
                  }}
                  onClick={(event) => {
                    if (!isActive && !(event.target as HTMLElement).closest("button")) setCurrentIndex(index)
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="about-node__head"><span>{card.number}</span></div>
                  <h3>{card.title}</h3>
                  <p className="about-node__summary">{card.summary}</p>
                  <button type="button" tabIndex={isActive ? 0 : -1} className="about-node__more" onClick={() => setActiveCard(card.id)}>{t("Подробнее", "Learn more")}<ArrowUpRight aria-hidden="true" /></button>
                </motion.article>
              )
            })}
          </div>

          <div className="about-carousel__controls">
            <button type="button" onClick={() => rotateCarousel(-1)} aria-label={t("Предыдущая карточка", "Previous card")}><ArrowLeft aria-hidden="true" /></button>
            <div className="about-carousel__dots" aria-label={t("Выбор карточки", "Choose a card")}>
              {cards.map((card, index) => <button type="button" key={card.id} className={index === currentIndex ? "is-active" : ""} onClick={() => setCurrentIndex(index)} aria-label={`${index + 1} / ${cards.length}`} />)}
            </div>
            <button type="button" onClick={() => rotateCarousel(1)} aria-label={t("Следующая карточка", "Next card")}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCard && (
          <motion.div className="about-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveCard(null)}>
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-modal-title"
              tabIndex={-1}
              className={`about-modal__card about-modal__card--${activeCard}`}
              initial={{ opacity: 0, y: 28, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: .97 }}
              transition={{ duration: .24, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="about-modal__head">
                <span>{activeCard === "profile" ? "01" : activeCard === "automation" ? "02" : "03"}</span>
                <button type="button" onClick={() => setActiveCard(null)} aria-label={t("Закрыть", "Close")}><X aria-hidden="true" /></button>
              </div>
              <h3 id="about-modal-title">{modalTitle}</h3>

              {activeCard === "profile" && <div className="about-modal__copy">{profileCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              {activeCard === "automation" && <div className="about-modal__copy">{automationCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              {activeCard === "competencies" && (
                <div className="about-modal__competencies">
                  {competencies.map(([ru, en, descriptionRu, descriptionEn], index) => (
                    <div className="about-competency" key={en}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h4>{t(ru, en)}</h4><p>{t(descriptionRu, descriptionEn)}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
