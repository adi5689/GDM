import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

export function Dialog({ title, onClose, children, className = '' }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    const trigger = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === ref.current) onClose() }}>
    <div className="dialog-inner">
      <div className="dialog-top"><h2 id={titleId}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={22} /></button></div>
      {children}
    </div>
  </dialog>
}
