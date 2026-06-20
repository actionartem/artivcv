"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, useInView } from "framer-motion"
import { Building2, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"
import { ExperienceModal } from "./experience-modal"
import { ProjectMatrixBackground } from "./project-matrix-background"

const experiences = [
  {
    id: 1,
    company: "HeadPoint",
    companyEn: "HeadPoint",
    logo: "/HP.png",
    role: "Руководитель IT проектов",
    roleEn: "IT Project Lead",
    period: "Октябрь 2024 - настоящее время",
    periodEn: "October 2024 - present",
    duration: "1 год 9 месяцев",
    durationEn: "1 year 9 months",
    yearStart: 2024,
    yearEnd: 2026,
    website: "https://head-point.ru/",
    descriptionRu: `Работаю на проекте ГИС ЕЦХД - государственной информационной системе “Единый центр хранения и обработки данных”. Видеонаблюдение Москвы.

-Управляю полным циклом IT-проектов: сбор и уточнение требований, оценка, планирование, постановка задач, контроль реализации, релиз и сопровождение.
-Координирую кросс-функциональную команду 25+ человек: разработка, аналитика, тестирование, DevOps, СТП.
-Веду коммуникации с заказчиками: регулярные статусы, фиксация договоренностей, управление ожиданиями, сроками, рисками и изменениями.
-Отвечаю за подготовку и согласование технической, проектной и тендерной документации: СТ, ТЗ, API-описания, архитектурные материалы, ПМИ, руководства, ЧТЗ, НМЦК, паспорт проекта.
-Управляю релизным процессом: планирование релизов, контроль готовности задач, координация тестирования и сопровождение вывода изменений в ПРОД.
-Перестроил операционный процесс: внедрил двухнедельные спринты и план-график релизов на 12 месяцев.
-Организовал системную работу с накопленным техническим долгом: закрыто 800+ часов без снижения темпа работ по новым контрактным обязательствам.
-Выстроил прозрачный путь разработки: от входящих требований и оценки до реализации, тестирования и вывода изменений в ПРОД.
-Спроектировал и внедрил агентные решения для автоматизации рабочих процессов: быстрый поиск информации по коду, задачам, технической документации и внутренней базе знаний, подготовка аналитических сводок, тикетов, релизных материалов и проектной документации.
-Настроил безопасный локальный контур для работы с языковыми моделями и агентными сценариями: работа на локальном компьютере, изолированный режим без внешнего интернет-доступа, подключение к внутренним источникам данных, настройка правил работы с контекстом, памяти и шаблонов под задачи команды.
-Адаптировал AI-сценарии под внутреннюю предметную область проекта: разбор требований, анализ инцидентов, поиск по документации, сопоставление данных из задач и технических материалов, подготовка черновиков решений и управленческих выводов.
-За счёт AI-автоматизации ускорил подготовку аналитики, документации, разбор инцидентов и поиск информации по проекту. Это повысило скорость реакции команды, снизило ручную нагрузку и улучшило качество проработки задач.

Дополнительное направление - B2B-продукт InOne:

-Отвечаю за развитие B2B-продукта InOne: формирую видение, приоритеты и roadmap совместно с бизнесом и разработкой.
-Управляю бэклогом и приоритизацией: балансирую развитие продукта, поддержку текущих проектов и задачи, влияющие на продажи и скорость внедрений.
-Участвую в пресейлах и пилотах продукта: прорабатываю типовые сценарии, демонстрационные кейсы и варианты внедрения для клиентов.`,
    descriptionEn: `I work on GIS ECHD, the state information system Unified Center for Data Storage and Processing. Moscow video surveillance.

-I manage the full IT project cycle: gathering and clarifying requirements, estimation, planning, task assignment, implementation control, release, and support.
-I coordinate a cross-functional team of 25+ people across development, analytics, QA, DevOps, and technical support.
-I communicate with customers through regular status updates, documented agreements, and management of expectations, timelines, risks, and changes.
-I prepare and coordinate technical, project, and tender documentation: specifications, API descriptions, architecture materials, test programs, manuals, cost justification, and project passports.
-I manage the release process: release planning, readiness control, testing coordination, and production rollout support.
-I rebuilt the operating process by introducing two-week sprints and a twelve-month release schedule.
-I organized systematic technical debt reduction: more than 800 hours were completed without slowing work on new contractual commitments.
-I established a transparent development path from incoming requirements and estimation to implementation, testing, and production rollout.
-I designed and implemented agent solutions for process automation: fast search across code, tasks, technical documentation, and the internal knowledge base, plus preparation of analytical summaries, tickets, release materials, and project documents.
-I configured a secure local environment for language models and agent workflows: local workstation operation, isolation without external internet access, connections to internal data sources, and task-specific context, memory, and template rules.
-I adapted AI workflows to the project's domain: requirements analysis, incident investigation, documentation search, comparison of task and technical data, and preparation of solution drafts and management conclusions.
-AI automation accelerated analytics, documentation, incident investigation, and project information retrieval. It improved team response time, reduced manual workload, and increased the quality of task preparation.

Additional focus - InOne B2B product:

-I am responsible for the development of the InOne B2B product, shaping its vision, priorities, and roadmap together with business and engineering.
-I manage the backlog and prioritization, balancing product development, support for current projects, sales impact, and implementation speed.
-I participate in presales and product pilots, preparing typical scenarios, demonstration cases, and client implementation options.`,
  },
  {
    id: 2,
    company: "Миллениал Групп",
    companyEn: "Millennial Group",
    logo: "/MG.png",
    role: "Руководитель IT проектов",
    roleEn: "IT Project Manager",
    period: "Октябрь 2022 - Сентябрь 2024",
    periodEn: "October 2022 - September 2024",
    duration: "2 года",
    durationEn: "2 years",
    yearStart: 2022,
    yearEnd: 2024,
    website: "https://millenial.group/",
    descriptionRu: `Платформа онлайн-услуг: юридические, психологические и ветеринарные консультации.

-Управлял развитием платформы онлайн-услуг: анализировал пользовательские сценарии, определял точки роста, формировал backlog и roadmap продукта.
-Координировал delivery-процессы: разработка, дизайн, маркетинг, DevOps, планирование релизов, контроль сроков и качества.
-Развивал B2B-направление: проводил пресейлы, вел коммуникации с партнерами, согласовывал условия, сопровождал заключение контрактов и запуск совместных сценариев.
-Совместно с командой перезапустил frontend и обновил UX ключевых пользовательских сценариев, что увеличило долю клиентов, доходящих до покупки, примерно на 25%.
-Запустил продукт на рынках Казахстана и Аргентины: локализация, анализ юридических требований, платежная инфраструктура, поддержка и организация команды онлайн-консультантов на нужных языках.
-Запустил с нуля заказной B2B fintech/crypto-проект - крипто-кошелек в формате Telegram Mini App: собрал команду, организовал разработку MVP, production-запуск и передачу продукта заказчику в рамках коммерческой сделки.`,
    descriptionEn: `Online services platform providing legal, psychological, and veterinary consultations.

-I managed the development of the online services platform: analyzed user journeys, identified growth opportunities, and built the product backlog and roadmap.
-I coordinated delivery across development, design, marketing, and DevOps, including release planning and control of deadlines and quality.
-I developed the B2B direction: conducted presales, communicated with partners, negotiated terms, supported contract signing, and launched joint scenarios.
-Together with the team, I relaunched the frontend and updated the UX of key user journeys, increasing the share of customers reaching a purchase by approximately 25%.
-I launched the product in Kazakhstan and Argentina, covering localization, legal requirements, payment infrastructure, support, and organization of multilingual online consultants.
-I launched a custom B2B fintech and crypto project from scratch: a crypto wallet built as a Telegram Mini App. I assembled the team, organized MVP development and production launch, and transferred the product to the customer as part of a commercial deal.`,
  },
  {
    id: 3,
    company: "Kremlin Store",
    companyEn: "Kremlin Store",
    logo: "/KS.png",
    role: "IT Project manager",
    roleEn: "IT Project Manager",
    period: "Январь 2021 - Сентябрь 2022",
    periodEn: "January 2021 - September 2022",
    duration: "1 год 9 месяцев",
    durationEn: "1 year 9 months",
    yearStart: 2021,
    yearEnd: 2022,
    website: "https://kinostore.ru/",
    descriptionRu: `E-commerce / веб-продукт.

-Управлял развитием e-commerce веб-продукта: собирал требования от бизнеса, формировал задачи, планировал релизы и контролировал реализацию.
-Запустил личный кабинет клиента с ключевыми сценариями: профиль пользователя, история заказов, статусы заказов и повторные покупки.
-Спроектировал и внедрил программу лояльности, направленную на рост LTV и доли повторных покупок.
-Выстроил процесс релизов и QA: регулярный график выпусков, документация изменений, контроль тестирования и фиксация истории релизов.
-Взаимодействовал с бизнес-направлениями: маркетинг, продажи, операционные процессы и розничные точки.
-Участвовал в проектах модернизации инфраструктуры: кассы, видеонаблюдение и внутренние процессы на торговых точках.`,
    descriptionEn: `E-commerce web product.

-I managed the development of the e-commerce web product: gathered business requirements, defined tasks, planned releases, and controlled implementation.
-I launched a customer account with key scenarios including user profiles, order history, order statuses, and repeat purchases.
-I designed and implemented a loyalty program aimed at increasing LTV and repeat purchases.
-I established the release and QA process with a regular delivery schedule, change documentation, testing control, and release history.
-I worked with marketing, sales, operations, and retail teams.
-I participated in infrastructure modernization projects involving cash registers, video surveillance, and internal retail processes.`,
  },
  {
    id: 4,
    company: "Ceramic3d",
    companyEn: "Ceramic3d",
    logo: "/C3D.png",
    role: "Junior Project manager",
    roleEn: "Junior Project Manager",
    period: "Июнь 2016 - Сентябрь 2016",
    periodEn: "June 2016 - September 2016",
    duration: "4 месяца",
    durationEn: "4 months",
    yearStart: 2016,
    yearEnd: 2016,
    website: "https://ru.ceramic3d.com/",
    descriptionRu: `Компания-разработчик ПО для дизайна интерьера.

Поддерживал руководителя проекта и команду разработки: вел расписания, документооборот, закупки и коммуникации с клиентами.
Участвовал в координации задач разработки и подготовке релизов.
Наладил взаимодействие между отделами: помог формализовать договоренности, сроки и правила коммуникации.
Организовывал участие компании в выставках: подготовка стенда, материалов, презентаций и демонстрация продукта потенциальным клиентам.`,
    descriptionEn: `Interior design software company.

I supported the project manager and development team by maintaining schedules, document workflows, procurement, and client communications.
I participated in development task coordination and release preparation.
I improved collaboration between departments by helping formalize agreements, timelines, and communication rules.
I organized the company's participation in exhibitions, including the stand, materials, presentations, and product demonstrations for potential customers.`,
  },
]

export function ExperienceRoadmap() {
  const { t } = useLanguage()
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const cards = sectionRef.current.querySelectorAll("[data-experience-card]")
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveIndex(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-roadmap relative py-16 overflow-hidden"
    >
      <ProjectMatrixBackground mode="experience" />
      
      <div className="experience-roadmap__content container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="experience-roadmap__header text-center mb-16"
        >
          <span className="experience-roadmap__eyebrow">03 / EXPERIENCE</span>
          <h2 className="experience-roadmap__title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("Опыт работы", "Work Experience")}
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="experience-timeline relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="experience-timeline__line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div
              className="w-full bg-primary"
              style={{
                height: `${((activeIndex + 1) / experiences.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              data-experience-card
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`experience-entry relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  className={`experience-entry__node w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    activeIndex >= index
                      ? "experience-entry__node--active bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              </div>

              {/* Card */}
              <motion.div
                className={`experience-entry__column ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Year Badge above card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mb-3"
                >
                  <span className="experience-entry__year inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono font-bold">
                    {exp.yearStart}
                    {exp.yearEnd !== exp.yearStart && ` - ${exp.yearEnd}`}
                  </span>
                </motion.div>

                <div
                  className={`experience-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    activeIndex === index
                      ? "experience-card--active bg-card border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-card/50 border-border hover:border-primary/20"
                  }`}
                  onClick={() => setSelectedExperience(exp)}
                >

                  {/* Logo Placeholder & Company */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="experience-card__logo relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={t(exp.company, exp.companyEn)}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-lg truncate">
                        {t(exp.company, exp.companyEn)}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {t(exp.role, exp.roleEn)}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{t(exp.period, exp.periodEn)}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                      {t(exp.duration, exp.durationEn)}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm text-primary font-medium group/btn"
                  >
                    {t("Подробнее", "Learn more")}
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ExperienceModal
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        experience={selectedExperience}
      />
    </section>
  )
}
