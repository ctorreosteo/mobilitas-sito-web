import { motion } from 'framer-motion'

// Barra di scarsità fissa in alto: stesso conteggio di prima (60 posti, -2 al giorno, minimo 1),
// con un indicatore che mostra quanti dei 60 posti restano.
export default function AnnouncementBar() {
  // Calcola i posti rimasti basandosi sui giorni del mese
  const calculateRemainingSpots = () => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const totalSpots = 60;
    const remainingSpots = Math.max(1, totalSpots - (2 * dayOfMonth)); // Minimo 1 posto
    return remainingSpots;
  };

  const remainingSpots = calculateRemainingSpots();

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-mds-bar"
      role="status"
    >
      <span className="mx-mds-bar__dot" aria-hidden="true" />
      <span className="mx-mds-bar__txt">
        <span className="mx-mds-bar__emoji">⚠️</span>
        <span>
          Solo {remainingSpots} posti rimasti
        </span>
      </span>
      <span className="mx-mds-bar__meter" aria-hidden="true">
        <i style={{ transform: `scaleX(${remainingSpots / 60})` }} />
      </span>
    </motion.div>
  )
}
