import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppTooltip() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const hideTimerRef = useRef(null)

  useEffect(() => {
    // Mostra la nuvoletta dopo 20 secondi
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      setHasShown(true)
      
      // Chiudi automaticamente dopo 6 secondi dalla comparsa
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 6000)
    }, 20000)

    return () => {
      clearTimeout(showTimer)
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Cancella il timer di chiusura automatica se l'utente chiude manualmente
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }

  // Non mostrare più se è già stata chiusa manualmente o automaticamente
  if (hasShown && !isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="absolute bottom-full right-0 mb-3 z-50 pt-4"
          style={{ 
            width: '600px',
            maxWidth: 'calc(100vw - 2rem)',
            filter: 'drop-shadow(0 20px 40px rgba(0, 37, 82, 0.2))'
          }}
        >
          {/* Pulsante X migliorato - posizionato sopra la nuvoletta */}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 z-20 shadow-lg hover:scale-110"
            aria-label="Chiudi"
          >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="#002552"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          
          {/* Nuvoletta blu con trasparenza */}
          <div 
            className="relative rounded-3xl px-6 py-5 shadow-2xl border border-blue-dark/30 overflow-hidden w-full"
            style={{
              backgroundColor: 'rgba(0, 37, 82, 0.9)'
            }}
          >
            {/* Icona WhatsApp decorativa */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex-shrink-0 mt-0.5" style={{ marginBottom: '0px' }}>
                <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </div>
              
              {/* Testo migliorato */}
              <div className="flex-1 min-w-0">
                <p className="text-base text-white leading-relaxed font-montserrat font-medium" style={{ marginTop: '0px', marginBottom: '0px' }}>
                  Hai qualche dubbio o domanda prima di venire da noi? Scrivici un messaggio e saremo lieti di chiarire tutto quanto!
                </p>
              </div>
            </div>

            {/* Freccia elegante che punta al pulsante WhatsApp */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <svg
                width="24"
                height="12"
                viewBox="0 0 24 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12L0 0H24L12 12Z"
                  fill="rgba(0, 37, 82, 0.9)"
                  className="drop-shadow-lg"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
