import { motion } from 'framer-motion'
import { Clock, Gift, Users, Heart, Laptop, ShoppingCart, Baby, Dumbbell, User, DollarSign, Stethoscope, UserCircle, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { Reveal, Snap } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

// Carosello problemi di chi deve fare regali
const shoppingProblems = [
  {
    icon: Clock,
    title: "È quasi Natale e non hai ancora fatto i regali",
    description: "Ti eri ripromesso di non ridurti all'ultimo minuto, e invece eccoti qui. Ancora con le mani in mano, senza idee e con l'ansia che sale."
  },
  {
    icon: DollarSign,
    title: "Butti via soldi in parcheggi e tempo prezioso",
    description: "Giri per ore cercando un parcheggio, paghi tariffe esorbitanti in centro, perdi interi pomeriggi tra negozi e centri commerciali. E alla fine non trovi nulla."
  },
  {
    icon: Gift,
    title: "Sempre le solite idee banali che finiscono dimenticate",
    description: "Cappelini, sciarpe, profumi, oggetti inutili... Regali che finiscono dimenticati in un cassetto o che vengono riciclati l'anno dopo. Non vuoi più questo."
  },
  {
    icon: Users,
    title: "Code infinite e folla ovunque",
    description: "Le vie del centro e i centri commerciali sono invasi. Code interminabili alle casse, gente che spinge, stress e confusione. Un incubo che si ripete ogni anno."
  }
]

// Pain points per target - Blocco 1: Amici e conoscenti
const targetPainPointsFriends = [
  {
    icon: Gift,
    title: "L'amico che ha già tutto",
    description: "Non ha bisogno di niente, non desidera nulla… e ogni idea ti sembra banale. Profumi, oggetti, buoni… sempre le solite cose che finiscono dimenticate in un cassetto."
  },
  {
    icon: Dumbbell,
    title: "L'amico sportivo",
    description: "Chi è super attivo ha già tutto: scarpe nuove, abbigliamento impeccabile, attrezzatura e abbonamenti. Trovare qualcosa che non abbia già è una vera impresa."
  },
  {
    icon: Laptop,
    title: "L'amico sedentario",
    description: "Chi sta seduto per ore, davanti a uno schermo, ha bisogno di qualcosa di molto diverso: una pausa vera per sciogliere il corpo, scaricare la tensione alla schiena, spalle e collo."
  },
  {
    icon: User,
    title: "Chi vive una vita frenetica",
    description: "Quando è stata l'ultima volta che hai regalato un momento per sé? Non un oggetto, ma una vera pausa dalla vita frenetica moderna. Una parentesi di pace per respirare, sciogliere le tensioni e lo stress."
  }
]

// Pain points per target - Blocco 2: Famiglia e situazioni specifiche
const targetPainPointsFamily = [
  {
    icon: Stethoscope,
    title: "L'amico/parente che ha sempre qualche problema o acciacco",
    description: "Quella persona che si lamenta sempre di qualche dolore, rigidità o fastidio. Un trattamento osteopatico è il regalo perfetto per aiutarla a stare meglio e sentirsi più leggera."
  },
  {
    icon: UserCircle,
    title: "Un parente anziano",
    description: "Un gesto di cura e gratitudine verso chi si è sempre preso cura di te. Aiutalo a muoversi meglio, sentirsi più libero e ritrovare quella mobilità che il tempo ha limitato. Un regalo che vale più di mille parole."
  },
  {
    icon: Heart,
    title: "La donna incinta",
    description: "Durante la gravidanza il corpo cambia e accumula tensioni. Un trattamento osteopatico specifico è il regalo perfetto per il benessere di mamma e bambino."
  },
  {
    icon: Baby,
    title: "Il bambino piccolo",
    description: "Anche i più piccoli possono beneficiare di trattamenti osteopatici delicati per tensioni, disturbi del sonno o piccoli traumi. Un regalo che i genitori apprezzeranno."
  }
]

// Bigliettino regalo appeso: uno per destinatario
function GiftTag({ point, index }) {
  const Icon = point.icon
  return (
    <motion.li
      className="mx-xmas-label"
      style={{ '--tilt': `${index % 2 ? 1.2 : -1.2}deg` }}
      initial={{ opacity: 0, y: 26, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 4) * 0.06 }}
    >
      <span className="mx-xmas-label__string" aria-hidden="true" />
      <span className="mx-xmas-label__ic"><Icon size={22} strokeWidth={2.2} /></span>
      <h4 className="mx-h mx-xmas-label__t">{point.title}</h4>
      <p>{point.description}</p>
    </motion.li>
  )
}

