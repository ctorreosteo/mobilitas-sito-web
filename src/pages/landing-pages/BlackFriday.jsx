import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlarmClock, ArrowRight, Gift, Infinity as Infinito, Plus, Repeat, UserRoundCheck } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import ClImg from '../../components/condition-landing/ClImg'
import { HeroMedia } from '../../components/condition-landing/Hero'
import { prefetchHeroVideo, useHeroVideo } from '../../components/condition-landing/heroVideo'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import { PREZZO_VISITA, SCADENZA, SCADENZA_TESTO, due, useMancano, useSeoOfferta } from '../../components/black-friday/offerta'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { BannerPrezzo, CaroselloBenefici, Countdown, GraficoRicadute, TempoPerTe, TuttoLAnno } from '../../components/black-friday-2026-sections/BfxKit'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import '../../components/landing/prima-visita-landing.css'
import '../../styles/pages/black-friday-2026.css'

// Landing /black-friday-2026: offerta Black Friday per chi è già paziente. Ci si arriva da quattro ads Meta con
// copioni diversi (il corpo che impara a stare teso; «perché lo facciamo»; «se oggi stai bene» e il tagliando della
// macchina; «rimandi sempre» e la macchia sul vestito): i testi sono generici e riprendono i temi di tutti, senza
// seguirne uno solo. Se cambia o si aggiunge un copione, ricontrollare apertura e «Cosa ottieni».
// Tolti il 19/11/2026: la sezione «Perché lo facciamo» e il disegno 5 + 5 (le carte «li paghi / in omaggio»).
// Struttura dal 19/11/2026 (decisa da Riccardo): apertura · l'offerta (biglietto nero del prezzo, senza la carta che è
// già nell'apertura, poi la spiegazione
// in un pannello chiaro: quattro regole e tre passi) · i benefici (tre schede) · le FAQ. Tolte «Perché dieci» (schede
// «Ti riconosci?»), «Cosa cambia» (confronto), «Come funziona» come sezione a sé (ora è nell'offerta) e «Lo stesso metodo».
// Generica anche nei dolori: tutti, nessuno specifico. Solo l'offerta 10 trattamenti a 450€, da pagare online, con scadenza.
// "Porta un amico" non è più qui (strategia del 16/11/2026): i pazienti ricevono un messaggio con il link personale
// da mandare all'amico, che arriva sull'invito /black-friday-2026-amico.
// Grafica propria (redesign del 16/11/2026, apertura rifatta il 17/11/2026): notte blu; nell'apertura la carta Black
// Friday in 3D (nera, olografica, con il 10 in rilievo) posata sulla foto del trattamento.
// Stile in styles/pages/black-friday-2026.css (prefisso bfx-), pezzi grafici in components/black-friday-2026-sections.
// Dati comuni con /black-friday-2026-amico (scadenza, prezzi, SEO): components/black-friday/offerta.js.
// Revisione del 18/11/2026: niente commerciale, si paga subito online, quindi la pagina deve dire tutto quello che
// serve per decidere (cosa comprende, durata delle sedute, i trattamenti non scadono, sono personali, come si paga, fattura,
// cosa succede dopo): sta nella sezione «Prima di pagare». I numeri dell'offerta si dicono per esteso una volta sola,
// nel banner del prezzo; altrove la pagina parla dei benefici, legati alle leve delle ads (schede «Ti riconosci?»).
// Si paga sul nostro sito, poi si prenota quando si vuole (in autonomia o chiamando la segreteria, che aiuta a trovare giorno e ora): i trattamenti non scadono.
// Niente sezione «Dove siamo» con le mappe: sono già pazienti, sanno dove siamo (tolta il 18/11/2026).
// Dal 19/11/2026 nei testi si parla di «trattamenti», mai di «visite» (anche nelle grafiche); nel codice i nomi
// (VISITE, PREZZO_VISITA…) sono rimasti quelli di prima.

const SLUG = 'black-friday-2026'

