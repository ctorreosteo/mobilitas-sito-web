import { motion } from 'framer-motion'
import { CheckCircle, Heart, Moon, Zap, Shield, Baby } from 'lucide-react'
import { Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const benefits = [
  {
    icon: CheckCircle,
    title: "Alleviamo dolori e fastidi vari",
    description: "Riduciamo drasticamente il mal di schiena lombare del 80-90%, la sciatalgia scompare gradualmente, il bacino diventa più mobile e flessibile, il dolore al pube si riduce significativamente e cervicale e spalle si rilassano. Il tuo corpo tornerà a muoversi liberamente senza più limitazioni.",
    highlight: "80-90% di riduzione del dolore"
  },
  {
    icon: Moon,
    title: "Miglioriamo il sonno",
    description: "Torni a dormire con un sonno più profondo e continuo, i risvegli durante la notte diminuiscono drasticamente, trovi posizioni più comode nel letto, i crampi alle gambe si riducono e riacquisti energia e vitalità durante il giorno. Il riposo ti restituisce la forza per affrontare la gravidanza con serenità.",
    highlight: "Sonno profondo e continuo"
  },
  {
    icon: Zap,
    title: "Ritorni ad avere energia e vitalità",
    description: "Non ti trascini più: l'energia costante durante la giornata ti accompagna, l'affaticamento e la stanchezza diminuiscono, il respiro diventa più profondo e regolare, la concentrazione e la lucidità mentale ritornano e riacquisti la capacità di gestire tutti gli impegni. Ritorni ad avere la forza per tutto: lavoro, casa, preparativi per il bambino.",
    highlight: "Energia costante tutto il giorno"
  },
  {
    icon: Heart,
    title: "Maggior sensazione di sicurezza e tranquillità",
    description: "Hai la certezza che tutto è normale e sicuro, la tranquillità per la salute del bambino ti accompagna, conosci esattamente cosa si può fare e cosa evitare, la fiducia nel percorso di gravidanza diventa solida e la pace mentale e la serenità ritornano. Sai di fare la cosa giusta per te e il tuo bambino, senza più ansie o dubbi.",
    highlight: "100% di tranquillità"
  },
  {
    icon: Baby,
    title: "Prepariamo il corpo al parto",
    description: "Il bacino diventa più mobile e flessibile, il corpo si prepara naturalmente al parto, il rischio di complicazioni diminuisce, il recupero post-parto sarà più veloce e la fiducia e serenità per il parto ti accompagnano. Affronti il momento più importante della tua vita con la preparazione e la sicurezza che meriti.",
    highlight: "Corpo preparato al 100%"
  }
]

export default function BenefitsSection() {
  return (
    <section className="mx-grav-sec mx-grav-ben">
      <div className="mx-wrap">
        <Reveal className="mx-grav-head">
          <h2 className="mx-h mx-grav-h2">
            Ecco come risolviamo tutti questi problemi
          </h2>
          <p className="mx-grav-lead">
            Il trattamento osteopatico per la gravidanza è la soluzione naturale, sicura ed efficace che stavi cercando.
          </p>
        </Reveal>

        <ol className="mx-grav-ben__list">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.li
                key={b.title}
                className="mx-grav-bcard"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, ease: EASE }}
              >
                <div className="mx-grav-bcard__top">
                  <span className="mx-grav-bcard__ic"><Icon size={24} strokeWidth={2.2} /></span>
                  <span className="mx-grav-bcard__hl">{b.highlight}</span>
                </div>
                <h3 className="mx-h mx-grav-h3">{b.title}</h3>
                <p>{b.description}</p>
                <span className="mx-grav-bcard__n" aria-hidden="true">{i + 1}</span>
              </motion.li>
            )
          })}
        </ol>

        <Reveal className="mx-grav-safe">
          <h3 className="mx-h mx-grav-safe__title">Il trattamento osteopatico è sicuro al 100%</h3>
          <p>Tecniche delicate e specifiche per la gravidanza, senza rischi per te e il tuo bambino</p>
          <ul className="mx-grav-safe__badges">
            <li><Shield size={20} strokeWidth={2.2} /><span>100% Sicuro</span></li>
            <li><Heart size={20} strokeWidth={2.2} /><span>Naturale</span></li>
            <li><CheckCircle size={20} strokeWidth={2.2} /><span>Efficace</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
