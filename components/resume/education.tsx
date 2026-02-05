"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const educations = [
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
    <section id="education" className="relative pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

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
            <GraduationCap className="w-4 h-4" />
            {t("Образование", "Education")}
          </motion.span>
        </motion.div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto grid gap-6">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* University Logo */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <img
                    src="/UrFULogo_U.jpg"
                    alt="УрФУ"
                    className="w-full h-full p-2 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  {/* University Name */}
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                    {t(edu.universityRu, edu.universityEn)}
                  </h3>

                  {/* Faculty & Specialty */}
                  <p className="text-primary font-medium mb-3">
                    {t(edu.facultyRu, edu.facultyEn)}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {t(edu.specialtyRu, edu.specialtyEn)}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      {edu.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {t(edu.cityRu, edu.cityEn)}
                    </span>
                  </div>
                </div>

                {/* Year badge */}
                <div className="hidden md:block">
                  <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-sm">
                    {edu.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
