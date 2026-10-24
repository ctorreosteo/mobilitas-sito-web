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
    <section id="offer-section" style={{
      background: 'linear-gradient(135deg, #0a1a3a 0%, #002552 25%, #1a3a5c 50%, #002552 75%, #0a1a3a 100%)',
      padding: '80px 16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(114, 250, 147, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      {/* Content */}
      <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '0 8px', position: 'relative', zIndex: 1}}>
        
        {/* Offer Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{marginBottom: '48px'}}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '16px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <motion.div 
              style={{color: '#F4F4F4', display: 'block'}}
              animate={{ textShadow: ['0 4px 20px rgba(0,0,0,0.3)', '0 4px 20px rgba(114, 250, 147, 0.3)', '0 4px 20px rgba(0,0,0,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              LA NOSTRA
            </motion.div>
            <motion.div 
              style={{color: '#72fa93', display: 'block'}}
              animate={{ 
                textShadow: [
                  '0 4px 20px rgba(114, 250, 147, 0.3)',
                  '0 4px 30px rgba(114, 250, 147, 0.6)',
                  '0 4px 20px rgba(114, 250, 147, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OFFERTA
            </motion.div>
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
            padding: '40px 32px',
            borderRadius: '24px',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            border: '2px solid rgba(114, 250, 147, 0.4)',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            color: '#002552',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Card Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, #72fa93, #00BFFF, #72fa93)',
            borderRadius: '24px',
            zIndex: -1,
            opacity: 0.3,
            filter: 'blur(8px)'
          }} />
          {/* Urgency Banner - Inside white box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              boxShadow: '0 3px 12px rgba(255, 190, 100, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              border: '1px solid rgba(255, 190, 100, 0.8)',
              background: 'linear-gradient(135deg, rgba(255, 218, 185, 0.8) 0%, rgba(255, 190, 100, 0.9) 100%)',
              color: '#002552',
              margin: '0 auto 16px auto',
              width: 'auto',
              maxWidth: '400px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
              animate={{ left: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>
              ⚠️ Solo {remainingSpots} posti rimasti su 60
            </span>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
              Abbiamo oltre {RECENSIONI_TOTALI} recensioni Google di persone che raccontano storie meravigliose sui nostri trattamenti
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
            Trattamento Osteopatico per Mal di Schiena
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
              color: '#2E7D32'
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
              Il trattamento di un'ora è composto da:
            </p>
            
            <div style={{textAlign: 'left'}}>
              {[
                "Anamnesi generale approfondita",
                "Trattamento Osteopatico specializzato per il mal di schiena",
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
              padding: '18px 36px',
              borderRadius: '50px',
              fontSize: '19px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              margin: '0 auto 20px auto',
              boxShadow: '0 12px 35px rgba(0, 37, 82, 0.4), inset 0 1px 0 rgba(114, 250, 147, 0.2)',
              transition: 'all 0.3s ease',
              fontFamily: 'Montserrat, sans-serif',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#001a3a';
              e.target.style.boxShadow = '0 18px 45px rgba(0, 37, 82, 0.6), inset 0 1px 0 rgba(114, 250, 147, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#002552';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 37, 82, 0.4), inset 0 1px 0 rgba(114, 250, 147, 0.2)';
            }}
          >
            <ShoppingCart style={{width: '22px', height: '22px'}} />
            ACQUISTA ORA
          </motion.button>

          {/* Disclaimer Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: '13px',
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#ff6b35',
              textAlign: 'center',
              margin: '0 auto',
              lineHeight: '1.4',
              maxWidth: '500px'
            }}
          >
            Dopo che effettui l'acquisto, la nostra segretaria ti chiamerà per prenotare il trattamento per quando ti è comodo. Siamo aperti anche il sabato! 😁
          </motion.p>
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
