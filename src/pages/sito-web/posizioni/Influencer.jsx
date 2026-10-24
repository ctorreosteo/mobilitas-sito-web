import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  Coins,
  Flame,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  Play,
  Rocket,
  Sparkles,
  Target,
  Ticket,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
} from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Counter, Kicker, MaskLines, Reveal, Snap } from '../../../components/home-sections/HomeKit'
import { EASE, trackSpotlight, useParallax } from '../../../components/home-sections/homeMotion'
import '../../../styles/pages/influencer.css'

const WA_MESSAGE = 'Ciao, ho visto la collaborazione per influencer e volevo candidarmi. Quali sono i prossimi step? Grazie'

const candidati = () => {
  const message = encodeURIComponent(WA_MESSAGE)
  window.open(`https://wa.me/393518198457?text=${message}`, '_blank')
}

const img = (name) => ({
  src: `/influencer/web/${name}-1600.jpg`,
  srcSet: `/influencer/web/${name}-900.jpg 900w, /influencer/web/${name}-1600.jpg 1600w`,
})

const stories = [
  { name: 'inf5', alt: 'Trattamento osteopatico in studio durante una collaborazione' },
  { name: 'inf1', alt: 'Influencer collaboration with OsteoTouch', pos: '24% center' },
  { name: 'inf3', alt: 'Trattamento cervicale nello Studio Mobilitas' },
]

const heroPerks = ['Trattamenti Gratuiti (invece che 90€)', 'Sconti Esclusivi per amici e parenti', 'Possibilità di monetizzazione']

const problems = [
  {
    icon: Package,
    title: 'Prodotti di dubbio valore',
    description: 'Shein, Temu, prodottini cinesi, robe vendute su Amazon con recensioni fasulle che poi giustamente chiudi in un cassetto',
  },
  {
    icon: TrendingUp,
    title: 'Sovraffollamento del mercato',
    description: 'Sempre più persone che cercano di diventare influencer con collaborazioni tutte uguali che sporcano il mercato',
  },
  {
    icon: TrendingDown,
    title: 'Engagement ridotto',
    description: 'Gli algoritmi affossano la crescita perché tutti pubblicano cose simili e gli algoritmi sono meno propensi a farti crescere',
  },
  {
    icon: Wallet,
    title: 'Monetizzazione difficile',
    description: 'Le aziende fanno di tutto per non pagarti e sfruttare al massimo il tuo tempo e le tue risorse',
  },
  {
    icon: Palette,
    title: 'Creatività in calo',
    description: 'Riuscire a trovare idee nuove per pubblicare cose diverse è sempre più difficile, perché ormai si copiano tutti',
  },
  {
    icon: Clock,
    title: 'Sfruttamento del tempo',
    description: 'Collaborazioni che richiedono ore di lavoro per compensi irrisori o addirittura gratuiti',
  },
]

const benefits = [
  {
    number: '01',
    title: 'Trattamenti Gratuiti',
    description: 'I nostri trattamenti hanno un costo di 90€ ciascuno, per te saranno completamente gratuiti durante tutta la collaborazione.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Sconti Esclusivi',
    description: 'Avrai accesso a codici Coupon che potrai dare illimitatamente ai tuoi parenti e amici più stretti per i nostri servizi.',
    icon: Ticket,
  },
  {
    number: '03',
    title: 'Piano di Monetizzazione',
    description: 'Possiamo creare e strutturare insieme un piano di monetizzazione per rendere la collaborazione molto profittevole per entrambi.',
    icon: Coins,
  },
]

const together = [
  {
    title: 'Registrazione professionale dei trattamenti',
    description: 'Registrazione, video editing e montaggio post-produzione potranno essere completamente a carico nostro se tu non hai la possibilità di farlo.',
    icon: Play,
    step: '1',
    image: 'inf2',
  },
  {
    title: 'Creazione contenuti e piano editoriale su misura',
    description: "Creeremo un piano editoriale su misura con un obiettivo preciso sia per noi sia per te. Il piano includerà un video dell'esperienza in studio, post/storie e la registrazione integrale professionale dei trattamenti su YouTube.",
    icon: Target,
    step: '2',
    image: 'inf3',
  },
  {
    title: 'Sponsorizzazione e ampliamento della visibilità',
    description: 'Abbiamo la possibilità di sponsorizzare i post a Torino per aumentare visibilità sia del nostro studio sia eventualmente della tua figura',
    icon: Megaphone,
    step: '3',
    image: 'inf4',
  },
]

