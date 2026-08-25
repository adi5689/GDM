import { motion } from 'framer-motion'

export function GlowButton({ children, variant = 'primary', size = 'md', className = '', onClick, href, ...props }) {
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-semibold tracking-wide transition-all duration-300 rounded-xl overflow-hidden group'
  
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-accent text-primary hover:shadow-neon-blue',
    secondary: 'bg-highlight text-white hover:shadow-neon-purple',
    outline: 'bg-transparent text-accent border border-accent/40 hover:border-accent hover:shadow-neon-blue hover:bg-accent/5',
    ghost: 'bg-white/5 text-white border border-white/10 hover:border-white/20 hover:bg-white/10',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Glow backdrop on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className={`absolute inset-0 ${variant === 'primary' ? 'bg-accent/20' : variant === 'secondary' ? 'bg-highlight/20' : 'bg-accent/10'} blur-xl`} />
      </span>
      
      {/* Shimmer sweep effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  )
}
