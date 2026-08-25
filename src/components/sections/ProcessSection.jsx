import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import {
  Search,
  Target,
  Paintbrush,
  Rocket,
  TrendingUp,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    icon: Search,
    description:
      'We immerse ourselves in your brand, market, and audience. Through in-depth research, competitor analysis, and stakeholder interviews, we uncover the insights that will fuel your digital transformation.',
  },
  {
    number: '02',
    title: 'Strategy',
    icon: Target,
    description:
      'Data meets creativity. We architect a comprehensive roadmap tailored to your goals — defining channels, messaging frameworks, content pillars, and KPIs that align with your growth trajectory.',
  },
  {
    number: '03',
    title: 'Creation',
    icon: Paintbrush,
    description:
      'Our multi-disciplinary team brings the strategy to life. Design, development, content production, and campaign creation happen in sprint cycles with continuous client collaboration.',
  },
  {
    number: '04',
    title: 'Launch',
    icon: Rocket,
    description:
      'Precision execution across every touchpoint. We deploy campaigns, launch platforms, and activate channels with meticulous QA, performance monitoring, and real-time optimization.',
  },
  {
    number: '05',
    title: 'Growth',
    icon: TrendingUp,
    description:
      'The launch is just the beginning. We continuously analyze performance, iterate on creative, scale what works, and evolve your strategy to sustain compounding growth.',
  },
]

const cardVariants = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -60 : 60,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const mobileCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function TimelineStep({ step, index }) {
  const isLeft = index % 2 === 0
  const Icon = step.icon

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
      {/* Left card or spacer */}
      {isLeft ? (
        <motion.div
          className="glass-card rounded-2xl p-6 md:p-8 neon-border-hover group"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={true}
        >
          <StepContent step={step} Icon={Icon} align="right" />
        </motion.div>
      ) : (
        <div />
      )}

      {/* Center timeline dot */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'backOut' }}
      >
        <div className="w-12 h-12 rounded-full glass flex items-center justify-center relative z-10 group">
          <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse-glow" />
          <span className="font-display text-sm font-bold text-accent relative z-10">
            {step.number}
          </span>
        </div>
      </motion.div>

      {/* Right card or spacer */}
      {!isLeft ? (
        <motion.div
          className="glass-card rounded-2xl p-6 md:p-8 neon-border-hover group"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={false}
        >
          <StepContent step={step} Icon={Icon} align="left" />
        </motion.div>
      ) : (
        <div />
      )}
    </div>
  )
}

function StepContent({ step, Icon, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <div
        className={`flex items-center gap-3 mb-3 ${
          align === 'right' ? 'justify-end' : 'justify-start'
        }`}
      >
        {align === 'left' && (
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        )}
        <h3 className="font-display text-xl md:text-2xl font-bold text-white">
          {step.title}
        </h3>
        {align === 'right' && (
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        )}
      </div>
      <p className="text-subtext text-sm md:text-base leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

function MobileTimeline() {
  return (
    <div className="md:hidden space-y-8 relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-highlight to-accent/20" />

      {steps.map((step) => {
        const Icon = step.icon
        return (
          <motion.div
            key={step.number}
            className="relative pl-16"
            variants={mobileCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {/* Dot on timeline */}
            <motion.div
              className="absolute left-[14px] top-4 w-7 h-7 rounded-full glass flex items-center justify-center z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' }}
            >
              <div className="w-3 h-3 rounded-full bg-accent" />
            </motion.div>

            <div className="glass-card rounded-xl p-5 neon-border-hover">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="text-accent text-xs font-mono">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-subtext text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function DesktopTimeline() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const [useGSAPAnim, setUseGSAPAnim] = useState(false)

  useEffect(() => {
    let ctx
    const initGSAP = async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        gsap.registerPlugin(ScrollTrigger)

        if (!lineRef.current || !timelineRef.current) return

        ctx = gsap.context(() => {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1,
              },
            }
          )
        }, timelineRef)

        setUseGSAPAnim(true)
      } catch {
        // GSAP unavailable — fall back to CSS/Framer
        setUseGSAPAnim(false)
      }
    }

    initGSAP()
    return () => ctx?.revert?.()
  }, [])

  return (
    <div ref={timelineRef} className="hidden md:block relative">
      {/* Central vertical neon line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
        {/* Background track */}
        <div className="absolute inset-0 bg-white/5 rounded-full" />
        {/* Animated fill */}
        <div
          ref={lineRef}
          className="absolute inset-0 rounded-full origin-top"
          style={{
            background:
              'linear-gradient(to bottom, #00E5FF, #8A2BE2, #00E5FF)',
            boxShadow: '0 0 12px rgba(0, 229, 255, 0.4)',
            transform: useGSAPAnim ? undefined : 'scaleY(1)',
          }}
        />
      </div>

      <div className="space-y-16 lg:space-y-20 relative">
        {steps.map((step, i) => (
          <TimelineStep key={step.number} step={step} index={i} />
        ))}
      </div>
    </div>
  )
}

export function ProcessSection() {
  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-highlight/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="OUR PROCESS"
            title={
              <>
                The <span className="gradient-text">Digital Journey</span>
              </>
            }
            description="Five proven phases that transform your vision into measurable digital success. Every step is designed for maximum impact."
          />
        </motion.div>

        {/* Desktop timeline */}
        <div className="mt-16 lg:mt-20">
          <DesktopTimeline />
          <MobileTimeline />
        </div>
      </div>
    </section>
  )
}
