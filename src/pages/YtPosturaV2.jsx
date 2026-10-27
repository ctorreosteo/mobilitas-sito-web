import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useInView } from 'framer-motion'
import {
  HERO_BENEFITS,
  PAIN_POINTS,
  MECHANISM_STEPS,
  AFTER_IMAGES_BENEFITS,
  ENTRY_DOORS,
  AFTER_ENTRY,
  FAQ_ITEMS,
  FAQ_SCELTE,
  CAPITOLI_TITOLI,
} from './yt-postura-v2/contenuti'
import Prenotazione from './yt-postura-v2/Prenotazione'
import { TavolaTesta, TavolaFilo, TavolaOsso, FiguraAllineata } from './yt-postura-v2/Tavole'
import { Scompensi, Visita, Obiettivo, Carosello, MappaTorino } from './yt-postura-v2/Foto'
import './yt-postura-v2/landing.css'

// Come in YtPostura.jsx: la configurazione ESLint del sito non vede gli usi nel JSX.
const _MOTION = motion

// Landing /yt-postura-v2 — direzione «Il filo a piombo».
// Stesse integrazioni di /yt-postura: video dal gestionale, richiesta di telefonata (modalità «consulto») identica a quella del popup
// condiviso per "yt-postura" (yt-postura-v2/richiesta.js, stessa fonte nel gestionale), recensioni reali.

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
const HERO_VIDEO_CODICE = 'YT_POSTURA_VSL'

// Avvia subito il fetch (prima del mount) per ridurre il tempo a primo frame.
const heroVideoPromise = fetch(`${API_BASE}/api/sito/video/codice/${HERO_VIDEO_CODICE}`, {
  priority: 'high',
})
  .then((res) => {
    if (res.status === 404) return null
    return res.ok ? res.json() : null
  })
  .then((json) => (json?.data?.cloudflareUid ? json.data : null))
  .catch(() => null)

