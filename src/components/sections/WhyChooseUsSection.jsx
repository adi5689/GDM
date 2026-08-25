import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Headphones, Brain, BarChart3 } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const metrics = [
  { label: 'Innovation Score', traditional: 40, grafiqly: 95 },
  { label: 'Technology Stack', traditional: 30, grafiqly: 98 },
  { label: 'Response Time', traditional: 55, grafiqly: 92 },
  { label: 'ROI Delivery', traditional: 45, grafiqly: 88 },
  { label: 'Creative Output', traditional: 50, grafiqly: 96 },
]

const features = [
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Round-the-clock dedicated account managers and real-time Slack channels.',
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    desc: 'Machine learning models optimize campaigns in real time for maximum impact.',
  },
  {
    icon: BarChart3,
    title: 'Data Driven',
    desc: 'Every decision backed by comprehensive analytics and predictive insights.',
  },
]

function ComparisonBar({ metric, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="py-3"
    >
      {/* Metric label — centered */}
      <p className="mb-3 text-center text-sm font-medium text-white">{metric.label}</p>

      {/* Desktop: side-by-side bars */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        {/* Traditional bar (grows right-to-left) */}
        <div className="flex items-center gap-3">
          <span className="w-10 text-right text-xs text-subtext">{metric.traditional}%</span>
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="absolute right-0 h-full rounded-full bg-white/10"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${metric.traditional}%` } : { width: 0 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>
        </div>

        {/* Grafiqly bar (grows left-to-right) */}
        <div className="flex items-center gap-3">
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00E5FF, #8A2BE2)',
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.3)',
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${metric.grafiqly}%` } : { width: 0 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>
          <span className="w-10 text-xs font-semibold text-accent">{metric.grafiqly}%</span>
        </div>
      </div>

      {/* Mobile: stacked bars */}
      <div className="space-y-2 md:hidden">
        {/* Traditional */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-subtext">Traditional</span>
            <span className="text-xs text-subtext">{metric.traditional}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-white/10"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${metric.traditional}%` } : { width: 0 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>
        </div>

        {/* Grafiqly */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-accent">Grafiqly</span>
            <span className="text-xs font-semibold text-accent">{metric.grafiqly}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00E5FF, #8A2BE2)',
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.3)',
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${metric.grafiqly}%` } : { width: 0 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WhyChooseUsSection() {
  const comparisonRef = useRef(null)
  const isInView = useInView(comparisonRef, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="WHY US"
          title={
            <span>
              Why Choose <span className="gradient-text">Grafiqly</span>
            </span>
          }
          description="See how we outperform traditional agencies across every metric that matters."
        />

        {/* Comparison Panel */}
        <div ref={comparisonRef} className="glass-card neon-border rounded-3xl p-6 md:p-10">
          {/* Header Row */}
          <div className="mb-6 hidden md:grid md:grid-cols-2 md:gap-4">
            <div className="text-right">
              <span className="text-sm font-medium text-subtext">Traditional Agency</span>
            </div>
            <div>
              <span className="gradient-text text-sm font-bold glow-blue">Grafiqly</span>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-4 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />

          {/* Metric Rows */}
          <div className="divide-y divide-white/5">
            {metrics.map((metric, index) => (
              <ComparisonBar
                key={metric.label}
                metric={metric}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-neon-blue"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtext">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
