import { motion } from 'framer-motion'
import { MapPin, Users, Clock, Calendar, MessageCircle, ShoppingCart, ArrowUp } from 'lucide-react'
import LandingAccordion from '../landing-kit/LandingAccordion'
import { Reveal } from '../home-sections/HomeKit'

const faqs = [
  {
    icon: MapPin,
    q: "Dove posso ritirare il cofanetto?",
    a: "Puoi ritirare il cofanetto direttamente in uno dei nostri due studi a Torino, in Via Peyron 54 o in Via Lamarmora 35, fino al 23 dicembre. Siamo aperti dal lunedì al venerdì dalle 8:00 alle 21:00 e il sabato dalle 9:00 alle 18:00. Siamo comodamente raggiungibili con la metropolitana (fermate Bernini o Principi d'Acaja per Via Peyron, Re Umberto per Via Lamarmora) e vicino a entrambi gli studi trovi parcheggio."
  },
  {
    icon: Users,
    q: "Per chi è adatto questo regalo?",
    a: "Il cofanetto è perfetto per chiunque apprezzi il benessere e la cura di sé. È ideale per sportivi che hanno bisogno di scaricare tensioni muscolari, per chi lavora al computer e ha bisogno di liberare schiena e collo, per chi vive una vita frenetica e ha bisogno di una pausa per sé, per anziani, donne incinte e bambini, e per chiunque apprezzi regali utili e originali invece di oggetti che finiscono dimenticati in un cassetto."
  },
  {
    icon: MessageCircle,
    q: "Come funziona il trattamento?",
    a: "Il trattamento osteopatico è un approccio manuale che agisce sulla causa dei problemi, non solo sui sintomi. Include un'accurata anamnesi, una valutazione posturale completa e il trattamento osteopatico specifico per il caso, garantendo la massima efficacia. Il nostro obiettivo è eliminare alla radice le cause di tensioni e dolori, per restituire benessere, energia e libertà di movimento."
  },
  {
    icon: Clock,
    q: "Quanto dura il trattamento?",
    a: "Il trattamento osteopatico ha una durata di circa 1 ora. Questo tempo ci permette di svolgere un'accurata anamnesi, una valutazione posturale completa e il trattamento osteopatico specifico per il caso, garantendo la massima efficacia terapeutica."
  },
  {
    icon: Calendar,
    q: "Quando scade il cofanetto?",
    a: "Il cofanetto è valido fino al 1° maggio 2025. Questo dà tutto il tempo necessario per effettuare il trattamento quando si preferisce, senza fretta."
  },
  {
    icon: MessageCircle,
    q: "Cosa bisogna fare per attivare il trattamento?",
    a: "È semplicissimo! Dopo aver ritirato il cofanetto, basterà scriverci su WhatsApp al numero +39 3518198457 per prenotare il trattamento. Dovrà comunicarci chi gli ha regalato il cofanetto e insieme concorderemo il giorno e l'orario più comodi per lui/lei."
  }
]

export default function FAQSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-xmas-faq">
      <div className="mx-wrap mx-xmas-faq__grid">
        <Reveal className="mx-xmas-faq__head">
          <h2 className="mx-h mx-xmas-h2 mx-xmas-h2--dark">
            Domande <span className="mx-xmas-hl">Frequenti</span> ❓
          </h2>
          <p className="mx-xmas-lead mx-xmas-lead--dark">
            Tutte le risposte che ti servono per fare il regalo perfetto questo Natale 🎁
          </p>
        </Reveal>

        <LandingAccordion items={faqs} className="mx-xmas-acc" />

        <div className="mx-xmas-faq__cta">
          <motion.button
            type="button"
            onClick={scrollToOffer}
            className="mx-xmas-tag__btn mx-xmas-tag__btn--best"
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingCart size={20} strokeWidth={2.4} />
            ACQUISTA ORA
            <ArrowUp size={18} strokeWidth={2.4} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