// ——— Offerta (se cambia, cambia anche nei testi e nella SEO di questa pagina) ———
const VISITE = 10
const PREZZO_PIENO = 900
const PREZZO_OFFERTA = 450
// Prezzo del singolo trattamento e scadenza: components/black-friday/offerta.js
// Scadenza stampata sulla carta dell'apertura, «29/11»: dalla stessa data di offerta.js
const SCADENZA_BREVE = SCADENZA.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Rome' })

// ——— Pagamento online ———
// Tutti i bottoni della pagina (apertura, sezioni, barra in basso su telefono) portano alla pagina di pagamento
// /black-friday-2026/pagamento (CheckoutBlackFriday.jsx): dati di fatturazione, poi carta, PayPal o PayPal in 3 rate.
// Sulla landing le 3 rate non si nominano (richiesta di Riccardo del 19/11/2026): si dice solo «online, sul nostro sito».
const PAGINA_PAGAMENTO = '/black-friday-2026/pagamento'

// Dopo il pagamento si prenota subito: in autonomia, oppure chiamando la segreteria (numero del sito, come nel menu)
const TELEFONO = { href: 'tel:+393518198457', testo: '351 819 8457' }
const WHATSAPP = { href: 'https://wa.me/393518198457?text=' + encodeURIComponent('Ciao, ho una domanda sui 10 trattamenti del Black Friday.') }
const usePagaOnline = () => {
  const navigate = useNavigate()
  return () => navigate(PAGINA_PAGAMENTO)
}

// Video dell'apertura dal gestionale (codice stabile, non l'UID Cloudflare). Finché non c'è, l'apertura mostra la foto.
// Con audio come l'ad: parte muto e la pillola «Tocca per ascoltare» lo fa ripartire con l'audio.
const heroVideo = prefetchHeroVideo('BLACK_FRIDAY_VSL')

const IMMAGINI = {
  hero: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
}

// La valutazione in piedi, come nelle landing della prima visita
const FOTO_VALUTAZIONE = '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale'

// ——— Contenuti ———

// Cosa ottieni con i 10 trattamenti (non chiamarlo «pacchetto»): i tre benefici scelti da Riccardo il 19/11/2026, in un
// carosello stile «scegli il personaggio» (BfxKit → CaroselloBenefici), dal 19/11/2026 al posto delle tre schede grandi.
// Testi corti. Problema (il dolore che torna) · Prevenzione (tutto l'anno, a un prezzo accessibile; mai «uno al mese»:
// i trattamenti si fanno quando si vuole) · Il tuo tempo (staccare dallo stress; «coccola» è solo il nome interno del
// marketing, sulla pagina non si usa). Solo colori del brand (blu notte, verde, panna), ma ogni carta ha il suo mondo:
// blu con il grafico · verde con le stagioni e il prezzo · notte profonda con luna e le notifiche (lavoro, famiglia,
// email) che si spengono con «Non disturbare».
const BENEFICI = [
  {
    id: 'problema',
    tema: 'is-main',
    tag: 'Il tuo problema',
    titolo: 'Non aspettare che il dolore torni',
    testo: (
      <>
        Continui a lavorare sulla causa: <strong>il problema lo risolvi</strong>, non lo rimandi.
      </>
    ),
    visual: <GraficoRicadute />,
  },
  {
    id: 'prevenzione',
    tema: 'is-green',
    tag: 'La prevenzione',
    titolo: 'Il tagliando del tuo corpo',
    testo: (
      <>
        Non aspetti il guasto: ti prendi cura di te <strong>in ogni stagione</strong>, prima che il dolore arrivi. E a metà
        del prezzo di sempre.
      </>
    ),
    visual: (
      <>
        <TuttoLAnno />
        <p className="bfx-sel__price">
          <b>{PREZZO_OFFERTA / VISITE}€</b>
          <s>{PREZZO_VISITA}€</s>
          <span>a trattamento, tutto l’anno</span>
        </p>
      </>
    ),
  },
  {
    id: 'tempo',
    tema: 'is-ink',
    tag: 'Il tuo tempo',
    titolo: 'Per una volta, la priorità sei tu',
    testo: (
      <>
        Niente lavoro, niente telefono: stacchi dallo stress e <strong>pensi solo a te</strong>.
      </>
    ),
    visual: (attiva) => <TempoPerTe attiva={attiva} />,
    decoro: (
      <span className="bfx-sel__sky" aria-hidden="true">
        <i className="bfx-sel__moon" />
      </span>
    ),
  },
]

