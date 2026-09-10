import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
const services = ['SEO & Content Strategy', 'Social Media Marketing', 'Influencer Marketing', 'Web Development', 'YouTube Marketing', 'Personal Branding', 'Photography & Videography', 'PPC & Paid Media']
const budgets = ['Under ₹50,000', '₹50,000 — ₹2,00,000', '₹2,00,000 — ₹5,00,000', '₹5,00,000 — ₹10,00,000', '₹10,00,000+', 'Let’s discuss']
export function ContactSection() {
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setDraft(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service') || 'Let’s discuss'}\nBudget: ${data.get('budget') || 'Let’s discuss'}\n\nProject brief:\n${data.get('message')}`)
    setCopied(false)
    setCopyError(false)
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setCopyError(false) } catch { setCopyError(true) }
  }
  return <section id="contact" className="section-padding contact-section"><div className="container"><p className="eyebrow">09 / Start a conversation</p><h2 className="contact-title">Your next big thing.<br /><span>Let’s make it happen.</span></h2><div className="contact-grid"><div className="contact-info"><p>Tell us what you have in mind.<br />We’ll work out the next step together.</p><a className="contact-email" href="mailto:hello@grafiqly.com">hello@grafiqly.com <ArrowUpRight size={22} /></a><a href="tel:+919876543210">+91 98765 43210</a><p className="location">Mumbai, India<br /><span>Working with brands everywhere.</span></p><a className="text-link" href="mailto:hello@grafiqly.com?subject=Let%E2%80%99s%20schedule%20a%20call">Request a call <ArrowUpRight size={18} /></a></div>
  <form onSubmit={handleSubmit} className="contact-form"><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Alex Morgan" /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="alex@company.com" /></label></div><div className="form-row"><label>What can we help with?<select name="service" defaultValue=""><option value="">Select a service</option>{services.map(service => <option key={service}>{service}</option>)}</select></label><label>Budget range<select name="budget" defaultValue=""><option value="">Select a range (optional)</option>{budgets.map(budget => <option key={budget}>{budget}</option>)}</select></label></div><label>A little about your project <span>*</span><textarea name="message" required rows={4} maxLength={1500} placeholder="Your idea, goals and ideal timeline…" /></label><div className="form-footer"><p>Prepare your brief, then send it using your email app. Nothing is sent automatically.</p><button className="button" type="submit">Prepare email <ArrowUpRight size={18} /></button></div>
  {draft && <div className="email-draft"><p role="status">Your brief is ready. Open your email app to review and send it.</p><label>Project brief<textarea value={draft} readOnly rows={7} /></label><div className="dialog-bottom"><a className="button" href={`mailto:hello@grafiqly.com?subject=${encodeURIComponent('New project enquiry — Grafiqly')}&body=${encodeURIComponent(draft)}`}>Open email app <ArrowUpRight size={18} /></a><button type="button" className="text-link" onClick={copy}>{copied ? <>Copied <Check size={16} /></> : 'Copy brief'}</button></div><p role="status">{copyError ? 'Select and copy the brief above, then email hello@grafiqly.com.' : copied ? 'Brief copied to clipboard.' : 'No email app? Copy your brief and email hello@grafiqly.com.'}</p></div>}
  </form></div></div></section>
}
