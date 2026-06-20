"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { ProjectMatrixBackground } from "./project-matrix-background"

const educations = [
  {
    id: 1,
    universityRu: "Уральский федеральный университет имени первого Президента России Б.Н. Ельцина",
    universityEn: "Ural Federal University named after the first President of Russia B.N. Yeltsin",
    cityRu: "Екатеринбург",
    cityEn: "Yekaterinburg",
    facultyRu: "ИГУП",
    facultyEn: "Institute of Public Administration and Entrepreneurship",
    specialtyRu: "Государственное и муниципальное управление",
    specialtyEn: "State and Municipal Administration",
    year: "2016",
  },
  {
    id: 2,
    universityRu: "Уральский федеральный университет имени первого Президента России Б.Н. Ельцина",
    universityEn: "Ural Federal University named after the first President of Russia B.N. Yeltsin",
    cityRu: "Екатеринбург",
    cityEn: "Yekaterinburg",
    facultyRu: "Фундаментальная информатика и информационные технологии",
    facultyEn: "Fundamental Informatics and Information Technologies",
    specialtyRu: "Инженерия программного обеспечения",
    specialtyEn: "Software Engineering",
    year: "2016",
  },
]

export function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="education-system">
      <ProjectMatrixBackground mode="workflows" />

      <div className="education-system__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="education-system__header"
        >
          <span>05 / EDUCATION</span>
          <h2>{t("Образование", "Education")}</h2>
        </motion.div>

        <div className="education-system__grid">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="education-card"
            >
              <div className="education-card__topline">
                <span>EDU / 0{index + 1}</span>
                <strong>
                  <Calendar aria-hidden="true" />
                  {edu.year}
                </strong>
              </div>

              <div className="education-card__identity">
                <div className="education-card__logo">
                  <Image
                    src="/UrFULogo_U.jpg"
                    alt="УрФУ"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3>
                    {t(edu.universityRu, edu.universityEn)}
                  </h3>
                  <span className="education-card__city">
                    <MapPin aria-hidden="true" />
                    {t(edu.cityRu, edu.cityEn)}
                  </span>
                </div>
              </div>

              <div className="education-card__program">
                <span>{t("Факультет", "Faculty")}</span>
                <p>{t(edu.facultyRu, edu.facultyEn)}</p>
              </div>
              <div className="education-card__program">
                <span>{t("Специальность", "Specialization")}</span>
                <p>{t(edu.specialtyRu, edu.specialtyEn)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
