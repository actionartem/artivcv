"use client"

import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { HeroPrototype } from "@/components/resume/hero-prototype"
import { Marquee } from "@/components/resume/marquee"
import { AboutDiagram } from "@/components/resume/about-diagram"
import { ExperienceRoadmap } from "@/components/resume/experience-roadmap"
import { Competencies } from "@/components/resume/competencies"
import { Skills } from "@/components/resume/skills"
import { Tools } from "@/components/resume/tools"
import { Education } from "@/components/resume/education"
import { LanguagesSection } from "@/components/resume/languages"
import { Contacts } from "@/components/resume/contacts"
import { Footer } from "@/components/resume/footer"

export default function ResumePage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-background">
          {/* Noise texture overlay */}
          <div className="noise-overlay" />
          
          {/* Main content */}
          <main>
            {/* Hero section with photo placeholder */}
            <HeroPrototype />
            
            {/* Marquee with keywords */}
            <Marquee />
            
            {/* About me section */}
            <AboutDiagram />
            
            {/* Experience roadmap with interactive timeline */}
            <ExperienceRoadmap />
            
            {/* Key competencies */}
            <Competencies />
            
            {/* Hard & Soft skills */}
            <Skills />
            
            {/* Tools section */}
            <Tools />
            
            {/* Education */}
            <Education />
            
            {/* Languages */}
            <LanguagesSection />
            
            {/* Contacts */}
            <Contacts />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
