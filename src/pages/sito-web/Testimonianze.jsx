import React, { useEffect, useState } from 'react'
import { Star, Users, Award, Shield, CheckCircle, Plus } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import FinalCta from '../../components/site/FinalCta'
import { Counter, Kicker, MaskLines, Reveal, Snap } from '../../components/home-sections/HomeKit'
import { trackSpotlight } from '../../components/home-sections/homeMotion'
import { RECENSIONI_IMAGES } from '../../data/recensioni'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../../components/GoogleReviewsLinks'
import '../../styles/pages/testimonianze.css'

const Testimonianze = () => {
  // SEO metadata for Testimonianze page
  useEffect(() => {
    const previousTitle = document.title
    document.title = `Testimonianze Osteopata Torino | Recensioni Studio Mobilitas – Oltre ${RECENSIONI_TOTALI} Recensioni 5 Stelle`

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    const description = `Leggi le testimonianze dei pazienti dello Studio Osteopatico Mobilitas Torino. Oltre ${RECENSIONI_TOTALI} recensioni verificate con 5 stelle su Google nei nostri due studi. Storie di successo su mal di schiena, cervicale, sciatalgia e postura.`
    const pageUrl = `${window.location.origin}/testimonianze`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'testimonianze osteopata torino, recensioni mobilitas, osteopata recensioni, studio osteopatico recensioni torino, osteopatia testimonianze')

    // Open Graph
    ensureMetaByProperty('og:title', 'Testimonianze Osteopata Torino | Recensioni Studio Mobilitas')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])


  const stats = [
    { to: RECENSIONI_TOTALI, suffix: '+', label: 'Recensioni verificate' },
    { to: 5, decimals: 1, suffix: '/5', label: 'Valutazione media' },
    { to: 95, suffix: '%', label: 'Soddisfazione clienti' },
    { to: 1, suffix: '°', label: "Studio più richiesto d'Italia" },
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Grandezza',
      description: "Siamo lo Studio Osteopatico più grande d'Italia",
    },
    {
      icon: Shield,
      title: 'Specializzazione',
      description: 'I nostri professionisti sono specializzati in ogni area della salute',
    },
    {
      icon: Star,
      title: 'Recensioni Verificate',
      description: 'Tutte le nostre recensioni sono autentiche e verificate da Google',
    },
    {
      icon: Users,
      title: 'Oltre 4000 Clienti Soddisfatti',
      description: 'Persone che hanno scelto di riprendere il controllo della propria salute',
    },
    {
      icon: CheckCircle,
      title: 'Risultati Duraturi',
      description: 'I nostri clienti mantengono i risultati nel tempo, non solo durante il trattamento',
    },
  ]


  const PAGE_SIZE = 9

  // Quattro colonne per il muro dell'apertura (le prime 48 recensioni)
  const wallColumns = [0, 1, 2, 3].map((c) => RECENSIONI_IMAGES.slice(0, 48).filter((_, i) => i % 4 === c))
  const [visibleReviews, setVisibleReviews] = useState(PAGE_SIZE)

  return (
    <PageShell>
      {/* Apertura: il titolo davanti a un muro di recensioni vere che scorre in colonne */}
      <section className="mx-testi-hero">
        <div className="mx-testi-wall" aria-hidden="true">
          {wallColumns.map((col, c) => (
            <div key={c} className="mx-testi-wall__col" style={{ '--mx-dur': `${70 + c * 14}s` }}>
              {[0, 1].map((copy) => (
                <div key={copy} className={`mx-testi-wall__track ${c % 2 ? 'is-down' : ''}`}>
                  {col.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-testi-hero__veil" aria-hidden="true" />

        <div className="mx-wrap mx-testi-hero__content">
          <Kicker>#1 Studio Osteopatico d'Italia</Kicker>
          <h1 className="mx-h mx-h--xl">
            <MaskLines
              immediate
              delay={0.2}
              lines={[
                { text: 'Lo Studio' },
                { text: 'Osteopatico più' },
                { text: 'richiesto', className: 'mx-gradient' },
                { text: "d'Italia.", className: 'mx-outline' },
              ]}
            />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-lead mx-testi-hero__lead">
              Con oltre <strong>{RECENSIONI_TOTALI} recensioni verificate</strong> e una valutazione di <strong>5.0/5 stelle</strong>,
              siamo lo studio osteopatico con più testimonianze e richieste di tutta Italia.
            </p>
          </Reveal>
          <Reveal delay={0.65}>
            <GoogleReviewsLinks />
            <p className="mx-trust">
              <span className="mx-trust__item">
                <span className="mx-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} />
                  ))}
                </span>
                5.0/5 su Google Reviews
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="01">I numeri</Kicker>
          <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Perché siamo' }, { text: 'il #1.', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">
                I numeri parlano chiaro: siamo lo studio osteopatico più richiesto e recensito d'Italia
              </p>
            </Reveal>
          </div>

          <div className="mx-stats">
            {stats.map((s) => (
              <div key={s.label} className="mx-stat">
                <span className="mx-stat__num">
                  <Counter to={s.to} decimals={s.decimals || 0} suffix={s.suffix} />
                </span>
                <span className="mx-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <Snap className="mx-cards3 mx-achievements">
            {achievements.map((a, i) => {
              const Icon = a.icon
              return (
                <Reveal key={a.title} delay={i * 0.06} className="mx-card" onMouseMove={trackSpotlight}>
                  <span className="mx-card__icon">
                    <Icon size={24} />
                  </span>
                  <h3 className="mx-h mx-h--sm">{a.title}</h3>
                  <p className="mx-body">{a.description}</p>
                </Reveal>
              )
            })}
          </Snap>
        </div>
      </section>

      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="02">Recensioni Google</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Non credere solo' }, { text: 'alle nostre parole.', className: 'mx-outline' }]} />
          </h2>

          <div className="mx-review-wall">
            {RECENSIONI_IMAGES.slice(0, visibleReviews).map((src, i) => (
              <Reveal key={src} delay={(i % PAGE_SIZE) * 0.03} y={24} className="mx-review-wall__item">
                <img src={src} alt={`Recensione Google ${i + 1}`} loading="lazy" decoding="async" />
              </Reveal>
            ))}
          </div>

          {visibleReviews < RECENSIONI_IMAGES.length && (
            <div className="mx-review-wall__more">
              <button
                type="button"
                className="mx-btn mx-btn--ghost"
                onClick={() => setVisibleReviews((n) => n + PAGE_SIZE)}
              >
                <span>
                  <small>
                    {visibleReviews} di {RECENSIONI_IMAGES.length}
                  </small>
                  Mostra altre recensioni
                </span>
                <span className="mx-btn__icon">
                  <Plus size={20} strokeWidth={2.4} />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCta
        kicker="Leggi tutte le recensioni"
        titleLines={[{ text: 'Vuoi leggerle' }, { text: 'tutte?', className: 'mx-gradient' }]}
        text={
          <>
            Su Google puoi trovare oltre <strong>{RECENSIONI_TOTALI} recensioni verificate</strong> di persone che hanno scelto di cambiare vita con noi.
          </>
        }
      >
        <GoogleReviewsLinks align="center" className="mx-testi-final-reviews" />
      </FinalCta>
    </PageShell>
  )
}

export default Testimonianze
