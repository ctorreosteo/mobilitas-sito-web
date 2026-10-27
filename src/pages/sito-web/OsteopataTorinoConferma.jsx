import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Download, Info, Clock3, CalendarDays, BadgePercent } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import { MaskLines } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import PrenotaVisita from '../../components/prenota-visita/PrenotaVisita'
import { leggiRichiesta } from '../../components/prenota-visita/richiestaSalvata'
import { prenotataDi, whatsappConferma } from '../../components/prenota-visita/whatsappConferma'
import RecensioniDolore from '../../components/recensioni-tag/RecensioniDolore'
import '../../styles/pages/osteopata-torino-conferma.css'

// Conferma della landing Google (e di /offerta-yt): la spunta si disegna, poi i prossimi passi
// in ordine — la chiamata della segreteria (il telefono "squilla") e la scorciatoia WhatsApp.
// Come la conferma cervicalgia: se arriva dal form di /osteopata-torino c'è il calendario della prima visita
// (WhatsApp diventa l'aiuto secondario) e in fondo le recensioni. Da /offerta-yt, o aprendo il link a mano, no.

const OsteopataTorinoConferma = () => {
  const [richiesta] = useState(() => {
    const r = leggiRichiesta()
    return r?.pageContext === 'osteopata-torino' ? r : null
  })
  const conCalendario = !!(richiesta?.id && richiesta?.token)
  const [prenotata, setPrenotata] = useState(() => prenotataDi(richiesta))
  const wa = whatsappConferma({ dolore: null, conCalendario, prenotata })

  // Google Ads conversion tracking
  useEffect(() => {
    // Track conversion when user reaches confirmation page
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16532564533/wZVSCMffzrAbELXUq8s9',
        'value': 49.0,
        'currency': 'EUR'
      })
      console.log('Conversion tracked: LEAD - Osteopata Torino')
    }
  }, [])

  // SEO metadata for confirmation page
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Conferma richiesta | Osteopata Torino – Studio Osteopatico Mobilitas'

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

    const description = 'Conferma richiesta trattamento osteopatico. Mobilitas – Studio Osteopatico Torino (mal di schiena, cervicale, sciatalgia, emicrania, postura). Verrai richiamato dalla segreteria o contattaci su WhatsApp.'
    const pageUrl = `${window.location.origin}/osteopata-torino-conferma`

    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'noindex, nofollow')
    ensureMetaByName('keywords', 'osteopata torino, studio osteopatico torino, osteopatia, mal di schiena, cervicale, sciatalgia, emicrania, postura, prima visita 49€')

    ensureMetaByProperty('og:title', 'Conferma richiesta | Osteopata Torino – Mobilitas')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    ensureCanonical(pageUrl)

    return () => {
      document.title = prevTitle
    }
  }, [])

  const handleWhatsAppClick = () => {
    const message =
      wa?.messaggio ??
      `Ciao! Ho appena compilato il form per prenotare il trattamento osteopatico con l'offerta. Vorrei saltare la lista d'attesa e prenotare subito. Grazie!`
    const whatsappUrl = `https://wa.me/393518198457?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Salva il numero della segreteria in rubrica (vCard)
  const handleSaveNumber = () => {
    const phoneNumber = '393518198457'
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Mobilitas Segreteria\nTEL:${phoneNumber}\nEND:VCARD`
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mobilitas-segreteria.vcf'
    link.click()
    URL.revokeObjectURL(url)
  }

  const offerMonth = new Date().toLocaleDateString('it-IT', { month: 'long' })

  return (
    <PageShell className="mx-otc">
      <section className="mx-otc-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="mx-wrap mx-otc__wrap">
          {/* Spunta che si disegna, con un piccolo scoppio di luce */}
          <div className="mx-otc-check" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.i
                key={i}
                className="mx-otc-check__ray"
                style={{ rotate: `${i * 30}deg` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
              />
            ))}
            <svg viewBox="0 0 120 120">
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#72fa93"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              />
              <motion.circle
                cx="60"
                cy="60"
                r="46"
                fill="#72fa93"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.55 }}
                style={{ transformOrigin: '60px 60px' }}
              />
              <motion.path
                d="M38 62 L 53 77 L 83 45"
                fill="none"
                stroke="#002552"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
              />
            </svg>
          </div>

          <h1 className="mx-h mx-otc__title">
            <MaskLines immediate delay={0.3} lines={[{ text: 'Richiesta effettuata' }, { text: 'correttamente!', className: 'mx-gradient' }]} />
          </h1>

          {conCalendario && <PrenotaVisita richiesta={richiesta} onPrenotata={setPrenotata} />}

          {/* I prossimi passi */}
          <ol className="mx-otc-steps">
            <motion.li
              className="mx-otc-step mx-otc-step--call"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            >
              <span className="mx-otc-step__mark mx-otc-ring" aria-hidden="true">
                <i />
                <i />
                <Phone size={22} />
              </span>
              <div className="mx-otc-step__body">
                {prenotata ? (
                  <>
                    <h2 className="mx-h mx-h--md">Ti aspettiamo in studio</h2>
                    <p className="mx-body">
                      La tua prima visita è prenotata. Salva il nostro numero <span className="mx-otc-num">3518198457</span>: se hai bisogno, ci trovi lì.
                    </p>
                  </>
                ) : conCalendario ? (
                  <>
                    <h2 className="mx-h mx-h--md">Se preferisci, ti chiamiamo noi</h2>
                    <p className="mx-body">
                      Se non scegli giorno e ora qui sopra, ti contattiamo dal numero <span className="mx-otc-num">3518198457</span> per
                      fissare la visita insieme.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="mx-h mx-h--md">Verrai chiamato dalla nostra segreteria</h2>
                    <p className="mx-body">
                      Ti contatteremo al numero <span className="mx-otc-num">3518198457</span> per prenotare
                      il giorno e l'orario che preferisci.
                    </p>
                  </>
                )}
                <button type="button" onClick={handleSaveNumber} className="mx-otc-save">
                  <Download size={18} strokeWidth={2.4} />
                  Salva il numero
                </button>
              </div>
            </motion.li>

            <motion.li
              className="mx-otc-step mx-otc-step--wa"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            >
              <span className="mx-otc-step__mark mx-otc-step__mark--wa" aria-hidden="true">
                <WhatsAppIcon size={22} />
              </span>
              <div className="mx-otc-step__body">
                {/* Con il calendario WhatsApp è l'aiuto secondario, non un'alternativa alla prenotazione */}
                <h3 className="mx-h mx-h--md">
                  {prenotata ? 'Hai un imprevisto?' : conCalendario ? 'Nessun orario ti va bene?' : "Vuoi saltare la lista d'attesa?"}
                </h3>
                <p className="mx-body">
                  {prenotata
                    ? 'Scrivici su WhatsApp e ti aiutiamo.'
                    : conCalendario
                      ? 'Scrivici su WhatsApp e troviamo insieme un orario comodo.'
                      : 'Se vuoi prenotare subito senza aspettare la chiamata, scrivici su WhatsApp!'}
                </p>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppClick}
                  className={`mx-btn ${wa ? 'mx-btn--ghost' : 'mx-btn--primary'} mx-otc-wa`}
                >
                  <span>
                    <span className="mx-otc-wa__main">{wa ? 'Scrivici su WhatsApp' : "Salta la lista d'attesa"}</span>
                    {!wa && <small>Scrivici su WhatsApp</small>}
                  </span>
                  <span className="mx-btn__icon"><WhatsAppIcon size={20} /></span>
                </motion.button>
              </div>
            </motion.li>
          </ol>

          <motion.aside
            className="mx-otc-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
          >
            <h4 className="mx-otc-info__title">
              <Info size={18} />
              Informazioni utili
            </h4>
            <ul>
              {!prenotata && (
                <li>
                  <Clock3 size={16} />
                  {conCalendario ? 'Se non prenoti qui, la segreteria ti chiama entro 24 ore' : 'La nostra segreteria ti chiamerà entro 24 ore'}
                </li>
              )}
              <li><CalendarDays size={16} />Puoi prenotare per qualsiasi giorno della settimana</li>
              <li><BadgePercent size={16} />L'offerta è valida solo per {offerMonth}</li>
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* Recensioni dal gestionale, a caso con le parole dei dolori evidenziate (la landing non è su un dolore solo) */}
      <section className="mx-section mx-section--deep mx-otc-reviews">
        <RecensioniDolore dolore={null} />
      </section>
    </PageShell>
  )
}

export default OsteopataTorinoConferma
