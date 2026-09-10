import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { SectionHeading } from '../ui/SectionHeading'
import { Dialog } from '../ui/Dialog'
const categories = ['All', 'Branding', 'Digital', 'Campaign', 'Social']
export function PortfolioSection() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const visible = category === 'All' ? projects : projects.filter(project => project.category === category)
  return <section id="portfolio" className="section-padding work-section"><div className="container">
    <div className="section-top"><SectionHeading eyebrow="03 / Selected work" title={<>Different challenges.<br /><span className="muted-text">Distinctive answers.</span></>} /><p className="section-aside">A closer look at the thinking, craft and collaboration behind our work.</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === 'All' && <span> / {String(projects.length).padStart(2, '0')}</span>}</button>)}</div>
    <p className="sr-only" role="status">{visible.length} projects shown</p>
    <div className="project-grid">{visible.map(project => <article className={`project project-${project.id}`} key={project.id}>
      <button className="project-cover" onClick={() => setSelected(project)} aria-label={`Read ${project.name} case study`}><span className="cover-meta">{project.category} <span>Case study ↗</span></span><span className="project-wordmark">{project.name.replace(/ Rebrand| Fitness App| Launch| Analytics| Lifestyle/g, '')}<span className="project-symbol" aria-hidden="true">{project.id === 'pulse' ? '↗' : project.id === 'ecoverse' ? '◎' : '✳'}</span></span><span className="cover-bottom">Grafiqly Digital Media<span>Strategy → Execution</span></span></button>
      <div className="project-info"><div><h3><button onClick={() => setSelected(project)}>{project.name}</button></h3><p>{project.tagline}</p></div><button className="icon-button" aria-label={`Open ${project.name}`} onClick={() => setSelected(project)}><ArrowUpRight /></button></div>
    </article>)}</div>
    <div className="work-footer"><p>Have a challenge of your own?</p><a className="text-link" href="#contact">Let’s make something that matters <ArrowUpRight size={18} /></a></div>
  </div>
    {selected && <Dialog title={selected.name} onClose={() => setSelected(null)} className="project-dialog"><p className="eyebrow">{selected.category} / Case study</p><p className="case-intro">{selected.tagline}</p><div className="case-sections">{[['The challenge', selected.challenge], ['The strategy', selected.strategy], ['The execution', selected.execution], ['The results', selected.results]].map(([title, copy], i) => <section key={title}><h3><span>0{i + 1}</span>{title}</h3><p>{copy}</p></section>)}</div><div className="dialog-bottom"><a className="button" href="#contact" onClick={() => setSelected(null)}>Start a similar project <ArrowUpRight size={18} /></a><button className="text-link" onClick={() => setSelected(projects[(projects.indexOf(selected) + 1) % projects.length])}>Next project <ArrowRight size={18} /></button></div></Dialog>}
  </section>
}
