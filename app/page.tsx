"use client"

import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { StickyHeader } from "@/components/resume/sticky-header"
import { HeroPrototype } from "@/components/resume/hero-prototype"
import { Marquee } from "@/components/resume/marquee"
import { AboutDiagram } from "@/components/resume/about-diagram"
import { ExperienceRoadmap } from "@/components/resume/experience-roadmap"
import { CompetencyTools } from "@/components/resume/competency-tools"
import { Education } from "@/components/resume/education"
import { Contacts } from "@/components/resume/contacts"
import { Footer } from "@/components/resume/footer"

export default function ResumePage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-background">
          <StickyHeader />

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
            
            {/* Competencies connected to their working tools */}
            <CompetencyTools />
            
            {/* Education */}
            <Education />
            
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
