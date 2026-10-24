import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, BookOpen, Building2, Landmark, MessageCircle, Newspaper, Trophy } from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal } from '../../../components/home-sections/HomeKit'
import { EASE, MSG_CONSULTO, openWhatsApp } from '../../../components/home-sections/homeMotion'
import { Highlight, NamedList, PartnerImg, SectionHead } from '../../../components/site/partnership/PartnerKit'
import '../../../styles/pages/partner-subalpina.css'

const services = [
  'Consulenze contrattuali',
  'Convenzioni vantaggiose',
  'Assistenza legale',
  'Controllo buste paga',
  'Apertura partita IVA',
  'Dichiarazione redditi',
]

const values = [
  { name: 'Tutela', desc: 'Protezione dei diritti dei giornalisti' },
  { name: 'Formazione', desc: 'Aggiornamento professionale continuo' },
  { name: 'Solidarietà', desc: 'Supporto reciproco tra colleghi' },
  { name: 'Trasparenza', desc: 'Chiarezza nelle informazioni' },
]

const house = ['Ordine dei Giornalisti del Piemonte', 'INPGI', 'CASAGIT', 'Centro Studi Pestelli']

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

// Filetto che si stende da sinistra
const Rule = ({ double = false, delay = 0 }) => (
  <motion.span
    className={`mx-ss-rule ${double ? 'is-double' : ''}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, ease: EASE, delay }}
    aria-hidden="true"
  />
)

const StampaSubalpina = () => (
  <PageShell className="mx-ss">
    {/* HERO: la testata */}
    <section className="mx-ss-hero">
      <div className="mx-wrap">
        <motion.div className="mx-ss-strip" {...fade(0.05)}>
          <span>Partnership Esclusiva</span>
          <span className="mx-ss-strip__mid">Mobilitas × Stampa Subalpina</span>
          <span>Torino</span>
        </motion.div>
        <Rule double />

        <h1 className="mx-h mx-h--xl mx-ss-masthead mx-pk-fitbox">
          <MaskLines
            immediate
            delay={0.2}
            lines={[
              { text: 'Partnership con', className: 'mx-ss-masthead__pre' },
              { text: 'Stampa', className: 'mx-pk-name mx-ss-masthead__name' },
              { text: 'Subalpina', className: 'mx-pk-name mx-ss-masthead__name mx-gradient' },
            ]}
          />
        </h1>
        <Rule delay={0.4} />

        <div className="mx-ss-front">
          <motion.div className="mx-ss-front__lead" {...fade(0.55)}>
            <Kicker>Editoriale</Kicker>
            <p className="mx-lead mx-ss-dropcap">
              Scopri la nostra partnership strategica con Stampa Subalpina e come stiamo lavorando insieme per promuovere il benessere nel mondo del giornalismo
            </p>
            <div className="mx-ctas mx-ss-front__ctas">
              <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
                <span>
                  <small>Prenota un</small>
                  Consulto gratuito
                </span>
                <span className="mx-btn__icon">
                  <MessageCircle size={20} strokeWidth={2.4} />
                </span>
              </button>
              <a className="mx-btn mx-btn--ghost" href="#benefici">
                <span>
                  <small>Giornalisti associati</small>
                  Benefici della partnership
                </span>
                <span className="mx-btn__icon">
                  <ArrowDown size={20} strokeWidth={2.4} />
                </span>
              </a>
            </div>
          </motion.div>

          <motion.figure
            className="mx-ss-front__photo"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.4 }}
          >
            <div className="mx-ss-front__frame">
              <PartnerImg
                base="/partnership/subalpina/web/subalpina1"
                alt="Evento di formazione Stampa Subalpina - 16 Giugno 2025"
                sizes="(min-width: 1024px) 720px, 100vw"
                eager
              />
            </div>
            <figcaption>
              <b>16 Giugno 2025</b> · Il Primo Evento di formazione all'Ordine, Circolo della Stampa Sporting
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>

    {/* LA STORIA: l'articolo */}
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <SectionHead
          n="01"
          kicker="La Storia"
          lines={[{ text: 'Come è nata' }, { text: 'la partnership', className: 'mx-gradient' }]}
          lead="Una storia di collaborazione tra professionisti che ha portato a una partnership unica nel mondo del giornalismo"
        />

        <Reveal className="mx-ss-article">
          <div className="mx-ss-article__col">
            <h3 className="mx-h mx-h--sm mx-ss-subhead">Un Incontro Professionale</h3>
            <p className="mx-body mx-ss-dropcap">
              La partnership tra Mobilitas e Stampa Subalpina è nata da un incontro tra <strong>Carlos</strong> (di Mobilitas) e <strong>Roberta Pellegrini</strong> della direzione della Subalpina. Un dialogo tra professionisti che ha portato a una collaborazione di valore.
            </p>
          </div>
          <div className="mx-ss-article__col">
            <h3 className="mx-h mx-h--sm mx-ss-subhead">L'Idea della Collaborazione</h3>
            <p className="mx-body">
              L'obiettivo comune era quello di portare consapevolezza sui temi del benessere e della prevenzione nel mondo del giornalismo, una professione che spesso comporta stress e posture scorrette durante il lavoro.
            </p>
          </div>
        </Reveal>

        <article className="mx-ss-event">
          <Reveal className="mx-ss-event__date" aria-hidden="true">
            <span>16</span>
            <span>
              Giugno
              <br />
              2025
            </span>
          </Reveal>
          <div>
            <h3 className="mx-h mx-h--md mx-ss-event__title">16 Giugno 2025: Il Primo Evento di formazione all'Ordine</h3>
            <Reveal>
              <p className="mx-lead">
                Il <strong>16 Giugno 2025</strong> si è tenuto il primo evento di formazione presso il <strong>Circolo della Stampa Sporting</strong>. Erano presenti giornalisti dell'Ordine dei Giornalisti del Piemonte. Durante l'evento si è parlato di <strong>sedentarietà, conseguenze sulla salute, consigli per una postura adeguata</strong> e come prevenire problemi e malattie legate al lavoro sedentario.
              </p>
            </Reveal>
          </div>
        </article>

        <Highlight icon={BookOpen} title="Formazione e prevenzione per i professionisti dell'informazione">
          La partnership con Stampa Subalpina rappresenta un impegno concreto nel promuovere il benessere e la prevenzione tra i giornalisti, fornendo strumenti pratici per migliorare la qualità della vita lavorativa.
        </Highlight>
      </div>
    </section>

    {/* CHI È: la redazione */}
    <section className="mx-section mx-section--deep">
      <div className="mx-wrap">
        <SectionHead
          n="02"
          kicker="Chi è Stampa Subalpina"
          lines={[{ text: 'Chi è Stampa Subalpina,' }, { text: 'cosa fa e i suoi valori', className: 'mx-outline' }]}
          lead="Il sindacato unitario dei giornalisti del Piemonte, rappresentanza territoriale della Federazione Nazionale Stampa Italiana"
          stacked
        />

        <div className="mx-ss-columns">
          <Reveal className="mx-ss-col">
            <Landmark size={22} aria-hidden="true" />
            <h3 className="mx-h mx-h--sm">Sindacato dei Giornalisti del Piemonte</h3>
            <p className="mx-body">
              Stampa Subalpina è il sindacato unitario dei giornalisti del Piemonte, rappresentanza territoriale della Federazione Nazionale Stampa Italiana (FNSI). Opera per la tutela e la rappresentanza dei professionisti dell'informazione.
            </p>
          </Reveal>
          <Reveal className="mx-ss-col" delay={0.08}>
            <Newspaper size={22} aria-hidden="true" />
            <h3 className="mx-h mx-h--sm">La Missione di Stampa Subalpina</h3>
            <p className="mx-body">
              Fornire informazioni e consulenze sulla corretta applicazione dei contratti di lavoro, sui compensi previsti per le prestazioni professionali autonome, e offrire assistenza legale e tutela per i giornalisti.
            </p>
          </Reveal>
          <Reveal className="mx-ss-col mx-ss-index" delay={0.16}>
            <h3 className="mx-h mx-h--sm">Servizi agli Associati</h3>
            <ol>
              {services.map((s, i) => (
                <li key={s}>
                  <span>{s}</span>
                  <i aria-hidden="true" />
                  <b aria-hidden="true">{String(i + 1).padStart(2, '0')}</b>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mx-ss-duo">
          <Reveal className="mx-panel mx-ss-values">
            <h3 className="mx-h mx-h--md">I Valori di Stampa Subalpina</h3>
            <NamedList items={values} />
          </Reveal>

          <Reveal className="mx-ss-colophon" delay={0.08}>
            <span className="mx-ss-colophon__label">
              <Building2 size={16} aria-hidden="true" /> Sede
            </span>
            <h3 className="mx-h mx-h--lg">Casa dei Giornalisti</h3>
            <p className="mx-body">
              La sede di Stampa Subalpina si trova presso il <strong>Circolo della Stampa - Palazzo Ceriana Mayneri</strong> in Corso Stati Uniti 27 a Torino. Un punto di riferimento per tutti i giornalisti piemontesi.
            </p>
            <ul className="mx-tags">
              {house.map((h) => (
                <li key={h} className="mx-tag">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Highlight icon={Newspaper} title="Stampa Subalpina: il punto di riferimento per i giornalisti piemontesi">
          Da oltre 50 anni, Stampa Subalpina rappresenta e tutela i giornalisti del Piemonte, promuovendo la formazione, la solidarietà e l'eccellenza professionale nel mondo dell'informazione.
        </Highlight>
      </div>
    </section>

    {/* BENEFICI: la prima pagina */}
    <section id="benefici" className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <SectionHead
          n="03"
          kicker="I Benefici"
          lines={[{ text: 'Benefici della' }, { text: 'partnership', className: 'mx-gradient' }]}
          lead="I vantaggi esclusivi riservati ai giornalisti associati a Stampa Subalpina attraverso la nostra partnership"
        />

        <div className="mx-ss-page">
          <div className="mx-ss-page__bar" aria-hidden="true">
            <span>Mobilitas × Stampa Subalpina</span>
            <span>Benefici</span>
          </div>

          <Reveal className="mx-ss-story mx-ss-story--lead">
            <span className="mx-ss-story__n">01</span>
            <h3 className="mx-h mx-h--lg">Formazione Ricorrente con Crediti Formativi</h3>
            <p className="mx-lead mx-ss-dropcap">
              <strong>Formazione ricorrente con crediti formativi riconosciuti</strong> per tutti i giornalisti associati a Stampa Subalpina. Eventi di formazione professionale continua su temi di benessere, prevenzione e salute, con rilascio di crediti formativi validi per l'aggiornamento professionale obbligatorio.
            </p>
          </Reveal>

          <div className="mx-ss-page__side">
            <Reveal className="mx-ss-story" delay={0.08}>
              <span className="mx-ss-story__n">02</span>
              <h3 className="mx-h mx-h--md">Eventi Esclusivi</h3>
              <p className="mx-body">
                I giornalisti associati sono <strong>i primi a ricevere inviti</strong> ai nostri eventi esclusivi: workshop, seminari di benessere, sessioni di formazione e molto altro.
              </p>
            </Reveal>
            <Reveal className="mx-ss-story" delay={0.14}>
              <span className="mx-ss-story__n">03</span>
              <h3 className="mx-h mx-h--md">Prezzi Super Agevolati</h3>
              <p className="mx-body">
                Accesso a <strong>tutti i servizi e prodotti a prezzi super agevolati</strong>. Trattamenti osteopatici, consulenze e prodotti per il benessere a condizioni esclusive.
              </p>
            </Reveal>
          </div>

          <Reveal className="mx-ss-story mx-ss-story--wide">
            <span className="mx-ss-story__n">04</span>
            <h3 className="mx-h mx-h--md">Percorsi Esclusivi</h3>
            <p className="mx-body">
              <strong>Percorsi personalizzati</strong> studiati appositamente per i giornalisti: programmi di benessere professionale, check-up periodici e piani di prevenzione su misura per garantire il massimo benessere in una professione spesso stressante.
            </p>
          </Reveal>
        </div>

        <Highlight icon={Trophy} title="Una partnership che premia l'eccellenza professionale">
          La partnership tra Mobilitas e Stampa Subalpina rappresenta un modello di collaborazione che mette al centro il benessere dei professionisti dell'informazione, offrendo vantaggi concreti e misurabili per migliorare la qualità della vita lavorativa e personale.
        </Highlight>
      </div>
    </section>

    <FinalCta kicker="Mobilitas × Stampa Subalpina" titleLines={[{ text: 'Prenota il tuo' }, { text: 'appuntamento.', className: 'mx-gradient' }]} />
  </PageShell>
)

export default StampaSubalpina
