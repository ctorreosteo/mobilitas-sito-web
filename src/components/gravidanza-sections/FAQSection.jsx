import { motion } from 'framer-motion'
import { HelpCircle, Calendar } from 'lucide-react'
import LandingAccordion from '../landing-kit/LandingAccordion'
import { Reveal } from '../home-sections/HomeKit'

const faqs = [
  {
    q: "Il trattamento osteopatico è sicuro durante la gravidanza?",
    a: "Assolutamente sì! Il trattamento osteopatico per la gravidanza utilizza tecniche delicate e specifiche, completamente sicure per te e il tuo bambino. L'osteopata è specializzato nel trattamento delle donne in gravidanza e conosce perfettamente le precauzioni da adottare."
  },
  {
    q: "A che settimana di gravidanza posso iniziare il trattamento?",
    a: "Puoi iniziare il trattamento osteopatico in qualsiasi momento della gravidanza, dal primo trimestre fino al termine. Anzi, iniziare presto ti aiuta a prevenire molti disturbi che potrebbero peggiorare con il progredire della gravidanza."
  },
  {
    q: "Quanto dura una seduta e con che frequenza?",
    a: "Una seduta dura circa 45-60 minuti. La frequenza dipende dalle tue esigenze: generalmente le donne in gravidanza vengono da noi facendo un percorso che le acocmpagna fino al parto!"
  },
  {
    q: "Il trattamento può aiutare con il mal di schiena?",
    a: "Sì, il trattamento osteopatico è molto efficace per il mal di schiena in gravidanza. Lavoriamo sulla mobilità del bacino, sulla postura e sulla distribuzione del peso, riducendo significativamente i dolori lombari e la sciatalgia."
  },
  {
    q: "Posso fare il trattamento anche se ho problemi di nausea?",
    a: "Certamente! Anzi, il trattamento osteopatico può aiutare anche con la nausea mattutina, lavorando sul sistema nervoso autonomo e migliorando la circolazione. Ti consigliamo di comunicare sempre i tuoi sintomi all'osteopata."
  },
  {
    q: "Il trattamento prepara il corpo al parto?",
    a: "Assolutamente! Il trattamento osteopatico prepara il bacino e la colonna vertebrale al parto, migliorando la mobilità e riducendo il rischio di complicazioni. Molte donne che seguono il trattamento hanno parti più facili e recuperi più veloci."
  },
  {
    q: "Devo portare qualche documento medico?",
    a: "I referti medici sono necessari solo in caso di operazioni o interventi importanti. Per il restono non sono necessari, ma possono aiutare sicuramente a valutare più aspetti."
  },
  {
    q: "Il trattamento è coperto dal SSN o dalle assicurazioni?",
    a: "Il trattamento osteopatico non è coperto dal SSN, ma alcune assicurazioni sanitarie private lo rimborsano (alcune parzialmente). Ti consigliamo di verificare con la tua assicurazione. Offriamo anche percorsi di sedute a prezzi agevolati."
  }
]

export default function FAQSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="mx-grav-sec mx-grav-faq">
      <div className="mx-wrap mx-grav-faq__grid">
        <Reveal className="mx-grav-head mx-grav-faq__head">
          <span className="mx-grav-faq__ic"><HelpCircle size={26} strokeWidth={2.2} /></span>
          <h2 className="mx-h mx-grav-h2">
            Hai qualche domanda?
          </h2>
          <p className="mx-grav-lead">
            Tutte le risposte alle domande più comuni sul trattamento osteopatico in gravidanza
          </p>
        </Reveal>

        <LandingAccordion items={faqs} className="mx-grav-acc mx-acc--noicon" />

        <Reveal className="mx-grav-ready">
          <h3 className="mx-h mx-grav-ready__title">
            Pronta a iniziare il tuo percorso?
          </h3>
          <p>
            Prenota ora il tuo trattamento osteopatico con sconto speciale
          </p>
          <motion.button type="button" onClick={scrollToOffer} className="mx-grav-btn mx-grav-btn--light" whileTap={{ scale: 0.97 }}>
            <Calendar size={20} strokeWidth={2.4} />
            <span>PRENOTA ORA CON SCONTO</span>
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}
