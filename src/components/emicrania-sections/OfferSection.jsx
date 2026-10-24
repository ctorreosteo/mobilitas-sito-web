import { motion } from 'framer-motion'
import { CheckCircle, ShoppingCart } from 'lucide-react'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'

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
    <section id="offer-section" style={{background: 'linear-gradient(to bottom right, #002552, rgba(0, 37, 82, 0.9))', padding: '48px 16px', position: 'relative'}}>
      {/* Content */}
      <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '0 8px'}}>
        
        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 24px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255, 140, 0, 0.4)',
            backgroundColor: 'rgba(255, 140, 0, 0.3)',
            color: '#F4F4F4',
            margin: '0 auto 20px auto'
          }}
        >
          ⚠️ {remainingSpots} posti rimasti su 60
        </motion.div>
        
        {/* Offer Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{marginBottom: '32px'}}
        >
          <h2 style={{fontSize: '36px', fontWeight: '900', lineHeight: '1.1', marginBottom: '16px'}}>
            <div style={{color: '#F4F4F4', display: 'block'}}>LA NOSTRA</div>
            <div style={{color: '#72fa93', display: 'block'}}>OFFERTA</div>
            <div style={{color: '#F4F4F4', display: 'block'}}>DI {currentMonth.toUpperCase()}</div>
            <div style={{color: '#F4F4F4', display: 'block'}}>PER TE</div>
          </h2>
        </motion.div>

        {/* Offer Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            padding: '32px 24px',
            borderRadius: '20px',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            border: '3px solid rgba(114, 250, 147, 0.3)',
            backgroundColor: '#F4F4F4',
            color: '#002552'
          }}
        >
          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              backgroundColor: '#e8f5e8',
              border: '2px solid #72fa93',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            <p style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#002552',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Abbiamo oltre {RECENSIONI_TOTALI} recensioni Google di persone che raccontano storie incredibili sui nostri trattamenti
            </p>
            <GoogleReviewsLinks align="center" variant="light" className="mt-3" />
          </motion.div>

          {/* Treatment Title */}
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#002552'
          }}>
            Trattamento osteopatico per Emicrania
          </h3>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '24px'
          }}>
            <span style={{
              fontSize: '28px',
              fontWeight: 'bold',
              textDecoration: 'line-through',
              color: 'rgba(0, 37, 82, 0.6)'
            }}>
              €90
            </span>
            <span style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#00BFFF'
            }}>
              €69
            </span>
          </div>

          {/* Treatment Description */}
          <div style={{marginBottom: '32px'}}>
            <p style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#002552',
              textAlign: 'left'
            }}>
              Il trattamento è composto da:
            </p>
            
            <div style={{textAlign: 'left'}}>
              {[
                "Anamnesi generale approfondita",
                "Trattamento osteopatico specializzato",
                "Consigli per evitare che il problema torni"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <CheckCircle 
                    style={{
                      width: '20px',
                      height: '20px',
                      color: '#00BFFF',
                      marginRight: '12px',
                      flexShrink: 0
                    }} 
                  />
                  <span style={{
                    fontSize: '16px',
                    color: '#002552',
                    fontWeight: '500'
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button 
            onClick={handlePurchaseClick}
            style={{
              backgroundColor: '#002552',
              color: '#72fa93',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0, 37, 82, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'Montserrat, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#001a3a';
              e.target.style.boxShadow = '0 15px 40px rgba(0, 37, 82, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#002552';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 37, 82, 0.4)';
            }}
          >
            <ShoppingCart style={{width: '20px', height: '20px'}} />
            ACQUISTA ORA
          </motion.button>
        </motion.div>

        {/* Urgency Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            backgroundColor: 'rgba(114, 250, 147, 0.2)',
            border: '2px solid rgba(114, 250, 147, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          <p style={{
            color: '#F4F4F4',
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
            textAlign: 'center'
          }}>
            ⚡ Offerta limitata SOLO per QUESTO MESE - Fino ad esaurimento posti
          </p>
        </motion.div>
      </div>
    </section>
  )
}
