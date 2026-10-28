import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CheckCircle, ShoppingCart, ArrowDown, Gift } from 'lucide-react'
import WhatsAppIcon from '../whatsapp/WhatsAppIcon'
import { EASE } from '../home-sections/homeMotion'
import { Snap } from '../home-sections/HomeKit'

const boxImages = [
  { src: '/natale25/web/box1-1280.jpg', small: '/natale25/web/box1-900.jpg' },
  { src: '/natale25/web/box2-1280.jpg', small: '/natale25/web/box2-900.jpg' },
]

const handlePurchaseClick = (type) => {
  // Redirect to WhatsApp with pre-filled message
  const phoneNumber = '393518198457' // Numero senza + e spazi

  let message = ''
  if (type === 'single') {
    message = 'Ciao! Vorrei acquistare il Cofanetto Natalizio Mobilitas (1 cofanetto a €29). Come posso procedere?'
  } else if (type === 'triple') {
    message = 'Ciao! Vorrei acquistare l\'offerta speciale del Cofanetto Natalizio Mobilitas (3 cofanetti + 1 in omaggio a €87). Come posso procedere?'
  } else {
    message = 'Ciao! Vorrei avere maggiori informazioni sul Cofanetto Natalizio Mobilitas. Come funziona e come posso acquistarlo?'
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const scrollToOffer = () => {
  const offerSection = document.getElementById('offer-section');
  if (offerSection) {
    offerSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Il cofanetto come oggetto: si apre da solo all'arrivo (coperchio che vola, il cofanetto vero che esce),
// un tocco lo richiude e lo riapre.
function GiftBox() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <button
      type="button"
      className={`mx-xmas-gift ${open ? 'is-open' : ''}`}
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? 'Chiudi il regalo' : 'Apri il regalo'}
    >
      <span className="mx-xmas-gift__glow" aria-hidden="true" />
      <motion.span
        className="mx-xmas-gift__card"
        initial={false}
        animate={open ? { y: '-26%', rotate: -3, scale: 1 } : { y: '42%', rotate: 0, scale: 0.92 }}
        transition={{ duration: 1.1, ease: EASE, delay: open ? 0.25 : 0 }}
      >
        <img src="/natale25/web/box1-900.jpg" alt="Cofanetto natalizio Mobilitas" />
      </motion.span>
      <span className="mx-xmas-gift__base" aria-hidden="true">
        <i className="mx-xmas-gift__ribbon" />
      </span>
      <motion.span
        className="mx-xmas-gift__lid"
        aria-hidden="true"
        initial={false}
        animate={open ? { y: -150, x: 70, rotate: 24, opacity: 0.0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <i className="mx-xmas-gift__ribbon" />
        <svg className="mx-xmas-gift__bow" viewBox="0 0 120 60">
          <path d="M60 40 C40 5, 6 8, 14 30 C20 46, 44 44, 60 40 Z" />
          <path d="M60 40 C80 5, 114 8, 106 30 C100 46, 76 44, 60 40 Z" />
          <circle cx="60" cy="40" r="9" />
        </svg>
      </motion.span>
      <AnimatePresence>
        {open && (
          <span className="mx-xmas-gift__sparks" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.i
                key={i}
                initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0.6],
                  opacity: [1, 1, 0],
                  x: Math.cos((i / 10) * Math.PI * 2) * (90 + (i % 3) * 22),
                  y: Math.sin((i / 10) * Math.PI * 2) * (60 + (i % 2) * 24) - 60,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.35 }}
              />
            ))}
          </span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function OfferSection() {
  return (
    <>
      {/* Apertura */}
      <section className="mx-xmas-hero">
        <div className="mx-xmas-lights" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 6) * 0.4}s` }} />)}
        </div>
        <div className="mx-wrap mx-xmas-hero__grid">
          <div className="mx-xmas-hero__copy">
            <motion.p
              className="mx-xmas-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="mx-xmas-badge__dot" />
              Regalo di Natale
            </motion.p>

            <h1 className="mx-h mx-xmas-hero__title">
              {['🎁 IL REGALO PERFETTO', 'AL PREZZO PERFETTO 🎄'].map((line, i) => (
                <span key={line} className="mx-mask">
                  <motion.span
                    className={i === 1 ? 'mx-accent' : undefined}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <p className="mx-xmas-hero__sub">
              Un trattamento osteopatico è un regalo unico e originale che sarà davvero apprezzato ✨
            </p>
          </div>

          <div className="mx-xmas-hero__gift">
            <GiftBox />
          </div>

          <div className="mx-xmas-hero__cta">
            <motion.button
              type="button"
              className="mx-btn mx-btn--primary mx-xmas-buy"
              onClick={scrollToOffer}
              whileTap={{ scale: 0.97 }}
            >
              <span className="mx-xmas-buy__label">
                <ShoppingCart size={20} strokeWidth={2.4} />
                ACQUISTA ORA
              </span>
              <span className="mx-btn__icon"><ArrowDown size={20} strokeWidth={2.4} /></span>
            </motion.button>
            <p className="mx-xmas-hero__prices" aria-hidden="true">
              <span>1 × <s>€90</s> <b>€29</b></span>
              <span>3+1 × <s>€360</s> <b>€87</b></span>
            </p>
          </div>
        </div>
      </section>

      {/* VSL */}
      <section className="mx-xmas-vsl">
        <div className="mx-wrap">
          <motion.div
            className="mx-xmas-vsl__frame"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <video
              src="http://d3t9xqw34vp9a0.cloudfront.net/video/VSL_NATALE_01.mp4"
              poster="/natale25/web/box2-900.jpg"
              controls
              playsInline
              webkit-playsinline="true"
              preload="metadata"
            >
              Il tuo browser non supporta il tag video.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Offerte */}
      <section id="offer-section" className="mx-xmas-offers">
        <div className="mx-wrap">
          <div className="mx-xmas-offers__head">
            <h2 className="mx-h mx-xmas-h2">
              Ecco la <span className="mx-accent">soluzione</span> che desideravi 😁
            </h2>
            <p className="mx-xmas-lead">Scegli l'offerta che preferisci</p>
          </div>

          <Snap className="mx-xmas-photos">
            {boxImages.map((img, index) => (
              <figure key={img.src} className="mx-xmas-photo">
                <img
                  src={img.src}
                  srcSet={`${img.small} 900w, ${img.src} 1280w`}
                  sizes="(min-width: 900px) 560px, 84vw"
                  alt={`Cofanetto natalizio Mobilitas ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </Snap>

          <div className="mx-xmas-tickets">
            <motion.article
              className="mx-xmas-tag"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="mx-xmas-tag__hole" aria-hidden="true" />
              <div className="mx-xmas-tag__boxes" aria-hidden="true">
                <span><Gift size={22} /></span>
              </div>
              <h3 className="mx-h mx-xmas-tag__name">🎁 1 Cofanetto</h3>
              <div className="mx-xmas-price">
                <s>€90</s>
                <b>€29</b>
              </div>
              <ul className="mx-xmas-tag__list">
                {[
                  "Regala una sensazione di leggerezza e benessere generale",
                  "Riduce rigidità e tensioni nascoste",
                  "Migliora postura e mobilità del corpo"
                ].map((item) => (
                  <li key={item}><CheckCircle size={18} strokeWidth={2.4} /><span>{item}</span></li>
                ))}
              </ul>
              <motion.button
                type="button"
                className="mx-xmas-tag__btn"
                onClick={() => handlePurchaseClick('single')}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon size={20} />
                ACQUISTA ORA
              </motion.button>
            </motion.article>

            <motion.article
              className="mx-xmas-tag mx-xmas-tag--best"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <span className="mx-xmas-tag__hole" aria-hidden="true" />
              <span className="mx-xmas-tag__ribbon">⭐ Il più scelto</span>
              <div className="mx-xmas-tag__boxes" aria-hidden="true">
                <span><Gift size={22} /></span>
                <span><Gift size={22} /></span>
                <span><Gift size={22} /></span>
                <span className="is-free"><Gift size={22} /></span>
              </div>
              <h3 className="mx-h mx-xmas-tag__name">🎁 3 Cofanetti + 1 in Omaggio</h3>
              <div className="mx-xmas-price">
                <s>€360</s>
                <b>€87</b>
              </div>
              <p className="mx-xmas-tag__per">(€29 per cofanetto + 1 OMAGGIO per te)</p>
              <p className="mx-xmas-tag__gift">🎁 Il quarto trattamento è in omaggio per te!</p>
              <ul className="mx-xmas-tag__list">
                {[
                  "Regala benessere a 3 persone care",
                  "Ottieni un trattamento gratuito per te",
                  "Risparmi €273 rispetto al prezzo originale"
                ].map((item) => (
                  <li key={item}><CheckCircle size={18} strokeWidth={2.4} /><span>{item}</span></li>
                ))}
              </ul>
              <motion.button
                type="button"
                className="mx-xmas-tag__btn mx-xmas-tag__btn--best"
                onClick={() => handlePurchaseClick('triple')}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon size={20} />
                ACQUISTA ORA
              </motion.button>
            </motion.article>
          </div>

          <div className="mx-xmas-deadline">
            <p>
              ⚡ Offerta limitata fino al 23 dicembre 🎅
              <br />
              <span>Ritira in studio in Via Peyron 54 o in Via Lamarmora 35</span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