// Come funziona: tre passi in fila (nel pannello chiaro della sezione dell'offerta), la prenotazione è nel secondo
const PASSI_OFFERTA = [
  { title: 'Paghi sul nostro sito', body: 'Due minuti, con carta o PayPal. L’email di conferma arriva subito.' },
  {
    title: 'Prenoti quando vuoi',
    body: (
      <>
        Se vuoi, prenoti subito i tuoi trattamenti in autonomia. Altrimenti chiamaci al{' '}
        <a className="bfx-steps__tel" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>
        : la segreteria ti aiuta a trovare giorno e ora.
      </>
    ),
  },
  {
    title: 'Inizi il tuo percorso',
    body: 'Al primo trattamento fai il punto con il tuo osteopata: insieme decidete come usare gli altri nove, al ritmo giusto per te.',
  },
]

// L'offerta spiegata (sotto il biglietto): le quattro cose da sapere prima di pagare, confermate da Riccardo il
// 19/11/2026. Il tuo osteopata se vuoi, oppure uno nuovo (anche nelle FAQ) · frequenza libera · nessuna scadenza ·
// l'unica data è quella del pagamento.
const REGOLE = [
  {
    Icona: UserRoundCheck,
    t: 'Con il tuo osteopata, se vuoi',
    b: 'Quello che ti ha sempre seguito e conosce già la tua storia. Se preferisci, puoi sceglierne uno nuovo.',
  },
  { Icona: Repeat, t: 'Con la frequenza che vuoi', b: 'Più vicini se hai male, più distanziati per prevenire: decidi tu.' },
  { Icona: Infinito, t: 'Nessuna scadenza', b: 'I trattamenti restano tuoi finché non li hai usati tutti.' },
  { Icona: AlarmClock, t: `Paghi entro ${SCADENZA_TESTO}`, b: 'È l’unica data da ricordare: dopo, l’offerta finisce.' },
]

