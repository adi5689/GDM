import { motion } from 'framer-motion'

export function SectionHeading({ eyebrow, title, description, align = 'center', gradient = true }) {
  const alignClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
  }

  // Split title to find text wrapped in * for gradient effect
  const renderTitle = () => {
    if (!gradient) return title
    return title
  }

  return (
    <div className={`max-w-3xl mb-16 md:mb-20 ${alignClasses[align]}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 font-display"
        >
          {'// '}
          {eyebrow}
        </motion.p>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          {renderTitle()}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-subtext text-base md:text-lg mt-4 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-px mt-6 bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-center"
      />
    </div>
  )
}
