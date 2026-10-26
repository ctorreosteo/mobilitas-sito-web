import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

// Barra d'acquisto fissa su mobile: compare dopo il primo schermo,
// sparisce quando l'offerta è già in vista. Porta all'offerta come gli altri "Acquista ora".
export default function StickyBuyBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('mds-hero')
    const offer = document.getElementById('offer-section')
    let heroGone = false
    let offerIn = false
    const update = () => setShow(heroGone && !offerIn)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0
        if (e.target === offer) offerIn = e.isIntersecting
      })
      update()
    }, { threshold: 0, rootMargin: '0px 0px -30% 0px' })
    if (hero) io.observe(hero)
    if (offer) io.observe(offer)
    return () => io.disconnect()
  }, [])

  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mx-mds-sticky"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <span className="mx-mds-sticky__price" aria-hidden="true">
            <s>€90</s>
            <b>€69</b>
          </span>
          <button type="button" className="mx-mds-sticky__btn" onClick={scrollToOffer}>
            <ShoppingCart size={18} strokeWidth={2.6} />
            ACQUISTA ORA
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
