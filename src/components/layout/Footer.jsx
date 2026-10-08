import { ArrowUpRight } from 'lucide-react'
import { Github, Twitter, Linkedin, Instagram } from '../ui/SocialIcons'

const footerLinks = {
  services: [
    { label: 'Branding', href: '#services' },
    { label: 'Social Media', href: '#services' },
    { label: 'Content Production', href: '#services' },
    { label: 'SEO', href: '#services' },
    { label: 'Website Design', href: '#services' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/footer_bg.mp4"
      />

      {/* Dark overlay to keep content readable */}
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-[2]" />

      <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex items-center mb-4 group">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-white/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] group-hover:scale-[1.02] flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Grafiqly Digital Media"
                  className="h-7 md:h-8 w-auto object-contain"
                />
              </div>
            </a>
            <p className="text-subtext text-sm leading-relaxed mb-6">
              Transforming ideas into digital dominance. We blend creativity, strategy, and technology to build unforgettable experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-subtext hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-subtext hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-subtext hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-4">Stay Updated</h4>
            <p className="text-sm text-subtext mb-4">Get the latest insights on digital innovation.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-subtext focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-subtext/60">
            © {new Date().getFullYear()} Grafiqly Digital Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-subtext/60 hover:text-subtext transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-subtext/60 hover:text-subtext transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
