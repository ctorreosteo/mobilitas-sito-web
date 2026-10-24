import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Check, CreditCard, Handshake, MessageCircle, Target, Ticket } from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal } from '../../../components/home-sections/HomeKit'
import { EASE, MSG_CONSULTO, openWhatsApp, trackSpotlight } from '../../../components/home-sections/homeMotion'
import { ParallaxPhoto, SectionHead } from '../../../components/site/partnership/PartnerKit'
import '../../../styles/pages/partner-edenred.css'

const advantages = [
  'Utilizzo dei welfare aziendali per i nostri servizi',
  'Scontistiche specifiche per i titolari di voucher Edenred',
  'Accesso facilitato ai trattamenti osteopatici',
  'Benefici per il benessere di tutti i lavoratori',
]

const steps = [
  {
    step: '1',
    title: 'Accedi alla piattaforma Edenred',
    description: 'Accedi alla piattaforma welfare della tua azienda e genera un voucher per i nostri servizi',
  },
  {
    step: '2',
    title: 'Prenota il tuo appuntamento',
    description: 'Contattaci per prenotare la tua visita presso il nostro studio',
  },
  {
    step: '3',
    title: 'Presenta il voucher al pagamento',
    description: 'Al momento del pagamento, presenta il voucher generato dalla piattaforma Edenred per usufruire delle scontistiche',
  },
  {
    step: '4',
    title: 'Goditi il benessere',
    description: 'Ricevi i nostri trattamenti osteopatici e servizi di benessere con i vantaggi della convenzione',
  },
]

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

// Codice a barre decorativo
const Barcode = () => (
  <span className="mx-ed-barcode" aria-hidden="true">
    {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2].map((w, i) => (
      <i key={i} style={{ width: w * 2 }} />
    ))}
  </span>
)

const Edenred = () => (
  <PageShell className="mx-ed">
    {/* HERO: il voucher */}
    <section className="mx-ed-hero">
      <div className="mx-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="mx-wrap mx-ed-hero__layout">
        <div className="mx-ed-hero__copy mx-pk-fitbox">
          <motion.div {...fade(0.1)}>
            <Kicker>Convenzione Welfare</Kicker>
          </motion.div>
          <h1 className="mx-h mx-h--xl mx-ed-hero__title">
            <MaskLines
              immediate
              delay={0.2}
              lines={[
                { text: 'Convenzione con', className: 'mx-ed-hero__pre' },
                { text: 'Edenred', className: 'mx-pk-name mx-gradient' },
              ]}
            />
          </h1>
          <motion.p className="mx-lead mx-ed-hero__lead" {...fade(0.55)}>
            Puoi utilizzare i welfare aziendali Edenred per i nostri servizi di osteopatia e benessere
          </motion.p>
          <motion.div className="mx-ctas mx-ed-hero__ctas" {...fade(0.7)}>
            <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
              <span>
                <small>Prenota un</small>
                Consulto gratuito
              </span>
              <span className="mx-btn__icon">
                <MessageCircle size={20} strokeWidth={2.4} />
              </span>
            </button>
            <a className="mx-btn mx-btn--ghost" href="#come-funziona">
              <span>
                <small>Come Funziona</small>
                Come utilizzare la convenzione
              </span>
              <span className="mx-btn__icon">
                <ArrowDown size={20} strokeWidth={2.4} />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Il voucher */}
        <motion.div
          className="mx-ed-ticket-wrap"
          initial={{ opacity: 0, y: 60, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
          aria-hidden="true"
        >
          <div className="mx-ed-ticket">
            <div className="mx-ed-ticket__main">
              <span className="mx-ed-ticket__label">
                <Ticket size={16} /> Convenzione Welfare
              </span>
              <span className="mx-ed-ticket__title">
                Mobilitas
                <br />
                <span>× Edenred</span>
              </span>
              <span className="mx-ed-ticket__line">Welfare aziendali · Osteopatia e benessere</span>
              <Barcode />
            </div>
            <div className="mx-ed-ticket__stub">
              <img src="/pittogramma.png" alt="" />
              <span>Voucher</span>
            </div>
          </div>
          <span className="mx-ed-ticket-shadow" />
        </motion.div>
      </div>
    </section>

    {/* LA CONVENZIONE */}
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <SectionHead
          n="01"
          kicker="La Convenzione"
          lines={[{ text: 'Perché abbiamo scelto' }, { text: 'Edenred', className: 'mx-gradient' }]}
          lead="Una scelta strategica per rendere i nostri servizi accessibili a tutti attraverso i welfare aziendali"
        />

        <div className="mx-ed-why">
          <Reveal className="mx-card mx-ed-why__card" onMouseMove={trackSpotlight}>
            <span className="mx-card__icon">
              <CreditCard size={24} />
            </span>
            <h3 className="mx-h mx-h--md">Accessibilità per Tutti</h3>
            <p className="mx-lead">
              Abbiamo deciso di fare la convenzione con <strong>Edenred</strong> per dare la possibilità a tutti quanti di usare i <strong>welfare aziendali</strong> per usufruire dei nostri servizi con scontistiche specifiche. Un modo per rendere il benessere accessibile a tutti i lavoratori.
            </p>
          </Reveal>

          <div className="mx-ed-coupons">
            <h3 className="mx-h mx-h--sm mx-ed-coupons__title">
              <Target size={20} aria-hidden="true" /> Vantaggi della Convenzione
            </h3>
            <ul>
              {advantages.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.08} y={24} className="mx-ed-coupon">
                  <span className="mx-ed-coupon__check" aria-hidden="true">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span className="mx-ed-coupon__text">{a}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Chiusura con foto dello studio */}
        <div className="mx-ed-band">
          <ParallaxPhoto base="/home/web/home3" alt="Un trattamento osteopatico nello Studio Mobilitas" sizes="(min-width: 900px) 640px, 100vw" className="mx-ed-band__photo" />
          <Reveal className="mx-ed-band__text">
            <span className="mx-ed-band__icon" aria-hidden="true">
              <Handshake size={24} />
            </span>
            <h3 className="mx-h mx-h--md">Benessere accessibile per tutti</h3>
            <p className="mx-lead">
              Grazie alla convenzione con Edenred, tutti i lavoratori possono accedere ai nostri servizi di benessere utilizzando i welfare aziendali, rendendo la cura della salute più accessibile e conveniente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* COME FUNZIONA: la striscia di biglietti */}
    <section id="come-funziona" className="mx-section mx-section--deep">
      <div className="mx-wrap">
        <SectionHead
          n="02"
          kicker="Come Funziona"
          lines={[{ text: 'Come utilizzare' }, { text: 'la convenzione', className: 'mx-gradient' }]}
          lead="Passaggi semplici per accedere ai nostri servizi con i welfare aziendali"
        />

        <ol className="mx-ed-strip">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.12} className="mx-ed-stub">
              <span className="mx-ed-stub__n" aria-hidden="true">
                {s.step.padStart(2, '0')}
              </span>
              <span className="mx-pk-sr">Passo {s.step}: </span>
              <h3 className="mx-h mx-h--sm">{s.title}</h3>
              <p className="mx-body">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <FinalCta
      kicker="Mobilitas × Edenred"
      titleLines={[{ text: 'Prenota il tuo' }, { text: 'appuntamento.', className: 'mx-gradient' }]}
      text="Contattaci per prenotare la tua visita presso il nostro studio"
    />
  </PageShell>
)

export default Edenred
