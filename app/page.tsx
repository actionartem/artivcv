"use client"

import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { Header } from "@/components/resume/header"
import { Hero } from "@/components/resume/hero"
import { Marquee } from "@/components/resume/marquee"
import { About } from "@/components/resume/about"
import { ExperienceRoadmap } from "@/components/resume/experience-roadmap"
import { Competencies } from "@/components/resume/competencies"
import { Skills } from "@/components/resume/skills"
import { Tools } from "@/components/resume/tools"
import { Education } from "@/components/resume/education"
import { LanguagesSection } from "@/components/resume/languages"
import { Contacts } from "@/components/resume/contacts"
import { Footer } from "@/components/resume/footer"
import { CursorFollower } from "@/components/resume/cursor-follower"

export default function ResumePage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-background">
          {/* Noise texture overlay */}
          <div className="noise-overlay" />
          
          {/* Custom cursor */}
          <CursorFollower />
          
          {/* Header with scroll progress */}
          <Header />
          
          {/* Main content */}
          <main>
            {/* Hero section with photo placeholder */}
            <Hero />
            
            {/* Marquee with keywords */}
            <Marquee />
            
            {/* About me section */}
            <About />
            
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
