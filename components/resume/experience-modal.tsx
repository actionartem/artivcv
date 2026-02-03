"use client"

import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Building2, ChevronDown } from "lucide-react"
import { useEffect } from "react"

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experience: {
    company: string
    companyEn: string
    role: string
    roleEn: string
    period: string
    periodEn: string
    duration: string
    durationEn: string
    descriptionRu: string
    descriptionEn: string
  } | null
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!experience) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {/* Logo placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t(experience.company, experience.companyEn)}
                    </h3>
                    <p className="text-primary font-medium">
                      {t(experience.role, experience.roleEn)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {t(experience.period, experience.periodEn)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                    {t(experience.duration, experience.durationEn)}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                  {t(experience.descriptionRu, experience.descriptionEn)}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
                {t("Свернуть", "Collapse")}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
