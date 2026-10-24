import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, Utensils, Moon, Brain, Heart, CheckCircle, ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import { Kicker, MaskLines, Reveal, ScrollWords, Snap } from '../../components/home-sections/HomeKit'
import { EASE, useParallax, trackSpotlight } from '../../components/home-sections/homeMotion'
import '../../styles/pages/storia.css'

// Concetto: la pagina è un libro. Ogni sezione è un capitolo con il suo numero
// gigante, una linea che si riempie mentre leggi e foto che si aprono come pagine.

// Foto ottimizzate generate da /public/storia/<nome>.png
const StoriaImg = ({ name, alt, sizes = '100vw', eager = false, ...rest }) => (
  <img
    src={`/storia/web/${name}-1600.jpg`}
    srcSet={`/storia/web/${name}-900.jpg 900w, /storia/web/${name}-1600.jpg 1600w`}
    sizes={sizes}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    {...rest}
  />
)

// Le 5 aree fondamentali della salute (stessi contenuti di HealthAreasCarousel, variante "story")
const healthAreas = [
  {
    icon: Activity,
    title: 'Movimento',
    subtitle: 'La vita è movimento, la morte è immobilità',
    description: "Aiutiamo i nostri pazienti a riconquistare libertà di movimento, fluidità e forza. L'inattività è il nemico numero uno da combattere.",
    benefits: ['Libertà di movimento', 'Forza e resistenza', 'Postura corretta', 'Mobilità articolare'],
  },
  {
    icon: Utensils,
    title: 'Alimentazione',
    subtitle: 'Il nostro carburante',
    description: 'Ciò che mettiamo nel nostro corpo determina come ci sentiamo e funzioniamo. Guidiamo verso scelte alimentari consapevoli e sostenibili.',
    benefits: ['Energia costante', 'Recupero ottimale', 'Peso ideale', 'Digestione perfetta'],
  },
  {
    icon: Moon,
    title: 'Sonno',
    subtitle: 'Il potere del recupero',
    description: 'Un sonno di qualità è il segreto per rigenerarsi e per una vita senza tensioni e dolori. Costruiamo routine di riposo che rigenerano corpo e mente.',
    benefits: ['Riposo profondo', 'Rigenerazione cellulare', 'Mente lucida', 'Energia mattutina'],
  },
  {
    icon: Brain,
    title: 'Gestione dello Stress',
    subtitle: "L'equilibrio interiore",
    description: 'Lo stress cronico è uno dei maggiori nemici della salute. Offriamo strumenti pratici per imparare a gestirlo in modo efficace.',
    benefits: ['Calma interiore', 'Focus mentale', 'Relazioni migliori', 'Pace emotiva'],
  },
  {
    icon: Heart,
    title: 'Relazioni',
    subtitle: 'Il supporto emotivo e sociale',
    description: 'Le relazioni sane sono fondamentali per il benessere. Lavoriamo per migliorare la qualità delle tue connessioni umane.',
    benefits: ['Relazioni autentiche', 'Supporto emotivo', 'Comunicazione efficace', 'Benessere sociale'],
  },
]

const chapters = [
  ['visionari', '01', 'I Due Visionari'],
  ['scoperta', '02', 'La Scoperta'],
  ['firma', '03', 'La Firma'],
  ['creato', '04', 'Cosa Abbiamo Creato'],
]

