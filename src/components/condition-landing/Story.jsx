import { Kicker, Reveal, Snap } from '../home-sections/HomeKit'
import { trackSpotlight } from '../home-sections/homeMotion'
import ClImg from './ClImg'
import Emblem from './Emblem'
import { BookCtas, CheckList, Title } from './kit'
import { pad2 } from './ctaContext'

// 01 — I sintomi: carosello su telefono, griglia su desktop
export const PainSection = ({ page }) => {
  const { pain } = page
  return (
    <section className="mx-section mx-section--deep mx-cl-pain">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="01">{pain.kicker}</Kicker>
          <Title title={pain.title} accentClass="mx-cl-pain__accent" />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{pain.intro}</p>
          </Reveal>
        </div>

        <Snap as="ul" className="mx-cl-pain__list">
          {pain.items.map((item, i) => {
            const Icon = item.icon
            return (
              <li key={item.title} className="mx-cl-pain__card">
                <div className="mx-cl-pain__top">
                  <span className="mx-cl-pain__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <span className="mx-cl-pain__n" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                </div>
                <h3 className="mx-h mx-cl-h3">{item.title}</h3>
                <p className="mx-body">{item.body}</p>
              </li>
            )
          })}
        </Snap>
      </div>
    </section>
  )
}

const PhotoCard = ({ item, i }) => (
  <li className="mx-card mx-cl-card" onMouseMove={trackSpotlight}>
    <div className="mx-cl-card__media">
      <ClImg
        src={item.image}
        alt={item.alt}
        sizes="(min-width: 1000px) 400px, (min-width: 640px) 50vw, 84vw"
        className={item.imageClassName || 'object-center'}
      />
      <span className="mx-cl-card__n">{pad2(i + 1)}</span>
    </div>
    <div className="mx-cl-card__body">
      {item.eyebrow && (
        <p className="mx-cl-card__eyebrow">
          {item.icon && <item.icon size={15} strokeWidth={2} aria-hidden="true" />}
          {item.eyebrow}
        </p>
      )}
      <h4 className="mx-h mx-cl-h3">{item.title}</h4>
      <p className="mx-body">{item.body}</p>
    </div>
  </li>
)

// 02 — Il meccanismo: emblema + spiegazione, frase in banda fotografica, schede e benefici
export const MechanismSection = ({ page }) => {
  const m = page.mechanism
  return (
    <section className="mx-section mx-section--glow mx-cl-mech">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="02">{m.kicker}</Kicker>
          <Title title={m.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{m.intro}</p>
          </Reveal>
        </div>

        <div className="mx-cl-mech__grid">
          <Reveal>
            <Emblem emblem={m.emblem} id={`cl-${page.slug}`} />
          </Reveal>
          <Reveal className="mx-cl-mech__story" delay={0.1}>
            <div className="mx-cl-mech__narrative">
              {Array.isArray(m.narrative) ? m.narrative.map((p, i) => <p key={i}>{p}</p>) : <p>{m.narrative}</p>}
            </div>
            <ol className="mx-cl-chain">
              {m.steps.map((s) => (
                <li key={s.k}>
                  <span className="mx-cl-chain__k">{s.k}</span>
                  <div>
                    <h4 className="mx-h mx-cl-h4">{s.t}</h4>
                    <p className="mx-body">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mx-photo-band mx-cl-band">
          <ClImg src={page.images.band} alt="" sizes="(min-width: 1280px) 1170px, 100vw" />
          <blockquote className="mx-photo-band__text mx-cl-band__quote">
            <p className="mx-h mx-cl-quote">
              {m.quote.main} <span className="mx-accent">{m.quote.accent}</span>
            </p>
          </blockquote>
        </Reveal>

        <div className="mx-cl-head mx-cl-head--sub">
          {m.sub.kicker && <Kicker>{m.sub.kicker}</Kicker>}
          <Title as="h3" title={m.sub.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{m.sub.intro}</p>
          </Reveal>
        </div>

        <Snap as="ul" className={`mx-cl-cards ${m.cards.some((c) => c.eyebrow) ? 'mx-cl-cards--wide' : ''}`}>
          {m.cards.map((item, i) => (
            <PhotoCard key={item.title} item={item} i={i} />
          ))}
        </Snap>

        <Reveal className={`mx-cl-after ${m.checklistBox ? 'mx-cl-after--box' : ''}`}>
          {m.checklistBox && (
            <>
              <p className="mx-cl-after__title">{m.checklistBox.title}</p>
              <p className="mx-cl-after__note">{m.checklistBox.note}</p>
            </>
          )}
          <CheckList items={m.checklist} className="mx-cl-checks--two" />
        </Reveal>

        <BookCtas />
      </div>
    </section>
  )
}
