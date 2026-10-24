import { motion } from 'framer-motion'
import { Check, ShoppingCart, ArrowUpRight } from 'lucide-react'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'
import { EASE } from '../home-sections/homeMotion'
import { MaskLines } from '../home-sections/HomeKit'

export default function OfferSection() {
  const handlePurchaseClick = () => {
    // Redirect to Stripe payment page
    window.location.href = 'https://buy.stripe.com/8x24gBgjJdi9fVdfVjdIA00';
  };

  // Calcola i posti rimasti basandosi sui giorni del mese
  const calculateRemainingSpots = () => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const totalSpots = 60;
    const remainingSpots = Math.max(1, totalSpots - (2 * dayOfMonth)); // Minimo 1 posto
    return remainingSpots;
  };

  const remainingSpots = calculateRemainingSpots();

  // Ottieni il nome del mese corrente
  const getCurrentMonthName = () => {
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];
    const today = new Date();
    return months[today.getMonth()];
  };

  const currentMonth = getCurrentMonthName();

  return (
    <section id="offer-section" className="mx-section mx-mds-offer">
      <div className="mx-mds-offer__glow" aria-hidden="true" />
      <div className="mx-wrap mx-mds-offer__grid">
        <div className="mx-mds-offer__head">
          <h2 className="mx-h mx-mds-offer__title">
            <MaskLines
              lines={[
                { text: 'LA NOSTRA' },
                { text: 'OFFERTA', className: 'mx-accent' },
                { text: `DI ${currentMonth.toUpperCase()}`, className: 'mx-outline' },
                { text: 'PER TE' },
              ]}
            />
          </h2>
        </div>

        <motion.article
          className="mx-mds-ticket"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="mx-mds-spots">
            <p className="mx-mds-spots__label">
              ⚠️ Solo {remainingSpots} posti rimasti su 60
            </p>
            <span className="mx-mds-spots__meter" aria-hidden="true">
              {Array.from({ length: 20 }, (_, i) => (
                <i key={i} className={i < Math.ceil((remainingSpots / 60) * 20) ? 'is-free' : ''} />
              ))}
            </span>
          </div>

          <h3 className="mx-h mx-h--md mx-mds-ticket__name">
            Trattamento Osteopatico per Mal di Schiena
          </h3>

          <div className="mx-mds-price">
            <span className="mx-mds-price__old">
              €90
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              />
            </span>
            <span className="mx-mds-price__new">€69</span>
          </div>

          <div className="mx-mds-ticket__perf" aria-hidden="true" />

          <p className="mx-mds-ticket__intro">
            Il trattamento di un'ora è composto da:
          </p>
          <ul className="mx-mds-ticket__list">
            {[
              "Anamnesi generale approfondita",
              "Trattamento Osteopatico specializzato per il mal di schiena",
              "Consigli per evitare che il problema torni"
            ].map((item) => (
              <li key={item}>
                <span className="mx-mds-ticket__tick"><Check size={14} strokeWidth={3.2} /></span>
                {item}
              </li>
            ))}
          </ul>

          <motion.button
            type="button"
            onClick={handlePurchaseClick}
            className="mx-btn mx-btn--primary mx-mds-buy mx-mds-buy--ticket"
            whileTap={{ scale: 0.97 }}
          >
            <span className="mx-mds-buy__label">
              <ShoppingCart size={20} strokeWidth={2.4} />
              ACQUISTA ORA
            </span>
            <span className="mx-btn__icon">
              <ArrowUpRight size={20} strokeWidth={2.4} />
            </span>
          </motion.button>

          <p className="mx-mds-ticket__note">
            Dopo che effettui l'acquisto, la nostra segretaria ti chiamerà per prenotare il trattamento per quando ti è comodo. Siamo aperti anche il sabato! 😁
          </p>

          <div className="mx-mds-reviews">
            <p>
              Abbiamo oltre {RECENSIONI_TOTALI} recensioni Google di persone che raccontano storie meravigliose sui nostri trattamenti
            </p>
            <GoogleReviewsLinks align="center" />
          </div>
        </motion.article>

        <div className="mx-mds-urgency">
          <p>⚡ Offerta limitata SOLO per QUESTO MESE - Fino ad esaurimento posti</p>
        </div>
      </div>
    </section>
  )
}
