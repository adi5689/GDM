import { lazy, Suspense } from 'react'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { AmbientBackground } from './components/ui/AmbientBackground'
import { NeonCursor } from './components/ui/NeonCursor'
import { AmbientAudio } from './components/ui/AmbientAudio'

// Lazy-load below-fold sections to reduce initial JS parse/execute cost
const ProcessSection = lazy(() => import('./components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })))
const PortfolioSection = lazy(() => import('./components/sections/PortfolioSection').then(m => ({ default: m.PortfolioSection })))
const ClientResultsSection = lazy(() => import('./components/sections/ClientResultsSection').then(m => ({ default: m.ClientResultsSection })))
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })))
const TeamSection = lazy(() => import('./components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const WhyChooseUsSection = lazy(() => import('./components/sections/WhyChooseUsSection').then(m => ({ default: m.WhyChooseUsSection })))
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })))
const AIAssistant = lazy(() => import('./components/ui/AIAssistant').then(m => ({ default: m.AIAssistant })))

function App() {
  return (
    <div className="relative overflow-hidden bg-hero-gradient min-h-screen text-white">
      <ScrollProgress />
      <NeonCursor />
      <AmbientBackground />
      <AmbientAudio />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <Suspense fallback={null}>
          <ProcessSection />
          <PortfolioSection />
          <ClientResultsSection />
          <TestimonialsSection />
          <TeamSection />
          <WhyChooseUsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </div>
  )
}

export default App
