import { useEffect, useState } from 'react'
import ThankYouScreen from '../../components/thankyou/ThankYouScreen'
import PrenotaVisita from '../../components/prenota-visita/PrenotaVisita'
import { leggiRichiesta } from '../../components/prenota-visita/richiestaSalvata'
import { doloreDi } from '../../data/dolori'
import { prenotataDi, whatsappConferma } from '../../components/prenota-visita/whatsappConferma'
import RecensioniDolore from '../../components/recensioni-tag/RecensioniDolore'

// Conversioni Google Ads delle campagne (prima avevano ciascuna una pagina di conferma sua):
// partono da qui in base alla landing del form appena inviato
const CONVERSIONI_GOOGLE_ADS = {
  cervicalgia: { send_to: 'AW-16532564533/0OVwCJWk4oscELXUq8s9' },
  'osteopata-torino': { send_to: 'AW-16532564533/wZVSCMffzrAbELXUq8s9', value: 49.0, currency: 'EUR' },
  'offerta-yt': { send_to: 'AW-16532564533/wZVSCMffzrAbELXUq8s9', value: 49.0, currency: 'EUR' },
}

// Pagina di conferma unica di tutte le landing: l'URL è sempre /conferma-richiesta
// (/conferma, /cervicalgia/conferma e /osteopata-torino-conferma portano qui).
// Il dolore arriva dal form appena inviato (sessionStorage, vedi richiestaSalvata.js): se c'è, il testo
// parla di quel problema e compare il calendario della prima visita; se non c'è (pagina aperta in altro
// modo, lista d'attesa YouTube...) resta il testo generico. Lo stesso vale per le recensioni in fondo.
export default function ThankYouRichiesta() {
  const [richiesta] = useState(leggiRichiesta)
  const dolore = doloreDi(richiesta?.pageContext)
  const conCalendario = !!(richiesta?.id && richiesta?.token)
  const [prenotata, setPrenotata] = useState(() => prenotataDi(richiesta))
  const wa = whatsappConferma({ dolore, conCalendario, prenotata })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead')
    }
    const conversione = CONVERSIONI_GOOGLE_ADS[richiesta?.pageContext]
    if (conversione && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', conversione)
    }
  }, [richiesta])

  const messaggioWhatsApp =
    wa?.messaggio ??
    (dolore
      ? `Ciao, ho appena inviato la richiesta ${dolore.per}. Quando avete posto?`
      : 'Ciao, ho completato la richiesta per il trattamento osteopatico. Quando avete posto?')
  // Con il calendario la segreteria chiama solo se l'orario non è già stato scelto qui
  const timeItem = prenotata
    ? 'Confermare la tua prima visita'
    : conCalendario
      ? 'Fissare giorno e ora, se non li hai già scelti qui sopra'
      : dolore
        ? 'Fissare giorno e ora della prima visita'
        : "Concordare la data e l'orario del tuo trattamento"

  return (
    <ThankYouScreen
      subtitle={dolore ? `Abbiamo ricevuto la tua richiesta ${dolore.per}` : 'La tua richiesta è stata effettuata con successo'}
      registered={
        dolore
          ? `Il trattamento osteopatico ${dolore.per} parte da una prima visita: capiamo da dove nasce ${dolore.ilTuo} e lavoriamo sulla causa.`
          : 'La tua richiesta è stata registrata correttamente nel nostro sistema.'
      }
      confirmItem={dolore ? `Capire meglio ${dolore.ilTuo}` : 'Confermare i dettagli della tua richiesta'}
      timeItem={timeItem}
      waEtichetta={wa?.etichetta}
      onWhatsApp={() => {
        window.open(`https://wa.me/393518198457?text=${encodeURIComponent(messaggioWhatsApp)}`, '_blank')
      }}
      recensioni={<RecensioniDolore dolore={dolore} />}
    >
      {conCalendario && <PrenotaVisita richiesta={richiesta} dolore={dolore} onPrenotata={setPrenotata} />}
    </ThankYouScreen>
  )
}
