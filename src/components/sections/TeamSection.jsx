import { ArrowUpRight } from 'lucide-react'
import { team } from '../../data/team'
import { SectionHeading } from '../ui/SectionHeading'
export function TeamSection() {
  return <section id="team" className="section-padding team-section"><div className="container"><div className="team-heading"><SectionHeading eyebrow="07 / The people" title={<>Different perspectives.<br /><span className="muted-text">Shared ambition.</span></>} /><p>Small by design. Senior by default. One team, fully invested in the outcome.</p></div><div className="team-grid">{team.map((member, index) => <article className="team-card" key={member.name}><div className="team-image"><img src="/media/team/team-placeholder.png" alt={`Temporary portrait placeholder for ${member.name}`} style={{ objectPosition: `${35 + index * 10}% center` }} loading="lazy" /><span>{member.initials}</span><ArrowUpRight size={19} /></div><div className="team-card-copy"><p className="team-role">{member.role}</p><h3>{member.name}</h3><p>{member.bio}</p></div></article>)}</div></div></section>
}
