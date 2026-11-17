import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Plus } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import StudiMap from '../../components/studi-map/StudiMap'
import { EASE } from '../../components/home-sections/homeMotion'
import {
  Contatore,
  Giostra,
  IllustraChiamata,
  IllustraForm,
  Invito,
  Legame,
  Nastro,
} from '../../components/porta-un-amico/AmicoKit'
import RichiestaInvito from '../../components/porta-un-amico/RichiestaInvito'
import { chiediInvito, leggiCodice } from '../../components/porta-un-amico/invito'
import {
  MAX_AMICI,
  PREZZO_VISITA,
  PRIMA_VISITA_AMICO,
  PROBLEMI,
  SCADENZA_TESTO,
  useSeoOfferta,
} from '../../components/black-friday/offerta'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'

// Invito "porta un amico" del Black Friday 2026 (strategia del 16/11/2026). Ci arriva l'AMICO del paziente.
// Lettura del codice, nome di chi invita e nota della richiesta seguono la guida interna «Richieste API · Porta un amico»
// (dettagli in components/porta-un-amico/invito.js). Tre casi: invito valido con nome («Mario ti ha invitato»), valido
// senza nome («Un nostro paziente ti ha invitato»), nessun invito valido (pagina dell'offerta normale, senza nome).
// il paziente riceve per messaggio il suo link personale e lo inoltra (formato del link in
// components/porta-un-amico/invito.js). L'amico paga la prima visita 49€ invece di 90€ e la richiede con il form
// normale (COUPON49, tag blackfriday); chi lo ha invitato riceve una visita gratis, fino a 3 amici.
// /amico (indirizzo stampato sotto il QR del biglietto sulle scrivanie) rimanda qui: vedi App.jsx.
// Dati dell'offerta in components/black-friday/offerta.js (comuni con /black-friday-2026).
// Grafica "il legame": due anelli 3D intrecciati (tu e chi ti ha invitato). Pezzi in components/porta-un-amico,
// stile in styles/pages/porta-un-amico.css (prefisso pa-).

const SLUG = 'black-friday-2026-amico'

// ——— Contenuti ———

// La scadenza vale per la RICHIESTA: entro il 29 novembre si compila il form, la visita si può fare anche dopo
const ENTRO = `Richiedila entro ${SCADENZA_TESTO}`

const PASSI = [
  {
    n: '01',
    title: 'Premi il bottone e lascia i tuoi dati',
    body: 'Tocca «Richiedi la prima visita» e compila il form: nome, cognome e cellulare. Ci vuole un minuto: se sei arrivato da un link personale, l’invito è già collegato.',
    big: <IllustraForm />,
  },
  {
    n: '02',
    title: 'La segreteria ti chiama',
    body: 'Ti chiamiamo noi per fissare l’appuntamento quando ti è più comodo, nello studio che preferisci.',
    big: <IllustraChiamata />,
  },
  {
    n: '03',
    title: (
      <>
        Paghi solo <span className="pa-green">{PRIMA_VISITA_AMICO}€</span>
      </>
    ),
    body: `invece di ${PREZZO_VISITA}€ per la tua prima visita, anche se la fai dopo il 29 novembre: basta richiederla entro quella data.`,
    big: `${PRIMA_VISITA_AMICO}€`,
    gift: true,
  },
]

// Titolo dell'apertura e della chiusura nei tre casi della guida (passo 3)
const titoloDi = (invito) => {
  if (!invito) return ['La tua prima visita', `costa solo ${PRIMA_VISITA_AMICO}€.`]
  const chi = invito.nomeInvitante ? `${invito.nomeInvitante} ti ha invitato:` : 'Un nostro paziente ti ha invitato:'
  return [chi, `la tua prima visita costa ${PRIMA_VISITA_AMICO}€.`]
}

