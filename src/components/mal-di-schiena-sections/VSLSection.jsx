import { motion } from 'framer-motion'
import { Check, Star, ShoppingCart, ArrowDown } from 'lucide-react'
import { EASE } from '../home-sections/homeMotion'

const benefits = [
  "Risolviamo il dolore senza farmaci",
  "Ripristiniamo la tua mobilità e libertà di movimento",
  "Risolviamo il problema alla radice, non solo il sintomo"
]

// Apertura: titolo, VSL e "Acquista ora" tutti nel primo schermo su mobile.
export default function VSLSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-mds-hero" id="mds-hero">
      <div className="mx-mds-hero__glow" aria-hidden="true" />
      <div className="mx-wrap mx-mds-hero__grid">
        <div className="mx-mds-hero__copy">
          <motion.p
            className="mx-mds-pill"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Star size={14} strokeWidth={2.4} className="mx-mds-pill__star" />
            Trattamento Specifico
          </motion.p>

          <h1 className="mx-h mx-mds-hero__title">
            {['TRATTAMENTO', 'OSTEOPATICO', 'PER IL MAL DI SCHIENA 💪🏼'].map((line, i) => (
              <span key={line} className="mx-mask">
                <motion.span
                  className={i === 1 ? 'mx-accent' : undefined}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.08 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mx-mds-video"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          <div className="mx-mds-video__frame">
            <iframe
              src="https://player.vimeo.com/video/1119431291?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="VSL_MAL_DI_SCHIENA01"
            />
          </div>
        </motion.div>

        <motion.div
          className="mx-mds-hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
        >
          <motion.button
            type="button"
            onClick={scrollToOffer}
            className="mx-btn mx-btn--primary mx-mds-buy"
            whileTap={{ scale: 0.97 }}
          >
            <span className="mx-mds-buy__label">
              <ShoppingCart size={20} strokeWidth={2.4} />
              ACQUISTA ORA
            </span>
            <span className="mx-btn__icon">
              <ArrowDown size={20} strokeWidth={2.4} />
            </span>
          </motion.button>
        </motion.div>

        <div className="mx-mds-hero__benefits">
          <h3 className="mx-h mx-h--sm mx-mds-hero__btitle">I 3 benefici immediati del Trattamento Osteopatico:</h3>
          <ul className="mx-mds-checks">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.6 + index * 0.1 }}
              >
                <span className="mx-mds-checks__n">0{index + 1}</span>
                <span className="mx-mds-checks__t">{benefit}</span>
                <Check size={18} strokeWidth={3} className="mx-mds-checks__ok" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
