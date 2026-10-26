import { useEffect } from 'react'
import ThankYouScreen from '../../components/thankyou/ThankYouScreen'

export default function ThankYou() {
  // Track purchase event with Meta Pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);
  return (
    <ThankYouScreen
      subtitle="Il tuo pagamento è stato completato con successo"
      registered="La tua prenotazione è stata registrata correttamente nel nostro sistema."
      confirmItem="Confermare i dettagli della tua prenotazione"
      timeItem="Concordare la data e l'orario del tuo trattamento"
      onWhatsApp={() => {
        const message = encodeURIComponent("Ciao, ho completato la richiesta per il trattamento osteopatico scontato. Quando avete posto?");
        window.open(`https://wa.me/393518198457?text=${message}`, '_blank');
      }}
    />
  )
}
