import { steps } from '../../data/steps'
import { SectionHeading } from '../ui/SectionHeading'
export function ProcessSection() {
  return <section id="process" className="section-padding process-section"><video className="process-background" autoPlay muted loop playsInline preload="metadata" src="/media/how_bg.mp4" aria-hidden="true" /><div className="process-overlay" /><div className="container editorial-split process-content"><SectionHeading eyebrow="04 / How we work" title={<>Clear thinking.<br /><span className="muted-text">Considered doing.</span></>} description="A collaborative process, from the first question to what comes next." /><ol className="process-list">{steps.map(step => <li key={step.number}><span className="index-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section>
}
