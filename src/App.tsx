import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { AboutSection } from './components/AboutSection'
import { ApproachSection } from './components/ApproachSection'
import { ContactSection } from './components/ContactSection'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { IntroScreen } from './components/IntroScreen'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { BackToTop } from './components/ui/BackToTop'
import { CursorOverlay } from './components/ui/CursorOverlay'
import { StatusBar } from './components/ui/StatusBar'
import { sectionIds } from './data/site'
import { useActiveSection, useIntroGate } from './lib/hooks'

export default function App() {
  const { showIntro, dismiss } = useIntroGate()
  const { active, progress } = useActiveSection(sectionIds)

  // Return focus to the document once the intro closes.
  useEffect(() => {
    if (showIntro) return
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [showIntro])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>
        {showIntro && <IntroScreen key="intro" onDone={dismiss} />}
      </AnimatePresence>

      <Navbar active={active} progress={progress} />

      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <ApproachSection />
        <ContactSection />
      </main>

      <Footer />

      <StatusBar section={active} />
      <BackToTop />
      <CursorOverlay />
    </>
  )
}
