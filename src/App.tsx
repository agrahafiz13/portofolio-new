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
import { ShapeGrid } from './components/ShapeGrid'
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
      {/* Ambient grid background — sits behind every section, reacts to the cursor. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <ShapeGrid
          shape="square"
          cellSize={44}
          direction="diagonal"
          speed={0.35}
          lineColor="rgba(37, 35, 33, 0.14)"
          hoverColor="#bd4444"
          hoverFillColor="#bd4444"
          fillOpacity={0.1}
          glow={0.3}
          twinkle={0.06}
          fade={0.6}
        />
      </div>

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
