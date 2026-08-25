import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'CEO',
    company: 'NovaTech',
    initials: 'AS',
    quote:
      'Grafiqly transformed our digital presence from the ground up. Within 6 months, our organic traffic grew 340% and our brand became synonymous with innovation in the fintech space. Their strategic approach to content and paid media is nothing short of brilliant.',
    rating: 5,
    gradient: 'from-accent to-cyan-300',
  },
  {
    name: 'Sanya Mehta',
    role: 'CMO',
    company: 'PulseHealth',
    initials: 'SM',
    quote:
      'Their creative vision is unmatched in the industry. Every campaign they deliver feels like a masterpiece — thoughtful, data-backed, and visually stunning. Our engagement rates tripled and we saw a 280% increase in qualified leads within the first quarter.',
    rating: 5,
    gradient: 'from-highlight to-purple-300',
  },
  {
    name: 'Rohit Verma',
    role: 'Founder',
    company: 'DataStream',
    initials: 'RV',
    quote:
      'The ROI we achieved was beyond anything we projected. Grafiqly didn\'t just run our campaigns — they became an extension of our team. Their analytical rigor combined with creative excellence drove $1.2M in revenue from a $50K ad spend.',
    rating: 5,
    gradient: 'from-accent to-highlight',
  },
]

const floatVariants = [
  {},
  {},
  {},
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-accent text-accent" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="glass-card neon-border rounded-2xl p-6 md:p-8"
    >
      {/* Quote */}
      <p className="text-sm italic leading-relaxed text-slate-300 md:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Rating */}
      <div className="mt-4">
        <StarRating count={testimonial.rating} />
      </div>

      {/* Author */}
      <div className="mt-5 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} flex-shrink-0`}
        >
          <span className="text-sm font-bold text-primary">{testimonial.initials}</span>
        </div>
        <div>
          <p className="font-display font-bold text-white">{testimonial.name}</p>
          <p className="text-sm text-subtext">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(intervalRef.current)
  }, [startAutoplay])

  const goTo = (index) => {
    setActive(index)
    startAutoplay()
  }

  const goPrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    startAutoplay()
  }

  const goNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
    startAutoplay()
  }

  return (
    <section id="testimonials" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title={
            <span>
              What Our <span className="gradient-text">Clients Say</span>
            </span>
          }
          description="Real results, real stories from the brands we've helped transform."
        />

        {/* Desktop: all 3 cards in grid with floating animation */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <TestimonialCard testimonial={testimonials[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-subtext transition hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === active
                      ? 'w-6 bg-accent shadow-neon-sm'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-subtext transition hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
