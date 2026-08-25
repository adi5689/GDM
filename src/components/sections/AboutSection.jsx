import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { SvgOrbitFrame } from '../ui/SvgOrbitFrame'

const stats = [
  { value: 150, suffix: '+', label: 'Brands Scaled' },
  { value: 4.8, suffix: 'x', label: 'Avg ROI', decimals: 1 },
  { value: 500, suffix: '+', label: 'Campaigns Launched' },
  { value: 98, suffix: '%', label: 'Client Retention' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function AnimatedCounter({ value, suffix, decimals = 0, isInView }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const progress = current / steps
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * value)

      if (current >= steps) {
        setCount(value)
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count)

  return (
    <span className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold leading-none gradient-text">
      {displayValue}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-highlight/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <SectionHeading
                eyebrow="WHO WE ARE"
                title={
                  <>
                    Crafting <span className="gradient-text">Digital Dominance</span>
                  </>
                }
              />
            </motion.div>

            <motion.p
              className="text-subtext text-lg leading-relaxed max-w-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0.1}
            >
              We are a full-spectrum digital agency obsessed with pushing
              creative boundaries. From strategy to execution, we architect
              brand experiences that resonate, convert, and scale.
            </motion.p>

            <motion.p
              className="text-subtext leading-relaxed max-w-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0.2}
            >
              Every pixel, every campaign, every line of code — we engineer it
              with purpose. Our team of strategists, designers, and technologists
              work at the intersection of art and data to deliver measurable impact.
            </motion.p>

            {/* Key statement */}
            <motion.h3
              className="font-display text-2xl md:text-3xl font-bold gradient-text leading-tight pt-2"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0.3}
            >
              Transforming Ideas Into
              <br />
              Digital Dominance
            </motion.h3>

            {/* Stats grid */}
            <motion.div
              ref={statsRef}
              className="grid grid-cols-4 gap-2 pt-4 sm:gap-3 lg:gap-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0.4}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card group min-w-0 rounded-xl px-2 py-4 text-center sm:p-4"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    isInView={isStatsInView}
                  />
                  <p className="mt-2 text-[10px] uppercase leading-tight tracking-[0.08em] text-subtext sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 2D SVG orbit decoration */}
          <motion.div
            className="relative flex h-[400px] items-center justify-center lg:h-[550px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SvgOrbitFrame />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