export default function PainPointsSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pain-points-section" className="mx-xmas-pain">
      <div className="mx-wrap">
        <Reveal className="mx-xmas-pain__head">
          <h2 className="mx-h mx-xmas-h2 mx-xmas-h2--dark">
            Basta con i soliti <span className="mx-xmas-strike">regali inutili!</span>
          </h2>
          <p className="mx-xmas-lead mx-xmas-lead--dark">
            Ogni Natale si finisce per spendere soldi in oggetti che non servono a niente.
            Quest’anno puoi fare un regalo che <b>lascia il segno</b>: migliora il corpo, la salute e la qualità di vita di chi lo riceve.
          </p>
        </Reveal>

        <div className="mx-xmas-story">
          <h3 className="mx-h mx-xmas-h3">Ogni anno la stessa storia...</h3>
          <p className="mx-xmas-swipe">
            <ArrowLeft size={16} />
            <span>Scorri per leggere tutto</span>
            <ArrowRight size={16} />
          </p>
          <Snap className="mx-xmas-story__list">
            {shoppingProblems.map((problem) => {
              const Icon = problem.icon
              return (
                <div key={problem.title} className="mx-xmas-woe">
                  <span className="mx-xmas-woe__ic"><Icon size={22} strokeWidth={2.2} /></span>
                  <h4 className="mx-h mx-xmas-woe__t">{problem.title}</h4>
                  <p>{problem.description}</p>
                </div>
              )
            })}
          </Snap>
          <p className="mx-xmas-story__count">{shoppingProblems.length} situazioni comuni</p>
        </div>

        <div className="mx-xmas-who">
          <h3 className="mx-h mx-xmas-h3">
            Non sai cosa regalare ai tuoi <span className="mx-xmas-hl">parenti</span> e persone care?
          </h3>
          <ul className="mx-xmas-labels">
            {targetPainPointsFamily.map((point, index) => (
              <GiftTag key={point.title} point={point} index={index} />
            ))}
          </ul>
        </div>

        <div className="mx-xmas-who">
          <h3 className="mx-h mx-xmas-h3">
            O ai tuoi <span className="mx-xmas-hl">amici</span>?
          </h3>
          <ul className="mx-xmas-labels">
            {targetPainPointsFriends.map((point, index) => (
              <GiftTag key={point.title} point={point} index={index + 1} />
            ))}
          </ul>
        </div>

        <Reveal className="mx-xmas-ask">
          <h3 className="mx-h mx-xmas-ask__q">
            Vuoi sentirti finalmente soddisfatto per aver fatto un regalo utile, originale e di estremo valore? 🎯
          </h3>
          <p>O preferisci aspettare di nuovo il 24 dicembre e fare i soliti regali? 🎄</p>
          <p className="mx-xmas-ask__go">Acquistali ora da Mobilitas!</p>
          <motion.button
            type="button"
            onClick={scrollToOffer}
            className="mx-btn mx-btn--primary mx-xmas-buy"
            whileTap={{ scale: 0.97 }}
          >
            <span className="mx-xmas-buy__label">
              <ShoppingCart size={20} strokeWidth={2.4} />
              ACQUISTA ORA
            </span>
            <span className="mx-btn__icon"><ArrowUp size={20} strokeWidth={2.4} /></span>
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}