const steps = [
  { title: 'Compila il form', description: 'Invia la tua candidatura' },
  { title: 'Videochiamata conoscitiva', description: 'Ci conosciamo a vicenda' },
  { title: 'Firma dei documenti', description: "Finalizziamo l'accordo" },
  { title: 'Appuntamento in studio', description: 'Iniziamo la collaborazione' },
]

const faqs = [
  {
    q: 'Non ho molta esperienza nella creazione di contenuti, come possiamo gestirla?',
    a: "Non c'è alcun problema, perché ci occupiamo noi di registrare tutto quanto e creare il video professionale finale. Qualora volessi pubblicare qualcosa di originale sulle tue pagine, ti diamo indicazioni su come fare!",
  },
  {
    q: 'Ho paura delle "scrocchiate", dovete per forza farmele?',
    a: 'Il lavoro dell\'osteopata va ben oltre le "scrocchiate" e non sono di certo il focus principale di un vero professionista, tant\'è vero che i nostri osteopati ne fanno davvero pochissime e si concentrano su tantissime altre tecniche molto efficaci. Le "scrocchiate" che vedi sui social sono principalmente per fare scena e sono davvero fuorvianti rispetto a quello che è il nostro lavoro. Quindi assolutamente possiamo evitarle!',
  },
  {
    q: 'Quanto tempo richiede una sessione di registrazione o trattamento?',
    a: "La prima sessione richiede un'oretta, le (eventuali) altre possono durare anche molto meno!",
  },
  {
    q: 'Se non ho dolori o problemi fisici, ha senso comunque fare questa collaborazione?',
    a: 'Assolutamente sì. Il bello dei Trattamenti Osteopatici è che aiutano tantissimo a prevenire problemi e dolori in futuro, soprattutto tutti quei dolori legati alla sedentarietà moderna. Quindi in ogni caso ti fa bene!',
  },
  {
    q: 'Quali benefici posso aspettarmi dal trattamento osteopatico?',
    a: "I nostri pazienti ne riportano davvero decine. Comunque i principali sono: 1. Bellissima sensazione di leggerezza e scioltezza 2. Minori rigidità e maggior mobilità del corpo 3. Riduzione parziale/totale di dolori 4. Sensazioni di benessere generale che aiuta anche a prevenire molti problemi con l'avanzare dell'età. E TANTI ALTRI!",
  },
  {
    q: 'Quante sessioni saranno necessarie per la collaborazione?',
    a: 'Minimo 1 e, se si vuole instaurare una collaborazione continuativa, se ne possono fare periodicamente. In media, tutti quanti ne fanno almeno 1 al mese perché ne sono davvero contenti 😁',
  },
  {
    q: 'Offrite un compenso fisso o è legato alla performance?',
    a: 'Entrambi. Il compenso a performance è valido per tutti, perché vogliamo incentivare e premiare l\'impegno o comunque il lavoro fatto negli anni per aver costruito una bella audience. Il compenso fisso non è invece per tutti, ci devono essere dei requisiti che valuteremo insieme.',
  },
  {
    q: 'Sono preoccupato di dover pubblicare troppo frequentemente. Qual è il vostro approccio?',
    a: 'Se non hai tempo/voglia di pubblicare, non ti preoccupare, ci penseremo noi a creare tutto quanto e a usare la nostra pagina per pubblicare, in questo modo il tuo impegno sarà davvero minimo.',
  },
  {
    q: 'Come viene gestita la privacy durante le riprese?',
    a: 'Se guardi tutti i nostri social o comunque vedrai gli esempi che ti mostreremo, noterai che i video che facciamo sono molto professionali e si distaccano totalmente dai classici video acchiappa like classici degli osteopati. Il nostro obiettivo è trasmettere la massima professionalità in quello che facciamo quotidianamente.',
  },
  {
    q: 'Lo studio è distante dalla mia residenza. È possibile partecipare comunque?',
    a: 'Assolutamente sì, possiamo eventualmente rimborsare il trasporto.',
  },
]

