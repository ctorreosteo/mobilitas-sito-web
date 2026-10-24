import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import './Dialog.css'

const EASE = [0.16, 1, 0.3, 1]
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Guscio comune di tutti i popup del sito.
// Su telefono è un pannello che sale dal basso, su desktop una finestra centrata.
// Gestisce: portale sul body, blocco scroll, Esc, clic fuori, focus intrappolato e ripristinato.
//
// Props: isOpen, onClose, title (testo per l'accessibilità se non c'è un'intestazione visibile),
// closeDisabled (es. durante l'invio), size: 'sm' | 'md' | 'lg', tone: 'dark' | 'light', className, children.
// Per l'intestazione visibile usa <DialogHeader>; i campi usano le classi .mx-dlg-* (vedi Dialog.css).
export default function Dialog({ isOpen, onClose, title, closeDisabled = false, size = 'sm', tone = 'dark', className = '', children }) {
  const panelRef = useRef(null)
  const titleId = useId()
  // onClose cambia a ogni render del genitore: tenerlo in un ref evita di rieseguire l'effetto
  // (che rimetterebbe il focus sul primo campo a ogni tasto premuto)
  const onCloseRef = useRef(onClose)
  const closeDisabledRef = useRef(closeDisabled)
  onCloseRef.current = onClose
  closeDisabledRef.current = closeDisabled

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const focusFirst = () => {
      const panel = panelRef.current
      if (!panel) return
      const target = panel.querySelector('[data-autofocus]') || panel.querySelector('input, select, textarea') || panel
      target.focus({ preventScroll: true })
    }
    const t = setTimeout(focusFirst, 60)

    const onKey = (e) => {
      if (e.key === 'Escape' && !closeDisabledRef.current) {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus({ preventScroll: true })
    }
  }, [isOpen])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`mx-dlg mx-dlg--${tone}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !closeDisabled) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            className={`mx-dlg__panel mx-dlg__panel--${size} ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="mx-dlg__grip" aria-hidden="true" />
            <span id={titleId} className="mx-dlg__sr">{title}</span>
            <button type="button" className="mx-dlg__close" onClick={onClose} disabled={closeDisabled} aria-label="Chiudi">
              <X size={20} strokeWidth={2.4} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// Intestazione standard: etichetta piccola, titolo, sottotitolo e testo
export function DialogHeader({ kicker, title, subtitle, text }) {
  return (
    <div className="mx-dlg-head">
      {kicker && <p className="mx-dlg-head__kicker">{kicker}</p>}
      {title && <h2 className="mx-dlg-head__title">{title}</h2>}
      {subtitle && <p className="mx-dlg-head__subtitle">{subtitle}</p>}
      {text && <p className="mx-dlg-head__text">{text}</p>}
    </div>
  )
}
