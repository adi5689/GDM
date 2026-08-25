import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, TrendingUp, Users, DollarSign, BarChart3, Zap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

function useAnimatedCounter(target, duration = 2000, inView) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''))

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * numericTarget)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

function Sparkline({ data, color = '#00E5FF' }) {
  const width = 80
  const height = 28
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * (height - 4) - 2
    return `${x},${y}`
  })

  return (
    <svg width={width} height={height} className="mt-2 opacity-60">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points.join(' ')}
      />
      <polygon
        fill={`url(#spark-${color.replace('#', '')})`}
        points={`0,${height} ${points.join(' ')} ${width},${height}`}
      />
    </svg>
  )
}

const metrics = [
  {
    label: 'Campaign Reach',
    value: '12.5',
    suffix: 'M+',
    icon: Users,
    color: '#00E5FF',
    live: true,
    sparkData: [3, 5, 4, 7, 6, 9, 8, 11, 10, 12.5],
  },
  {
    label: 'Engagement Rate',
    value: '8.4',
    suffix: '%',
    icon: TrendingUp,
    color: '#00E5FF',
    live: false,
    sparkData: [2, 3.5, 3, 5, 4.8, 6, 5.5, 7, 7.8, 8.4],
  },
  {
    label: 'Leads Generated',
    value: '45000',
    suffix: '+',
    icon: BarChart3,
    color: '#8A2BE2',
    live: false,
    sparkData: [5000, 8000, 12000, 18000, 22000, 28000, 33000, 38000, 42000, 45000],
  },
  {
    label: 'Revenue Impact',
    value: '2.8',
    suffix: 'M',
    prefix: '$',
    icon: DollarSign,
    color: '#8A2BE2',
    live: false,
    sparkData: [0.3, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.5, 2.8],
  },
]

const channelData = [
  { label: 'Social Media', value: 85, color: '#00E5FF' },
  { label: 'SEO', value: 72, color: '#8A2BE2' },
  { label: 'Paid Ads', value: 68, color: '#00E5FF' },
  { label: 'Email', value: 54, color: '#8A2BE2' },
]

const growthPoints = [12, 19, 28, 35, 42, 55, 62, 74, 83, 91, 96]

function MetricCard({ metric, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = metric.icon
  const count = useAnimatedCounter(metric.value, 2000, isInView)

  const formatCount = (val) => {
    if (metric.value === '45000') return Math.round(val).toLocaleString()
    if (parseFloat(metric.value) < 100) return val.toFixed(1)
    return Math.round(val).toLocaleString()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card neon-border rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Subtle background glow */}
      <div
        className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: metric.color }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${metric.color}15` }}
        >
          <Icon size={20} style={{ color: metric.color }} />
        </div>

        {metric.live && (
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400">
              Live
            </span>
          </div>
        )}

        {!metric.live && (
          <TrendingUp size={14} className="text-accent opacity-50" />
        )}
      </div>

      <div className="mt-4">
        <p className="font-display text-3xl font-bold text-white md:text-4xl">
          {metric.prefix || ''}
          {isInView ? formatCount(count) : '0'}
          {metric.suffix}
        </p>
        <p className="mt-1 text-sm text-subtext">{metric.label}</p>
      </div>

      <Sparkline data={metric.sparkData} color={metric.color} />
    </motion.div>
  )
}

function GrowthTrendChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const width = 500
  const height = 200
  const padding = 30
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  const max = Math.max(...growthPoints)

  const points = growthPoints.map((val, i) => {
    const x = padding + (i / (growthPoints.length - 1)) * chartWidth
    const y = padding + chartHeight - (val / max) * chartHeight
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${points[points.length - 1].x},${height - padding} L${padding},${height - padding} Z`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card neon-border rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Activity size={18} className="text-accent" />
        <h3 className="font-display text-lg font-semibold text-white">Growth Trend</h3>
        <span className="ml-auto rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
          +156%
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="growthStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#8A2BE2" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={padding + chartHeight * (1 - ratio)}
            x2={width - padding}
            y2={padding + chartHeight * (1 - ratio)}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#growthFill)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#growthStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#050505"
            stroke="#00E5FF"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] text-subtext">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </motion.div>
  )
}

function ChannelPerformanceChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card neon-border rounded-2xl p-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <Zap size={18} className="text-highlight" />
        <h3 className="font-display text-lg font-semibold text-white">Channel Performance</h3>
      </div>

      <div className="space-y-5">
        {channelData.map((channel, index) => (
          <div key={channel.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm text-subtext">{channel.label}</span>
              <span className="text-sm font-semibold text-white">{channel.value}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${channel.color}, ${channel.color}80)`,
                  boxShadow: `0 0 12px ${channel.color}40`,
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${channel.value}%` } : { width: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function ClientResultsSection() {
  return (
    <section id="results" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="CLIENT RESULTS"
          title={
            <span>
              Digital <span className="gradient-text">Command Center</span>
            </span>
          }
          description="Real-time performance metrics from campaigns driving measurable growth."
        />

        {/* Metric Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GrowthTrendChart />
          <ChannelPerformanceChart />
        </div>
      </div>
    </section>
  )
}
