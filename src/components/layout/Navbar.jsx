import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun } from 'lucide-react'
import { Dialog } from '../ui/Dialog'

const links = [['Services', '#services'], ['Plans', '#plans'], ['Work', '#portfolio'], ['About', '#about'], ['Contact', '#contact']]
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('grafiqly-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('grafiqly-theme', theme) } catch { /* Storage is optional. */ }
  }, [theme])
  useEffect(() => {
    const media = matchMedia('(min-width: 900px)')
    const closeOnDesktop = () => { if (media.matches) setOpen(false) }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container nav-inner">
      <a className="brand" href="#home" aria-label="Grafiqly Digital Media home">Grafiqly<span className="brand-sub">Digital Media</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="nav-actions"><button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        <a className="button nav-cta" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
        <button className="icon-button mobile-toggle" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
      </div>
    </div></header>
    {open && <Dialog title="Explore Grafiqly" className="mobile-menu" onClose={() => setOpen(false)}><nav aria-label="Mobile navigation">{links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}</nav><a className="text-link" href="mailto:hello@grafiqly.com">hello@grafiqly.com <ArrowUpRight size={18} /></a></Dialog>}
  </>
}
