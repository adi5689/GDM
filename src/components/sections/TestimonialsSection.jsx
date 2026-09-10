import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const item = testimonials[active]
  const select = (index) => setActive(index)
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'ArrowLeft') setActive(index => (index + testimonials.length - 1) % testimonials.length); if (event.key === 'ArrowRight') setActive(index => (index + 1) % testimonials.length) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  return <section id="testimonials" className="section-padding testimonials-section"><div className="container"><div className="testimonial-heading"><div><p className="eyebrow">06 / In their words</p><h2>Trusted when<br /><span>it matters.</span></h2></div><p>Long-term partnerships with people who expect creative work to perform.</p></div><div className="testimonial-stage"><aside className="testimonial-client-list" aria-label="Choose a testimonial">{testimonials.map((client, index) => <button key={client.name} className={active === index ? 'is-active' : ''} onClick={() => select(index)} aria-pressed={active === index}><span>{client.initials}</span><strong>{client.company}</strong><i>{client.role}</i></button>)}</aside><article className="testimonial-quote-card" aria-live="polite" aria-atomic="true"><div className="testimonial-card-top"><Quote aria-hidden="true" /><span>{Array.from({ length: item.rating }, (_, index) => <Star key={index} fill="currentColor" size={13} />)}</span></div><blockquote>“{item.quote}”</blockquote><footer><div className="testimonial-avatar">{item.initials}</div><p>{item.name}<span>{item.role}, {item.company}</span></p><div className="testimonial-controls"><span>{String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><button className="icon-button" aria-label="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ArrowLeft size={18} /></button><button className="icon-button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ArrowRight size={18} /></button></div></footer></article></div><dl className="testimonial-proof"><div><dt>98%</dt><dd>Client retention</dd></div><div><dt>4.8×</dt><dd>Average return</dd></div><div><dt>150+</dt><dd>Brands scaled</dd></div></dl></div></section>
}
