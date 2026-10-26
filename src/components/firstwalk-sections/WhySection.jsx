import { Mountain, Heart, Users, Zap } from 'lucide-react'
import { Reveal } from '../home-sections/HomeKit'

const benefits = [
  { title: "Rigenerazione Naturale", icon: Mountain },
  { title: "Benessere del Corpo", icon: Heart },
  { title: "Momento Sociale", icon: Users },
  { title: "Energia Rinnovata", icon: Zap },
]

export default function WhySection() {
  return (
    <section className="mx-walk-sec mx-walk-why">
      <div className="mx-wrap mx-walk-why__grid">
        <Reveal>
          <h2 className="mx-h mx-walk-h2">
            Vogliamo farti stare bene
            <br />
            <span className="mx-walk-mark mx-walk-mark--sky">anche fuori dallo studio</span>
          </h2>

          <div className="mx-walk-why__text">
            <p>
              Da Mobilitas ci prendiamo cura del tuo corpo ogni giorno, ma sappiamo che il vero benessere comincia nei momenti in cui decidi di fare qualcosa per te.
            </p>
            <p>
              Con Mobilitas Walk vogliamo portarti fuori, nella natura, in un'esperienza <strong>semplice, concreta e rigenerante</strong>.
            </p>
            <p className="mx-walk-why__big">
              Perché a volte basta una camminata, un respiro profondo e un gruppo di persone con cui condividere un momento autentico per rimettersi in moto.
            </p>
          </div>

          <div className="mx-walk-why__note">
            <p>
              È un'esperienza naturale e accessibile.
              <br />
              È un primo passo. È un gesto di cura verso te stesso.
            </p>
          </div>
        </Reveal>

        <ul className="mx-walk-why__tiles">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal as="li" key={b.title} delay={i * 0.06}>
                <span className="mx-walk-why__ic"><Icon size={22} strokeWidth={2.2} /></span>
                <span className="mx-walk-why__label">{b.title}</span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
