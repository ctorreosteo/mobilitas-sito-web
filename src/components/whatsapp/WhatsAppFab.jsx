import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import './WhatsAppFab.css'

const WHATSAPP_NUMBER = '393518198457'
const BUBBLE_DELAY = 20000
const TYPING_TIME = 1600
const BUBBLE_DURATION = 12000

// La nuvoletta si mostra una sola volta per sessione (per ciascuna variante)
const seenKey = (id) => `mx-wa-bubble-${id}`
const wasSeen = (id) => {
  try {
    return sessionStorage.getItem(seenKey(id)) === '1'
  } catch {
    return false
  }
}
const markSeen = (id) => {
  try {
    sessionStorage.setItem(seenKey(id), '1')
  } catch {
    // storage non disponibile: pazienza, al massimo la nuvoletta ricompare
  }
}

// Bottone WhatsApp flottante, con una nuvoletta che arriva come un messaggio in chat.
// message: testo precompilato su WhatsApp. bubbleText: testo della nuvoletta. bubbleId: chiave per "già vista".
export default function WhatsAppFab({ message, bubbleText, bubbleId = 'sito' }) {
  const [bubble, setBubble] = useState(false)
  const [typing, setTyping] = useState(true)
  const timers = useRef([])

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const open = () => window.open(url, '_blank')

  useEffect(() => {
    if (!bubbleText || wasSeen(bubbleId)) return undefined
    const t = timers.current
    t.push(
      setTimeout(() => {
        markSeen(bubbleId)
        setTyping(true)
        setBubble(true)
        t.push(setTimeout(() => setTyping(false), TYPING_TIME))
        t.push(setTimeout(() => setBubble(false), TYPING_TIME + BUBBLE_DURATION))
      }, BUBBLE_DELAY)
    )
    return () => t.forEach(clearTimeout)
  }, [bubbleText, bubbleId])

  const close = () => {
    timers.current.forEach(clearTimeout)
    setBubble(false)
  }

  return (
    <div className="mx-wa">
      <AnimatePresence>
        {bubble && (
          <motion.div
            className="mx-wa__bubble"
            role="dialog"
            aria-label="Messaggio da Mobilitas"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className="mx-wa__head">
              <img className="mx-wa__avatar" src="/pittogramma.png" alt="" />
              <div className="mx-wa__who">
                <b>Mobilitas</b>
                <small>{typing ? 'sta scrivendo…' : 'Studio osteopatico · Torino'}</small>
              </div>
              <button type="button" className="mx-wa__close" onClick={close} aria-label="Chiudi messaggio">
                <X size={16} strokeWidth={2.6} />
              </button>
            </div>

            <div className="mx-wa__chat">
              <AnimatePresence mode="wait" initial={false}>
                {typing ? (
                  <motion.span
                    key="typing"
                    className="mx-wa__msg mx-wa__msg--typing"
                    aria-label="Mobilitas sta scrivendo"
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <i />
                    <i />
                    <i />
                  </motion.span>
                ) : (
                  <motion.p
                    key="text"
                    className="mx-wa__msg"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {bubbleText}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button type="button" className="mx-wa__reply" onClick={open}>
              <WhatsAppIcon size={18} />
              Rispondi su WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="mx-wa__btn"
        onClick={open}
        aria-label="Scrivici su WhatsApp"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.8 }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="mx-wa__label">Scrivici su WhatsApp</span>
        <span className="mx-wa__glyph">
          <WhatsAppIcon />
        </span>
      </motion.button>
    </div>
  )
}
