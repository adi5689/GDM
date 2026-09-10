import { ArrowUpRight } from 'lucide-react'
import { AmbientAudio } from '../ui/AmbientAudio'
export function Footer() {
  return <footer className="site-footer">
    <video className="footer-bg-video" autoPlay muted loop playsInline preload="auto" src="/media/footer_bg.mp4" aria-hidden="true" />
    <div className="footer-bg-overlay" />
    <div className="container"><div className="footer-top"><a className="footer-wordmark" href="#home">Grafiqly<span>®</span><small>Digital Media</small></a><p>Strategy. Creativity. Technology.<br />A connected approach to building brands.</p></div><div className="footer-links"><nav aria-label="Footer navigation">{[['Services', '#services'], ['Work', '#portfolio'], ['About', '#about'], ['Process', '#process'], ['Results', '#results'], ['Team', '#team'], ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><a className="text-link" href="#home">Back to top <ArrowUpRight size={18} /></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Grafiqly Digital Media</p><AmbientAudio /><p>Mumbai, India</p></div></div>
  </footer>
}
