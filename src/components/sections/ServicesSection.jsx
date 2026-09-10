import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { services } from '../../data/services'

export function ServicesSection() {
  const [active, setActive] = useState(0)
  const service = services[active]
  return <section id="services" className="section-padding services-section"><video className="services-background" autoPlay muted loop playsInline preload="metadata" src="/media/effect_bg.mp4" aria-hidden="true" /><div className="services-background-overlay" /><div className="container services-content">
    <div className="services-kicker"><div className="services-kicker-content"><div><p className="eyebrow">02 / What we do</p><h2>Ideas built to<br /><span>move people.</span></h2></div><p>Focused disciplines, connected around the work that moves your brand forward.</p></div></div>
    <div className="service-navigator"><div className="service-nav-list" role="tablist" aria-label="Services">{services.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>0{index + 1}</span><strong>{item.name}</strong><i>{item.headline}</i><ArrowUpRight size={18} /></button>)}</div><article className="service-showcase" aria-live="polite"><div className="service-showcase-image"><img key={service.id} src={`/media/services/${service.id}.jpg`} alt="" /><span>{service.name}</span><p>Grafiqly / 2026</p></div><div className="service-showcase-copy"><h3>{service.headline}</h3><p>{service.description}</p><dl>{service.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl><a className="scroll-service-link" href="#contact">Build something remarkable <ArrowUpRight size={18} /></a></div></article></div>
  </div></section>
}
