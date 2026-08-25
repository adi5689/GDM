import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const headlineWords = ['Future-Proof', 'Your', 'Brand']

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.5 + i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function LightStreak({ className, delay, duration }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '200%', opacity: [0, 0.6, 0.6, 0] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: duration * 1.5,
        ease: 'linear',
      }}
    >
      <div className="h-[1px] w-[300px] md:w-[500px] bg-gradient-to-r from-transparent via-accent/40 to-transparent rotate-[-25deg]" />
    </motion.div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="text-xs text-subtext tracking-widest uppercase font-light">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-accent/60" />
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ═══ Video Background ═══ */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <source src="/hero_g.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay instead of CSS filter — zero per-frame GPU cost */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 z-[1]" />

      {/* Radial glow accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[100px] pointer-events-none z-[1]" />

      {/* Light streaks */}
      <LightStreak className="top-[20%] left-0" delay={1} duration={4} />
      <LightStreak className="top-[50%] left-0" delay={3} duration={5} />
      <LightStreak className="top-[75%] left-0" delay={5.5} duration={3.5} />

      {/* Main content — centered */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center"
        style={{ opacity: opacityFade, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-accent text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {'GRAFIQLY DIGITAL MEDIA 2.0'}
        </motion.p>

        {/* Headline with staggered word animation */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-4 lg:mr-6"
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {word === 'Future-Proof' ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg text-white md:text-xl text-subtext max-w-2xl leading-relaxed mb-10"
          initial="hidden"
          animate="visible"
          custom={1.3}
        >
          We blend creativity, strategy and technology to build
          unforgettable digital experiences that drive real business growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.6}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-neon-blue hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-accent/40 text-accent font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:shadow-neon-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Our Work</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
