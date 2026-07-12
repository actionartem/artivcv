export type Language = "ru" | "en"

export type LocalizedText = {
  ru: string
  en: string
}

export type ResumeDirection = {
  title: string
  description: LocalizedText
}

export type Experience = {
  id: string
  company: LocalizedText
  logo: string
  role: LocalizedText
  period: LocalizedText
  duration: LocalizedText
  website: string
  context: LocalizedText
  highlights: LocalizedText[]
  description: LocalizedText
}

export type CompetencyDomain = {
  id: string
  title: LocalizedText
  description: LocalizedText
  competencies: LocalizedText[]
  tools: string[]
}

export const resumeData = {
  identity: {
    name: { ru: "Артём Иванов", en: "Artem Ivanov" },
    fullName: { ru: "Иванов Артём Антонович", en: "Artem Antonovich Ivanov" },
    role: { ru: "Руководитель IT-проектов", en: "IT Project Manager" },
    location: { ru: "Москва", en: "Moscow" },
    intro: {
      ru: "Управляю сложными IT-проектами и продуктами на стыке бизнеса, заказчика и технической команды.",
      en: "I lead complex IT projects and products across business, customer, and engineering teams.",
    },
  },
  navigation: [
    { id: "about", label: { ru: "Обо мне", en: "About" } },
    { id: "experience", label: { ru: "Опыт", en: "Experience" } },
    { id: "competencies", label: { ru: "Компетенции", en: "Competencies" } },
    { id: "education", label: { ru: "Образование", en: "Education" } },
    { id: "contacts", label: { ru: "Контакты", en: "Contacts" } },
  ],
  directions: [
    {
      title: "Product & Delivery",
      description: { ru: "Веду продукт от идеи до стабильного релиза", en: "I lead products from idea to stable release" },
    },
    {
      title: "Team & Process",
      description: { ru: "Выстраиваю работу кросс-функциональных команд", en: "I build effective cross-functional teamwork" },
    },
    {
      title: "Complex Systems",
      description: { ru: "Управляю интеграциями, рисками и эксплуатацией", en: "I manage integrations, risks, and operations" },
    },
    {
      title: "AI & Automation",
      description: { ru: "Внедряю AI в рабочие и аналитические процессы", en: "I embed AI into operational and analytical workflows" },
    },
  ] satisfies ResumeDirection[],
  about: {
    lead: {
      ru: "Руководитель IT-проектов с опытом полного цикла разработки и внедрения: от требований, оценки и планирования до релизов, запуска и сопровождения.",
      en: "IT project leader experienced in the full development and implementation cycle, from requirements and planning to release, launch, and support.",
    },
    paragraphs: [
      {
        ru: "Работал с государственными проектами, B2B-продуктами, e-commerce, fintech/crypto, онлайн-сервисами и внутренней автоматизацией. Управляю кросс-функциональными командами разработки, аналитики, тестирования, DevOps и поддержки.",
        en: "I have worked with government projects, B2B products, e-commerce, fintech and crypto, online services, and internal automation. I lead cross-functional development, analytics, QA, DevOps, and support teams.",
      },
      {
        ru: "Ключевая экспертиза - сложные IT-проекты с большим количеством зависимостей, релизов, документации, интеграций и заинтересованных сторон. Понимаю SDLC, API, микросервисную архитектуру, production-процессы и технические ограничения разработки.",
        en: "My core expertise is complex IT projects with many dependencies, releases, documents, integrations, and stakeholders. I understand SDLC, APIs, microservice architecture, production processes, and engineering constraints.",
      },
      {
        ru: "Отдельное направление работы - внедрение AI-автоматизации и агентных систем в операционные процессы команды, включая безопасные локальные контуры и подключение внутренних источников данных.",
        en: "A separate focus is introducing AI automation and agent systems into team operations, including secure local environments connected to internal data sources.",
      },
    ],
    focus: [
      { ru: "Полный цикл управления IT-проектами", en: "Full-cycle IT project management" },
      { ru: "Delivery и релизное управление", en: "Delivery and release management" },
      { ru: "Работа с заказчиком и стейкхолдерами", en: "Customer and stakeholder management" },
      { ru: "Техническая и проектная документация", en: "Technical and project documentation" },
      { ru: "B2B-продукты и пресейлы", en: "B2B products and presales" },
      { ru: "AI-автоматизация рабочих процессов", en: "AI workflow automation" },
    ],
  },
  experiences: [
    {
      id: "headpoint",
      company: { ru: "HeadPoint", en: "HeadPoint" },
      logo: "/HP.png",
      role: { ru: "Руководитель IT проектов", en: "IT Project Lead" },
      period: { ru: "Октябрь 2024 - настоящее время", en: "October 2024 - present" },
      duration: { ru: "1 год 9 месяцев", en: "1 year 9 months" },
      website: "https://head-point.ru/",
      context: {
        ru: "ГИС ЕЦХД, видеонаблюдение Москвы. Дополнительное направление - B2B-продукт InOne.",
        en: "GIS ECHD, Moscow video surveillance. Additional focus: the InOne B2B product.",
      },
      highlights: [
        { ru: "Координация кросс-функциональной команды 25+ человек: разработка, аналитика, QA, DevOps и СТП.", en: "Coordination of a 25+ person cross-functional team across development, analytics, QA, DevOps, and support." },
        { ru: "Закрыто 800+ часов технического долга без снижения темпа новых контрактных обязательств.", en: "Completed 800+ hours of technical debt without slowing new contractual commitments." },
        { ru: "Внедрены двухнедельные спринты и план-график релизов на 12 месяцев.", en: "Introduced two-week sprints and a twelve-month release schedule." },
        { ru: "Спроектированы AI-агенты и безопасный локальный контур для аналитики, документации и разбора инцидентов.", en: "Designed AI agents and a secure local environment for analytics, documentation, and incident analysis." },
      ],
      description: {
        ru: `Работаю на проекте ГИС ЕЦХД - государственной информационной системе “Единый центр хранения и обработки данных”. Видеонаблюдение Москвы.

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
        en: `I work on GIS ECHD, the state information system Unified Center for Data Storage and Processing. Moscow video surveillance.

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
    },
    {
      id: "millennial",
      company: { ru: "Миллениал Групп", en: "Millennial Group" },
      logo: "/MG.png",
      role: { ru: "Руководитель IT проектов", en: "IT Project Manager" },
      period: { ru: "Октябрь 2022 - Сентябрь 2024", en: "October 2022 - September 2024" },
      duration: { ru: "2 года", en: "2 years" },
      website: "https://millenial.group/",
      context: { ru: "Платформа онлайн-услуг: юридические, психологические и ветеринарные консультации.", en: "Online services platform providing legal, psychological, and veterinary consultations." },
      highlights: [
        { ru: "Перезапуск frontend и UX увеличил долю клиентов, доходящих до покупки, примерно на 25%.", en: "A frontend and UX relaunch increased the share of customers reaching a purchase by approximately 25%." },
        { ru: "Запуск продукта на рынках Казахстана и Аргентины.", en: "Launched the product in Kazakhstan and Argentina." },
        { ru: "С нуля запущен B2B fintech/crypto-проект в формате Telegram Mini App.", en: "Launched a B2B fintech and crypto Telegram Mini App from scratch." },
      ],
      description: {
        ru: `Платформа онлайн-услуг: юридические, психологические и ветеринарные консультации.

-Управлял развитием платформы онлайн-услуг: анализировал пользовательские сценарии, определял точки роста, формировал backlog и roadmap продукта.
-Координировал delivery-процессы: разработка, дизайн, маркетинг, DevOps, планирование релизов, контроль сроков и качества.
-Развивал B2B-направление: проводил пресейлы, вел коммуникации с партнерами, согласовывал условия, сопровождал заключение контрактов и запуск совместных сценариев.
-Совместно с командой перезапустил frontend и обновил UX ключевых пользовательских сценариев, что увеличило долю клиентов, доходящих до покупки, примерно на 25%.
-Запустил продукт на рынках Казахстана и Аргентины: локализация, анализ юридических требований, платежная инфраструктура, поддержка и организация команды онлайн-консультантов на нужных языках.
-Запустил с нуля заказной B2B fintech/crypto-проект - крипто-кошелек в формате Telegram Mini App: собрал команду, организовал разработку MVP, production-запуск и передачу продукта заказчику в рамках коммерческой сделки.`,
        en: `Online services platform providing legal, psychological, and veterinary consultations.

-I managed the development of the online services platform: analyzed user journeys, identified growth opportunities, and built the product backlog and roadmap.
-I coordinated delivery across development, design, marketing, and DevOps, including release planning and control of deadlines and quality.
-I developed the B2B direction: conducted presales, communicated with partners, negotiated terms, supported contract signing, and launched joint scenarios.
-Together with the team, I relaunched the frontend and updated the UX of key user journeys, increasing the share of customers reaching a purchase by approximately 25%.
-I launched the product in Kazakhstan and Argentina, covering localization, legal requirements, payment infrastructure, support, and organization of multilingual online consultants.
-I launched a custom B2B fintech and crypto project from scratch: a crypto wallet built as a Telegram Mini App. I assembled the team, organized MVP development and production launch, and transferred the product to the customer as part of a commercial deal.`,
      },
    },
    {
      id: "kremlin-store",
      company: { ru: "Kremlin Store", en: "Kremlin Store" },
      logo: "/KS.png",
      role: { ru: "IT Project manager", en: "IT Project Manager" },
      period: { ru: "Январь 2021 - Сентябрь 2022", en: "January 2021 - September 2022" },
      duration: { ru: "1 год 9 месяцев", en: "1 year 9 months" },
      website: "https://kinostore.ru/",
      context: { ru: "E-commerce / веб-продукт.", en: "E-commerce web product." },
      highlights: [
        { ru: "Запущен личный кабинет с профилем, историей и статусами заказов, повторными покупками.", en: "Launched a customer account with profiles, order history and statuses, and repeat purchases." },
        { ru: "Спроектирована и внедрена программа лояльности для роста LTV и повторных покупок.", en: "Designed and implemented a loyalty program to increase LTV and repeat purchases." },
        { ru: "Выстроены регулярный график релизов, QA и документация изменений.", en: "Established a regular release schedule, QA process, and change documentation." },
      ],
      description: {
        ru: `E-commerce / веб-продукт.

-Управлял развитием e-commerce веб-продукта: собирал требования от бизнеса, формировал задачи, планировал релизы и контролировал реализацию.
-Запустил личный кабинет клиента с ключевыми сценариями: профиль пользователя, история заказов, статусы заказов и повторные покупки.
-Спроектировал и внедрил программу лояльности, направленную на рост LTV и доли повторных покупок.
-Выстроил процесс релизов и QA: регулярный график выпусков, документация изменений, контроль тестирования и фиксация истории релизов.
-Взаимодействовал с бизнес-направлениями: маркетинг, продажи, операционные процессы и розничные точки.
-Участвовал в проектах модернизации инфраструктуры: кассы, видеонаблюдение и внутренние процессы на торговых точках.`,
        en: `E-commerce web product.

-I managed the development of the e-commerce web product: gathered business requirements, defined tasks, planned releases, and controlled implementation.
-I launched a customer account with key scenarios including user profiles, order history, order statuses, and repeat purchases.
-I designed and implemented a loyalty program aimed at increasing LTV and repeat purchases.
-I established the release and QA process with a regular delivery schedule, change documentation, testing control, and release history.
-I worked with marketing, sales, operations, and retail teams.
-I participated in infrastructure modernization projects involving cash registers, video surveillance, and internal retail processes.`,
      },
    },
    {
      id: "ceramic3d",
      company: { ru: "Ceramic3d", en: "Ceramic3d" },
      logo: "/C3D.png",
      role: { ru: "Junior Project manager", en: "Junior Project Manager" },
      period: { ru: "Июнь 2016 - Сентябрь 2016", en: "June 2016 - September 2016" },
      duration: { ru: "4 месяца", en: "4 months" },
      website: "https://ru.ceramic3d.com/",
      context: { ru: "Компания-разработчик ПО для дизайна интерьера.", en: "Interior design software company." },
      highlights: [
        { ru: "Поддержка руководителя проекта и команды: расписания, документооборот, закупки, клиенты.", en: "Supported the project manager and team with schedules, documentation, procurement, and clients." },
        { ru: "Координация задач разработки и подготовка релизов.", en: "Coordinated development tasks and release preparation." },
        { ru: "Организация выставок, презентаций и демонстраций продукта.", en: "Organized exhibitions, presentations, and product demonstrations." },
      ],
      description: {
        ru: `Компания-разработчик ПО для дизайна интерьера.

Поддерживал руководителя проекта и команду разработки: вел расписания, документооборот, закупки и коммуникации с клиентами.
Участвовал в координации задач разработки и подготовке релизов.
Наладил взаимодействие между отделами: помог формализовать договоренности, сроки и правила коммуникации.
Организовывал участие компании в выставках: подготовка стенда, материалов, презентаций и демонстрация продукта потенциальным клиентам.`,
        en: `Interior design software company.

I supported the project manager and development team by maintaining schedules, document workflows, procurement, and client communications.
I participated in development task coordination and release preparation.
I improved collaboration between departments by helping formalize agreements, timelines, and communication rules.
I organized the company's participation in exhibitions, including the stand, materials, presentations, and product demonstrations for potential customers.`,
      },
    },
  ] satisfies Experience[],
  competencyDomains: [
    {
      id: "project",
      title: { ru: "Управление проектами", en: "Project management" },
      description: { ru: "Превращаю требования и ограничения в прозрачный план поставки результата.", en: "I turn requirements and constraints into a transparent delivery plan." },
      competencies: [
        { ru: "Требования, оценка и планирование", en: "Requirements, estimation, and planning" },
        { ru: "Roadmap, backlog и приоритизация", en: "Roadmap, backlog, and prioritization" },
        { ru: "Риски, сроки и изменения", en: "Risks, timelines, and changes" },
      ],
      tools: ["Jira", "Confluence", "YouTrack", "Trello", "Asana"],
    },
    {
      id: "product",
      title: { ru: "Продуктовая работа", en: "Product work" },
      description: { ru: "Развиваю B2B и B2C-продукты, связывая пользовательскую ценность с возможностями команды.", en: "I develop B2B and B2C products by connecting user value with team capabilities." },
      competencies: [
        { ru: "Product vision и discovery", en: "Product vision and discovery" },
        { ru: "B2B, пресейлы и пилоты", en: "B2B, presales, and pilots" },
        { ru: "Метрики и пользовательские сценарии", en: "Metrics and user journeys" },
      ],
      tools: ["Miro", "Figma", "Notion", "Amplitude", "Google Analytics"],
    },
    {
      id: "analytics",
      title: { ru: "Аналитика и интеграции", en: "Analytics and integrations" },
      description: { ru: "Погружаюсь в технический контур, данные и зависимости, чтобы решения были реализуемыми.", en: "I work with technical architecture, data, and dependencies to keep solutions feasible." },
      competencies: [
        { ru: "API, Swagger и Postman", en: "APIs, Swagger, and Postman" },
        { ru: "SQL и базы данных", en: "SQL and databases" },
        { ru: "Микросервисы и интеграции", en: "Microservices and integrations" },
      ],
      tools: ["Postman", "Swagger", "SQL", "PostgreSQL", "DataLens", "Power BI", "Tableau", "Yandex Metrica"],
    },
    {
      id: "delivery",
      title: { ru: "Разработка и релизы", en: "Development and releases" },
      description: { ru: "Координирую delivery от постановки задачи до тестирования, production и поддержки.", en: "I coordinate delivery from task definition through testing, production, and support." },
      competencies: [
        { ru: "SDLC, QA и релизное управление", en: "SDLC, QA, and release management" },
        { ru: "Документация и контроль готовности", en: "Documentation and readiness control" },
        { ru: "AI-автоматизация операций", en: "AI workflow automation" },
      ],
      tools: ["GitHub", "GitLab", "Bitbucket", "Docker", "VS Code", "ChatGPT", "Claude", "GitHub Copilot", "Cursor", "Perplexity AI", "OpenClaw", "Codex", "Midjourney"],
    },
    {
      id: "team",
      title: { ru: "Команда и заказчик", en: "Team and customer" },
      description: { ru: "Синхронизирую бизнес, заказчика и специалистов вокруг единого результата.", en: "I align business, customers, and specialists around one shared outcome." },
      competencies: [
        { ru: "Кросс-функциональные команды", en: "Cross-functional teams" },
        { ru: "Stakeholder management", en: "Stakeholder management" },
        { ru: "Agile, Scrum, Kanban, Waterfall, PMBOK", en: "Agile, Scrum, Kanban, Waterfall, PMBOK" },
      ],
      tools: ["Jira", "Confluence", "Miro", "Google Sheets", "Microsoft Excel"],
    },
  ] satisfies CompetencyDomain[],
  education: [
    {
      id: "management",
      university: { ru: "Уральский федеральный университет имени первого Президента России Б.Н. Ельцина", en: "Ural Federal University named after the first President of Russia B.N. Yeltsin" },
      city: { ru: "Екатеринбург", en: "Yekaterinburg" },
      faculty: { ru: "ИГУП", en: "Institute of Public Administration and Entrepreneurship" },
      specialty: { ru: "Государственное и муниципальное управление", en: "State and Municipal Administration" },
      year: "2016",
    },
  ],
  contacts: [
    { id: "phone", label: { ru: "Телефон", en: "Phone" }, value: "+7 993 359 8322", href: "tel:+79933598322", copyValue: "+7 993 359 8322" },
    { id: "telegram", label: { ru: "Telegram", en: "Telegram" }, value: "@artwiv", href: "https://t.me/artwiv", copyValue: "@artwiv" },
    { id: "email", label: { ru: "Email", en: "Email" }, value: "artivtw@gmail.com", href: "mailto:artivtw@gmail.com", copyValue: "artivtw@gmail.com" },
  ],
  workFormats: [
    { ru: "Удалённо", en: "Remote" },
    { ru: "Гибрид", en: "Hybrid" },
    { ru: "Офис", en: "Office" },
    { ru: "Разъездная работа", en: "Travel" },
  ],
} as const

export function localize(text: LocalizedText, language: Language) {
  return text[language]
}