const STORY_MS = 4200

// Telefono con "storie" che avanzano da sole; tocco a destra/sinistra per scorrere
const StoryPhone = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const t = setTimeout(() => setIndex((i) => (i + 1) % stories.length), STORY_MS)
    return () => clearTimeout(t)
  }, [index, paused])

  return (
    <div
      className="mx-infl-phone"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-infl-phone__screen">
        <AnimatePresence initial={false}>
          <motion.img
            key={stories[index].name}
            {...img(stories[index].name)}
            sizes="(min-width: 1024px) 360px, 70vw"
            alt={stories[index].alt}
            decoding="async"
            className="mx-infl-phone__img"
            style={{ objectPosition: stories[index].pos || 'center' }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </AnimatePresence>

        <div className="mx-infl-phone__ui">
          <div className="mx-infl-phone__bars" aria-hidden="true">
            {stories.map((s, i) => (
              <span key={s.name}>
                <i
                  className={i < index ? 'is-done' : i === index ? (paused ? 'is-paused' : 'is-on') : ''}
                  style={{ animationDuration: `${STORY_MS}ms` }}
                />
              </span>
            ))}
          </div>
          <div className="mx-infl-phone__user">
            <img src="/pittogramma.png" alt="" />
            <span>
              <b>
                mobilitas <BadgeCheck size={13} aria-hidden="true" />
              </b>
              <small>Collaborazione Esclusiva</small>
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mx-infl-phone__tap mx-infl-phone__tap--prev"
          aria-label="Foto precedente"
          onClick={() => setIndex((i) => (i - 1 + stories.length) % stories.length)}
        />
        <button
          type="button"
          className="mx-infl-phone__tap mx-infl-phone__tap--next"
          aria-label="Foto successiva"
          onClick={() => setIndex((i) => (i + 1) % stories.length)}
        />

        <button type="button" className="mx-infl-phone__reply" onClick={candidati}>
          <span>Candidati Ora</span>
          <MessageCircle size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

// Riquadro CTA ripetuto lungo la pagina
const CtaStrip = ({ icon: Icon, title, text, label }) => (
  <Reveal className="mx-infl-strip">
    <span className="mx-infl-strip__icon" aria-hidden="true">
      <Icon size={26} />
    </span>
    <div className="mx-infl-strip__copy">
      <h3 className="mx-h mx-h--sm">{title}</h3>
      <p className="mx-body">{text}</p>
    </div>
    <button type="button" className="mx-btn mx-btn--primary mx-infl-strip__btn" onClick={candidati}>
      <span>{label}</span>
      <span className="mx-btn__icon">
        <ArrowRight size={20} strokeWidth={2.4} />
      </span>
    </button>
  </Reveal>
)

// I 4 passi come una chat: i messaggi arrivano uno alla volta
const ChatSteps = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  return (
    <ol className="mx-infl-chat" ref={ref}>
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          className="mx-infl-chat__msg"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.45 }}
        >
          <span className="mx-infl-chat__n">{i + 1}</span>
          <span className="mx-infl-chat__bubble">
            <h4 className="mx-h mx-h--sm">{step.title}</h4>
            <span className="mx-infl-chat__d">{step.description}</span>
          </span>
          <Check className="mx-infl-chat__tick" size={16} strokeWidth={3} aria-hidden="true" />
        </motion.li>
      ))}
    </ol>
  )
}