// ---------- Apertura: il libro si apre ----------
const StoriaHero = () => {
  const { scrollY } = useScroll()
  const aY = useTransform(scrollY, [0, 700], [0, -70])
  const bY = useTransform(scrollY, [0, 700], [0, 50])

  return (
    <header className="mx-storia-hero">
      <div className="mx-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="mx-wrap mx-storia-hero__grid">
        <div className="mx-storia-hero__copy">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
            <Kicker>La nostra storia</Kicker>
          </motion.div>
          <h1 className="mx-h mx-storia-hero__title">
            <MaskLines immediate delay={0.2} lines={[{ text: 'La Nostra' }, { text: 'Storia.', className: 'mx-gradient' }]} />
          </h1>
          <motion.p
            className="mx-lead mx-storia-hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            Due visionari, una missione impossibile, una rivoluzione nel mondo della salute.
            <br />
            <strong className="mx-accent">Questa è la storia di come tutto è iniziato.</strong>
          </motion.p>
        </div>

        <div className="mx-storia-hero__photos">
          <motion.figure
            className="mx-storia-polaroid mx-storia-polaroid--a"
            style={{ y: aY }}
            initial={{ opacity: 0, rotate: -12, y: 60 }}
            animate={{ opacity: 1, rotate: -5, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          >
            <StoriaImg name="stretta" alt="La stretta di mano" eager sizes="(min-width: 1024px) 380px, 60vw" />
          </motion.figure>
          <motion.figure
            className="mx-storia-polaroid mx-storia-polaroid--b"
            style={{ y: bY }}
            initial={{ opacity: 0, rotate: 14, y: 80 }}
            animate={{ opacity: 1, rotate: 6, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
          >
            <StoriaImg name="immobile" alt="Una firma su un documento" eager sizes="(min-width: 1024px) 300px, 46vw" />
          </motion.figure>
        </div>
      </div>

      <motion.nav
        className="mx-wrap mx-storia-index"
        aria-label="Capitoli della storia"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.8 }}
      >
        <span className="mx-storia-index__title">Indice</span>
        <ol>
          {chapters.map(([id, n, label]) => (
            <li key={id}>
              <a href={`#${id}`}>
                <span className="mx-storia-index__n">{n}</span>
                <span className="mx-storia-index__label">{label}</span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </motion.nav>
    </header>
  )
}

// ---------- Capitolo: numero gigante + linea di lettura ----------
const Chapter = ({ id, n, label, title, deep = false, children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const numScale = useTransform(scrollYProgress, [0, 0.25], [0.7, 1])
  const numOpacity = useTransform(scrollYProgress, [0, 0.15], [0.2, 1])

  return (
    <section id={id} ref={ref} className={`mx-storia-ch ${deep ? 'is-deep' : ''}`}>
      <div className="mx-wrap mx-storia-ch__grid">
        <div className="mx-storia-ch__rail" aria-hidden="true">
          <div className="mx-storia-ch__sticky">
            <span className="mx-storia-ch__cap">Capitolo</span>
            <motion.span className="mx-storia-ch__num" style={{ scale: numScale, opacity: numOpacity }}>
              {n}
            </motion.span>
            <span className="mx-storia-ch__track">
              <motion.i style={{ scaleY: scrollYProgress }} />
            </span>
          </div>
        </div>

        <div className="mx-storia-ch__body">
          <div className="mx-storia-ch__mhead" aria-hidden="true">
            <span className="mx-storia-ch__mnum">{n}</span>
            <span className="mx-storia-ch__cap">Capitolo</span>
          </div>
          <Kicker>{label}</Kicker>
          {title}
          {children}
        </div>
      </div>
    </section>
  )
}

// Foto di un fondatore con parallasse e nome
const FounderPhoto = ({ name, photo, n }) => {
  const [ref, y] = useParallax(7)
  return (
    <div className="mx-storia-founder__photo" ref={ref}>
      <motion.div style={{ y, height: '100%' }}>
        <StoriaImg name={photo} alt={name} className="mx-parallax-img" sizes="(min-width: 1000px) 460px, 92vw" />
      </motion.div>
      <span className="mx-storia-founder__n" aria-hidden="true">{n}</span>
      <span className="mx-storia-founder__name">{name}</span>
    </div>
  )
}

// La foto della firma si apre come un sipario mentre scorri
const FirmaPhoto = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(12% 16% 12% 16% round 48px)', 'inset(0% 0% 0% 0% round 28px)'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <figure className="mx-storia-firma">
      <motion.div ref={ref} className="mx-storia-firma__frame" style={{ clipPath }}>
        <motion.div style={{ scale, height: '100%' }}>
          <StoriaImg name="firma" alt="Il giorno della firma" className="mx-parallax-img" sizes="(min-width: 1000px) 480px, 92vw" />
        </motion.div>
      </motion.div>
      <figcaption>Il momento in cui tutto è iniziato</figcaption>
    </figure>
  )
}

const LaNostraStoria = () => {
  const [tRef, tY] = useParallax(8)

  return (
    <PageShell className="mx-storia">
      <StoriaHero />

      {/* Capitolo 01 — I fondatori */}
      <Chapter
        id="visionari"
        n="01"
        label="I fondatori"
        deep
        title={
          <>
            <h2 className="mx-h mx-h--xl">
              <MaskLines lines={[{ text: 'I Due' }, { text: 'Visionari.', className: 'mx-outline' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-storia-ch__lead">Due storie diverse, una passione comune: trasformare il mondo della salute</p>
            </Reveal>
          </>
        }
      >
        <div className="mx-storia-founders">
          <article className="mx-storia-founder">
            <Reveal>
              <FounderPhoto name="Carlos Torre" photo="calcio" n="A" />
            </Reveal>
            <div className="mx-storia-founder__copy">
              <Reveal>
                <h3 className="mx-h mx-h--md">Ex Calciatore e Ingegnere</h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mx-body">
                  Tra le tante esperienze, ha anche militato nelle giovanili della <strong>Juventus</strong>, ma la sua vera
                  passione è sempre capire come funzionano i <strong>sistemi che governano il mondo</strong>. Laureato in
                  ingegneria informatica, ha dedicato la sua vita allo studio e alla formazione personale continua.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-body">
                  <strong>Ogni singolo giorno</strong> della sua vita speso a formarsi. Capacità di analisi dei mercati,
                  gestione finanziaria e strategie aziendali <span className="mx-accent">che portano risultati</span>.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mx-storia-pull">
                  La persona che sa trasformare le idee in realtà concrete, con la determinazione di chi ha vissuto sempre
                  ai massimi livelli.
                </p>
              </Reveal>
            </div>
          </article>

          <article className="mx-storia-founder mx-storia-founder--rev">
            <Reveal>
              <FounderPhoto name="Nicolas Ricciardi" photo="nicolas" n="B" />
            </Reveal>
            <div className="mx-storia-founder__copy">
              <Reveal>
                <h3 className="mx-h mx-h--md">L'Ex Nuotatore che Cambiò le Regole</h3>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mx-body">
                  <strong>20 anni di sport agonistico</strong> alle spalle. Nicolas non è solo un atleta, è un{' '}
                  <strong>maestro delle soft skills</strong> che ha trasformato ogni esperienza in competenza.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-body">
                  Accademie, formazione continua, <strong>ogni singola settimana</strong> dedicata a migliorarsi. Le sue
                  capacità umane e relazionali sono strepitose e <strong>fuori dal comune</strong>.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mx-storia-record">
                  <span className="mx-storia-record__num" aria-hidden="true">60</span>
                  <p className="mx-body">
                    Laureato in osteopatia, ha raggiunto un traguardo incredibile:{' '}
                    <strong className="mx-accent">60 visite a settimana già dopo un mese dalla laurea</strong>. Un record che
                    parla da solo. Merito solamente delle sue competenze ineguagliabili a livello umano e professionale.
                    Medaglia d'oro!
                  </p>
                </div>
              </Reveal>
            </div>
          </article>
        </div>
      </Chapter>

      {/* Capitolo 02 — L'idea */}
      <Chapter
        id="scoperta"
        n="02"
        label="L'idea"
        title={
          <h2 className="mx-h mx-h--xl">
            <MaskLines lines={[{ text: 'La Scoperta' }, { text: 'che Cambiò' }, { text: 'Tutto.', className: 'mx-gradient' }]} />
          </h2>
        }
      >
        <ScrollWords
          className="mx-manifesto mx-storia-manifesto"
          parts={[
            'Entrambi amanti dello sport e della salute, si sono presto accorti di qualcosa che',
            { text: 'non funzionava nel mondo della salute.', accent: true },
          ]}
        />

        <ol className="mx-storia-beats">
          <Reveal as="li" className="mx-storia-beat">
            <p className="mx-body">
              <strong className="mx-accent">Il problema era chiaro:</strong> viviamo in una{' '}
              <strong>società ultra esagerata</strong>, in tutto e per tutto. Chi sta <strong>troppe ore seduto</strong>,
              chi porta il proprio corpo <strong>allo sfinimento</strong>, chi lo logora con{' '}
              <strong>lavori manuali e pesanti</strong> e così via.
            </p>
          </Reveal>
          <Reveal as="li" className="mx-storia-beat mx-storia-beat--q">
            <p className="mx-h mx-h--md">E qual è la soluzione che la società ti propone?</p>
          </Reveal>
          <Reveal as="li" className="mx-storia-beat mx-storia-beat--neg">
            <p className="mx-body">
              Ti propone sempre qualcosa per <strong>curare solo il sintomo</strong>, sempre con metodi che vanno a{' '}
              <strong>spegnere il fuoco</strong>, senza mai risalire alla <strong>causa dei problemi</strong>.
            </p>
          </Reveal>
          <Reveal as="li" className="mx-storia-beat mx-storia-beat--neg">
            <p className="mx-body">
              Questo approccio fa sì che le persone diventino <strong>sempre più deboli</strong> e dipendenti dalle soluzioni
              a breve termine. Soluzioni che non fanno altro che <strong>farti ammalare e peggiorare</strong>.
            </p>
          </Reveal>
          <Reveal as="li" className="mx-storia-beat mx-storia-beat--neg">
            <p className="mx-body">
              Lo stile di vita moderno è <strong>troppo esagerato in tutto</strong> e ci porta ad ammalarci, creando un
              sistema nazionale che semplicemente <strong>non funziona</strong>.
            </p>
          </Reveal>
        </ol>

        <Reveal className="mx-storia-insight">
          <span className="mx-storia-insight__label">E da qui abbiamo capito...</span>
          <p className="mx-storia-insight__text">
            Dovevamo creare qualcosa di <span className="mx-storia-hl">completamente innovativo</span> per tornare a far
            evolvere l'essere umano e farlo splendere come merita.
          </p>
        </Reveal>
      </Chapter>

      {/* Capitolo 03 — Il giorno della firma */}
      <Chapter
        id="firma"
        n="03"
        label="Il giorno della firma"
        deep
        title={
          <>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Il Giorno che' }, { text: 'Cambiò la Storia.', className: 'mx-outline' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-storia-ch__lead">
                Quando la pazzia si trasformò in realtà. Ecco il giorno in cui è stata messa la firma per iniziare tutto
                quanto 😁
              </p>
            </Reveal>
          </>
        }
      >
        <div className="mx-storia-firma-grid">
          <FirmaPhoto />

          <div className="mx-storia-firma-copy">
            <Reveal>
              <h3 className="mx-h mx-h--md">La Pazzia che Diventò Realtà</h3>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-body">
                Carlos e Nicolas hanno deciso di compiere <span className="mx-accent">la pazzia</span> e fondare l'azienda.
                Ma non una pazzia qualsiasi: una pazzia costruita <strong>senza capitali e investitori esterni</strong>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-body">
                Tutto con <strong>sudore e fatica</strong>, sacrificando tantissimo per riuscire a dare vita a qualcosa di{' '}
                <strong>sensazionale</strong>.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mx-quote mx-storia-quote">
              <p className="mx-h mx-h--sm mx-accent">La forza che li ha spinti?</p>
              <p className="mx-body">
                L'ambizione di <strong>cambiare per sempre il mondo della salute</strong>, portare innovazione e innovare la
                storia dell'essere umano.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mx-storia-shift">
          <div className="mx-storia-shift__visual" aria-hidden="true">
            <span className="mx-storia-shift__from">Sopravvive</span>
            <span className="mx-storia-shift__arrow">
              <ArrowRight size={26} strokeWidth={2.4} />
            </span>
            <span className="mx-storia-shift__to">Vive e splende</span>
          </div>
          <p className="mx-lead mx-storia-shift__text">
            Facendo passare da essere che <strong>sopravvive</strong> (malato, senza rendersene conto) a essere che{' '}
            <strong className="mx-accent">vive e splende ogni singolo giorno</strong> con forza e vitalità.
          </p>
        </Reveal>
      </Chapter>

      {/* Capitolo 04 — Cosa abbiamo creato */}
      <Chapter
        id="creato"
        n="04"
        label="Cosa abbiamo creato"
        title={
          <>
            <h2 className="mx-h mx-h--xl">
              <MaskLines lines={[{ text: 'Cosa Abbiamo' }, { text: 'Creato.', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-storia-ch__lead">Un luogo di trasformazione e consapevolezza</p>
            </Reveal>
          </>
        }
      >
        <div className="mx-storia-created">
          <figure className="mx-storia-created__media">
            <div className="mx-storia-created__photo" ref={tRef}>
              <motion.div style={{ y: tY, height: '100%' }}>
                <StoriaImg name="trattamento" alt="Trattamento Mobilitas" className="mx-parallax-img" sizes="(min-width: 1000px) 400px, 92vw" />
              </motion.div>
            </div>
            <figcaption>Un luogo dove la trasformazione prende vita</figcaption>
          </figure>

          <div className="mx-storia-created__copy">
            <Reveal>
              <p className="mx-storia-big">
                Abbiamo creato un <span className="mx-accent">luogo speciale</span> dove le persone vengono per risolvere i
                loro problemi e ne escono completamente trasformate.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-body">
                Non è solo un centro di cura, è un <strong>spazio di consapevolezza</strong> dove ogni persona impara che può
                scegliere di stare in salute <strong>ogni singolo giorno della propria vita</strong>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-body">
                Il segreto? Lavorare attivamente sulle <span className="mx-accent">5 aree fondamentali della salute</span>:
              </p>
            </Reveal>
          </div>
        </div>

        <Snap as="ul" className="mx-storia-areas">
          {healthAreas.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal as="li" key={a.title} delay={i * 0.06} className="mx-card mx-storia-area" onMouseMove={trackSpotlight}>
                <div className="mx-storia-area__top">
                  <span className="mx-card__icon">
                    <Icon size={24} />
                  </span>
                  <span className="mx-storia-area__n" aria-hidden="true">0{i + 1}</span>
                </div>
                <h3 className="mx-h mx-h--sm">{a.title}</h3>
                <p className="mx-storia-area__sub">{a.subtitle}</p>
                <p className="mx-body">{a.description}</p>
                <ul className="mx-storia-area__list">
                  {a.benefits.map((b) => (
                    <li key={b}>
                      <CheckCircle size={16} aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </Snap>

        <Reveal className="mx-storia-insight mx-storia-insight--result">
          <span className="mx-storia-insight__label">Il risultato?</span>
          <p className="mx-storia-insight__text">
            Persone che non solo <span className="mx-storia-hl">guariscono</span>, ma che diventano{' '}
            <span className="mx-storia-hl">protagonisti attivi</span> della propria salute, capaci di mantenere il benessere
            ogni giorno della loro vita.
          </p>
        </Reveal>
      </Chapter>

      {/* Il prossimo capitolo: chiusura */}
      <section className="mx-storia-next">
        <div className="mx-storia-next__ghost" aria-hidden="true">05</div>
        <div className="mx-wrap">
          <Kicker n="05">Il prossimo capitolo</Kicker>
          <h2 className="mx-h mx-h--xl">
            <MaskLines lines={[{ text: 'Vuoi Far Parte' }, { text: 'di Questa' }, { text: 'Rivoluzione?', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead mx-storia-next__text">
              La storia di Mobilitas è appena iniziata. Unisciti a noi nel cambiare il mondo della salute, una persona alla
              volta.
            </p>
          </Reveal>
          <Reveal className="mx-ctas">
            <Link className="mx-btn mx-btn--primary" to="/lavora-con-noi">
              <span>
                <small>Unisciti al team</small>
                Lavora con Noi
              </span>
              <span className="mx-btn__icon">
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </span>
            </Link>
          </Reveal>
          <p className="mx-storia-next__cont" aria-hidden="true">continua…</p>
        </div>
      </section>
    </PageShell>
  )
}

export default LaNostraStoria
