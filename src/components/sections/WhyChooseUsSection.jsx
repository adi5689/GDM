import { SectionHeading } from '../ui/SectionHeading'
const features = [['24/7 Support', 'Round-the-clock dedicated account managers and real-time Slack channels.'], ['AI-Powered', 'Machine learning models optimize campaigns in real time for maximum impact.'], ['Data Driven', 'Every decision backed by comprehensive analytics and predictive insights.']]
export function WhyChooseUsSection() {
  return <section id="why-us" className="section-padding why-section"><div className="container editorial-split"><SectionHeading eyebrow="08 / Why Grafiqly" title={<>Built around<br /><span className="muted-text">your next chapter.</span></>} /><div className="principles">{features.map(([title, copy], i) => <article key={title}><span className="index-number">0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
}
