import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, Mail, MapPin, Plus, Briefcase, Sparkles } from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal, ScrollWords, Snap } from '../../../components/home-sections/HomeKit'
import { EASE, trackSpotlight } from '../../../components/home-sections/homeMotion'
import '../../../styles/pages/posizione.css'

// Scheda di una posizione lavorativa con il linguaggio visivo del sito (mx).
// I contenuti arrivano come dati: ogni posizione è un file con soli testi.
//
// titoloRighe: righe del titolo come MaskLines ({ text, className })
// manifesto:   frase grande che si accende scorrendo (stringhe o { text, accent: true })
// requisiti, graditi, attivita, documenti: voci [titolo, dettaglio]
// iter: fasi [titolo, testo]

const EMAIL = 'colloqui@studiomobilitas.it'

const webImage = (src, size) => src.replace(/^\/lavori\//, '/lavori/web/').replace(/\.\w+$/, `-${size}.jpg`)

const ListPanel = ({ variant, icon: Icon, title, subtitle, items, delay = 0 }) => (
  <Reveal className={`mx-panel ${variant}`} delay={delay}>
    <div className="mx-panel__head">
      <span className="mx-panel__badge">
        <Icon size={24} strokeWidth={2.6} />
      </span>
      <div>
        <h3 className="mx-h mx-h--md">{title}</h3>
        {subtitle && <p className="mx-body mx-small">{subtitle}</p>}
      </div>
    </div>
    <ul className="mx-list">
      {items.map(([t, d], i) => (
        <li key={t}>
          <span className="mx-list__n">{String(i + 1).padStart(2, '0')}</span>
          <span className="mx-list__t">
            {t}
            {d && <span className="mx-list__d">{d}</span>}
          </span>
        </li>
      ))}
    </ul>
  </Reveal>
)

const SchedaPosizione = ({
  titolo,
  titoloRighe,
  immagine,
  posizioneImmagine = 'center',
  tipo,
  luogo,
  stato = 'open',
  lead,
  manifesto,
  descrizione,
  requisiti,
  graditi,
  attivita,
  carriera,
  iter,
  documenti,
}) => {
  const aperta = stato === 'open'
  const oggetto = `Candidatura ${titolo} - Nome Cognome`
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(oggetto)}`

  return (
    <PageShell className="mx-pos">
      {/* HERO */}
      <section className="mx-phero has-media mx-pos-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-hero__grid-lines" aria-hidden="true" />

        <div className="mx-wrap mx-phero__layout">
          <div className="mx-phero__copy">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
              <Kicker>Lavora con noi</Kicker>
              <div className="mx-tags">
                <span className={`mx-tag ${aperta ? '' : 'is-closed'}`}>
                  <span className="mx-pos-live" aria-hidden="true" />
                  {aperta ? 'Posizione aperta' : 'Posizione chiusa'}
                </span>
                <span className="mx-tag">
                  <Briefcase size={15} aria-hidden="true" />
                  {tipo}
                </span>
                <span className="mx-tag">
                  <MapPin size={15} aria-hidden="true" />
                  {luogo}
                </span>
              </div>
            </motion.div>
            <h1 className="mx-h mx-h--xl">
              <MaskLines immediate delay={0.2} lines={titoloRighe} />
            </h1>
            <motion.p
              className="mx-lead mx-phero__lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              {lead}
            </motion.p>
            <motion.div
              className="mx-phero__extra"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            >
              <div className="mx-ctas">
                <a className="mx-btn mx-btn--primary" href="#candidati">
                  <span>
                    <small>{aperta ? 'Ci siamo' : 'Candidatura spontanea'}</small>
                    Candidati ora
                  </span>
                  <span className="mx-btn__icon">
                    <ArrowUpRight size={20} strokeWidth={2.4} />
                  </span>
                </a>
                <Link className="mx-btn mx-btn--ghost" to="/lavora-con-noi#posizioni">
                  <span>
                    <small>Lavora con noi</small>
                    Tutte le posizioni
                  </span>
                  <span className="mx-btn__icon">
                    <ArrowLeft size={20} strokeWidth={2.4} />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mx-arch mx-phero__media"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          >
            <div className="mx-arch__halo" aria-hidden="true" />
            <div className="mx-arch__frame">
              <img
                src={webImage(immagine, 1200)}
                srcSet={`${webImage(immagine, 700)} 700w, ${webImage(immagine, 1200)} 1200w`}
                sizes="(min-width: 1024px) 420px, 84vw"
                alt={titolo}
                decoding="async"
                style={{ objectPosition: posizioneImmagine }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LA POSIZIONE */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="01">La posizione</Kicker>
          <ScrollWords className="mx-manifesto" parts={manifesto} />
          <div className="mx-split mx-pos-desc">
            {descrizione.map((col, i) => (
              <Reveal key={i} delay={i * 0.1}>
                {col.map((p) => (
                  <p key={p} className="mx-body">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHI CERCHIAMO */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="02">Chi cerchiamo</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Il profilo' }, { text: 'giusto per noi.', className: 'mx-outline' }]} />
          </h2>
          <div className="mx-audience">
            <ListPanel variant="mx-panel--yes" icon={Check} title="Requisiti obbligatori" subtitle="Da avere fin da subito" items={requisiti} />
            {graditi?.length > 0 && (
              <ListPanel
                variant="mx-pos-panel--plus"
                icon={Plus}
                title="Requisiti graditi"
                subtitle="Non indispensabili, ma fanno la differenza"
                items={graditi}
                delay={0.12}
              />
            )}
          </div>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="03">Cosa farai</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Le tue giornate' }, { text: 'in Mobilitas.', className: 'mx-gradient' }]} />
          </h2>
          <Snap className="mx-cards3 mx-pos-tasks">
            {attivita.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 0.08} className="mx-card" onMouseMove={trackSpotlight}>
                <span className="mx-pos-task__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mx-h mx-h--sm">{t}</h3>
                {d && <p className="mx-body">{d}</p>}
              </Reveal>
            ))}
          </Snap>
        </div>
      </section>

      {/* CARRIERA */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="04">La tua crescita</Kicker>
          <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Una carriera' }, { text: 'senza soffitti.', className: 'mx-accent' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">{carriera.testo}</p>
            </Reveal>
          </div>

          <div className="mx-pos-career">
            <Reveal className="mx-panel mx-panel--yes">
              <div className="mx-panel__head">
                <span className="mx-panel__badge">
                  <ArrowUpRight size={24} strokeWidth={2.6} />
                </span>
                <div>
                  <h3 className="mx-h mx-h--md">Percorsi di sviluppo</h3>
                  <p className="mx-body mx-small">Dove puoi arrivare</p>
                </div>
              </div>
              <ul className="mx-list mx-pos-ladder">
                {carriera.percorsi.map((p, i) => (
                  <li key={p}>
                    <span className="mx-list__n">{i + 1}</span>
                    <span className="mx-list__t">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mx-panel mx-pos-skills" delay={0.12}>
              <div className="mx-panel__head">
                <span className="mx-card__icon" style={{ margin: 0 }}>
                  <Sparkles size={24} />
                </span>
                <div>
                  <h3 className="mx-h mx-h--md">Competenze da sviluppare</h3>
                  <p className="mx-body mx-small">Quello che impari con noi</p>
                </div>
              </div>
              <div className="mx-tags">
                {carriera.competenze.map((c) => (
                  <span key={c} className="mx-tag">
                    <Check size={15} aria-hidden="true" />
                    {c}
                  </span>
                ))}
              </div>
              <div className="mx-pos-skills__foot">
                <h4 className="mx-h mx-h--sm">Opportunità gestionali e imprenditoriali</h4>
                <p className="mx-body">
                  Per i collaboratori più meritevoli: ruoli gestionali e direzionali, ingresso in società e progetti
                  imprenditoriali insieme, con know-how, risorse umane qualificate e capitali alle spalle.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ITER DI SELEZIONE */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="05">Iter di selezione</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: `${iter.length} passi` }, { text: 'e sei dei nostri.', className: 'mx-gradient' }]} />
          </h2>
          <div className="mx-journey">
            <div className="mx-journey__track" aria-hidden="true">
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: 1.8, ease: EASE }}
              />
            </div>
            {iter.map(([t, testo], i) => (
              <Reveal key={t} className="mx-step" delay={0.2 + i * 0.25}>
                <span className="mx-step__dot">0{i + 1}</span>
                <h4 className="mx-h mx-h--sm">{t}</h4>
                <p className="mx-body">{testo}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COME CANDIDARTI */}
      <section className="mx-section mx-section--glow" id="candidati">
        <div className="mx-wrap">
          <Kicker n="06">Come candidarti</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Scrivici.' }, { text: 'Ti rispondiamo noi.', className: 'mx-outline' }]} />
          </h2>
          <div className="mx-pos-apply">
            <Reveal className="mx-panel mx-panel--yes">
              <div className="mx-panel__head">
                <span className="mx-panel__badge">
                  <Mail size={24} strokeWidth={2.6} />
                </span>
                <div>
                  <h3 className="mx-h mx-h--md">Invia la candidatura</h3>
                  <p className="mx-body mx-small">CV e documenti via email</p>
                </div>
              </div>
              <span className="mx-pos-label">Email</span>
              <a className="mx-pos-mail" href={mailto}>
                {EMAIL}
              </a>
              <span className="mx-pos-label">Oggetto</span>
              <p className="mx-pos-subject">{oggetto}</p>
            </Reveal>
            <ListPanel variant="mx-pos-panel--plus" icon={Check} title="Documenti richiesti" subtitle="Da allegare all'email" items={documenti} delay={0.12} />
          </div>
        </div>
      </section>

      <FinalCta
        kicker="Il futuro del lavoro"
        titleLines={[{ text: 'Il futuro si' }, { text: 'costruisce' }, { text: 'insieme.', className: 'mx-gradient' }]}
        text="Unisciti a un team che crede nel talento, nella crescita e nell'innovazione."
      >
        <div className="mx-ctas">
          <a className="mx-btn mx-btn--primary" href={mailto}>
            <span>
              <small>{titolo}</small>
              Invia la candidatura
            </span>
            <span className="mx-btn__icon">
              <Mail size={20} strokeWidth={2.4} />
            </span>
          </a>
          <Link to="/lavora-con-noi#posizioni" className="mx-btn mx-btn--ghost">
            <span>
              <small>Non fa per te?</small>
              Altre posizioni
            </span>
            <span className="mx-btn__icon">
              <ArrowUpRight size={20} strokeWidth={2.4} />
            </span>
          </Link>
        </div>
      </FinalCta>
    </PageShell>
  )
}

export default SchedaPosizione
