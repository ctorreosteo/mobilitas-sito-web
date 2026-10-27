import { useContext, useState } from 'react'
import { CalendarCheck, Phone, Plus } from 'lucide-react'
import { Kicker, Reveal } from '../home-sections/HomeKit'
import ClImg from './ClImg'
import StudiMap from '../studi-map/StudiMap'
import RecensioniDolore from '../recensioni-tag/RecensioniDolore'
import { doloreDi } from '../../data/dolori'
import { BookCtas, CheckList, Title } from './kit'
import { CtaContext, pad2 } from './ctaContext'

// 03 — Recensioni: dal gestionale, sul dolore della landing con le sue parole evidenziate
// (a caso se il dolore ha poche recensioni), come cervicalgia e pagina di conferma
export const ReviewsSection = ({ page }) => {
  const r = page.reviews
  return (
    <section className="mx-section mx-section--deep mx-cl-reviews">
      <RecensioniDolore dolore={doloreDi(page.slug)} />
      <div className="mx-wrap">
        <Reveal className="mx-cl-closing">
          <p className="mx-lead">{r.closing}</p>
        </Reveal>
        <BookCtas className="mx-cl-ctas--center" />
      </div>
    </section>
  )
}

// 04 — Cosa succede quando prenoti: sei tappe
export const VisitSection = ({ page }) => {
  const v = page.visit
  return (
    <section className="mx-section mx-section--glow mx-cl-visit">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="04">{v.kicker}</Kicker>
          <Title title={v.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{v.intro}</p>
          </Reveal>
        </div>
        <ol className="mx-cl-steps">
          {v.steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="mx-cl-step" delay={(i % 3) * 0.08}>
              <span className="mx-cl-step__dot">{pad2(i + 1)}</span>
              <span className="mx-cl-step__tag">Step {pad2(i + 1)}</span>
              <h3 className="mx-h mx-cl-h3">{step.title}</h3>
              <p className="mx-body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
        <BookCtas />
      </div>
    </section>
  )
}

// 04 (variante /yt-postura) — Due modi per entrare: lista d'attesa o telefonata
export const EntrySection = ({ page }) => {
  const e = page.entry
  const cta = useContext(CtaContext)
  return (
    <section className="mx-section mx-section--glow mx-cl-entry">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="04">{e.kicker}</Kicker>
          <Title title={e.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{e.intro}</p>
          </Reveal>
        </div>

        <div className="mx-cl-doors">
          {e.doors.map((door, i) => {
            const isList = door.id === 'lista'
            return (
              <Reveal as="article" key={door.id} delay={i * 0.08} className={`mx-cl-door ${isList ? 'is-featured' : ''}`}>
                <div className="mx-cl-door__top">
                  <span className="mx-cl-door__kicker">{door.kicker}</span>
                  {isList ? (
                    <p className="mx-cl-door__price">
                      <s>{door.priceOld}</s>
                      <b>{door.price}</b>
                    </p>
                  ) : (
                    <p className="mx-cl-door__free">{door.price}</p>
                  )}
                </div>
                <h3 className="mx-h mx-cl-door__title">{door.title}</h3>
                <p className="mx-body">{door.lead}</p>
                <CheckList items={door.points} />
                <button
                  type="button"
                  className={`mx-btn ${isList ? 'mx-btn--primary' : 'mx-btn--ghost'} mx-cl-btn mx-cl-door__btn`}
                  onClick={isList ? cta.openPrimaVisita : cta.openConsulto}
                >
                  <span className="mx-cl-btn__txt">{isList ? cta.labels.visit.long : cta.labels.consulto.long}</span>
                  <span className="mx-btn__icon">
                    {isList ? <CalendarCheck size={20} strokeWidth={2.4} /> : <Phone size={19} strokeWidth={2.4} />}
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>

        <div className="mx-cl-after-entry">
          <p className="mx-cl-after__title">{e.afterTitle}</p>
          <ol className="mx-cl-steps mx-cl-steps--three">
            {e.after.map((step, i) => (
              <Reveal as="li" key={step.k} className="mx-cl-step" delay={i * 0.08}>
                <span className="mx-cl-step__dot">{step.k}</span>
                <h3 className="mx-h mx-cl-h3">{step.t}</h3>
                <p className="mx-body">{step.b}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mx-cl-closing">
          <p className="mx-lead">{e.closing}</p>
        </Reveal>
        <BookCtas />
      </div>
    </section>
  )
}

// 05 — Le sedi
export const LocationsSection = ({ page }) => {
  const l = page.locations
  return (
    <section className="mx-section mx-section--deep mx-cl-where">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="05">{l.kicker}</Kicker>
          <Title title={l.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{l.intro}</p>
          </Reveal>
        </div>

        {/* La mappa dei due studi con le indicazioni e come arrivare (metro, parcheggi), come cervicalgia */}
        <Reveal className="mx-cl-where__map">
          <StudiMap />
        </Reveal>

        <BookCtas />
      </div>
    </section>
  )
}

// 06 — Domande frequenti + chiusura
export const FaqSection = ({ page }) => {
  const f = page.faq
  const [open, setOpen] = useState(null)
  return (
    <>
      <section className="mx-section mx-cl-faq">
        <div className="mx-wrap mx-cl-faq__wrap">
          <div className="mx-cl-head">
            <Kicker n="06">{f.kicker}</Kicker>
            <Title title={f.title} />
            <Reveal>
              <p className="mx-lead mx-cl-head__lead">{f.intro}</p>
            </Reveal>
          </div>

          <div className="mx-cl-faq__list">
            {f.items.map((item, index) => {
              const isOpen = open === index
              return (
                <div key={item.id} className={`mx-cl-faq__item ${isOpen ? 'is-open' : ''}`}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span className="mx-cl-faq__n">{pad2(index + 1)}</span>
                    <span className="mx-cl-faq__q">{item.question}</span>
                    <span className="mx-cl-faq__plus" aria-hidden="true">
                      <Plus size={20} strokeWidth={2.5} />
                    </span>
                  </button>
                  <div className="mx-cl-faq__panel">
                    <div>
                      <p className="mx-body">{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-cl-final">
        <div className="mx-cl-final__bg" aria-hidden="true">
          <ClImg src={page.images.final} alt="" sizes="100vw" className={page.images.finalClassName} />
        </div>
        <div className="mx-wrap mx-cl-final__inner">
          <img className="mx-final__logo" src="/pittogramma.png" alt="" loading="lazy" />
          <Reveal>
            <p className="mx-cl-final__text">{f.closing}</p>
          </Reveal>
          <BookCtas className="mx-cl-ctas--center" />
        </div>
      </section>
    </>
  )
}