const Influencer = () => {
  const [openFAQ, setOpenFAQ] = useState(null)
  const problemsRef = useRef(null)
  const [studioRef, studioY] = useParallax(8)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const scopriDiPiu = () => {
    problemsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageShell className="mx-infl">
      {/* HERO: copy + telefono con storie */}
      <section className="mx-infl-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="mx-wrap mx-infl-hero__layout">
          <div className="mx-infl-hero__copy">
            <motion.p
              className="mx-infl-badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <span className="mx-infl-badge__dot" aria-hidden="true" />
              Collaborazione Esclusiva
            </motion.p>
            <h1 className="mx-h mx-infl-hero__title">
              <MaskLines
                immediate
                delay={0.2}
                lines={[
                  { text: 'Influencer?', className: 'mx-gradient' },
                  { text: 'Collabora' },
                  { text: 'con noi.', className: 'mx-outline' },
                ]}
              />
            </h1>
            <motion.div
              className="mx-infl-hero__lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              <p className="mx-lead">
                Che tu sia un Influencer con una grande audience o semplicemente stai iniziando il tuo percorso...
              </p>
              <p className="mx-lead">
                Hai probabilmente trovato la tua prossima{' '}
                <strong className="mx-accent">Collaborazione con il nostro Studio Osteopatico Mobilitas</strong>
              </p>
            </motion.div>

            <motion.ul
              className="mx-infl-perks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            >
              {heroPerks.map((perk) => (
                <li key={perk}>
                  <span aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mx-ctas mx-infl-hero__ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.85 }}
            >
              <button type="button" className="mx-btn mx-btn--primary" onClick={candidati}>
                <span>
                  <small>Su WhatsApp</small>
                  Candidati Ora
                </span>
                <span className="mx-btn__icon">
                  <ArrowRight size={20} strokeWidth={2.4} />
                </span>
              </button>
              <button type="button" className="mx-btn mx-btn--ghost" onClick={scopriDiPiu}>
                <span>Scopri di Più</span>
                <span className="mx-btn__icon">
                  <ChevronDown size={20} strokeWidth={2.4} />
                </span>
              </button>
            </motion.div>
          </div>

          <motion.div
            className="mx-infl-hero__media"
            initial={{ opacity: 0, y: 60, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          >
            <div className="mx-infl-hero__halo" aria-hidden="true" />
            <StoryPhone />
            <span className="mx-infl-sticker mx-infl-sticker--a" aria-hidden="true">
              <Sparkles size={16} /> 90€ → 0€
            </span>
            <span className="mx-infl-sticker mx-infl-sticker--b" aria-hidden="true">
              <Users size={16} /> 25 / anno
            </span>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMI */}
      <section className="mx-section mx-section--deep mx-infl-problems" ref={problemsRef}>
        <div className="mx-wrap">
          <p className="mx-kicker mx-infl-kicker--red">
            <span className="mx-kicker__n">01</span>
            <span className="mx-kicker__bar" />
            Problemi Comuni
          </p>
          <div className="mx-split mx-infl-head">
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Cosa ti propongono' }, { text: 'le altre aziende?', className: 'mx-infl-red' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">
                Probabilmente ti stai chiedendo perché dovresti scegliere noi invece delle solite collaborazioni...
              </p>
            </Reveal>
          </div>

          <Snap className="mx-infl-notifs">
            {problems.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} delay={(i % 3) * 0.07} className="mx-infl-notif">
                  <span className="mx-infl-notif__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="mx-h mx-h--sm">{p.title}</h3>
                    <p className="mx-body">{p.description}</p>
                  </div>
                  <span className="mx-infl-notif__n" aria-hidden="true">0{i + 1}</span>
                </Reveal>
              )
            })}
          </Snap>

          <CtaStrip
            icon={Flame}
            title="Stanco di queste collaborazioni?"
            text="È ora di cambiare approccio e trovare qualcosa di davvero valido"
            label="Collabora con noi"
          />
        </div>
      </section>

      {/* VANTAGGI */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="02">I Nostri Vantaggi</Kicker>
          <div className="mx-split mx-infl-head">
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Perché lavorare' }, { text: 'con noi?', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">
                Ecco cosa ci rende diversi e perché dovresti scegliere proprio noi per la tua prossima collaborazione
              </p>
            </Reveal>
          </div>

          <Snap className="mx-cards3 mx-infl-perkcards">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal key={b.number} delay={i * 0.08} className={`mx-card mx-infl-perk mx-infl-perk--${i + 1}`} onMouseMove={trackSpotlight}>
                  <div className="mx-infl-perk__top">
                    <span className="mx-card__icon">
                      <Icon size={24} />
                    </span>
                    <span className="mx-infl-perk__n" aria-hidden="true">{b.number}</span>
                  </div>
                  {i === 0 && (
                    <p className="mx-infl-price" aria-hidden="true">
                      <s>90€</s>
                      <b>0€</b>
                    </p>
                  )}
                  {i === 1 && (
                    <p className="mx-infl-coupon" aria-hidden="true">
                      <span>COUPON</span>
                      <b>∞</b>
                    </p>
                  )}
                  {i === 2 && (
                    <svg className="mx-infl-spark" viewBox="0 0 200 60" aria-hidden="true">
                      <path d="M2 54 L40 46 L70 50 L100 34 L130 38 L160 18 L198 6" />
                    </svg>
                  )}
                  <h3 className="mx-h mx-h--sm">{b.title}</h3>
                  <p className="mx-body">{b.description}</p>
                </Reveal>
              )
            })}
          </Snap>

          {/* Formati dei contenuti */}
          <div className="mx-infl-sub">
            <h3 className="mx-h mx-h--md">
              <MaskLines lines={[{ text: 'Cosa faremo insieme?' }]} />
            </h3>
            <Reveal>
              <p className="mx-body">Un processo strutturato per massimizzare i risultati</p>
            </Reveal>
          </div>

          <Snap className="mx-infl-reels">
            {together.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.step} delay={i * 0.1} className="mx-infl-reel">
                  <div className="mx-infl-reel__frame">
                    <img
                      {...img(item.image)}
                      sizes="(min-width: 900px) 380px, 80vw"
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="mx-infl-reel__step">{item.step}</span>
                    <span className="mx-infl-reel__icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                  </div>
                  <h4 className="mx-h mx-h--sm">{item.title}</h4>
                  <p className="mx-body">{item.description}</p>
                </Reveal>
              )
            })}
          </Snap>

          <CtaStrip
            icon={Rocket}
            title="Pronto/a a iniziare?"
            text="Unisciti agli influencer che hanno già scelto di collaborare con noi"
            label="Inizia la collaborazione"
          />
        </div>
      </section>

      {/* LA NOSTRA PROPOSTA */}
      <section className="mx-section mx-section--deep mx-infl-offer">
        <div className="mx-wrap">
          <Kicker n="03">La Nostra Proposta</Kicker>
          <div className="mx-split mx-infl-head">
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Una collaborazione' }, { text: 'esclusiva e limitata', className: 'mx-accent' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">Riservata solo a chi merita davvero di far parte del nostro team di collaboratori</p>
            </Reveal>
          </div>

          <div className="mx-infl-limit">
            <Reveal className="mx-infl-limit__num" aria-hidden="true">
              <Counter to={25} />
            </Reveal>
            <div className="mx-infl-limit__copy">
              <h3 className="mx-h mx-h--md">
                Collaboriamo solo con <span className="mx-accent">massimo 25 persone nuove all'anno!</span>
              </h3>
              <Reveal>
                <p className="mx-lead">Iniziare con noi è davvero facile, ecco cosa devi fare</p>
              </Reveal>
            </div>
          </div>

          <div className="mx-infl-path">
            <ChatSteps />
            <Reveal className="mx-infl-path__cta">
              <button type="button" className="mx-btn mx-btn--primary" onClick={candidati}>
                <span>Candidati per collaborare con noi</span>
                <span className="mx-btn__icon">
                  <ArrowRight size={20} strokeWidth={2.4} />
                </span>
              </button>
            </Reveal>
          </div>

          {/* Lo studio */}
          <div className="mx-infl-studio">
            <div className="mx-infl-studio__copy">
              <h3 className="mx-h mx-h--md">
                <MaskLines lines={[{ text: 'Cosa rende unico' }, { text: 'il nostro Studio?', className: 'mx-gradient' }]} />
              </h3>
              <Reveal>
                <p className="mx-body mx-infl-studio__sub">Ecco perché dovresti scegliere proprio noi</p>
              </Reveal>
              <Reveal>
                <p className="mx-infl-badge mx-infl-badge--solid">
                  <span className="mx-infl-badge__dot" aria-hidden="true" />
                  Il Più Grande di Torino
                </p>
                <p className="mx-lead">
                  <strong>Mobilitas è lo Studio Osteopatico più importante di Torino.</strong>
                </p>
              </Reveal>
              <ul className="mx-list mx-infl-studio__list">
                <Reveal as="li">
                  <span className="mx-infl-studio__ic" aria-hidden="true">
                    <Target size={18} />
                  </span>
                  <span>
                    <h4 className="mx-h mx-h--sm">Siamo in MISSIONE</h4>
                    <span className="mx-list__d">
                      Abbiamo il sogno e l'ambizione di aiutare più persone possibili a liberarsi da tutti quei dolori dovuti allo stile di vita moderno.
                    </span>
                  </span>
                </Reveal>
                <Reveal as="li" delay={0.08}>
                  <span className="mx-infl-studio__ic" aria-hidden="true">
                    <BadgeCheck size={18} />
                  </span>
                  <span>
                    <h4 className="mx-h mx-h--sm">Esperti Specializzati</h4>
                    <span className="mx-list__d">
                      I nostri professionisti sono esperti nelle loro aree (gravidanza&amp;pediatria, fitness, ecc.) e seguiamo la salute dei nostri pazienti a 360 gradi.
                    </span>
                  </span>
                </Reveal>
              </ul>
            </div>
            <Reveal className="mx-infl-studio__media">
              <div ref={studioRef} style={{ height: '100%' }}>
                <motion.div style={{ y: studioY, height: '100%' }}>
                  <img
                    className="mx-parallax-img"
                    {...img('inf6')}
                    sizes="(min-width: 1000px) 560px, 100vw"
                    alt="Studio Mobilitas - Il più importante di Torino"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>

          <CtaStrip
            icon={Trophy}
            title="Pronto/a a collaborare con noi?"
            text="Inizia subito la tua collaborazione con il più importante studio osteopatico di Torino"
            label="Inizia la collaborazione"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap mx-infl-faqwrap">
          <div className="mx-infl-faqhead">
            <Kicker n="04">Domande Frequenti</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Hai domande?' }, { text: 'Abbiamo le risposte!', className: 'mx-outline' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead" style={{ marginTop: 28 }}>
                Ecco le domande più frequenti che ci fanno gli influencer interessati a collaborare con noi
              </p>
            </Reveal>
          </div>

          <div className="mx-infl-faq">
            {faqs.map((faq, index) => {
              const open = openFAQ === index
              return (
                <div key={faq.q} className={`mx-infl-faq__item ${open ? 'is-open' : ''}`}>
                  <h3 className="mx-infl-faq__h">
                    <button
                      type="button"
                      id={`infl-faq-q-${index}`}
                      aria-expanded={open}
                      aria-controls={`infl-faq-a-${index}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.q}</span>
                      <span className="mx-infl-faq__icon" aria-hidden="true">
                        <ChevronDown size={20} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`infl-faq-a-${index}`}
                    role="region"
                    aria-labelledby={`infl-faq-q-${index}`}
                    className="mx-infl-faq__a"
                    hidden={!open}
                  >
                    <p className="mx-body">{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FinalCta
        kicker="Inizia ora"
        titleLines={[{ text: 'Pronto/a a iniziare' }, { text: 'la collaborazione?', className: 'mx-gradient' }]}
        text="Non esitare a contattarci per qualsiasi domanda sulla collaborazione"
      >
        <div className="mx-ctas">
          <button type="button" className="mx-btn mx-btn--primary" onClick={candidati}>
            <span>
              <small>Su WhatsApp</small>
              Inizia la collaborazione
            </span>
            <span className="mx-btn__icon">
              <MessageCircle size={20} strokeWidth={2.4} />
            </span>
          </button>
        </div>
      </FinalCta>
    </PageShell>
  )
}

export default Influencer