const faqDi = (daChi) => [
  {
    question: 'Chi può usare l’invito?',
    answer: (
      <>
        Chi <strong>non è ancora nostro paziente</strong>: un amico, un familiare, un collega di chi ti ha mandato il link. La
        prima visita a {PRIMA_VISITA_AMICO}€ è per chi viene da noi per la prima volta.
      </>
    ),
  },
  {
    question: 'Cosa comprende la prima visita?',
    answer: (
      <>
        Dura circa <strong>un’ora</strong>: parliamo del tuo problema, ti visitiamo e facciamo il{' '}
        <strong>primo trattamento</strong>. Costa {PRIMA_VISITA_AMICO}€ invece di {PREZZO_VISITA}€.
      </>
    ),
  },
  {
    question: 'Il mio problema è diverso da quello di chi mi ha invitato: va bene?',
    answer: (
      <>
        Sì. Qualunque sia il tuo problema, da noi c’è l’<strong>osteopata specializzato</strong> anche per te: scegliamo il
        professionista con più esperienza nel tuo caso.
      </>
    ),
  },
  {
    question: `Cosa riceve ${daChi || 'chi mi ha invitato'}?`,
    answer: (
      <>
        <strong>Una visita gratis</strong>, quando hai fatto la tua prima visita. Ogni paziente può invitare fino a{' '}
        {MAX_AMICI} amici: al massimo {MAX_AMICI} visite gratis.
      </>
    ),
  },
  {
    question: 'Fino a quando vale l’invito?',
    answer: (
      <>
        Devi <strong>richiedere la visita entro {SCADENZA_TESTO}</strong>: basta compilare il form. La visita puoi farla{' '}
        <strong>anche dopo</strong>, nel giorno che fissiamo insieme quando ti chiamiamo.
      </>
    ),
  },
  {
    question: 'Dove si fa la visita?',
    answer: (
      <>
        In uno dei nostri <strong>due studi a Torino</strong>: in <strong>Via Peyron 54</strong> (San Donato) o in{' '}
        <strong>Via Lamarmora 35</strong> (Crocetta), quello più comodo per te.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday-2026-amico',
  title: 'Un invito per te | Prima visita a 49€ | Mobilitas Torino',
  description:
    'Un amico ti ha invitato da Mobilitas: la tua prima visita osteopatica costa 49€ invece di 90€. Richiedila entro domenica 29 novembre, puoi farla anche dopo.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

// ——— Pezzi della pagina ———

const vaiAComeFunziona = () => document.getElementById('come-funziona')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

// Bottone "Richiedi la prima visita". conAiuto: aggiunge il secondario "Come funziona" (solo nell'apertura)
function InvitoCta({ onApri, conAiuto = false, className = '' }) {
  return (
    <div className={`pa-ctas ${className}`}>
      <motion.button
        type="button"
        className="pa-btn"
        onClick={onApri}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <span className="pa-btn__txt">
          <small>
            {PRIMA_VISITA_AMICO}€ invece di {PREZZO_VISITA}€
          </small>
          Richiedi la prima visita
        </span>
        <span className="pa-btn__icon" aria-hidden="true">
          <ArrowRight size={20} strokeWidth={2.4} />
        </span>
      </motion.button>
      {conAiuto && (
        <button type="button" className="pa-btn-ghost" onClick={vaiAComeFunziona}>
          Come funziona
          <ArrowDown size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

// Barra fissa in basso su telefono (nascosta da 1024px)
function InvitoDock({ visible, onApri }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pa-dock"
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <button
            type="button"
            className="pa-dock__btn"
            onClick={onApri}
            aria-label={`Richiedi la prima visita a ${PRIMA_VISITA_AMICO}€ invece di ${PREZZO_VISITA}€`}
          >
            <span className="pa-dock__plus" aria-hidden="true">
              {PRIMA_VISITA_AMICO}€
            </span>
            <span className="pa-dock__txt">
              <small>Invito Black Friday</small>
              Richiedi la prima visita
            </span>
            <ArrowRight size={20} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Le condizioni dell'invito, in piccolo
const Condizioni = ({ className = '' }) => (
  <p className={`pa-note ${className}`}>
    <strong>
      La prima visita a {PRIMA_VISITA_AMICO}€ è per chi non è ancora nostro paziente. Va richiesta entro {SCADENZA_TESTO},
      ma puoi farla anche dopo.
    </strong>{' '}
    Ogni paziente può invitare fino a {MAX_AMICI} amici.
  </p>
)

// Entrata dell'apertura: solo spostamento (il testo è leggibile da subito)
const entra = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

// Come funziona: la linea che unisce i tre passi si disegna scorrendo (decorazione, i testi sono già visibili)
function Passi() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <ol className="pa-steps" ref={ref}>
      <span className="pa-steps__rail" aria-hidden="true">
        <motion.span className="pa-steps__fill is-v" style={{ scaleY }} />
        <motion.span className="pa-steps__fill is-h" style={{ scaleX: scaleY }} />
      </span>
      {PASSI.map((p) => (
        <li key={p.n} className={`pa-step ${p.gift ? 'is-gift' : ''}`}>
          <span className="pa-step__node" aria-hidden="true">
            {p.n}
          </span>
          <div className="pa-step__big" aria-hidden="true">
            {p.big}
            {p.bigLabel && <small>{p.bigLabel}</small>}
          </div>
          <div className="pa-step__txt">
            <h3 className="pa-step__t">{p.title}</h3>
            <p className="pa-body">{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

// ——— Pagina ———

export default function PortaUnAmico() {
  useSeoOfferta(SEO)
  // Guida, passi 1-3: il codice dall'indirizzo (o dalla sessione), una sola richiesta al gestionale all'apertura.
  // Finché non risponde (o se il codice non c'è o non è valido) la pagina mostra il testo generico, senza nome.
  const [codice] = useState(leggiCodice)
  const [invito, setInvito] = useState(null)
  useEffect(() => {
    let attivo = true
    chiediInvito(codice).then((risposta) => {
      if (attivo) setInvito(risposta)
    })
    return () => {
      attivo = false
    }
  }, [codice])
  const [formAperto, setFormAperto] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const apri = () => setFormAperto(true)
  // Chi ha invitato: il nome dal link personale, se c'è
  // Nome di battesimo di chi invita, così come arriva dal gestionale (può mancare anche con un invito valido)
  const daChi = invito?.nomeInvitante || ''
  const [titolo1, titolo2] = titoloDi(invito)
  const faq = faqDi(daChi)

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

  // Foto senza ripetizioni, da tutto il corpo: l'amico può avere qualunque problema
  const prendi = creaSceltaFoto(SLUG, FOTO_STUDIO.map((f) => `/trattamenti/${f.nome}`))
  const fotoGiostra = Array.from({ length: 8 }, () => prendi()).filter(Boolean)

  return (
    <PageShell className={`mx-pa mx-pvl--${SLUG}`}>
      {/* ——— Apertura: l'invito ——— */}
      <header className="pa-hero">
        <div className="pa-hero__orbit" aria-hidden="true" />
        <div className="pa-wrap pa-hero__grid">
          <motion.p className="pa-chip" {...entra(0)}>
            <span className="pa-chip__dot" aria-hidden="true" />
            {invito ? 'Black Friday · Un invito per te' : 'Black Friday · Porta un amico'}
          </motion.p>

          <h1 className="pa-hero__title">
            <motion.span className="pa-hero__l1" {...entra(0.05)}>
              {titolo1}
            </motion.span>
            <motion.span className="pa-hero__l2" {...entra(0.12)}>
              {titolo2}
            </motion.span>
          </h1>

          <motion.div className="pa-hero__scene" {...entra(0.1)}>
            <Legame />
          </motion.div>

          <motion.div className="pa-duo" {...entra(0.2)}>
            <p className="pa-duo__half is-you">
              <span className="pa-duo__l">
                <i aria-hidden="true" />
                Per te
              </span>
              <span className="pa-duo__price">
                <b>{PRIMA_VISITA_AMICO}€</b> <s>{PREZZO_VISITA}€</s>
              </span>
            </p>
            <p className="pa-duo__half is-friend">
              <span className="pa-duo__l">
                <i aria-hidden="true" />
                {daChi ? `Per ${daChi}` : 'Per chi ti invita'}
              </span>
              <b>1 visita gratis</b>
            </p>
          </motion.div>

          <motion.div className="pa-hero__ctas" ref={heroCtaRef} {...entra(0.26)}>
            <InvitoCta onApri={apri} conAiuto />
          </motion.div>

          <motion.div className="pa-hero__count" {...entra(0.32)}>
            <Contatore etichetta={ENTRO} />
          </motion.div>

          <motion.p className="pa-lead pa-hero__sub" {...entra(0.36)}>
            {invito && (
              <>
                {daChi ? <strong>{daChi}</strong> : 'Chi ti ha mandato questo link'} è già nostro paziente e ha pensato a te.{' '}
              </>
            )}
            Per il Black Friday la tua prima visita costa <strong>{PRIMA_VISITA_AMICO}€ invece di {PREZZO_VISITA}€</strong>,
            qualunque sia il tuo problema. <strong>Richiedila entro {SCADENZA_TESTO}</strong>: la visita puoi farla anche dopo.
          </motion.p>
        </div>
      </header>

      {/* ——— Come funziona: tre passi ——— */}
      <section className="pa-section pa-how" id="come-funziona">
        <div className="pa-wrap">
          <div className="pa-head">
            <p className="pa-kicker">Come funziona</p>
            <h2 className="pa-h2">
              <span>Tre passi.</span>
              <span className="pa-green">E la tua prima visita è a {PRIMA_VISITA_AMICO}€.</span>
            </h2>
          </div>
          <Passi />

          {/* Quando: la scadenza è per la richiesta, non per la visita */}
          <div className="pa-when">
            <p className="pa-when__item is-now">
              <span className="pa-when__k">Entro {SCADENZA_TESTO}</span>
              <b>Richiedi la visita</b>
              <span>Compili il form e il prezzo di {PRIMA_VISITA_AMICO}€ è tuo.</span>
            </p>
            <span className="pa-when__date" aria-hidden="true">
              <b>29.11</b>
            </span>
            <p className="pa-when__item">
              <span className="pa-when__k">Anche dopo</span>
              <b>Fai la visita</b>
              <span>Quando ti è più comodo: fissiamo il giorno insieme al telefono.</span>
            </p>
          </div>
          <InvitoCta onApri={apri} className="pa-how__cta" />
        </div>
      </section>

      {/* ——— Il tuo invito: il biglietto in 3D ——— */}
      <section className="pa-section pa-section--ink pa-link">
        <div className="pa-wrap pa-link__grid">
          <div className="pa-link__copy">
            <p className="pa-kicker">Il tuo invito</p>
            <h2 className="pa-h2">
              <span>Un invito personale,</span>
              <span className="pa-green">solo per te.</span>
            </h2>
            <p className="pa-lead">
              {daChi
                ? `${daChi} ti ha mandato il suo link personale`
                : 'L’invito arriva con il link personale di un nostro paziente'}
              : così sappiamo chi ti ha invitato.{' '}
              <strong>
                Tu paghi la prima visita {PRIMA_VISITA_AMICO}€, e {daChi ? `${daChi} riceve` : 'chi ti ha invitato riceve'} una
                visita gratis.
              </strong>
            </p>
            <InvitoCta onApri={apri} />
            <Condizioni />
          </div>
          <div className="pa-link__card">
            <Invito prezzo={PREZZO_VISITA} prezzoAmico={PRIMA_VISITA_AMICO} scadenza={SCADENZA_TESTO} daChi={daChi || (invito ? 'Un nostro paziente' : '')} />
          </div>
        </div>
      </section>

      {/* ——— Per te: qualunque sia il problema ——— */}
      <section className="pa-section pa-friend">
        <div className="pa-wrap">
          <div className="pa-head pa-head--split">
            <div>
              <p className="pa-kicker">Per te</p>
              <h2 className="pa-h2">
                <span>Qualunque sia il tuo problema,</span>
                <span className="pa-green">c’è l’osteopata giusto per te.</span>
              </h2>
            </div>
            <p className="pa-lead">
              Quando ti chiamiamo, scegliamo per te l’osteopata con <strong>più esperienza</strong> nel tuo problema. Tutti i
              nostri osteopati lavorano con lo stesso metodo: ascoltano, visitano e trattano con le mani. La tua prima visita
              costa <strong>{PRIMA_VISITA_AMICO}€ invece di {PREZZO_VISITA}€</strong>.
            </p>
          </div>
        </div>
        {fotoGiostra.length >= 6 && <Giostra foto={fotoGiostra} />}
        <div className="pa-wrap">
          <p className="pa-nastro__t">Qualunque sia il tuo problema, per esempio:</p>
        </div>
        <Nastro problemi={PROBLEMI} />
        <div className="pa-wrap pa-friend__cta">
          <InvitoCta onApri={apri} />
        </div>
      </section>

      {/* ——— Domande frequenti ——— */}
      <section className="pa-section pa-section--ink pa-faq">
        <div className="pa-wrap pa-faq__grid">
          <div className="pa-faq__intro">
            <p className="pa-kicker">Domande frequenti</p>
            <h2 className="pa-h2 pa-h2--md">
              <span>Tutto quello che ti serve sapere sul tuo invito</span>
            </h2>
            <p className="pa-lead">Risposte semplici, senza giri di parole.</p>
          </div>
          <div>
            <ul className="pa-faq__list">
              {faq.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <li key={index} className={`pa-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="pa-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`pa-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="pa-faq__n" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="pa-faq__qt">{item.question}</span>
                      <span className="pa-faq__plus" aria-hidden="true">
                        <Plus size={20} strokeWidth={2} />
                      </span>
                    </button>
                    <div className="pa-faq__a" id={`pa-faq-${index}`} role="region">
                      <div>
                        <p className="pa-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="pa-body pa-faq__closing">
              Altre domande? <strong>Richiedi la prima visita</strong>: quando ti chiamiamo ti rispondiamo su tutto.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Dove si fa la visita ——— */}
      <section className="pa-section pa-where">
        <div className="pa-wrap">
          <div className="pa-head pa-head--split">
            <div>
              <p className="pa-kicker">Dove siamo</p>
              <h2 className="pa-h2">
                <span>Due studi</span>
                <span className="pa-green">nel cuore di Torino.</span>
              </h2>
            </div>
            <p className="pa-lead">
              Scegli lo studio più comodo per te: San Donato, vicino alle fermate Bernini e Principi d’Acaja, o Crocetta, vicino
              a Re Umberto.
            </p>
          </div>
          <div className="pa-where__map">
            <StudiMap tema="notte" />
          </div>
        </div>
      </section>

      {/* ——— Chiusura ——— */}
      <section className="pa-section pa-section--ink pa-close">
        <div className="pa-close__legame" aria-hidden="true">
          <Legame />
        </div>
        <div className="pa-wrap pa-close__inner">
          <p className="pa-close__plus" aria-hidden="true">
            {PRIMA_VISITA_AMICO}€
          </p>
          <h2 className="pa-h2 pa-close__t">
            <span>{titolo1}</span>
            <span className="pa-green">{titolo2}</span>
          </h2>
          <InvitoCta onApri={apri} className="pa-ctas--center" />
          <Contatore className="pa-cnt--center" etichetta={ENTRO} />
          <Condizioni className="pa-note--center" />
        </div>
      </section>

      {/* Dock mobile: la richiesta sempre a portata di pollice */}
      <InvitoDock visible={showDock && !formAperto} onApri={apri} />

      <RichiestaInvito isOpen={formAperto} onClose={() => setFormAperto(false)} invito={invito} />
    </PageShell>
  )
}
