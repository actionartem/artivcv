"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, useInView } from "framer-motion"
import { Building2, ChevronRight, Clock, Briefcase } from "lucide-react"
import Image from "next/image"
import { ExperienceModal } from "./experience-modal"

const experiences = [
  {
    id: 1,
    company: "HeadPoint",
    companyEn: "HeadPoint",
    logo: "/HP.png",
    role: "Руководитель продукта",
    roleEn: "Product Lead",
    period: "Октябрь 2024 — настоящее время",
    periodEn: "October 2024 — present",
    duration: "1 год и 7 месяцев",
    durationEn: "1 year 7 months",
    yearStart: 2024,
    yearEnd: 2026,
    website: "https://head-point.ru/",
    descriptionRu: `HeadPoint
Москва

Октябрь 2024 — настоящее время 1 год 7 месяцев

Руководитель продукта

Проект: ГИС ЕЦХД (государственная информационная система "Единый центр хранения и обработки данных")

1. Выстроил предсказуемый контур поставки продукта для заказчика: перевёл команду на 2-недельные спринты и сформировал годовой план релизов, что сделало сроки и релизную нагрузку управляемыми.

2. Выстроил работу кросс-функциональной команды 25+ человек и сделал четкий релизный процесс: от уточнения требований и оценки до релиза в PROD.

3. Снизил накопленный технический долг: обеспечил закрытие 800+ часов техдолга без просадки по новым контрактным обязательствам.

4. Снизил управленческие и релизные риски в сложном гос-контуре за счёт синхронизации ожиданий заказчика, сроков, объёма работ и релизной дисциплины.

5. Запустил GenAI-инициативы для ускорения операционных и аналитических процессов: автоматизировал классификацию инцидентов, создание тикетов, подготовку релизной документации и обработку данных по контуру с 400 000+ камер, что сократило долю ручной работы и ускорило разбор нестандартных кейсов.`,
    descriptionEn: `I work on the GIS ECSD project (state information system unified center for data storage and processing).

-I manage the full project cycle: requirements gathering, estimation, planning, assignment, control, testing, release.

-I manage a cross-functional team of 25+ (dev/qa/analytics/devops/support).

-I build communications with customers.

-I maintain mandatory documentation: analytical notes, release packages, acceptance protocols, regulations.

-Thanks to my modernizations in project flow (for example, transition to weekly sprints, creating clear schedules for quarters and year, competent prioritization) in a year of work we closed tech debt of 800+ development hours, while not suffering on current contracts.

-Stabilized the release loop: weekly hotfixes, contract releases, incident management and release coordination in ITSM

The company also has not only the government ECSD project, but also its own commercial b2b product InOne.
In InOne, my area of responsibility as a product manager:

-Responsible for the development and packaging of the B2B product InOne: I form vision, priorities and roadmap, coordinate them with sales/implementation/development.

-I manage the backlog and prioritization: balance development, tech debt and support, keep focus on what affects sales and implementation speed.

-I participate in presales and product pilots: market requirements, typical scenarios, limitations, expectations.`,
  },
  {
    id: 2,
    company: "Миллениал Групп",
    companyEn: "Millennial Group",
    logo: "/MG.png",
    role: "Руководитель продукта",
    roleEn: "Product Manager",
    period: "Октябрь 2022 — Сентябрь 2024",
    periodEn: "October 2022 — September 2024",
    duration: "2 года",
    durationEn: "2 years",
    yearStart: 2022,
    yearEnd: 2024,
    website: "https://millenial.group/",
    descriptionRu: `Миллениал Групп
Москва

Информационные технологии, системная интеграция, интернет

Интернет-компания (поисковики, платежные системы, соц.сети, информационно-познавательные и развлекательные ресурсы, продвижение сайтов и прочее)
Октябрь 2022 — Сентябрь 2024 2 года

Руководитель продукта

Платформа онлайн-услуг: консультации

1. Вырос из project manager в product lead за счёт собственной инициативы и предложенного плана развития продукта для выхода в B2C.

2. Нашёл и приоритизировал точки роста продукта через анализ пользовательских сценариев и конверсии; сформировал backlog и roadmap, сфокусированные на росте ключевых бизнес-метрик.

3. Собрал единый контур product ownership и delivery: синхронизировал разработку, дизайн, маркетинг и DevOps, чтобы ускорить вывод изменений и удерживать фокус команды на бизнес-результате.

4. Перезапустил фронт и обновил UX ключевого пользовательского пути, что увеличило долю пользователей, доходящих до покупки, примерно на 25%.

5. Запустил продукт на новых рынках: Казахстан и Аргентина. Локализация, юридическая адаптация, платёжные сценарии, поддержка и операционная модель.

6. Запустил и развивал B2B-направление: вёл пресейлы, партнёрские переговоры, согласование условий и запуск интеграций, превращая партнёрские договорённости в рабочие продуктовые сценарии.

7. С нуля вывел отдельный продукт - криптокошелёк в Telegram Mini App для банковского партнёра: собрал команду, довёл решение до MVP и коммерческой сделки.`,
    descriptionEn: `Online services platform: consultations (lawyers / psychologists / veterinarians).

At this workplace, I started as a project manager, but after 3 months I was promoted to product manager role, thanks to my initiative and the development plan provided for entering the b2c market.

-Identified growth points: which scenarios deliver results, what we simplify in the user journey, where we lose conversion.

-Collected and prioritized the backlog, formed the roadmap

-Led the B2B direction, conducted presales and communication with partners, agreed on terms, signed contracts, launched integrations/joint scenarios.

-In parallel, I kept delivery: coordinated the team (development/design/marketing/devops), deadlines, releases, risks.

-Relaunched the frontend and updated UX, this greatly simplified and improved the customer user journey and increased the percentage (about 25%) of customers who ultimately reached the final goal on the site (making a purchase).

-Launched the product in new markets (Kazakhstan and Argentina): localization, legal requirements, payments, organization of support and team providing online services in the required languages.

-Expanded acquisition channels and accelerated growth (through product improvements and collaboration with marketing).

Also while working at this company, there was a separate project that I launched from scratch - a crypto wallet in Telegram mini-app. It was a custom project from one of the partners, for a bank. I assembled a team and brought the product from the idea stage to launching MVP in production and completing a commercial deal to sell the product.`,
  },
  {
    id: 3,
    company: "Kremlin Store",
    companyEn: "Kremlin Store",
    logo: "/KS.png",
    role: "IT Project manager",
    roleEn: "IT Project Manager",
    period: "Январь 2021 — Сентябрь 2022",
    periodEn: "January 2021 — September 2022",
    duration: "1 год и 9 месяцев",
    durationEn: "1 year 9 months",
    yearStart: 2021,
    yearEnd: 2022,
    website: "https://kinostore.ru/",
    descriptionRu: `Kremlin Store
Москва

Электроника, приборостроение, бытовая техника, компьютеры и оргтехника

Бытовая техника, электроника, климатическое оборудование (продвижение, оптовая торговля)
Розничная торговля

Интернет-магазин
Январь 2021 — Сентябрь 2022 1 год 9 месяцев

IT Project manager

E-commerce. Онлайн/офлайн магазин по продаже фото-видео аппаратуры.

1. Запустил личный кабинет с нуля: сформировал концепцию, пользовательские сценарии и ключевые функции, включая статусы, историю заказов и профили.

2. Спроектировал и внедрил программу лояльности, усилив продуктовую ценность для клиента и создав основу для роста LTV и повторных покупок.

3. Систематизировал релизы и QA: внедрил понятный ритм релизов, документацию и прозрачную историю изменений, что повысило управляемость продукта.

4. Вёл развитие e-commerce-продукта end-to-end: постановка задач, планирование релизов, поддержка, взаимодействие с маркетингом, продажами и операционным блоком.

5. Участвовал в модернизации инфраструктурных процессов, связанных с точками продаж, кассовым контуром и видеонаблюдением, что усилило техническую насмотренность и системное понимание бизнеса.`,
    descriptionEn: `E-commerce (web product).

-Launched personal account (developed from scratch the idea and all cabinet work scenarios) with
key functional points (statuses, order history, profiles).
-Designed and implemented a loyalty program, which increased customer LTV and share
of repeat purchases.
-Put releases and QA in order, made a clear release schedule with documentation and
history of all changes.
My role in the company implied responsibility for:
-Full cycle of web product development: task setting, release planning, support.
-Interaction with business (marketing/sales/operations).
-Infrastructure modernization projects: cash registers, video surveillance, processes at points.
At this workplace, I dived deeper and developed very well in hard skills of project management`,
  },
  {
    id: 4,
    company: "Ceramic3d",
    companyEn: "Ceramic3d",
    logo: "/C3D.png",
    role: "Junior Project manager",
    roleEn: "Junior Project Manager",
    period: "Июнь 2016 — Сентябрь 2016",
    periodEn: "June 2016 — September 2016",
    duration: "4 месяца",
    durationEn: "4 months",
    yearStart: 2016,
    yearEnd: 2016,
    website: "https://ru.ceramic3d.com/",
    descriptionRu: `Ceramic3d
Екатеринбург

Информационные технологии, системная интеграция, интернет

Разработка программного обеспечения
Июнь 2016 — Сентябрь 2016 4 месяца

Junior Project manager

Работал в компании-разработчике программного обеспечения для дизайна интерьера.

1. Координировал внутренние процессы между командами, помогая сокращать сроки согласований.

2. Участвовал в подготовке релизов, клиентских коммуникациях и операционной поддержке команды.

3. Получил базу проектного управления и межфункционального взаимодействия в продуктовой разработке.`,
    descriptionEn: `Interior design software development company.
-Organized participation in exhibitions: stand, materials, presentations, product was shown
live and collected leads.
-Established interaction between departments: agreed on rules and deadlines, reduced
approvals.
-Support of manager and team: schedules, document flow, procurement, communications with
clients.
-Participation in releases and coordination of development tasks.

You could say I gained basic team management skills and understanding of how everything should work to get results and product development.`,
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
      className="relative py-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4">
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
            <Briefcase className="w-4 h-4" />
            {t("Карьерный путь", "Career Path")}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("Опыт работы", "Work Experience")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t(
              "Моя карьерная дорожная карта от Junior PM до руководителя продукта",
              "My career roadmap from Junior PM to Product Manager"
            )}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
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
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    activeIndex >= index
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              </div>

              {/* Card */}
              <motion.div
                className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
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
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono font-bold">
                    {exp.yearStart}
                    {exp.yearEnd !== exp.yearStart && ` — ${exp.yearEnd}`}
                  </span>
                </motion.div>

                <div
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    activeIndex === index
                      ? "bg-card border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-card/50 border-border hover:border-primary/20"
                  }`}
                  onClick={() => setSelectedExperience(exp)}
                >

                  {/* Logo Placeholder & Company */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
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
