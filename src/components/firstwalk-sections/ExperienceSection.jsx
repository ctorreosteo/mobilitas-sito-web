import { Reveal } from '../home-sections/HomeKit'

export default function ExperienceSection() {
  return (
    <section className="mx-walk-exp">
      <div className="mx-walk-exp__sky" aria-hidden="true" />
      <div className="mx-wrap">
        <Reveal className="mx-walk-exp__inner">
          <h2 className="mx-h mx-walk-exp__title">
            Un'esperienza semplice, naturale, rigenerante
          </h2>
          <p>
            Non serve essere allenati. Non serve preparazione. Basta venire con la voglia di respirare, muoverti e stare bene.
            Abbiamo pensato a ogni dettaglio per rendere questa camminata leggera, piacevole e accessibile a tutti.
          </p>
        </Reveal>
      </div>
      <svg className="mx-walk-exp__ridge" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160 L0 110 L180 60 L320 100 L520 30 L700 90 L880 40 L1060 100 L1240 50 L1440 95 L1440 160 Z" />
      </svg>
    </section>
  )
}
