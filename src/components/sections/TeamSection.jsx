import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github } from '../ui/SocialIcons'
import { SectionHeading } from '../ui/SectionHeading'

const team = [
  {
    name: 'Alex Chen',
    role: 'Creative Director',
    color: '#00E5FF',
    initials: 'AC',
    bio: 'Award-winning creative with 12+ years crafting brand identities.',
    socials: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Maya Patel',
    role: 'Strategy Lead',
    color: '#8A2BE2',
    initials: 'MP',
    bio: 'Data strategist turning insights into high-impact growth playbooks.',
    socials: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Jordan Kim',
    role: 'Tech Architect',
    color: '#00E5FF',
    initials: 'JK',
    bio: 'Full-stack engineer obsessed with performance and scalable systems.',
    socials: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Priya Sharma',
    role: 'Growth Manager',
    color: '#8A2BE2',
    initials: 'PS',
    bio: 'Growth hacker who scaled startups from zero to millions in reach.',
    socials: { twitter: '#', linkedin: '#', github: '#' },
  },
]

function TeamCard({ member, index }) {
  const [hover, setHover] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleMouseLeave = () => {
    setHover(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-6 text-center relative overflow-hidden group"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
        boxShadow: hover
          ? `0 0 0 1px ${member.color}40, 0 0 30px ${member.color}15`
          : undefined,
      }}
    >
      {/* Animated background pattern on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, ${member.color}08, transparent 60%)`,
        }}
      />

      {/* Avatar */}
      <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${member.color}, ${member.color}40)`,
            animation: hover ? 'spin 4s linear infinite' : 'none',
          }}
        />
        <div className="absolute inset-[3px] rounded-full bg-primary" />
        <span
          className="relative z-10 font-display text-2xl font-bold"
          style={{ color: member.color }}
        >
          {member.initials}
        </span>
      </div>

      {/* Info */}
      <h3 className="font-display text-xl font-bold text-white">{member.name}</h3>
      <p className="mt-1 text-sm font-medium" style={{ color: member.color }}>
        {member.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-subtext">{member.bio}</p>

      {/* Social Icons */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {[
          { icon: Twitter, href: member.socials.twitter },
          { icon: Linkedin, href: member.socials.linkedin },
          { icon: Github, href: member.socials.github },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-subtext transition-all duration-300 hover:border-accent/40 hover:text-accent"
            aria-label={`${member.name}'s social link`}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="THE TEAM"
          title={
            <span>
              Meet The <span className="gradient-text">Innovators</span>
            </span>
          }
          description="The creative minds and technical wizards behind every breakthrough campaign."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
