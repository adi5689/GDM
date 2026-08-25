import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Calendar } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const services = [
  'SEO & Content Strategy',
  'Social Media Marketing',
  'Influencer Marketing',
  'Web Development',
  'YouTube Marketing',
  'Personal Branding',
  'Photography & Videography',
  'PPC & Paid Media',
]

const budgets = [
  'Under ₹50,000',
  '₹50,000 — ₹2,00,000',
  '₹2,00,000 — ₹5,00,000',
  '₹5,00,000 — ₹10,00,000',
  '₹10,00,000+',
]

const contactInfo = [
  { icon: Phone, label: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'hello@grafiqly.com', href: 'mailto:hello@grafiqly.com' },
  { icon: MapPin, label: 'Mumbai, India', href: '#' },
]

// Simplified world map as dot pattern — major continental outlines
function WorldMap() {
  // Dot positions representing stylized continent shapes (normalized 0-100)
  const dots = [
    // North America
    { x: 18, y: 22 }, { x: 20, y: 20 }, { x: 22, y: 18 }, { x: 16, y: 24 },
    { x: 20, y: 26 }, { x: 22, y: 24 }, { x: 24, y: 22 }, { x: 18, y: 28 },
    { x: 14, y: 26 }, { x: 16, y: 20 }, { x: 24, y: 28 }, { x: 22, y: 30 },
    { x: 20, y: 32 }, { x: 26, y: 26 },
    // South America
    { x: 28, y: 50 }, { x: 30, y: 48 }, { x: 30, y: 52 }, { x: 28, y: 56 },
    { x: 30, y: 58 }, { x: 28, y: 62 }, { x: 26, y: 66 }, { x: 28, y: 70 },
    { x: 30, y: 54 }, { x: 32, y: 50 },
    // Europe
    { x: 48, y: 20 }, { x: 50, y: 18 }, { x: 52, y: 22 }, { x: 46, y: 22 },
    { x: 50, y: 24 }, { x: 48, y: 26 }, { x: 54, y: 20 }, { x: 52, y: 16 },
    { x: 46, y: 18 }, { x: 50, y: 14 },
    // Africa
    { x: 50, y: 38 }, { x: 52, y: 36 }, { x: 48, y: 40 }, { x: 52, y: 42 },
    { x: 50, y: 44 }, { x: 52, y: 48 }, { x: 50, y: 52 }, { x: 54, y: 40 },
    { x: 48, y: 46 }, { x: 54, y: 46 }, { x: 50, y: 56 }, { x: 52, y: 54 },
    // Asia
    { x: 60, y: 20 }, { x: 62, y: 18 }, { x: 64, y: 22 }, { x: 66, y: 20 },
    { x: 68, y: 24 }, { x: 70, y: 22 }, { x: 72, y: 26 }, { x: 74, y: 24 },
    { x: 76, y: 28 }, { x: 78, y: 26 }, { x: 64, y: 26 }, { x: 66, y: 28 },
    { x: 68, y: 30 }, { x: 70, y: 32 }, { x: 62, y: 24 }, { x: 58, y: 22 },
    { x: 72, y: 18 }, { x: 80, y: 22 }, { x: 82, y: 24 },
    // India (more dots for emphasis)
    { x: 66, y: 34 }, { x: 68, y: 36 }, { x: 66, y: 38 }, { x: 68, y: 40 },
    { x: 64, y: 36 },
    // Australia
    { x: 80, y: 56 }, { x: 82, y: 54 }, { x: 84, y: 56 }, { x: 82, y: 58 },
    { x: 86, y: 54 }, { x: 84, y: 60 }, { x: 80, y: 58 },
  ]

  // Mumbai approximate position
  const mumbaiX = 66
  const mumbaiY = 37

  return (
    <div className="relative aspect-[4/3] w-full">
      <svg viewBox="0 0 100 80" className="h-full w-full">
        {/* Map dots */}
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r="0.8"
            fill="rgba(255,255,255,0.15)"
          />
        ))}

        {/* Mumbai ripple rings */}
        <circle cx={mumbaiX} cy={mumbaiY} r="6" fill="none" stroke="#00E5FF" strokeWidth="0.3" opacity="0.2">
          <animate attributeName="r" from="2" to="10" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={mumbaiX} cy={mumbaiY} r="4" fill="none" stroke="#00E5FF" strokeWidth="0.3" opacity="0.3">
          <animate attributeName="r" from="2" to="8" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>

        {/* Mumbai pulsing dot */}
        <circle cx={mumbaiX} cy={mumbaiY} r="1.5" fill="#00E5FF" opacity="0.8">
          <animate attributeName="r" values="1.2;1.8;1.2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={mumbaiX} cy={mumbaiY} r="0.8" fill="#fff" />
      </svg>
    </div>
  )
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-subtext outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/50'

const selectClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/50 appearance-none cursor-pointer'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title={
            <span>
              Mission <span className="gradient-text">Control</span>
            </span>
          }
          description="Ready to launch your next digital campaign? Let's build something extraordinary."
        />

        <div className="glass-strong rounded-3xl p-6 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 font-display text-2xl font-bold text-white">
                Send us a transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={selectClasses}
                    >
                      <option value="" disabled className="bg-secondary text-subtext">
                        Service Interest
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-secondary text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={selectClasses}
                    >
                      <option value="" disabled className="bg-secondary text-subtext">
                        Budget Range
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-secondary text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gradient py-3.5 font-display font-bold text-primary transition-shadow duration-300 hover:shadow-neon-blue"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              {/* World Map */}
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <WorldMap />
              </div>

              {/* Live Availability */}
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-green-400">Available Now</span>
                <span className="ml-auto text-xs text-subtext">Typically replies in 2 hrs</span>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-xl border border-white/5 p-4 transition-all duration-300 hover:border-accent/20 hover:bg-white/[0.03]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <span className="text-sm text-slate-300">{label}</span>
                  </a>
                ))}
              </div>

              {/* Calendly CTA */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-highlight/30 bg-highlight/10 py-3.5 font-display font-bold text-highlight transition-all duration-300 hover:border-highlight/50 hover:bg-highlight/20 hover:shadow-neon-purple"
              >
                <Calendar size={18} />
                Schedule a Call
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
