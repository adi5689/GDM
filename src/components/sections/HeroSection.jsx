import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const sectionRef = useRef(null)
  const [mobile, setMobile] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const media = matchMedia('(max-width: 700px)')
    const sync = () => setMobile(media.matches)
    sync(); media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const width = useTransform(scrollYProgress, [0, 1], [mobile ? '42vw' : '18vw', '100vw'])
  const height = useTransform(scrollYProgress, [0, 1], [mobile ? '14vh' : '15vh', '100vh'])
  const radius = useTransform(scrollYProgress, [0, 1], [50, 0])
  const ideaOpacity = useTransform(scrollYProgress, [0, .1, .2], [1, 1, 0])
  const ideaScale = useTransform(scrollYProgress, [0, .2], [1, .86])
  const sideOpacity = useTransform(scrollYProgress, [0, .14, .24], [1, 1, 0])
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextRevealed = progress >= .34
    setRevealed(current => current === nextRevealed ? current : nextRevealed)
  })
  const mediaStyle = reducedMotion ? { width: '100vw', height: '100vh', borderRadius: 0 } : { width, height, borderRadius: radius }

  return <section id="home" className="scroll-hero" ref={sectionRef}><div className="scroll-hero-sticky"><motion.div className="scroll-hero-side scroll-hero-left" style={reducedMotion ? undefined : { opacity: sideOpacity }}>Independent<br />thinking.</motion.div><motion.div className="scroll-hero-media" style={mediaStyle}><video autoPlay muted loop playsInline preload="metadata" src="/media/hero_bg.mp4" aria-label="Grafiqly studio reel" /><div className="scroll-hero-overlay" /><motion.span className="scroll-hero-idea" style={reducedMotion ? undefined : { opacity: ideaOpacity, scale: ideaScale }}>Ideas.</motion.span><div className={`scroll-hero-reveal ${revealed || reducedMotion ? 'is-revealed' : ''}`}><div className="scroll-hero-topline"><p className="eyebrow"><span className="status-dot" /> Independent thinking. Connected expertise.</p><span>Mumbai, India · Working everywhere</span></div><h1>Future-proof<br />your <span>brand.</span></h1><div className="scroll-hero-intro"><p>Strategy, design, content and technology. All working together to move your business forward.</p><a className="scroll-hero-cta" href="#contact">Start a project <span><ArrowUpRight size={20} /></span></a></div><div className="scroll-hero-utility"><span>Creative studio. Digital partner.</span><a href="#portfolio">Discover our work <ArrowDown size={16} /></a></div></div></motion.div><motion.div className="scroll-hero-side scroll-hero-right" style={reducedMotion ? undefined : { opacity: sideOpacity }}>Brands<br />that move.</motion.div><div className="scroll-hero-progress" aria-hidden="true"><span>Scroll to reveal</span><i /></div></div></section>
}
