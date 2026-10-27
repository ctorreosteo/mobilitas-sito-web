import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, Plus, Sparkles, UserCheck } from 'lucide-react'
import PageShell from '../site/PageShell'
import BookingPopup from '../BookingPopup'
import WhatsAppFab from '../whatsapp/WhatsAppFab'
import StudiMap from '../studi-map/StudiMap'
import RecensioniDolore from '../recensioni-tag/RecensioniDolore'
import { Kicker, MaskLines, Reveal, Snap } from '../home-sections/HomeKit'
import { EASE, useParallax } from '../home-sections/homeMotion'
import ClImg from '../condition-landing/ClImg'
import { HeroMedia } from '../condition-landing/Hero'
import { useHeroVideo } from '../condition-landing/heroVideo'
import useConditionSeo from '../condition-landing/useConditionSeo'
import { doloreDi } from '../../data/dolori'
import { FAQ_PRIMA_VISITA } from '../../data/faqPrimaVisita'
import CityMap from './CityMap'
import { VisitaCtas, VisitaDock } from './VisitaCtas'
import StudioCollage from './StudioCollage'
import FotoVentaglio from './collage/FotoVentaglio'
import FotoDoppia from './collage/FotoDoppia'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import './prima-visita-landing.css'

// Landing della prima visita nello stile della cervicalgia (stesse sezioni e stessa grafica, classi mx-cerv-*),
// riempita con il config della pagina (lo stesso di ConditionLanding: hero, pain, mechanism, reviews, visit, faq,
// images, seo). Usata dalle landing dei dolori in src/pages/landing-prima-visita.

// Posti scontati al mese, come nel tag dell'apertura delle landing
const POSTI_MESE = 40

