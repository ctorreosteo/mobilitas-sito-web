import { useContext, useEffect, useRef, useState } from 'react'
import { CalendarCheck, Car, ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone, Plus, RotateCcw } from 'lucide-react'
import { Kicker, Reveal } from '../home-sections/HomeKit'
import GoogleReviewsLinks from '../GoogleReviewsLinks'
import { RECENSIONI_IMAGES } from '../../data/recensioni'
import { RECENSIONI_TOTALI, STUDI } from '../../data/studi'
import ClImg from './ClImg'
import { MAPS } from './defaults'
import { BookCtas, CheckList, Title } from './kit'
import { CtaContext, pad2 } from './ctaContext'

const RECENSIONI_PREVIEW = RECENSIONI_IMAGES.slice(0, 18)
const RECENSIONI_SLIDES = RECENSIONI_PREVIEW.length + 1 // + card “tutte le recensioni”

// 03 — Recensioni: carosello di screenshot reali + schede Google dei due studi
export const ReviewsSection = ({ page }) => {
  const r = page.reviews
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const updateFromScroll = () => {
      const children = Array.from(el.children)
      if (!children.length) return
      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - viewportCenter)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
      if (el.scrollLeft <= 48) {
        setIndex(0)
        return
      }
      setIndex(maxScroll > 0 && el.scrollLeft >= maxScroll - 48 ? children.length - 1 : best)
    }
    el.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    updateFromScroll()
    return () => {
      el.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [])

  const scrollToSlide = (i) => {
    const el = trackRef.current
    const next = Math.min(Math.max(0, i), RECENSIONI_SLIDES - 1)
    setIndex(next)
    const child = el?.children[next]
    if (!child) return
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }

  const atEnd = index >= RECENSIONI_SLIDES - 1

  return (
    <section className="mx-section mx-section--deep mx-cl-reviews">
      <div className="mx-wrap">
        <div className="mx-cl-head">
          <Kicker n="03">{r.kicker}</Kicker>
          <Title title={r.title} />
          <Reveal>
            <p className="mx-lead mx-cl-head__lead">{r.intro}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-cl-reviews__track" ref={trackRef}>
        {RECENSIONI_PREVIEW.map((src, i) => (
          <div key={src} className="mx-cl-reviews__slide" style={{ '--mx-tilt': `${i % 2 ? 1.2 : -1.2}deg` }}>
            <div className="mx-review">
              <img src={src} alt={`Recensione ${i + 1}`} loading="lazy" decoding="async" />
            </div>
          </div>
        ))}
        <div className="mx-cl-reviews__slide">
          <div className="mx-cl-reviews__all">
            <p>Leggi le oltre {RECENSIONI_TOTALI} recensioni dei nostri due studi</p>
            {STUDI.map((studio) => (
              <a key={studio.id} href={studio.recensioniUrl} target="_blank" rel="noopener noreferrer">
                {studio.nome}
                <ExternalLink size={14} strokeWidth={2.25} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-wrap">
        <div className="mx-cl-reviews__nav">
          <button
            type="button"
            className="mx-cl-round"
            onClick={() => scrollToSlide(index - 1)}
            disabled={index === 0}
            aria-label="Recensione precedente"
          >
            <ChevronLeft size={20} strokeWidth={2.25} />
          </button>
          <div className="mx-cl-reviews__meter">
            <span className="mx-cl-reviews__bar">
              <i style={{ width: `${((index + 1) / RECENSIONI_SLIDES) * 100}%` }} />
            </span>
            <p>
              <b>{index >= RECENSIONI_PREVIEW.length ? RECENSIONI_TOTALI : pad2(index + 1)}</b>
              <span aria-hidden="true"> / </span>
              {RECENSIONI_TOTALI}
            </p>
          </div>
          {atEnd ? (
            <button type="button" className="mx-cl-round is-green" onClick={() => scrollToSlide(0)} aria-label="Torna alla prima recensione">
              <RotateCcw size={20} strokeWidth={2.25} />
            </button>
          ) : (
            <button type="button" className="mx-cl-round is-green" onClick={() => scrollToSlide(index + 1)} aria-label="Recensione successiva">
              <ChevronRight size={20} strokeWidth={2.25} />
            </button>
          )}
        </div>

        <div className="mx-reviews__cta">
          <GoogleReviewsLinks align="center" />
        </div>

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

        <div className="mx-cl-maps">
          {MAPS.map((map, i) => (
            <Reveal key={map.label} className="mx-cl-map" delay={i * 0.08}>
              <div className="mx-cl-map__bar">
                <span>
                  <MapPin size={15} aria-hidden="true" />
                  {map.label}
                </span>
                <small>Mappa</small>
              </div>
              <iframe
                src={map.src}
                title={map.title}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </Reveal>
          ))}
        </div>

        <div className="mx-cl-where__info">
          <p className="mx-body mx-cl-where__metro">{l.metro}</p>
          <div className="mx-cl-where__park">
            <span aria-hidden="true">
              <Car size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="mx-cl-where__park-t">{l.parkingTitle}</p>
              <p className="mx-cl-where__park-n">{l.parkingNote}</p>
            </div>
          </div>
        </div>

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
