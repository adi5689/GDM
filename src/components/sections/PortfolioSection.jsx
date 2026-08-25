import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import {
  ArrowUpRight,
  X,
  Layers,
  Smartphone,
  Rocket,
  Heart,
  BarChart3,
  Leaf,
} from 'lucide-react'

const projects = [
  {
    id: 'novatech',
    name: 'NovaTech Rebrand',
    category: 'Branding',
    icon: Layers,
    gradient: 'from-cyan-500/20 to-blue-600/20',
    accentColor: '#00E5FF',
    tagline: 'A complete brand transformation for the AI era',
    challenge:
      'NovaTech, a legacy enterprise SaaS company, was losing market share to nimble AI-native competitors. Their dated brand identity failed to communicate their technological edge and innovation pipeline.',
    strategy:
      'We conducted deep market research and competitive audits, identifying a visual language gap in the B2B AI space. Our strategy centered on positioning NovaTech as the bridge between enterprise reliability and AI innovation.',
    execution:
      'Complete visual identity overhaul including logo system, brand guidelines, website redesign, marketing collateral, and internal culture materials. We introduced a dynamic identity system that adapts across digital touchpoints.',
    results:
      '340% increase in brand recognition, 85% improvement in lead quality, 2x pipeline growth within 6 months of launch. Won 3 industry design awards.',
  },
  {
    id: 'pulse',
    name: 'Pulse Fitness App',
    category: 'Digital',
    icon: Smartphone,
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#8A2BE2',
    tagline: 'Reimagining the connected fitness experience',
    challenge:
      'Pulse needed a mobile experience that could compete with Peloton and Apple Fitness+ while carving out a unique niche in the AI-personalized workout space.',
    strategy:
      'User research revealed that 78% of fitness app users abandoned within 30 days. We designed a gamification and social accountability framework that would drive long-term engagement and habit formation.',
    execution:
      'End-to-end product design and development — UX research, interface design, motion design, prototyping, and development oversight. Built with React Native for cross-platform deployment.',
    results:
      '4.8★ App Store rating, 200K downloads in first quarter, 62% day-30 retention (3x industry average), featured by Apple as "App of the Day".',
  },
  {
    id: 'aerospace',
    name: 'AeroSpace Launch',
    category: 'Campaign',
    icon: Rocket,
    gradient: 'from-orange-500/20 to-red-500/20',
    accentColor: '#FF6B35',
    tagline: 'A multi-platform campaign that broke the internet',
    challenge:
      'AeroSpace, a direct-to-consumer drone company, needed to generate massive awareness for their flagship consumer drone launch with a limited budget against DJI\'s market dominance.',
    strategy:
      'We designed a viral-first campaign leveraging user-generated content, influencer partnerships, and a "First Flight Challenge" that turned customers into brand ambassadors.',
    execution:
      'Orchestrated a 360° launch campaign across Instagram, YouTube, TikTok, and Twitter. Created cinematic hero content, influencer kits, AR try-on filters, and a real-time user content curation system.',
    results:
      '15M impressions in launch week, 450% ROAS on paid media, 12K units sold in first 48 hours, campaign case study featured in AdAge.',
  },
  {
    id: 'luxe',
    name: 'Luxe Lifestyle',
    category: 'Social',
    icon: Heart,
    gradient: 'from-pink-500/20 to-rose-400/20',
    accentColor: '#E91E8C',
    tagline: 'Building a luxury community from the ground up',
    challenge:
      'Luxe Lifestyle, a premium home decor brand, had zero social media presence and needed to establish authority in the aspirational lifestyle space dominated by established players.',
    strategy:
      'We developed a "content ecosystem" strategy — premium photography, behind-the-scenes storytelling, designer collaborations, and a community-driven aesthetic that would attract high-net-worth audiences.',
    execution:
      'Full social media management across Instagram, Pinterest, and TikTok. Created 400+ pieces of original content, managed influencer partnerships, and built a private community of 5K+ VIP customers.',
    results:
      '0 to 180K followers in 8 months, 8.2% average engagement rate, 320% increase in website traffic from social, $2.4M attributed revenue from social channels.',
  },
  {
    id: 'datastream',
    name: 'DataStream Analytics',
    category: 'Digital',
    icon: BarChart3,
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#10B981',
    tagline: 'Enterprise analytics made beautifully intuitive',
    challenge:
      'DataStream\'s powerful analytics platform was losing deals because of its outdated, complex interface. Enterprise clients loved the data capabilities but found the UX impenetrable.',
    strategy:
      'We applied a "progressive disclosure" design philosophy — surfacing critical insights immediately while keeping advanced features accessible. Data visualization was reimagined to tell stories, not just display numbers.',
    execution:
      'Complete platform redesign and front-end rebuild using React and D3.js. Created a modular dashboard system, custom data visualization library, and interactive onboarding flow.',
    results:
      '45% reduction in onboarding time, 3x increase in daily active users, NPS score improved from 32 to 71, $8M in new ARR within first year post-launch.',
  },
  {
    id: 'ecoverse',
    name: 'EcoVerse',
    category: 'Branding',
    icon: Leaf,
    gradient: 'from-teal-500/20 to-cyan-400/20',
    accentColor: '#14B8A6',
    tagline: 'A regenerative brand for a regenerative future',
    challenge:
      'EcoVerse, a climate-tech startup, needed a brand identity that communicated scientific credibility while remaining approachable to mainstream consumers entering the sustainability space.',
    strategy:
      'We developed a "living brand" concept — an identity system inspired by natural patterns and growth algorithms. The brand would literally evolve and adapt, mirroring the regenerative mission.',
    execution:
      'Created a generative logo system, organic color palette, sustainable print guidelines, website with carbon tracking, and a brand activation toolkit for their global launch events.',
    results:
      'Brand valuation increased 5x post-launch, secured $12M Series A partially attributed to brand perception, 200+ press mentions in first month, shortlisted for D&AD New Blood.',
  },
]