// Prima di pagare: le domande scelte da Riccardo il 19/11/2026 (le altre sono state tolte). Fatti confermati: il tuo
// osteopata o un altro se preferisci, si paga entro il 29 novembre, i trattamenti non scadono, frequenza libera.
const FAQ = [
  {
    question: <>Qual è il <strong>mio osteopata</strong>?</>,
    answer: (
      <>
        Quello che ti ha <strong>sempre seguito</strong>: conosce già la tua storia, quindi non riparti da zero. Se
        preferisci, puoi scegliere anche <strong>un altro</strong> dei nostri osteopati.
      </>
    ),
  },
  {
    question: <>Entro quando devo <strong>pagare</strong>?</>,
    answer: (
      <>
        Entro <strong>{SCADENZA_TESTO}</strong>: è l’unica scadenza dell’offerta. Dopo, i dieci trattamenti non sono più a
        metà prezzo. I trattamenti, invece, puoi farli anche molto dopo.
      </>
    ),
  },
  {
    question: <>I trattamenti hanno una <strong>scadenza</strong>?</>,
    answer: (
      <>
        <strong>No, non scadono.</strong> Restano tuoi finché non li hai usati tutti.
      </>
    ),
  },
  {
    question: <>Ogni quanto posso fare i <strong>trattamenti</strong>?</>,
    answer: (
      <>
        <strong>Quando vuoi tu</strong>, con la frequenza che preferisci: più vicini se hai male, più distanziati per
        prevenire. Il tuo osteopata ti consiglia il ritmo giusto per come stai, ma decidi tu.
      </>
    ),
  },
  {
    question: <>Come si <strong>paga</strong>?</>,
    answer: (
      <>
        <strong>Solo online, sul nostro sito</strong>, con carta o PayPal. Paghi una volta sola, niente abbonamenti. In
        studio l’offerta non si può pagare.
      </>
    ),
  },
  {
    question: <>Cosa succede <strong>dopo</strong> il pagamento?</>,
    answer: (
      <>
        Ti arriva subito l’<strong>email di conferma</strong> con il numero dell’ordine (se non la trovi, guarda nello spam).
        Poi <strong>prenoti il primo trattamento quando vuoi</strong>: in autonomia, oppure chiamando la segreteria al{' '}
        <a className="bfx-link" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>
        .
      </>
    ),
  },
  {
    question: <>E se per un po’ <strong>non posso venire</strong>?</>,
    answer: (
      <>
        Nessun problema: i trattamenti <strong>non scadono</strong>, restano lì ad aspettarti. Se avevi già un appuntamento,
        avvisa la segreteria al{' '}
        <a className="bfx-link" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>{' '}
        per spostarlo, e riprendi quando torni.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday-2026',
  title: 'Black Friday Mobilitas | 10 trattamenti osteopatici a metà prezzo | Torino',
  description:
    'Black Friday per i pazienti Mobilitas: 10 trattamenti osteopatici a 450€ invece di 900€, da pagare sul sito. Fino a domenica 29 novembre.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

// ——— Pezzi della pagina ———

// Bottone dell'offerta: porta al pagamento online. Testo in prima persona, polarizzante («Sì, voglio…»): chi lo tocca
// sceglie i trattamenti in omaggio. tone="light" sulla sezione panna: lì il verde non si usa, il bottone diventa blu.
// «nota» è la riga piccola sotto: di base il prezzo (apertura e offerta); più giù un beneficio, così il prezzo non si
// ripete a ogni sezione.
const TESTO_BOTTONE = 'Sì, voglio 5 trattamenti in omaggio'

function OffertaCtas({ tone = 'dark', className = '', nota }) {
  const pagaOnline = usePagaOnline()
  return (
    <div className={`bfx-ctas ${tone === 'light' ? 'is-light' : ''} ${className}`}>
      <button type="button" className="bfx-btn" onClick={pagaOnline}>
        <span className="bfx-btn__shine" aria-hidden="true" />
        <span className="bfx-btn__gift" aria-hidden="true">
          <Gift size={20} strokeWidth={2.3} />
        </span>
        <span className="bfx-btn__txt">
          <b>{TESTO_BOTTONE}</b>
          <small>
            {nota ?? (
              <>
                <b>{PREZZO_OFFERTA}€</b> <s>{PREZZO_PIENO}€</s> · paghi sul sito
              </>
            )}
          </small>
        </span>
        <span className="bfx-btn__arrow" aria-hidden="true">
          <ArrowRight size={20} strokeWidth={2.6} />
        </span>
      </button>
    </div>
  )
}

// Barra fissa in basso su telefono (nascosta da 1024px): a sinistra il prezzo e il tempo che resta, a destra il bottone.
// Tutta la barra è un unico bottone, così si tocca facilmente.
function OffertaDock({ visible }) {
  const mancano = useMancano()
  const pagaOnline = usePagaOnline()
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="bfx-dock"
          initial={{ transform: 'translateY(110%)', opacity: 0 }}
          animate={{ transform: 'translateY(0%)', opacity: 1 }}
          exit={{ transform: 'translateY(110%)', opacity: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
        >
          <button
            type="button"
            className="bfx-dock__main"
            onClick={pagaOnline}
            aria-label={`Sì, voglio i ${VISITE} trattamenti del Black Friday, 5 in omaggio: paghi sul sito ${PREZZO_OFFERTA}€ invece di ${PREZZO_PIENO}€, fino a ${SCADENZA_TESTO}`}
          >
            <span className="bfx-dock__info" aria-hidden="true">
              <span className="bfx-dock__price">
                <b>{PREZZO_OFFERTA}€</b>
                <s>{PREZZO_PIENO}€</s>
              </span>
              {mancano ? (
                <span className="bfx-dock__timer">
                  <i className="bfx-dock__dot" />
                  <span className="bfx-dock__lbl">Scade tra</span> {mancano.giorni}g {due(mancano.ore)}:{due(mancano.min)}:{due(mancano.sec)}
                </span>
              ) : (
                <span className="bfx-dock__sub">{VISITE} trattamenti, metà prezzo</span>
              )}
            </span>
            <span className="bfx-dock__cta" aria-hidden="true">
              Sì, li voglio
              <span className="bfx-dock__arrow">
                <ArrowRight size={18} strokeWidth={2.6} />
              </span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Ingresso dell'apertura: una sola sequenza all'arrivo, breve, dal basso
const entra = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(16px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
})

// ——— Pagina ———

export default function BlackFriday() {
  useSeoOfferta(SEO)
  const { video, loading } = useHeroVideo(heroVideo)
  const [openFaq, setOpenFaq] = useState(null)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)

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

  // Foto senza ripetizioni (come nelle landing della prima visita): zone di tutto il corpo, perché l'offerta vale per
  // tutti i dolori
  const prendi = creaSceltaFoto(SLUG, [FOTO_VALUTAZIONE, ...FOTO_STUDIO.map((f) => `/trattamenti/${f.nome}`)])
  const fotoHero = !loading && !video ? prendi(IMMAGINI.hero) : null
  const fotoFaq = prendi(undefined, true)

  const risparmio = PREZZO_PIENO - PREZZO_OFFERTA

  // I tre conti del banner del prezzo
  const fatti = [
    { k: 'A trattamento', v: `${PREZZO_OFFERTA / VISITE}€`, prima: `${PREZZO_VISITA}€` },
    { k: 'Risparmi', v: `${risparmio}€`, t: 'restano a te' },
    { k: 'Pagamento', v: 'Online', t: 'sul nostro sito' },
  ]

  return (
    <PageShell className={`bfx mx-pvl--${SLUG}`}>
      {/* ——— Apertura: titolo enorme, la foto del trattamento e la carta Black Friday che ci si posa sopra ——— */}
      <header className="bfx-hero">
        <div className="bfx-hero__bg" aria-hidden="true" />
        <div className="bfx-wrap bfx-hero__grid">
          <motion.p className="bfx-tag" {...entra(0)}>
            <span className="bfx-tag__dot" aria-hidden="true" />
            Black Friday · Per i nostri pazienti
          </motion.p>

          <h1 className="bfx-hero__title">
            <motion.span className="bfx-hero__l1" {...entra(0.05)}>
              Dieci trattamenti.
            </motion.span>
            <motion.span className="bfx-hero__l2" {...entra(0.12)}>
              Ne paghi solo cinque.
            </motion.span>
          </h1>

          <div className="bfx-hero__stage">
            <motion.div
              className="bfx-hero__media"
              initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            >
              <HeroMedia
                video={video}
                loading={loading}
                videoTitle="Black Friday Mobilitas: 10 trattamenti a metà prezzo"
                audio
                fallback={{ src: fotoHero, alt: 'Trattamento osteopatico nello studio Mobilitas' }}
              />
            </motion.div>
            <CartaBlack
              className="bfx-hero__card"
              visite={VISITE}
              prezzo={PREZZO_OFFERTA}
              prezzoPieno={PREZZO_PIENO}
              scadenzaBreve={SCADENZA_BREVE}
            />
          </div>

          <motion.div className="bfx-hero__offer" ref={heroCtaRef} {...entra(0.22)}>
            <OffertaCtas />
            <Countdown className="bfx-hero__count" />
          </motion.div>

          <motion.p className="bfx-lead bfx-hero__sub" {...entra(0.28)}>
            <strong>Solo per chi è già nostro paziente.</strong> Paghi qui sul sito, poi prenoti quando vuoi: i trattamenti
            non scadono mai. <strong>Oggi blocchi il prezzo, il quando lo decidi tu.</strong>
          </motion.p>
        </div>
      </header>

      {/* ——— L'offerta: il biglietto nero del prezzo, sotto la spiegazione (le quattro regole e i tre passi) ——— */}
      <section className="bfx-section bfx-deal" aria-labelledby="bfx-deal-t">
        <div className="bfx-wrap">
          <div className="bfx-deal__head">
            <h2 id="bfx-deal-t" className="bfx-h bfx-h2">
              L’offerta, <span className="is-green">spiegata semplice</span>
            </h2>
            <p className="bfx-lead">
              Un prezzo che blocchi oggi, <strong>dieci trattamenti da usare quando vuoi</strong>. Ecco tutto quello che c’è
              da sapere.
            </p>
          </div>

          <BannerPrezzo
            da={PREZZO_PIENO}
            a={PREZZO_OFFERTA}
            visite={VISITE}
            fatti={fatti}
            nota="Paghi sul nostro sito una volta sola, niente abbonamenti."
          />

          <div className="bfx-friend bfx-explain">
            <h3 className="bfx-h bfx-h4 bfx-explain__t">Come funziona l’offerta</h3>
            <ul className="bfx-rules">
              {REGOLE.map((x) => (
                <li key={x.t}>
                  <span className="bfx-rules__ico" aria-hidden="true">
                    <x.Icona size={20} strokeWidth={2.2} />
                  </span>
                  <b>{x.t}</b>
                  <span>{x.b}</span>
                </li>
              ))}
            </ul>

            <div className="bfx-explain__steps">
              <h3 className="bfx-h bfx-h4 bfx-explain__t">Tre passi, e inizi</h3>
              <ol className="bfx-steps">
                {PASSI_OFFERTA.map((p, i) => (
                  <li key={p.title}>
                    <span className="bfx-steps__n" aria-hidden="true">
                      {due(i + 1)}
                    </span>
                    <h4 className="bfx-h bfx-h4">{p.title}</h4>
                    <p className="bfx-body">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bfx-deal__close">
            <OffertaCtas />
            <Countdown />
          </div>
        </div>
      </section>

      {/* ——— I benefici: tre schede, ognuna con il suo mondo ——— */}
      <section className="bfx-section bfx-benefits" aria-labelledby="bfx-benefits-t">
        <div className="bfx-wrap">
          <div className="bfx-deal__head">
            <h2 id="bfx-benefits-t" className="bfx-h bfx-h2">
              Cosa ottieni <span className="is-green">con i tuoi {VISITE} trattamenti</span>
            </h2>
            <p className="bfx-lead">
              Tre motivi per <strong>non rimandare più</strong>. Scorri le carte e scegli il tuo.
            </p>
          </div>

          <CaroselloBenefici voci={BENEFICI} />
        </div>
      </section>

      {/* ——— Prima di pagare: tutto quello che serve sapere (niente commerciale, quindi tutto scritto qui) ——— */}
      <section className="bfx-section bfx-faq" aria-labelledby="bfx-faq-t">
        <div className="bfx-wrap bfx-faq__grid">
          <div className="bfx-faq__intro">
            <h2 id="bfx-faq-t" className="bfx-h bfx-h2">
              Prima di pagare: <span className="is-green">tutto quello che devi sapere</span>
            </h2>
            <p className="bfx-lead">
              Hai ancora un dubbio? Scrivici su WhatsApp al{' '}
              <a className="bfx-link" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
                {TELEFONO.testo}
              </a>
              : ti rispondiamo noi.
            </p>
            {fotoFaq && (
              <figure className="bfx-faq__photo">
                <ClImg src={fotoFaq} alt="" sizes="(min-width: 1000px) 420px, 100vw" />
              </figure>
            )}
          </div>
          <div>
            <ul className="bfx-faq__list">
              {FAQ.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <li key={index} className={`bfx-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="bfx-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`bfx-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span className="bfx-faq__plus" aria-hidden="true">
                        <Plus size={20} strokeWidth={1.8} />
                      </span>
                    </button>
                    <div className="bfx-faq__a" id={`bfx-faq-${index}`} role="region">
                      <div>
                        <p className="bfx-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <OffertaCtas className="bfx-faq__cta" nota="Paghi una volta sola, sul nostro sito" />
          </div>
        </div>
      </section>

      {/* Dock mobile: l'offerta sempre a portata di pollice */}
      <OffertaDock visible={showDock} />
    </PageShell>
  )
}
