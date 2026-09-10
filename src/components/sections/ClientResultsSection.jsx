import { SectionHeading } from '../ui/SectionHeading'
const metrics = [['12.5M+', 'Campaign reach'], ['8.4%', 'Engagement rate'], ['45,000+', 'Leads generated'], ['$2.8M', 'Revenue impact']]
export function ClientResultsSection() {
  return <section id="results" className="section-padding results-section"><div className="container"><SectionHeading eyebrow="05 / The impact" title={<>Creative work.<br />Commercial thinking.</>} description="We bring creativity and measurement together, with business growth at the center of the brief." /><dl className="stats-row">{metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>
}