function ensureCloudflarePreconnect() {
  const origins = ['https://iframe.videodelivery.net', 'https://videodelivery.net']
  origins.forEach((href) => {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

function preloadHeroPoster(url) {
  if (!url || document.querySelector(`link[rel="preload"][href="${url}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  document.head.appendChild(link)
}

function useVideoYtPosturaVsl() {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureCloudflarePreconnect()
    let cancelled = false
    heroVideoPromise.then((data) => {
      if (cancelled) return
      if (data?.anteprimaUrl) preloadHeroPoster(data.anteprimaUrl)
      setVideo(data)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { video, loading }
}

const FAQ_PRINCIPALI = FAQ_ITEMS.filter((f) => FAQ_SCELTE.includes(f.id)).sort((x, y) => FAQ_SCELTE.indexOf(x.id) - FAQ_SCELTE.indexOf(y.id))
const RECENSIONI_TOTAL = 900 // YtPostura.jsx:100
const GOOGLE_RECENSIONI_URL =
  'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m8!3m7!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!9m1!1b1!16s%2Fg%2F11kqfhtyvd?entry=ttu'
const MAPPE = {
  // Stesso formato di Crocetta: il vecchio link «/maps/place/…/@lat,lon» senza identificativo non apriva la scheda.
  sanDonato:
    'https://www.google.com/maps/search/?api=1&query=Mobilitas+Studio+Osteopatico+Via+Peyron+54+Torino',
  crocetta:
    'https://www.google.com/maps/search/?api=1&query=Mobilitas+Studio+Osteopatico+Crocetta+Via+Lamarmora+35+Torino',
}

// Blocco del prezzo in apertura: le tre rassicurazioni sotto il prezzo.
const OFFERTA_PUNTI = ['Telefonata gratuita', 'Paghi dopo la prima visita', 'Anche in due rate']

// Le quattro tacche del filo: livelli del corpo e capitoli della pagina.
const CAPITOLI = [
  { id: 'testa', label: 'Testa' },
  { id: 'petto', label: 'Petto' },
  { id: 'bacino', label: 'Bacino' },
  { id: 'piedi', label: 'Piedi' },
]

const foto = (nome, w) => `/yt-postura-v2/${nome}-${w}.jpg`
const fotoSet = (nome, larghezze) => larghezze.map((w) => `${foto(nome, w)} ${w}w`).join(', ')

// I titoli portano la misura su uno span interno: il foglio globale riduce h1/h2/h3 su mobile con !important.
function Titolo({ as = 'h2', size = 'h2', id, children }) {
  const Tag = as
  const _TAG = Tag
  return (
    <Tag className={`ytp-${size}`} id={id}>
      <span className={`ytp-${size}__t`}>{children}</span>
    </Tag>
  )
}

function Tacca({ id, label, acceso }) {
  return (
    <div className={`ytp-ch${acceso ? ' is-on' : ''}`} id={id}>
      <span className="ytp-ch__tick" aria-hidden="true" />
      <span className="ytp-ch__dot" aria-hidden="true" />
      <p className="ytp-ch__word">{label}</p>
    </div>
  )
}

const molla = { type: 'spring', stiffness: 170, damping: 14 } // una caduta breve, senza rimbalzi vistosi

// Tema colori: scuro (predefinito, prova del 23/10/2026) o chiaro con ?tema=chiaro. Stessa pagina, stessi contenuti.
const leggiTema = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('tema') === 'chiaro' ? 'chiaro' : 'scuro'

function YtPosturaV2() {
  const [tema] = useState(leggiTema)
  const scuro = tema === 'scuro'
  const { video } = useVideoYtPosturaVsl()
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('consulto')
  const [videoCover, setVideoCover] = useState(true)
  const [spuntati, setSpuntati] = useState(() => new Set())
  const [raggiunto, setRaggiunto] = useState(-1)
  const [barra, setBarra] = useState(false)

  const offertaRef = useRef(null)
  const inchiostroRef = useRef(null) // il filo che si traccia con la lettura
  const chiusuraRef = useRef(null)
  const drittoRef = useRef(null)
  const drittoIn = useInView(drittoRef, { once: true, amount: 1 })

  const videoSrc = video
    ? `https://iframe.videodelivery.net/${video.cloudflareUid}?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(video.anteprimaUrl ?? '')}`
    : ''

  useEffect(() => {
    if (!video) return
    setVideoCover(true)
    const timer = window.setTimeout(() => setVideoCover(false), 500)
    return () => window.clearTimeout(timer)
  }, [video])

  // SEO: stessi metadati di /yt-postura (YtPostura.jsx:457-794), canonical sull'originale.
  // SEO locale – metadata + JSON-LD ottimizzati per Google (Torino / San Donato / Crocetta)
  useEffect(() => {
    const prevTitle = document.title
    const origin = window.location.origin
    const pageUrl = `${origin}/yt-postura`
    const ogImage = `${origin}/yt-postura-v2/hero-d-1280.jpg`

    const title =
      'Correttori, palestra, «tirati su». Niente ha funzionato | Mobilitas Torino'
    document.title = title

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

    const description =
      'Ti raddrizzi e appena smetti di pensarci la postura crolla? Percorso posturale Mobilitas a Torino: prima visita posturale, 3 sedute di osteopatia e 12 mesi di app, 299€ tutto incluso, da pagare dopo la prima visita. Richiedilo: ti chiamiamo per verificare che sia adatto a te.'

    // Standard SEO
    ensureMetaByName('description', description)
    // Versione di prova: non indicizzata, con /yt-postura come pagina di riferimento (canonical qui sotto).
    const prevRobots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null
    ensureMetaByName('robots', 'noindex, follow')
    ensureMetaByName(
      'keywords',
      [
        'percorso posturale torino',
        'osteopata postura torino',
        'valutazione posturale torino',
        'trattamento osteopatico postura',
        'postura collo schiena torino',
        'testa avanti osteopata',
        'mal di schiena postura torino',
        'app esercizi posturali',
        'osteopata san donato torino',
        'osteopata crocetta torino',
        'studio osteopatico mobilitas',
      ].join(', ')
    )
    ensureMetaByName('author', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByName('geo.region', 'IT-TO')
    ensureMetaByName('geo.placename', 'Torino, San Donato, Crocetta')
    // Coordinate sede principale (San Donato); Crocetta è nel JSON-LD department
    ensureMetaByName('geo.position', '45.0802312;7.6577188')
    ensureMetaByName('ICBM', '45.0802312, 7.6577188')

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    ensureMetaByProperty('og:title', title)
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:image', ogImage)
    ensureMetaByProperty('og:image:alt', 'Percorso posturale – Studio Mobilitas Torino')
    ensureMetaByProperty('og:image:width', '1200')
    ensureMetaByProperty('og:image:height', '630')
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByProperty('og:locale', 'it_IT')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', 'Correttori, palestra, «tirati su». Niente ha funzionato | Mobilitas')
    ensureMetaByName('twitter:description', description)
    ensureMetaByName('twitter:image', ogImage)
    ensureMetaByName('twitter:image:alt', 'Percorso posturale – Mobilitas Torino')

    ensureCanonical(pageUrl)

    const businessShared = {
      '@type': 'MedicalBusiness',
      name: 'Mobilitas – Studio Osteopatico',
      url: origin,
      telephone: '+393518198457',
      email: 'studio@studiomobilitas.it',
      image: `${origin}/logo_blu.png`,
      priceRange: '€€',
      medicalSpecialty: 'Osteopathic',
      areaServed: [
        { '@type': 'City', name: 'Torino' },
        { '@type': 'AdministrativeArea', name: 'Piemonte' },
      ],
      sameAs: [
        'https://www.facebook.com/studiomobilitas',
        'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: String(RECENSIONI_TOTAL),
        bestRating: '5',
        worstRating: '1',
      },
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: 'it-IT',
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': `${pageUrl}#condition` },
          mainEntity: { '@id': `${pageUrl}#service` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImage,
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'meta[name="description"]'],
          },
        },
        {
          '@type': 'MedicalCondition',
          '@id': `${pageUrl}#condition`,
          name: 'Disturbi posturali',
          alternateName: [
            'Testa in avanti',
            'Ipercifosi',
            'Spalle chiuse',
            'Iperlordosi',
            'Atteggiamento scoliotico',
            'Dolore posturale',
          ],
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: 'Colonna vertebrale, bacino e cingolo scapolare',
          },
        },
        {
          '@type': 'MedicalTherapy',
          '@id': `${pageUrl}#service`,
          name: 'Percorso posturale',
          description:
            'Prima visita posturale con un professionista esperto in postura, 3 sedute di osteopatia di circa un’ora con lo stesso osteopata e 12 mesi di app. 299 euro tutto incluso. Si richiede con una telefonata gratuita e senza impegno.',
          url: pageUrl,
          provider: { '@id': `${origin}/#organization` },
          offers: {
            '@type': 'Offer',
            price: '299',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: pageUrl,
            name: 'Percorso posturale: prima visita, 3 sedute di osteopatia e 12 mesi di app',
          },
        },
        {
          ...businessShared,
          '@id': `${origin}/#organization`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Peyron 54',
            addressLocality: 'Torino',
            addressRegion: 'Piemonte',
            postalCode: '10143',
            addressCountry: 'IT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 45.0802312,
            longitude: 7.6577188,
          },
          hasMap:
            'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
          department: [
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-san-donato`,
              name: 'Mobilitas – San Donato',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Peyron 54',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10143',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0802312,
                longitude: 7.6577188,
              },
            },
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-crocetta`,
              name: 'Mobilitas – Crocetta',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Lamarmora 35',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10128',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0593749,
                longitude: 7.6660428,
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Percorso posturale',
              item: pageUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          // Stesse domande e risposte della pagina (contenuti.jsx), così non si disallineano.
          mainEntity: FAQ_PRINCIPALI.map((item) => ({
            '@type': 'Question',
            name: item.nome,
            acceptedAnswer: { '@type': 'Answer', text: item.testo },
          })),
        },
      ],
    }

    let scriptLd = document.querySelector('script[type="application/ld+json"][data-page="yt-postura-v2"]')
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', 'yt-postura-v2')
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      if (prevRobots === null) document.querySelector('meta[name="robots"]')?.remove()
      else ensureMetaByName('robots', prevRobots)
      const toRemove = document.querySelector('script[type="application/ld+json"][data-page="yt-postura-v2"]')
      if (toRemove) toRemove.remove()
    }
  }, [])

  // Un solo ascoltatore di scorrimento: tacche raggiunte, filo che si traccia, barra mobile.
  useEffect(() => {
    let frame = 0
    const misura = () => {
      frame = 0
      const centro = window.innerHeight / 2
      let ultimo = -1
      CAPITOLI.forEach((c, i) => {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top < centro) ultimo = i
      })
      setRaggiunto(ultimo)
      // Il filo si traccia fino a metà schermo: scala sul solo transform, senza nuovi render.
      const radice = inchiostroRef.current?.parentElement?.parentElement
      if (radice && inchiostroRef.current) {
        const r = radice.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (centro - r.top) / Math.max(1, r.height)))
        inchiostroRef.current.style.transform = `scaleY(${p})`
      }
      const chiusura = chiusuraRef.current?.getBoundingClientRect()
      const offerta = offertaRef.current?.getBoundingClientRect()
      setBarra(Boolean(offerta && offerta.bottom < 0 && chiusura && chiusura.top > window.innerHeight))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(misura)
    }
    misura()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Una sola richiesta: telefonata gratuita (modalità «consulto» del modulo → CT_GRATUITA).
  // La lista d'attesa non è configurata: nessun pulsante la apre.
  const richiedi = useCallback(() => {
    setBookingCtaType('consulto')
    setShowBooking(true)
  }, [])

  // Link secondari: portano a una sezione della pagina (niente movimento con «riduci movimento»).
  const vaiA = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const riduci = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: riduci ? 'auto' : 'smooth' })
  }, [])

  const spunta = (i) =>
    setSpuntati((prima) => {
      const dopo = new Set(prima)
      if (dopo.has(i)) dopo.delete(i)
      else dopo.add(i)
      return dopo
    })
  const n = spuntati.size

  const CTA = 'Inizia il percorso'
  const Azioni = ({ scuro = false, link }) => (
    <div className="ytp-actions">
      <button type="button" className={`ytp-cta ${scuro ? 'ytp-cta--green' : 'ytp-cta--ink'}`} onClick={richiedi}>
        {CTA}
      </button>
      <button type="button" className="ytp-link" onClick={() => vaiA(link.verso)}>
        {link.testo}
      </button>
    </div>
  )
  const LINK_OFFERTA = { testo: 'Cosa comprende', verso: 'ytp-h-offerta' }

  return (
    <>
      <MotionConfig reducedMotion="user">
        <div className={`ytp${scuro ? ' ytp--scuro' : ''}`}>
          <span className="ytp-axis" aria-hidden="true">
            <span className="ytp-axis__ink" ref={inchiostroRef} />
          </span>

          {/* ——— 1. APERTURA ——— */}
          <section className="ytp-hero" aria-labelledby="ytp-h1">
            <div className="ytp-hero__top">
              <figure className="ytp-hero__photo">
                <picture>
                  <source media="(min-width: 64rem)" srcSet={fotoSet('hero-d', [640, 960, 1280])} sizes="45vw" />
                  <img
                    src={foto('hero-m', 480)}
                    srcSet={fotoSet('hero-m', [480, 720])}
                    sizes="100vw"
                    width="480"
                    height="800"
                    alt="Valutazione posturale in piedi: l’osteopata osserva l’allineamento di una paziente"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </figure>
              <div className="ytp-hero__copy">
                <Titolo as="h1" size="h1" id="ytp-h1">
                  <span className="ytp-h1__lista">
                    Correttori, palestra, «tirati{'\u00a0'}su».
                  </span>
                  <strong className="ytp-h1__no">
                    Niente ha{' '}
                    <motion.span
                      className="ytp-lean"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: -4 }}
                      transition={{ ...molla, delay: 0.7 }}
                    >
                      funzionato.
                    </motion.span>
                  </strong>
                  <span className="ytp-h1__sub">Non è così che si corregge la postura.</span>
                </Titolo>
              </div>
            </div>

            <div className="ytp-offer ytp-dark" ref={offertaRef}>
              <div className="ytp-offer__dock">
                <p className="ytp-offer__price">
                  <span className="ytp-offer__now">299€</span>
                  <span className="ytp-offer__what">
                    <strong>Tutto incluso</strong>
                    <span>Prima visita, 3 sedute e 12 mesi di app</span>
                  </span>
                </p>
                <button type="button" className="ytp-cta ytp-cta--green" onClick={richiedi}>
                  {CTA}
                </button>
              </div>
              <ul className="ytp-offer__plus">
                {OFFERTA_PUNTI.map((punto) => (
                  <li key={punto}>
                    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5.5 9.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {punto}
                  </li>
                ))}
              </ul>
              <button type="button" className="ytp-link" onClick={() => vaiA(LINK_OFFERTA.verso)}>
                {LINK_OFFERTA.testo}
              </button>
            </div>

            <div className="ytp-hero__more">
              <p className="ytp-lead">
                Ti vedi allo specchio, apri le spalle, tiri su la testa: per un attimo va meglio. Poi la giornata
                riprende e, senza accorgertene, sei di nuovo giù. Non è pigrizia: è un’abitudine del corpo. Il
                percorso posturale Mobilitas lavora proprio lì.
              </p>
            </div>
          </section>

          {/* ——— 2. IL VIDEO ——— */}
          <section className="ytp-section ytp-video" aria-label="Il video di Nicolas">
            <div className="ytp-wrap ytp-grid">
              <figure className="ytp-video__fig">
              <div className="ytp-video__frame">
                {video ? (
                  <>
                    {video.anteprimaUrl ? (
                      <img src={video.anteprimaUrl} alt="" decoding="async" loading="lazy" />
                    ) : null}
                    <iframe
                      src={videoSrc}
                      title={video.titolo || 'Percorso posturale - Mobilitas Torino'}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                      loading="lazy"
                      style={{ pointerEvents: 'none', backgroundColor: '#002552' }}
                    />
                    <div
                      className="ytp-video__cover"
                      style={{ opacity: videoCover ? 1 : 0 }}
                      aria-hidden="true"
                    />
                    <div className="ytp-video__block" aria-hidden="true" />
                  </>
                ) : (
                  // Riserva se il video non arriva dal gestionale: stessa foto dell'originale (maldischiena1), ritagliata e alleggerita.
                  <img
                    src={foto('video-riserva', 960)}
                    srcSet={fotoSet('video-riserva', [960, 1440])}
                    sizes="(min-width: 64rem) 50vw, 90vw"
                    alt="Trattamento posturale in studio a Torino"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              </figure>
              <div className="ytp-video__aside">
                <div className="ytp-video__say">
                  <Titolo>Il percorso, in 3 passi.</Titolo>
                </div>
                <ul className="ytp-steps3">
                  {HERO_BENEFITS.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ——— 3. TESTA: riconoscimento ——— */}
          <section className="ytp-section" aria-labelledby="ytp-h-testa">
            <div className="ytp-wrap">
              <Tacca id="testa" label={CAPITOLI_TITOLI.testa} acceso={raggiunto >= 0} />
              <Scompensi />
              <div className="ytp-grid">
                <div className="ytp-intro ytp-sticky">
                  <Titolo id="ytp-h-testa">
                    Quante di queste ti <strong>succedono?</strong>
                  </Titolo>
                  <p className="ytp-lead">
                    Tocca quelle in cui ti riconosci. Poi ti spieghiamo perché tornano, anche quando ci fai
                    attenzione.
                  </p>
                </div>

                <div className="ytp-test" role="group" aria-labelledby="ytp-test-label">
                  <p className="ytp-sr" id="ytp-test-label">
                    Ti ci ritrovi?
                  </p>
                  <ul className="ytp-test__list">
                    {PAIN_POINTS.map((p, i) => (
                      <li className="ytp-test__row" key={p.title}>
                        <label>
                          <input type="checkbox" checked={spuntati.has(i)} onChange={() => spunta(i)} />
                          <span className="ytp-test__box" aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="none">
                              <path
                                d="M3 8.5l3.2 3L13 4.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>
                            <span className="ytp-test__title">{p.title}</span>
                            {/* La spiegazione si apre solo sotto le frasi spuntate: si legge solo ciò che ti riguarda. */}
                            <span className="ytp-test__more">
                              <span>
                                <span className="ytp-test__body">{p.body}</span>
                              </span>
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="ytp-test__count ytp-dark">
                    <ol className="ytp-meter" aria-hidden="true">
                      {PAIN_POINTS.map((p, i) => (
                        <li key={p.title} className={i < n ? 'is-on' : ''} />
                      ))}
                    </ol>
                    <p aria-live="polite">
                      {n === 0 ? (
                        'Tocca le frasi in cui ti riconosci.'
                      ) : (
                        <>
                          Ne hai segnate <span className="ytp-test__n">{n}</span> su 6. Qui sotto capisci perché
                          tornano, e come ci lavora il percorso.
                        </>
                      )}
                    </p>
                    <button type="button" className="ytp-cta ytp-cta--green ytp-cta--block" onClick={richiedi}>
                      {CTA}
                    </button>
                  </div>
                </div>
              </div>

              <TavolaTesta />
            </div>
          </section>

          {/* ——— 4. PETTO: il meccanismo (capitolo su blu notte) ——— */}
          <section className="ytp-section ytp-band ytp-dark ytp-petto" data-scuro aria-labelledby="ytp-h-petto">
            <span className="ytp-band__axis" aria-hidden="true" />
            <div className="ytp-wrap">
              <Tacca id="petto" label={CAPITOLI_TITOLI.petto} acceso={raggiunto >= 1} />
              <div className="ytp-grid">
                <div className="ytp-intro">
                  <Titolo id="ytp-h-petto">
                    Perché la forza di volontà <strong>non basta.</strong>
                  </Titolo>
                  <p className="ytp-lead">
                    La postura non è una posizione che scegli. È un’abitudine che il corpo ha costruito negli anni:
                    le ore alla scrivania, il telefono, la guida, la stanchezza e, a volte, un vecchio dolore.
                  </p>
                </div>
              </div>

              <TavolaFilo />

              {/* In breve: quattro frasi, niente muro di testo. */}
              <ol className="ytp-claims ytp-claims--brevi">
                {MECHANISM_STEPS.map((s) => (
                  <li key={s.k}>
                    <Titolo as="h3" size="h3">
                      {s.t}
                    </Titolo>
                  </li>
                ))}
              </ol>

              <p className="ytp-quote">
                <strong>
                  Chi ti promette di raddrizzarti in poche sedute ti sta vendendo un miracolo.
                  <span className="ytp-quote__si">Noi ti diciamo la verità.</span>
                </strong>
              </p>
            </div>
          </section>

          {/* ——— 5. BACINO: cosa può tornare ——— */}
          <section className="ytp-section" aria-labelledby="ytp-h-bacino">
            <div className="ytp-wrap">
              <Tacca id="bacino" label={CAPITOLI_TITOLI.bacino} acceso={raggiunto >= 2} />
              <div className="ytp-grid">
                <div className="ytp-intro">
                  <Titolo id="ytp-h-bacino">
                    L’obiettivo: una schiena{' '}
                    <strong>
                      <motion.span
                        ref={drittoRef}
                        className="ytp-lean"
                        initial={{ rotate: -4 }}
                        animate={{ rotate: drittoIn ? 0 : -4 }}
                        transition={{ type: 'spring', stiffness: 140, damping: 15, delay: 0.15 }}
                      >
                        dritta
                      </motion.span>
                    </strong>
                    ,{' '}
                    senza doverci pensare.
                  </Titolo>
                  <p className="ytp-lead">
                    Immagina di arrivare a sera con la schiena meno stanca e di piacerti di più nelle foto, senza
                    doverti correggere di continuo. È questo il nostro obiettivo. Ognuno parte da un punto diverso
                    e alcune cose non si possono cambiare: per questo ti parliamo di obiettivi, non di promesse.
                  </p>
                </div>
              </div>

              <TavolaOsso />

              <Obiettivo />


            </div>
          </section>

          {/* ——— 6. OFFERTA ——— */}
          <section className="ytp-section ytp-band ytp-dark ytp-deal" data-scuro aria-labelledby="ytp-h-offerta">
            <span className="ytp-band__axis" aria-hidden="true" />
            <div className="ytp-wrap ytp-grid">
              <div className="ytp-deal__left">
                <Titolo id="ytp-h-offerta">Tutto il percorso, con un solo prezzo.</Titolo>
                <p className="ytp-lead">
                  Non paghi una seduta alla volta sperando che sia l’ultima. Hai 4 appuntamenti in studio, circa 3
                  ore di trattamento osteopatico e un anno di esercizi guidati.
                </p>
                <p className="ytp-deal__big">
                  <span className="ytp-deal__now">299€</span>
                </p>
              </div>
              <div className="ytp-deal__right">
                <ul className="ytp-deal__list">
                  {AFTER_IMAGES_BENEFITS.map((b, i) => (
                    <li key={i}>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Azioni scuro link={{ testo: 'Come si inizia', verso: 'ytp-h-piedi' }} />
              </div>
            </div>
          </section>

          {/* ——— 7. RECENSIONI ——— */}
          <section className="ytp-section" aria-labelledby="ytp-h-recensioni">
            <div className="ytp-wrap">
              <div className="ytp-grid">
                <div className="ytp-rev__head">
                  <Titolo id="ytp-h-recensioni">
                    Più di <strong>900 recensioni</strong> su Google.
                  </Titolo>
                </div>
              </div>
              <Carosello />
              <a
                className="ytp-link ytp-reviews__more"
                href={GOOGLE_RECENSIONI_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi tutte le recensioni su Google Maps
              </a>
              <div className="ytp-grid">
                <div className="ytp-rev__close">
                  <p className="ytp-lead">
                    Se ti ritrovi in quello che hai letto e il percorso ti convince, il passo è uno: richiedilo. Ti chiamiamo noi.
                    La telefonata è gratuita e senza impegno.
                  </p>
                  <Azioni link={LINK_OFFERTA} />
                </div>
              </div>
            </div>
          </section>

          {/* ——— 8. PIEDI: come si entra ——— */}
          <section className="ytp-section" aria-labelledby="ytp-h-piedi">
            <div className="ytp-wrap">
              <Tacca id="piedi" label={CAPITOLI_TITOLI.piedi} acceso={raggiunto >= 3} />
              <div className="ytp-grid">
                <div className="ytp-intro">
                  <Titolo id="ytp-h-piedi">
                    Per iniziare il percorso, ti basta una <strong>telefonata.</strong>
                  </Titolo>
                  <p className="ytp-lead">
                    La richiedi da questa pagina, ed è gratuita e senza impegno. Ti chiamiamo noi per verificare che
                    il percorso sia adatto a te e definire con te i prossimi passi.
                  </p>
                </div>
              </div>

              <div className="ytp-doors">
                {ENTRY_DOORS.map((door) => {
                  const lista = door.id === 'lista'
                  return (
                    <article
                      key={door.id}
                      className={`ytp-door ${lista ? 'ytp-door--list ytp-dark' : 'ytp-door--line'}`}
                      {...(lista ? { 'data-scuro': '' } : {})}
                    >
                      <div className="ytp-door__top">
                        {lista ? (
                          <span className="ytp-door__price">
                            <b>299€</b>
                          </span>
                        ) : (
                          <span className="ytp-door__free">Gratis</span>
                        )}
                      </div>
                      <Titolo as="h3" size="h3">
                        {door.title}
                      </Titolo>
                      <p className="ytp-lead ytp-door__lead">{door.lead}</p>
                      <ul>
                        {door.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className={`ytp-cta ytp-cta--block ${lista ? 'ytp-cta--green' : 'ytp-cta--line'}`}
                        onClick={richiedi}
                      >
                        {lista ? CTA : 'Richiedi la telefonata'}
                      </button>
                    </article>
                  )
                })}
              </div>

              <div className="ytp-after">
                <Titolo as="h3" size="h3">
                  Dopo la richiesta, succede questo.
                </Titolo>
                <ol className="ytp-after__list">
                  {AFTER_ENTRY.map((step) => (
                    <li key={step.k}>
                      <span className="ytp-after__n">{step.k}</span>
                      <Titolo as="h4" size="h3">
                        {step.t}
                      </Titolo>
                      <p>{step.b}</p>
                    </li>
                  ))}
                </ol>
                <p className="ytp-lead ytp-after__close">
                  Se dalla telefonata emerge che il percorso non fa per te, te lo diciamo subito. Preferiamo dirti
                  di no che farti venire per niente.
                </p>
                <Azioni link={{ testo: 'Leggi le domande', verso: 'ytp-h-faq' }} />
              </div>

              <Visita />

              <div className="ytp-places">
                <Titolo>
                  Due studi a <strong>Torino</strong>
                </Titolo>
                <p className="ytp-lead" style={{ marginTop: '1.25rem' }}>
                  San Donato e Crocetta. La sede la scegli tu, quando ti chiamiamo. Siamo aperti dal lunedì al
                  venerdì dalle 8 alle 21 e il sabato dalle 9 alle 18.
                </p>
                <MappaTorino sedi={MAPPE} scuro={scuro} />
                <div className="ytp-places__list">
                  <div className="ytp-place">
                    <p className="ytp-place__name">Via Peyron 54</p>
                    <p className="ytp-place__area">San Donato</p>
                    <a className="ytp-link" href={MAPPE.sanDonato} target="_blank" rel="noopener noreferrer">
                      Apri in Google Maps
                    </a>
                  </div>
                  <div className="ytp-place">
                    <p className="ytp-place__name">Via Lamarmora 35</p>
                    <p className="ytp-place__area">Crocetta</p>
                    <a className="ytp-link" href={MAPPE.crocetta} target="_blank" rel="noopener noreferrer">
                      Apri in Google Maps
                    </a>
                  </div>
                </div>
                <div className="ytp-places__notes">
                  <p>In metro. San Donato: Bernini o Principi d’Acaja. Crocetta: la fermata Crocetta.</p>
                  <p>Parcheggio vicino a entrambe le sedi. Strisce blu e parcheggi intorno.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ——— 9. DOMANDE ——— */}
          <section className="ytp-section" aria-labelledby="ytp-h-faq">
            <div className="ytp-wrap ytp-grid">
              <div className="ytp-faq__head ytp-sticky">
                <Titolo id="ytp-h-faq">
                  Le domande che ti fermano. Con una <strong>risposta secca.</strong>
                </Titolo>
                <p className="ytp-lead" style={{ marginTop: '1.25rem' }}>
                  Aprine una. Se dopo ti resta un dubbio, lo chiarisci al telefono: è gratuito e senza impegno.
                </p>
              </div>
              <div className="ytp-faq">
                {FAQ_PRINCIPALI.map((item) => (
                  <details key={item.id} name="ytp-faq">
                    <summary>
                      <span>{item.question}</span>
                      <span className="ytp-faq__icon" aria-hidden="true" />
                    </summary>
                    <p className="ytp-faq__a">{item.testo}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ——— CHIUSURA ——— */}
          <section className="ytp-close ytp-band ytp-dark" data-scuro ref={chiusuraRef} aria-label="Prenota">
            {/* Chiusura: il filo della pagina scende sulla figura allineata (orecchio, spalla, anca, caviglia). */}
            <span className="ytp-close__filo" aria-hidden="true" />
            <div className="ytp-close__fig ytp-tav">
              <FiguraAllineata className="ytp-close__svg" />
            </div>
            <div className="ytp-wrap ytp-grid">
              <div className="ytp-close__inner">
                <p className="ytp-close__text">
                  Hai già provato a raddrizzarti con la forza. Ora puoi capire perché non dura, e lavorarci con un
                  percorso chiaro: 299€ tutto incluso, che paghi solo dopo la prima visita e solo se il percorso è
                  adatto a te.
                </p>
                <Azioni scuro link={LINK_OFFERTA} />
              </div>
            </div>
          </section>

        </div>
      </MotionConfig>

      {/* Barra mobile: fuori dalla radice della landing, come il popup. */}
      <div className={`ytp-bar${barra ? ' is-on' : ''}`} aria-hidden={!barra}>
        <p className="ytp-bar__label">
          <b>299€</b>
          <span>percorso completo</span>
        </p>
        <button type="button" className="ytp-cta ytp-cta--green" onClick={richiedi} tabIndex={barra ? 0 : -1}>
          Inizia il percorso
        </button>
      </div>

      {/* Modulo di prenotazione della v2: stessa richiesta al gestionale del popup condiviso per «yt-postura». */}
      <MotionConfig reducedMotion="user">
        <Prenotazione isOpen={showBooking} onClose={() => setShowBooking(false)} ctaType={bookingCtaType} />
      </MotionConfig>
    </>
  )
}

export default YtPosturaV2
