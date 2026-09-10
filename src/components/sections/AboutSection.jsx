import { ArrowUpRight } from 'lucide-react'
const stats = [['150+', 'Brands scaled'], ['4.8×', 'Average ROI'], ['500+', 'Campaigns launched'], ['98%', 'Client retention']]
export function AboutSection() {
  return <section id="about" className="section-padding about-section"><div className="container">
    <div className="editorial-split"><p className="eyebrow">01 / The studio</p><div><h2>Good ideas deserve<br /><span className="muted-text">an extraordinary execution.</span></h2><div className="about-copy"><p>We are Grafiqly. A full-spectrum digital agency working at the intersection of art and data. Our strategists, designers and technologists turn ideas into brand experiences that resonate, convert and scale.</p><div><p>Every pixel, every campaign, every line of code — we engineer it with purpose. From the first conversation to the next stage of growth, we bring the right disciplines together.</p><a className="text-link" href="#team">Meet the people behind it <ArrowUpRight size={18} /></a></div></div></div></div>
    <dl className="stats-row">{stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div></section>
}
