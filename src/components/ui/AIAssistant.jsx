import { useState } from 'react'
import { MessageCircle, ArrowUpRight } from 'lucide-react'
import { Dialog } from './Dialog'
const answers = {
  'What do you do?': 'Brand strategy, social media, SEO, paid advertising, website design and development, photography and video production. We build a team around your project.',
  'What does a project cost?': 'Every project is scoped around your goals and deliverables. Share your brief and budget with the team for a tailored estimate.',
  'How long does it take?': 'Timing depends on the scope, approvals and production needs. Include your ideal launch date in your project brief so the team can advise.',
  'Can I book a call?': 'Email hello@grafiqly.com with your availability and a little about your project. The team will arrange a conversation with you.',
}
export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('What do you do?')
  return <><button className="assistant-toggle" onClick={() => setOpen(true)} aria-label="Open studio guide" aria-haspopup="dialog" aria-expanded={open}><MessageCircle size={21} /></button>{open && <Dialog title="The studio guide" className="guide-dialog" onClose={() => setOpen(false)}><p className="section-description">A few answers to get you started.</p><div className="guide-questions">{Object.keys(answers).map(item => <button key={item} aria-pressed={question === item} onClick={() => setQuestion(item)}>{item}</button>)}</div><p className="guide-answer" aria-live="polite">{answers[question]}</p><a className="button" href="#contact" onClick={() => setOpen(false)}>Talk to the team <ArrowUpRight size={18} /></a></Dialog>}</>
}
