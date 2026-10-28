import { motion } from 'framer-motion'
import { Clock, Shirt, Phone, MapPin, Calendar, ShoppingCart, ArrowUp } from 'lucide-react'
import LandingAccordion from '../landing-kit/LandingAccordion'
import { Reveal } from '../home-sections/HomeKit'

const faqs = [
  {
    icon: Clock,
    q: "Quanto dura il trattamento?",
    a: "Il trattamento osteopatico ha una durata di circa 60 minuti. Questo tempo ci permette di svolgere un'accurata anamnesi, una valutazione posturale completa e il trattamento osteopatico specifico per il mal di schiena, garantendo la massima efficacia terapeutica."
  },
  {
    icon: Shirt,
    q: "Come mi devo vestire?",
    a: "Ti consigliamo di indossare abbigliamento comodo e sportivo, come quello che useresti per andare in palestra. È importante che tu ti senta a tuo agio durante il trattamento. Evita abiti troppo stretti o con bottoni che potrebbero interferire con la valutazione posturale."
  },
  {
    icon: Phone,
    q: "Cosa succede dopo che acquisto?",
    a: "Dopo l'acquisto, la nostra segretaria ti contatterà entro 24 ore per concordare insieme il giorno e l'orario più comodi per te. Potrai scegliere tra i nostri orari di apertura e, se necessario, possiamo valutare orari extra per soddisfare le tue esigenze specifiche."
  },
  {
    icon: MapPin,
    q: "Dove siete?",
    a: "Abbiamo due studi a Torino: in Via Peyron 54 (San Donato) e in Via Lamarmora 35 (Crocetta), entrambi facilmente raggiungibili. Via Peyron è comoda con la metropolitana, fermate Bernini o Principi d'Acaja; Via Lamarmora è vicina alla fermata Re Umberto. Vicino a entrambi trovi parcheggio per chi preferisce arrivare in auto."
  },
  {
    icon: Calendar,
    q: "Quali sono i vostri orari di apertura?",
    a: "Siamo aperti dal lunedì al venerdì dalle 9:00 alle 20:00 e il sabato dalle 9:00 alle 18:00. Comprendiamo che ogni persona ha esigenze diverse, quindi offriamo anche orari extra su appuntamento per soddisfare le necessità specifiche dei nostri pazienti."
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
    <section className="mx-section mx-section--deep mx-mds-faq">
      <div className="mx-wrap mx-mds-faq__grid">
        <Reveal className="mx-mds-faq__head">
          <h2 className="mx-h mx-h--lg">
            Domande <span className="mx-gradient">Frequenti</span>
          </h2>
          <p className="mx-lead">
            Tutte le risposte che ti servono per iniziare il tuo percorso verso la libertà dal mal di schiena.
          </p>
          <motion.button
            type="button"
            onClick={scrollToOffer}
            className="mx-btn mx-btn--ghost mx-mds-buy mx-mds-faq__cta"
            whileTap={{ scale: 0.97 }}
          >
            <span className="mx-mds-buy__label">
              <ShoppingCart size={20} strokeWidth={2.4} />
              ACQUISTA ORA
            </span>
            <span className="mx-btn__icon">
              <ArrowUp size={20} strokeWidth={2.4} />
            </span>
          </motion.button>
        </Reveal>

        <LandingAccordion items={faqs} className="mx-mds-acc" />
      </div>
    </section>
  )
}
