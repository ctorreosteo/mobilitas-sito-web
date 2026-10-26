import { motion } from 'framer-motion'
import { Check, Star, Calendar } from 'lucide-react'
import { useEffect } from 'react'
import { EASE } from '../home-sections/homeMotion'

const benefits = [
  "Alleviamo i problemi tipici della gravidanza (mal di schiena, tensioni al collo, pesantezza alle gambe, nausea ecc.)",
  "Miglioriamo il benessere di mamma e bambino",
  "Prepariamo il corpo al parto in modo naturale, migliorando la mobilità del bacino"
]

export default function VSLSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Load Wistia player script
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/embed/1uk1gn9uda.js';
    script2.async = true;
    script2.type = 'module';
    document.head.appendChild(script2);

    // Add Wistia styles
    const style = document.createElement('style');
    style.textContent = `wistia-player[media-id='1uk1gn9uda']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/1uk1gn9uda/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`;
    document.head.appendChild(style);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="mx-grav-hero" id="grav-hero">
      <div className="mx-grav-hero__sky" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="mx-wrap mx-grav-hero__grid">
        <div className="mx-grav-hero__copy">
          <motion.p
            className="mx-grav-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Star size={14} strokeWidth={2.4} />
            Trattamento Specifico
          </motion.p>

          <h1 className="mx-h mx-grav-hero__title">
            {['TRATTAMENTO', 'OSTEOPATICO', 'GRAVIDANZA 🤱'].map((line, i) => (
              <span key={line} className="mx-mask">
                <motion.span
                  className={i === 1 ? 'mx-grav-soft' : undefined}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mx-grav-video"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        >
          <span className="mx-grav-video__halo" aria-hidden="true" />
          <span className="mx-grav-video__halo mx-grav-video__halo--2" aria-hidden="true" />
          <div className="mx-grav-video__frame">
            <wistia-player
              media-id="1uk1gn9uda"
              seo="false"
              aspect="1.7777777777777777"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mx-grav-hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
        >
          <motion.button type="button" onClick={scrollToOffer} className="mx-grav-btn" whileTap={{ scale: 0.97 }}>
            <Calendar size={20} strokeWidth={2.4} />
            <span>PRENOTA ORA CON SCONTO</span>
          </motion.button>
        </motion.div>

        <div className="mx-grav-hero__benefits">
          <h3 className="mx-h mx-grav-hero__btitle">I 3 benefici immediati del Trattamento Osteopatico:</h3>
          <ul className="mx-grav-checks">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.6 + index * 0.1 }}
              >
                <span className="mx-grav-checks__ic"><Check size={15} strokeWidth={3} /></span>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
