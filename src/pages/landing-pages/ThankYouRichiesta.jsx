import { motion } from 'framer-motion'
import { CheckCircle, Clock, Phone, Mail } from 'lucide-react'
import { useEffect } from 'react'

export default function ThankYouRichiesta() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead')
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #002552, rgba(0, 37, 82, 0.9))' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#72fa93',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 20px 40px rgba(114, 250, 147, 0.3)',
            }}
            >
              <CheckCircle
                style={{
                  width: '60px',
                  height: '60px',
                  color: '#002552',
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#F4F4F4',
              marginBottom: '24px',
              lineHeight: '1.1',
            }}
          >
            GRAZIE!
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#72fa93',
              marginBottom: '32px',
            }}
          >
            La tua richiesta è stata effettuata con successo
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              backgroundColor: '#F4F4F4',
              borderRadius: '20px',
              padding: '40px 32px',
              marginBottom: '32px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
              border: '3px solid rgba(114, 250, 147, 0.3)',
            }}
          >
            <p style={{
              fontSize: '18px',
              color: '#002552',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}
            >
              La tua richiesta è stata registrata correttamente nel nostro sistema.
            </p>

            <div style={{
              backgroundColor: '#e8f5e8',
              border: '2px solid #72fa93',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
              >
                <Clock style={{ width: '24px', height: '24px', color: '#002552' }} />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#002552',
                  margin: 0,
                }}
                >
                  Prossimi Passi
                </h3>
              </div>

              <p style={{
                fontSize: '16px',
                color: '#002552',
                margin: 0,
                lineHeight: '1.5',
              }}
              >
                <strong>Entro 24 ore lavorative</strong> la nostra segretaria ti contatterà per:
              </p>

              <ul style={{
                textAlign: 'left',
                marginTop: '16px',
                paddingLeft: '20px',
              }}
              >
                <li style={{
                  fontSize: '16px',
                  color: '#002552',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                }}
                >
                  Confermare i dettagli della tua richiesta
                </li>
                <li style={{
                  fontSize: '16px',
                  color: '#002552',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                }}
                >
                  Fornirti tutte le informazioni necessarie
                </li>
                <li style={{
                  fontSize: '16px',
                  color: '#002552',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                }}
                >
                  Concordare la data e l&apos;orario del tuo trattamento
                </li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              >
                <Phone style={{ width: '20px', height: '20px', color: '#002552' }} />
                <span style={{
                  fontSize: '16px',
                  color: '#002552',
                  fontWeight: '600',
                }}
                >
                  +39 3518198457
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              >
                <Mail style={{ width: '20px', height: '20px', color: '#002552' }} />
                <span style={{
                  fontSize: '16px',
                  color: '#002552',
                  fontWeight: '600',
                }}
                >
                  studio@studiomobilitas.it
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              backgroundColor: 'rgba(114, 250, 147, 0.2)',
              border: '2px solid rgba(114, 250, 147, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p style={{
              color: '#F4F4F4',
              fontSize: '16px',
              fontWeight: '600',
              margin: 0,
              lineHeight: '1.5',
            }}
            >
              💡 <strong>Consiglio:</strong> Tieni a portata di mano questo numero di riferimento e controlla la tua email per eventuali comunicazioni aggiuntive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ marginTop: '32px' }}
          >
            <motion.button
              onClick={() => {
                const message = encodeURIComponent('Ciao, ho completato la richiesta per il trattamento osteopatico. Quando avete posto?')
                window.open(`https://wa.me/393518198457?text=${message}`, '_blank')
              }}
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Montserrat, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1ea952'
                e.target.style.boxShadow = '0 15px 40px rgba(37, 211, 102, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#25D366'
                e.target.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.4)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Scrivici su Whatsapp per velocizzare
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