const categories = ['All', 'Branding', 'Digital', 'Campaign', 'Social']

function ProjectCard({ project, index, onSelect }) {
  const Icon = project.icon

  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
    >
      {/* Gradient header */}
      <div
        className={`h-48 sm:h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
      >
        {/* Decorative icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{ color: project.accentColor }}
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <div className="glass rounded-full px-5 py-2.5 flex items-center gap-2">
              <span className="text-sm font-medium text-white">View Project</span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </div>
          </motion.div>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span
            className="glass rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
            style={{ color: project.accentColor }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-subtext text-sm mt-1.5 leading-relaxed">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  const Icon = project.icon

  const sections = [
    { title: 'The Challenge', content: project.challenge },
    { title: 'Our Strategy', content: project.strategy },
    { title: 'The Execution', content: project.execution },
    { title: 'The Results', content: project.results },
  ]

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
        className="relative glass-strong rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div
          className={`relative h-40 sm:h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              className="w-24 h-24 opacity-15"
              style={{ color: project.accentColor }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Category & title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span
              className="glass rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider inline-block mb-2"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-lg text-subtext leading-relaxed italic border-l-2 border-accent/30 pl-4">
            {project.tagline}
          </p>

          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <h3 className="font-display text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: project.accentColor }}
                />
                {section.title}
              </h3>
              <p className="text-subtext leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="portfolio"
      className="section-padding relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-highlight/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="OUR WORK"
            title={
              <>
                <span className="gradient-text">Featured</span> Projects
              </>
            }
            description="A curated selection of our most impactful work. Each project tells a story of creative problem-solving and measurable results."
          />
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-accent text-primary shadow-neon-sm'
                  : 'glass text-subtext hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View all CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-accent/30 text-accent font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:shadow-neon-sm"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
