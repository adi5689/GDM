import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'results', label: 'Results' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'team', label: 'Team' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const activeSectionRef = useRef('hero')
  const percentRef = useRef(null)
  const dotRefs = useRef({})

  // Update percentage text via direct DOM mutation instead of setState
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(v * 100)}%`
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  // IntersectionObserver for active section — also uses direct DOM
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const prevId = activeSectionRef.current
            const newId = entry.target.id

            // Update previous dot
            if (dotRefs.current[prevId]) {
              dotRefs.current[prevId].className =
                'block rounded-full transition-all duration-300 w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'
            }
            // Update new dot
            if (dotRefs.current[newId]) {
              dotRefs.current[newId].className =
                'block rounded-full transition-all duration-300 w-2.5 h-2.5 bg-accent shadow-neon-sm'
            }

            activeSectionRef.current = newId
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Top horizontal progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #00E5FF, #8A2BE2)',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
        }}
      />

      {/* Vertical section indicator (desktop only) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-2"
            title={label}
          >
            {/* Label (shows on hover) */}
            <span className="text-[10px] text-subtext/0 group-hover:text-subtext/80 transition-all duration-300 font-display uppercase tracking-wider translate-x-2 group-hover:translate-x-0">
              {label}
            </span>
            {/* Dot */}
            <span
              ref={(el) => { dotRefs.current[id] = el }}
              className={`block rounded-full transition-all duration-300 ${
                id === 'hero'
                  ? 'w-2.5 h-2.5 bg-accent shadow-neon-sm'
                  : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'
              }`}
            />
          </a>
        ))}

        {/* Progress percentage */}
        <div ref={percentRef} className="mt-3 text-[10px] font-mono text-subtext/50">
          0%
        </div>
      </div>
    </>
  )
}