// La valutazione in piedi: accanto ai passi della prima visita
const FOTO_VALUTAZIONE = { src: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale', pos: '42% 35%', alt: 'L’osteopata valuta la postura del paziente in piedi' }

// Titolo a due righe { main, accent } con l'effetto delle sezioni della cervicalgia
const Titolo = ({ title, className = 'mx-h mx-h--lg' }) => (
  <h2 className={className}>
    <MaskLines lines={[{ text: title.main }, ...(title.accent ? [{ text: title.accent, className: 'mx-gradient' }] : [])]} />
  </h2>
)

export default function PrimaVisitaLanding({ page }) {
  useConditionSeo(page.seo)
  const { video, loading } = useHeroVideo(page.heroVideo)
  const dolore = doloreDi(page.slug)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [openFaq, setOpenFaq] = useState(null)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const [benRef, benY] = useParallax(8)

  const openPrimaVisita = () => {
    setBookingCtaType('primaVisita')
    setShowBooking(true)
  }
  const openConsulto = () => {
    setBookingCtaType('consulto')
    setShowBooking(true)
  }

  // Dock mobile: compare quando i bottoni dell'apertura escono dallo schermo
  useEffect(() => {
    const el = heroCtaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => {
      setShowDock(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ctas = <VisitaCtas onVisita={openPrimaVisita} onConsulto={openConsulto} />
  const { hero, pain, mechanism, reviews, visit, faq, images } = page
  const cards = mechanism.cards || []
  // Risultati: i vantaggi dell'apertura e quelli dopo il trattamento
  const risultati = [...(hero.benefits || []), ...(mechanism.checklist || [])]
  // FAQ: prima quelle sul dolore, poi quelle pratiche comuni (costo, durata, vestiti, dove, con chi)
  const domande = [...faq.items.map((d) => ({ ...d, icon: HelpCircle })), ...FAQ_PRIMA_VISITA]
  // Foto senza ripetizioni a occhio (si conta per serie, vedi creaSceltaFoto): nell'ordine della pagina,
  // le foto del config se la loro serie non è già comparsa, altrimenti altre della zona del corpo
  const prendi = creaSceltaFoto(page.slug, [FOTO_VALUTAZIONE.src, ...FOTO_STUDIO.map((f) => `/trattamenti/${f.nome}`)])
  // Le foto facoltative (seconda di "perché succede", FAQ, foto tra le schede) ci sono solo se restano serie nuove
  const scegli = (preferita, className, facoltativa = false) => {
    const src = prendi(preferita, facoltativa)
    return src ? { src, className: src === preferita ? className : undefined } : null
  }
  // Foto dell'apertura: solo se la landing non ha il video (alcune non lo hanno), così non consuma una serie
  const fotoHero = !loading && !video ? scegli(images.hero, images.heroClassName) : null
  const fotoBen = scegli(images.band, images.bandClassName)
  // "Ti riconosci?": le schede con una foto del config la prendono subito; le altre (oltre la sesta)
  // solo se restano serie nuove dopo i collage, altrimenti mostrano l'icona del sintomo
  const fotoPain = pain.items.map((_, i) => (cards[i] ? scegli(cards[i].image, cards[i].imageClassName) : undefined))
  const fotoPerche = [scegli(images.final, images.finalClassName)]
  const fotoVentaglio = Array.from({ length: 6 }, () => scegli()).filter(Boolean)
  pain.items.forEach((_, i) => {
    if (fotoPain[i] === undefined) fotoPain[i] = scegli(undefined, undefined, true)
  })
  const fotoVisita = [FOTO_VALUTAZIONE, scegli(undefined, undefined, true)]
  fotoPerche.push(scegli(undefined, undefined, true))
  const fotoFaq = [scegli(undefined, undefined, true), scegli(undefined, undefined, true)]
  const fotoRiquadro = scegli(undefined, undefined, true)

  return (
    <PageShell className={`mx-cerv mx-pvl mx-pvl--${page.slug}`}>
      {/* ——— Apertura ——— */}
      <header className="mx-cerv-hero">
        <div className="mx-cerv-hero__rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-wrap mx-cerv-hero__grid">
          <motion.div
            className="mx-cerv-hero__badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Sparkles size={15} strokeWidth={2.4} />
            {hero.name}
          </motion.div>

          <h1 className="mx-h mx-cerv-hero__title">
            <motion.span
              className="mx-cerv-hero__mission"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              {hero.title.main}
            </motion.span>
            {hero.title.accent && (
              <>
                <br />
                <motion.span
                  className="mx-cerv-hero__promise mx-accent"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                >
                  {hero.title.accent}
                </motion.span>
              </>
            )}
          </h1>

          <motion.div
            className="mx-cerv-hero__media"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <HeroMedia
              video={video}
              loading={loading}
              videoTitle={page.videoTitle}
              fallback={{ src: fotoHero?.src, alt: page.videoTitle, className: fotoHero?.className }}
            />
            <span className="mx-cerv-hero__arc" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="mx-cerv-hero__offer"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="mx-cerv-offer">
              <span className="mx-cerv-offer__lbl">Solo</span>
              <span className="mx-cerv-offer__seats">{POSTI_MESE} posti</span>
              <span className="mx-cerv-offer__lbl">ogni mese con lo sconto</span>
              <span className="mx-cerv-offer__price">
                <s>90€</s>
                <b>49€</b>
              </span>
            </p>
          </motion.div>

          <motion.div
            className="mx-cerv-hero__ctas"
            ref={heroCtaRef}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
          >
            {ctas}
          </motion.div>

          <motion.p
            className="mx-lead mx-cerv-hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            {hero.lead}
          </motion.p>
        </div>
      </header>

      {/* ——— Recensioni sul dolore ——— */}
      <section className="mx-section mx-section--deep mx-cerv-proof">
        <RecensioniDolore dolore={dolore} />
        {reviews.closing && (
          <div className="mx-wrap">
            <Reveal>
              <p className="mx-lead mx-pvl-closing">{reviews.closing}</p>
            </Reveal>
          </div>
        )}
      </section>

      {/* ——— Cosa cambia: foto + risultati numerati ——— */}
      {risultati.length > 0 && (
        <section className="mx-section mx-section--glow mx-cerv-benefits">
          <div className="mx-wrap">
            <div className="mx-cerv-ben__head">
              <Kicker>Cosa cambia dopo il trattamento</Kicker>
              <Titolo title={mechanism.sub?.title || { main: 'Cosa può cambiare', accent: 'per te' }} />
            </div>
            <Reveal className="mx-cerv-ben">
              <div className="mx-cerv-ben__photo" ref={benRef}>
                <motion.div style={{ y: benY, height: '100%' }}>
                  {fotoBen && <ClImg src={fotoBen.src} alt="" sizes="(min-width: 1000px) 440px, 92vw" className={fotoBen.className} />}
                </motion.div>
                <span className="mx-cerv-ben__tag">
                  <span>Prima</span>
                  <ArrowRight size={14} aria-hidden="true" />
                  <b>Dopo</b>
                </span>
              </div>
              <ol className="mx-cerv-ben__list mx-pvl-ben__list">
                {risultati.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-12% 0px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                  >
                    <span className="mx-cerv-ben__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mx-pvl-ben__txt">{r}</span>
                  </motion.li>
                ))}
              </ol>
            </Reveal>
          </div>
          <div className="mx-wrap">{ctas}</div>
        </section>
      )}

      {/* ——— Ti riconosci? + perché succede ——— */}
      <section className="mx-section mx-section--deep mx-cerv-pain">
        <div className="mx-wrap">
          <Kicker>Ti riconosci?</Kicker>
          <h2 className="mx-h mx-h--lg mx-cerv-pain__title">
            {pain.title.main}
            {pain.title.accent && (
              <>
                <br />
                <span className="mx-cerv-pain__hit">{pain.title.accent}</span>
              </>
            )}
          </h2>
          {pain.intro && (
            <Reveal>
              <p className="mx-lead mx-pvl-intro">{pain.intro}</p>
            </Reveal>
          )}

          <Snap as="ol" className="mx-cerv-pains">
            {pain.items.map((item, i) => {
              const f = fotoPain[i]
              return (
                <li key={item.title} className="mx-cerv-painc">
                  <div className="mx-cerv-painc__img">
                    {f ? (
                      <ClImg src={f.src} alt="" sizes="(min-width: 900px) 25vw, 84vw" className={f.className} />
                    ) : (
                      item.icon && (
                        <span className="mx-pvl-painc__icon" aria-hidden="true">
                          <item.icon size={56} strokeWidth={1.4} />
                        </span>
                      )
                    )}
                    <span className="mx-cerv-painc__n">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mx-h mx-h--sm">{item.title}</h3>
                  <p className="mx-body">{item.body}</p>
                </li>
              )
            })}
          </Snap>

          {/* Perché succede: spiegazione, passaggi e foto */}
          <div className="mx-cerv-agitate">
            <Reveal className="mx-cerv-agitate__copy">
              <p className="mx-cerv-agitate__label">
                <span aria-hidden="true">
                  <AlertTriangle size={16} strokeWidth={2.4} />
                </span>
                Perché succede
              </p>
              <h3 className="mx-h mx-h--md mx-cerv-agitate__title">
                {mechanism.title.main}
                {mechanism.title.accent && (
                  <>
                    <br />
                    <span className="mx-cerv-escalate">{mechanism.title.accent}</span>
                  </>
                )}
              </h3>
              <div className="mx-cerv-agitate__text">
                {mechanism.intro && <p className="mx-body">{mechanism.intro}</p>}
                {mechanism.narrative && <p className="mx-body">{mechanism.narrative}</p>}
              </div>
              {mechanism.steps?.length > 0 && (
                <ol className="mx-pvl-steps">
                  {mechanism.steps.map((s) => (
                    <li key={s.k}>
                      <span className="mx-pvl-steps__n">{s.k}</span>
                      <span>
                        <b>{s.t}</b>
                        {s.b}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
            {fotoPerche[1] ? (
              <FotoDoppia foto={fotoPerche} className="mx-pvl-agitate__photos" />
            ) : (
              fotoPerche[0] && (
                <Reveal className="mx-cerv-photo mx-cerv-agitate__photo" delay={0.1}>
                  <ClImg src={fotoPerche[0].src} alt="" sizes="(min-width: 1000px) 520px, 92vw" className={fotoPerche[0].className} />
                </Reveal>
              )
            )}
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Il trattamento: schede + una foto nel carosello ——— */}
      {cards.length > 0 && (
        <section className="mx-section mx-section--glow mx-cerv-changes mx-pvl-changes">
          <div className="mx-wrap">
            <div className="mx-pvl-head">
              <Kicker>Il trattamento osteopatico</Kicker>
              {mechanism.quote && <Titolo title={mechanism.quote} />}
              {mechanism.sub?.intro && (
                <Reveal>
                  <p className="mx-lead mx-pvl-intro">{mechanism.sub.intro}</p>
                </Reveal>
              )}
            </div>
            {fotoVentaglio.length === 6 && <FotoVentaglio foto={fotoVentaglio} />}
            <Snap as="ul" className="mx-cerv-bento">
              {cards.flatMap((c, i) => {
                const card = (
                  <li key={c.title} className="mx-card mx-cerv-bento__item">
                    <div className="mx-cerv-bento__top">
                      <span className="mx-card__icon">
                        <CheckCircle2 size={22} />
                      </span>
                      <span className="mx-cerv-bento__n">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h3 className="mx-h mx-h--sm">{c.title}</h3>
                      <p className="mx-body">{c.body}</p>
                    </div>
                  </li>
                )
                if (i !== 1 || !fotoRiquadro) return [card]
                return [
                  card,
                  <li key="foto" className="mx-cerv-bento__photo">
                    <ClImg src={fotoRiquadro.src} alt="" sizes="(min-width: 900px) 50vw, 84vw" />
                    <div className="mx-cerv-bento__photo-txt">
                      <span>Trattamento osteopatico</span>
                      <p>Solo con le mani, su misura per te</p>
                    </div>
                  </li>,
                ]
              })}
            </Snap>
            {ctas}
          </div>
        </section>
      )}

      {/* ——— Come funziona la prima visita ——— */}
      {visit?.steps?.length > 0 && (
        <section className="mx-section mx-section--deep mx-cerv-roads mx-pvl-visit">
          <div className="mx-wrap">
            <Kicker>{visit.kicker || 'Come funziona'}</Kicker>
            <Titolo title={visit.title || { main: 'Cosa succede quando', accent: 'prenoti' }} />
            <div className="mx-pvl-visit__grid">
            {fotoVisita[1] ? (
              <FotoDoppia foto={fotoVisita} className="mx-pvl-visit__photos" />
            ) : (
              <Reveal className="mx-cerv-photo mx-pvl-visit__photos" delay={0.1}>
                <ClImg src={FOTO_VALUTAZIONE.src} alt={FOTO_VALUTAZIONE.alt} sizes="(min-width: 1000px) 420px, 92vw" style={{ objectPosition: FOTO_VALUTAZIONE.pos }} />
              </Reveal>
            )}
            <Reveal>
              <article className="mx-panel mx-panel--yes mx-cerv-road is-b mx-pvl-visit__panel">
                <div className="mx-panel__head">
                  <span className="mx-panel__badge">
                    <CheckCircle2 size={24} />
                  </span>
                  <div>
                    <p className="mx-cerv-road__tag">Prima visita · 49€</p>
                    <h3 className="mx-h mx-h--md">Passo dopo passo</h3>
                  </div>
                </div>
                <ul className="mx-list">
                  {visit.steps.map((s, i) => (
                    <li key={s.title}>
                      <span className="mx-list__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mx-list__t">
                        {s.title}
                        <span className="mx-list__d">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            </div>
            {ctas}
          </div>
        </section>
      )}

      {/* ——— Chi ti tratta (come "Ogni osteopata con la sua specializzazione" di osteopata Torino) ——— */}
      <section className="mx-section mx-section--glow mx-pvl-team">
        <div className="mx-wrap mx-pvl-team__grid">
          <div className="mx-pvl-team__copy">
            <span className="mx-pvl-team__icon" aria-hidden="true">
              <UserCheck size={26} />
            </span>
            <Kicker>Chi ti tratta</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Un osteopata esperto' }, { text: 'nel tuo problema', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-pvl-intro">
                Quando ti chiamiamo, scegliamo per te l’osteopata con più esperienza{dolore ? ` ${dolore.per}` : ' nel tuo problema'}.
                Tutti i nostri osteopati lavorano con lo <strong>stesso metodo</strong>: ascoltano, ti visitano e trattano con le mani.
              </p>
            </Reveal>
          </div>
          <StudioCollage />
        </div>
      </section>

      {/* ——— Domande frequenti ——— */}
      <section className="mx-section mx-section--glow mx-cerv-faq">
        <div className="mx-wrap mx-cerv-faq__grid">
          <div className="mx-cerv-faq__intro">
            <Kicker>Domande frequenti</Kicker>
            <h2 className="mx-h mx-h--lg">Tutto quello che ti serve sapere, prima di prenotare</h2>
            <p className="mx-lead mx-cerv-faq__lead">Risposte semplici, senza giri di parole.</p>
            <FotoDoppia foto={fotoFaq} className="mx-pvl-faq__photos" />
          </div>
          <div>
            <ul className="mx-cerv-faq__list">
              {domande.map((item, index) => {
                const Icon = item.icon
                const isOpen = openFaq === index
                return (
                  <li key={item.id || (typeof item.question === 'string' ? item.question : index)} className={`mx-cerv-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="mx-cerv-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`mx-pvl-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="mx-cerv-faq__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="mx-cerv-faq__qt">{item.question}</span>
                      <span className="mx-cerv-faq__plus" aria-hidden="true">
                        <Plus size={18} strokeWidth={2.4} />
                      </span>
                    </button>
                    <div className="mx-cerv-faq__a" id={`mx-pvl-faq-${index}`} role="region">
                      <div>
                        <p className="mx-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            {faq.closing && <p className="mx-body mx-pvl-faq__closing">{faq.closing}</p>}
            <p className="mx-cerv-faq__more">
              Altre domande?{' '}
              <button type="button" onClick={openConsulto}>
                Nel consulto telefonico gratuito
              </button>{' '}
              ti rispondiamo su tutto.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Dove siamo ——— */}
      <section className="mx-section mx-section--deep mx-cerv-where">
        <div className="mx-wrap">
          {/* Testo e mappa illustrata della metro (come osteopata Torino), poi la mappa vera dei due studi */}
          <div className="mx-pvl-where__head">
            <div>
              <Kicker>Dove siamo</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
              </h2>
              <p className="mx-lead mx-pvl-intro">
                Abbiamo due studi: uno a San Donato, vicino alle fermate Bernini e Principi d’Acaja, e uno in Crocetta, vicino a
                Re Umberto. Scegli quello più comodo per te e tocca “Indicazioni” per arrivarci.
              </p>
            </div>
            <Reveal delay={0.1}>
              <CityMap />
            </Reveal>
          </div>
          <Reveal className="mx-cerv-where__map" delay={0.1}>
            <StudiMap />
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* Dock mobile: la prenotazione sempre a portata di pollice */}
      <VisitaDock visible={showDock && !showBooking} onVisita={openPrimaVisita} onConsulto={openConsulto} />

      <AnimatePresence>
        <BookingPopup isOpen={showBooking} onClose={() => setShowBooking(false)} pageContext={page.slug} ctaType={bookingCtaType} />
      </AnimatePresence>
      <WhatsAppFab
        message={`Ciao, vorrei avere maggiori informazioni sul trattamento osteopatico${dolore ? ` ${dolore.per}` : ''}`}
        bubbleText="Hai un dubbio prima di venire da noi? Scrivici qui e ti spieghiamo tutto."
        bubbleId={page.slug}
      />
    </PageShell>
  )
}
