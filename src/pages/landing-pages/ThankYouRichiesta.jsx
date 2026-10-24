import { useEffect } from 'react'
import ThankYouScreen from '../../components/thankyou/ThankYouScreen'

export default function ThankYouRichiesta() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead')
    }
  }, [])

  return (
    <ThankYouScreen
      subtitle="La tua richiesta è stata effettuata con successo"
      registered="La tua richiesta è stata registrata correttamente nel nostro sistema."
      confirmItem="Confermare i dettagli della tua richiesta"
      timeItem="Concordare la data e l'orario del tuo trattamento"
      onWhatsApp={() => {
        const message = encodeURIComponent('Ciao, ho completato la richiesta per il trattamento osteopatico. Quando avete posto?')
        window.open(`https://wa.me/393518198457?text=${message}`, '_blank')
      }}
    />
  )
}
