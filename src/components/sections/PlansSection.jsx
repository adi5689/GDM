import { ArrowUpRight, Check } from 'lucide-react'

const plans = [
  { name: 'Launch', label: 'For ambitious beginnings', price: '₹45k', note: 'per month', features: ['Brand direction workshop', 'Social content system', 'Monthly performance report'] },
  { name: 'Momentum', label: 'For brands ready to scale', price: '₹85k', note: 'per month', featured: true, features: ['Everything in Launch', 'Campaign creative & media', 'SEO and conversion strategy', 'Dedicated growth lead'] },
  { name: 'Studio+', label: 'For category leaders', price: 'Custom', note: 'built around your goals', features: ['Embedded creative partnership', 'Always-on content production', 'Website & product experiences', 'Executive strategy support'] },
]

export function PlansSection() {
  return <section id="plans" className="section-padding plans-section"><video className="plans-background" autoPlay muted loop playsInline preload="metadata" src="/media/bg.mp4" aria-hidden="true" /><div className="plans-overlay" /><div className="container plans-content"><div className="section-top"><div><p className="eyebrow">Plans / Engagements</p><h2>Find your<br /><span className="muted-text">growth rhythm.</span></h2></div><p className="section-aside">Flexible, senior-led partnerships designed around the pace and complexity of your business.</p></div><div className="plans-grid">{plans.map(plan => <article className={`plan-card ${plan.featured ? 'is-featured' : ''}`} key={plan.name}>{plan.featured && <span className="plan-badge">Most selected</span>}<p className="plan-label">{plan.label}</p><h3>{plan.name}</h3><p className="plan-price">{plan.price}<span>{plan.note}</span></p><ul>{plan.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><a className={plan.featured ? 'button' : 'plan-link'} href="#contact">Let’s talk <ArrowUpRight size={17} /></a></article>)}</div></div></section>
}
