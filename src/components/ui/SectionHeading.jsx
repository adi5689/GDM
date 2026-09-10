export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return <header className={`section-heading ${align === 'center' ? 'centered' : ''}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    {title && <h2>{title}</h2>}
    {description && <p className="section-description">{description}</p>}
  </header>
}
