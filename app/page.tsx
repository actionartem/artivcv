import { LanguageProvider } from "@/lib/language-context"
import { StickyHeader } from "@/components/resume/sticky-header"
import { HeroPrototype } from "@/components/resume/hero-prototype"
import { AboutDiagram } from "@/components/resume/about-diagram"
import { ExperienceRoadmap } from "@/components/resume/experience-roadmap"
import { CompetencyTools } from "@/components/resume/competency-tools"
import { Education } from "@/components/resume/education"
import { Contacts } from "@/components/resume/contacts"
import { Footer } from "@/components/resume/footer"

export default function ResumePage() {
  return (
    <LanguageProvider>
      <div className="resume-shell">
        <StickyHeader />
        <main>
          <HeroPrototype />
          <AboutDiagram />
          <ExperienceRoadmap />
          <CompetencyTools />
          <Education />
          <Contacts />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
