import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { PlansSection } from './components/sections/PlansSection'
import { PortfolioSection } from './components/sections/PortfolioSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { ClientResultsSection } from './components/sections/ClientResultsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { TeamSection } from './components/sections/TeamSection'
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection'
import { ContactSection } from './components/sections/ContactSection'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AIAssistant } from './components/ui/AIAssistant'
function App() {
  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'
  return <><Navbar /><main id="main" tabIndex={-1}>{isHome ? <><HeroSection /><AboutSection /><ServicesSection /><PortfolioSection /><ProcessSection /><ClientResultsSection /><TestimonialsSection /><TeamSection /><PlansSection /><WhyChooseUsSection /><ContactSection /></> : <section className="container not-found"><p className="eyebrow">404 / Page not found</p><h1>This way back<br />to the studio.</h1><a className="button" href="/">Back to home ↗</a></section>}</main><Footer /><AIAssistant /></>
}
export default App
