import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import serviceCardImage from '../../assets/hero.png'
import {
  Palette,
  Share2,
  Film,
  Search,
  Target,
  Globe,
  Video,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const services = [
  {
    id: 'branding',
    name: 'BRANDING & IDENTITY',
    headline: 'brands that command attention.',
    icon: Palette,
    color: '#00E5FF',
    gradientFrom: '#00E5FF',
    gradientTo: '#0077B6',
    description:
      'We forge brands that command attention. From visual identity systems to brand strategy, we create cohesive experiences that tell your story and build lasting equity.',
    metrics: [
      { label: 'Brand Identities', value: '80+' },
      { label: 'Avg Recognition Lift', value: '340%' },
    ],
  },
  {
    id: 'social',
    name: 'SOCIAL MEDIA',
    headline: 'communities that convert.',
    icon: Share2,
    color: '#8A2BE2',
    gradientFrom: '#8A2BE2',
    gradientTo: '#C77DFF',
    description:
      'Strategic social media management that builds communities and drives engagement. We craft content calendars, manage campaigns, and turn followers into brand advocates.',
    metrics: [
      { label: 'Accounts Managed', value: '120+' },
      { label: 'Engagement Rate', value: '6.8%' },
    ],
  },
  {
    id: 'content',
    name: 'CONTENT PRODUCTION',
    headline: 'scroll-stopping content.',
    icon: Film,
    color: '#00E5FF',
    gradientFrom: '#00E5FF',
    gradientTo: '#00B4D8',
    description:
      'From concept to final cut, we produce scroll-stopping content that resonates. Photography, motion graphics, copywriting — all under one roof.',
    metrics: [
      { label: 'Pieces Created', value: '5,000+' },
      { label: 'Avg View Rate', value: '78%' },
    ],
  },
  {
    id: 'seo',
    name: 'SEO & ANALYTICS',
    headline: 'dominate search. own discovery.',
    icon: Search,
    color: '#8A2BE2',
    gradientFrom: '#8A2BE2',
    gradientTo: '#6A0DAD',
    description:
      'Data-driven SEO strategies that put you on the map. We optimize for visibility, analyze performance patterns, and drive sustainable organic growth.',
    metrics: [
      { label: 'Keywords Ranked', value: '10K+' },
      { label: 'Traffic Growth', value: '420%' },
    ],
  },
  {
    id: 'ads',
    name: 'PAID ADVERTISING',
    headline: 'precision-targeted campaigns.',
    icon: Target,
    color: '#00E5FF',
    gradientFrom: '#FF6B35',
    gradientTo: '#FF3D00',
    description:
      'Precision-targeted ad campaigns across every major platform. We maximize ROAS through data-backed creative, meticulous audience segmentation, and continuous optimization.',
    metrics: [
      { label: 'Ad Spend Managed', value: '$12M+' },
      { label: 'Avg ROAS', value: '5.2x' },
    ],
  },
  {
    id: 'web',
    name: 'WEBSITE DESIGN',
    headline: 'websites that convert.',
    icon: Globe,
    color: '#8A2BE2',
    gradientFrom: '#10B981',
    gradientTo: '#059669',
    description:
      'Award-winning websites that convert. We design and develop fast, immersive web experiences with cutting-edge tech stacks, 3D interactions, and seamless UX.',
    metrics: [
      { label: 'Sites Launched', value: '200+' },
      { label: 'Avg Speed Score', value: '96/100' },
    ],
  },
  {
    id: 'video',
    name: 'VIDEO PRODUCTION',
    headline: 'cinematic stories that sell.',
    icon: Video,
    color: '#00E5FF',
    gradientFrom: '#E91E8C',
    gradientTo: '#FF6B9D',
    description:
      'Cinematic video content that captivates and converts. From brand films to social reels, we handle scripting, shooting, editing, and distribution strategy.',
    metrics: [
      { label: 'Videos Produced', value: '800+' },
      { label: 'Total Views', value: '50M+' },
    ],
  },
]

function ServiceSliderCard({ service, onSelect }) {
  const Icon = service.icon

  return (
    <div
      className="group relative flex h-full flex-shrink-0 flex-col w-[320px] sm:w-[360px] md:w-[400px] rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onClick={() => onSelect(service)}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18] transition-opacity duration-700 group-hover:opacity-[0.28]"
        style={{
          backgroundImage: `url(${serviceCardImage})`,
          backgroundPosition: 'right -28px bottom 10px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '230px auto',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(145deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.78) 48%, ${service.gradientFrom}12 100%)`,
        }}
      />

      {/* Top content area */}
      <div className="p-6 pb-4 relative z-10">
        {/* Icon + Label */}
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${service.gradientFrom}15` }}
          >
            <Icon className="w-4 h-4" style={{ color: service.gradientFrom }} />
          </div>
          <span
            className="text-[11px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: service.gradientFrom }}
          >
            {service.name}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[26px] md:text-[30px] font-bold text-white leading-[1.15] mb-6 max-w-[280px]">
          {service.headline}
        </h3>

        {/* CTA Button */}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/5"
        >
          Know More
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom visual area */}
      <div className="relative h-[220px] sm:h-[250px] overflow-hidden mt-auto">
        {/* Gradient background */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${service.gradientFrom}30, transparent 70%)`,
          }}
        />

        {/* Decorative large icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="w-28 h-28 sm:w-32 sm:h-32 opacity-[0.08] group-hover:opacity-[0.14] transition-all duration-700 group-hover:scale-110"
            style={{ color: service.gradientFrom }}
          />
        </div>

        {/* Gradient mesh decorative element */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
          }}
        />

        {/* Floating accent dots */}
        <div
          className="absolute top-8 right-8 w-2 h-2 rounded-full opacity-40"
          style={{ background: service.gradientFrom }}
        />
        <div
          className="absolute bottom-12 left-10 w-1.5 h-1.5 rounded-full opacity-30"
          style={{ background: service.gradientTo }}
        />
        <div
          className="absolute top-1/2 right-12 w-1 h-1 rounded-full opacity-25"
          style={{ background: service.gradientFrom }}
        />
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${service.gradientFrom}30, 0 0 30px ${service.gradientFrom}08`,
        }}
      />
    </div>
  )
}

function ServiceDetailModal({ service, onClose }) {
  if (!service) return null
  const Icon = service.icon

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-primary/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative glass-strong rounded-2xl w-full max-w-lg z-10 overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Glow accent */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none"
          style={{ background: service.gradientFrom }}
        />

        <div className="p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-10"
            aria-label="Close service detail"
          >
            <X className="w-4 h-4 text-subtext" />
          </button>

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
            style={{ background: `${service.gradientFrom}15` }}
          >
            <Icon className="w-7 h-7" style={{ color: service.gradientFrom }} />
          </div>

          {/* Content */}
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            {service.name}
          </h3>
          <p className="text-subtext leading-relaxed mb-6">{service.description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {service.metrics.map((metric) => (
              <div key={metric.label} className="glass-card rounded-lg p-4">
                <p className="font-display text-xl font-bold gradient-text">
                  {metric.value}
                </p>
                <p className="text-subtext text-xs mt-1 uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 420
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Heading row with navigation arrows */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <SectionHeading
              eyebrow="OUR SERVICES"
              title={
                <>
                  What We{' '}
                  <span className="gradient-text">Deliver</span>
                </>
              }
            />
          </motion.div>

          {/* Desktop navigation arrows */}
          <div className="hidden md:flex items-center gap-3 pb-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider — full bleed, overflows container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto pb-6 px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] scrollbar-none"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="flex"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ServiceSliderCard
                service={service}
                onSelect={setSelectedService}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Left/right fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      {/* Detail modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
