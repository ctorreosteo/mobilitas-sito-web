import { motion } from 'framer-motion'
import { Users, Heart, Shield, Zap, Target, HandHeart } from 'lucide-react'
import { Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const challenge = [
  { title: "Stress cronico e ritmi frenetici", subtitle: "La società moderna ci vuole sempre di corsa", icon: Zap },
  { title: "Sedentarietà forzata", subtitle: "Lavori che ci immobilizzano per ore", icon: Target },
  { title: "Isolamento e solitudine", subtitle: "Perdiamo il contatto con noi stessi e gli altri", icon: Shield },
]

const community = [
  { title: "Persone consapevoli e motivate", subtitle: "Che hanno capito l'importanza del proprio benessere", icon: Users },
  { title: "Condivisione di esperienze autentiche", subtitle: "Insieme per crescere e divertirci", icon: Heart },
  { title: "Supporto reciproco e motivazione", subtitle: "Una rete di persone che si sostengono a vicenda", icon: HandHeart },
]

function Column({ tone, title, sub, items }) {
  return (
    <div className={`mx-walk-col mx-walk-col--${tone}`}>
      <div className="mx-walk-col__head">
        <h3 className="mx-h mx-walk-col__title">{title}</h3>
        <p>{sub}</p>
      </div>
      <ul>
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: index * 0.07 }}
            >
              <span className="mx-walk-col__ic"><Icon size={20} strokeWidth={2.2} /></span>
              <div>
                <h4 className="mx-h mx-walk-col__t">{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default function ProblemSection() {
  return (
    <section className="mx-walk-sec mx-walk-problem">
      <div className="mx-wrap">
        <Reveal className="mx-walk-head mx-walk-head--center">
          <h2 className="mx-h mx-walk-h2">
            Unisciti alla community di chi
            <br />
            <span className="mx-walk-mark">si prende cura di sé</span>
          </h2>
          <p className="mx-walk-lead">
            In una società che vuole tenerci spenti e senza energie,
            <strong> noi scegliamo di essere vivi, energici e consapevoli</strong>
          </p>
        </Reveal>

        <div className="mx-walk-vs">
          <Column tone="warn" title="⚡ LA SFIDA" sub="Contro il sistema moderno che ci vuole spenti" items={challenge} />
          <span className="mx-walk-vs__arrow" aria-hidden="true" />
          <Column tone="ok" title="❤️ LA NOSTRA COMMUNITY" sub="Persone che scelgono di prendersi cura di sé" items={community} />
        </div>

        <Reveal className="mx-walk-statement">
          <Users size={40} strokeWidth={2} />
          <h3 className="mx-h mx-walk-statement__t">
            Sei parte di una community che condivide i tuoi valori. Insieme costruiamo il nostro benessere.
          </h3>
        </Reveal>
      </div>
    </section>
  )
}
