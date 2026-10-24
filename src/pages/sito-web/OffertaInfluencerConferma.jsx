import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Download, Info, Clock3, CalendarDays, BadgePercent, TicketPercent, Check, Gift } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import { MaskLines } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/offerta-influencer-conferma.css'

// Conferma dell'offerta influencer: il buono della landing torna e riceve il timbro -50%,
// con coriandoli; sotto, i prossimi passi (chiamata della segreteria o WhatsApp).

const OffertaInfluencerConferma = () => {
  // Google Ads conversion tracking
  useEffect(() => {
    // Track conversion when user reaches confirmation page
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16532564533/wZVSCMffzrAbELXUq8s9',
        'value': 45.0,
        'currency': 'EUR'
      })
      console.log('Conversion tracked: LEAD - Offerta Influencer')
    }
    // NOTE: No Facebook Pixel Lead event - as requested
  }, [])

  // SEO metadata for confirmation page
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Conferma richiesta | Offerta Influencer – Studio Osteopatico Mobilitas'

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

    const description = 'Conferma richiesta trattamento osteopatico con codice sconto influencer. Mobilitas – Studio Osteopatico Torino. Verrai richiamato dalla segreteria per confermare l\'appuntamento con lo sconto del 50%.'
    const pageUrl = `${window.location.origin}/offerta-influencer-conferma`

    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'noindex, nofollow')
    ensureMetaByName('keywords', 'offerta influencer, codice sconto influencer, osteopata torino, trattamento osteopatico')

    ensureMetaByProperty('og:title', 'Conferma richiesta | Offerta Influencer – Mobilitas')
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
    const message = `Ciao! Ho appena compilato il form per prenotare il trattamento osteopatico con il codice sconto influencer. Vorrei saltare la lista d'attesa e prenotare subito. Grazie!`
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
    <PageShell className="mx-oinfc">
      <section className="mx-oinfc-hero">
        <div className="mx-oinfc-confetti" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <motion.i
              key={i}
              style={{ left: `${(i * 37) % 100}%`, '--c': i % 3 }}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{ y: [-40, 260 + ((i * 53) % 220)], opacity: [0, 1, 1, 0], rotate: (i % 2 ? 1 : -1) * (180 + i * 20) }}
              transition={{ duration: 2.4 + (i % 5) * 0.3, ease: 'easeOut', delay: 0.5 + (i % 7) * 0.08 }}
            />
          ))}
        </div>

        <div className="mx-wrap mx-oinfc__wrap">
          <h1 className="mx-h mx-oinfc__title">
            <MaskLines immediate delay={0.1} lines={[{ text: 'Richiesta effettuata' }, { text: 'correttamente!', className: 'mx-oinfc-hl' }]} />
          </h1>

          {/* Il buono della landing torna, timbrato */}
          <motion.div
            className="mx-oinfc-coupon"
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            <div className="mx-oinfc-coupon__main">
              <p className="mx-oinfc-coupon__lead">
                Il tuo codice sconto influencer è stato registrato! 🎉
              </p>
              <p className="mx-oinfc-coupon__deal">
                💰 Il tuo sconto del 50% (45€ invece di 90€) sarà applicato automaticamente!
              </p>
              <motion.span
                className="mx-oinfc-coupon__stamp"
                aria-hidden="true"
                initial={{ scale: 2.6, opacity: 0, rotate: -40 }}
                animate={{ scale: 1, opacity: 1, rotate: -14 }}
                transition={{ type: 'spring', stiffness: 360, damping: 16, delay: 0.95 }}
              >
                <Check size={30} strokeWidth={3.4} />
                -50%
              </motion.span>
            </div>
            <div className="mx-oinfc-coupon__stub" aria-hidden="true">
              <Gift size={18} />
              <span>45€</span>
              <s>90€</s>
            </div>
          </motion.div>

          <div className="mx-oinfc-cards">
            <motion.section
              className="mx-oinfc-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            >
              <span className="mx-oinfc-card__icon mx-oinfc-card__icon--call" aria-hidden="true">
                <i />
                <Phone size={22} />
              </span>
              <h2 className="mx-h mx-h--md">Verrai chiamato dalla nostra segreteria</h2>
              <p className="mx-body">
                Ti contatteremo al numero <span className="mx-oinfc-num">3518198457</span> per confermare
                il tuo codice sconto e prenotare il giorno e l'orario che preferisci.
              </p>
              <button type="button" onClick={handleSaveNumber} className="mx-oinfc-save">
                <Download size={18} strokeWidth={2.4} />
                Salva il numero
              </button>
            </motion.section>

            <motion.section
              className="mx-oinfc-card mx-oinfc-card--wa"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            >
              <span className="mx-oinfc-card__icon mx-oinfc-card__icon--wa" aria-hidden="true">
                <WhatsAppIcon size={22} />
              </span>
              <h3 className="mx-h mx-h--md">Vuoi saltare la lista d'attesa?</h3>
              <p className="mx-body">
                Se vuoi prenotare subito senza aspettare la chiamata, scrivici su WhatsApp!
                Ricorda di menzionare il tuo codice sconto influencer.
              </p>
              <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={handleWhatsAppClick} className="mx-btn mx-btn--primary mx-oinfc-wa">
                <span>
                  <span className="mx-oinfc-wa__main">Salta la lista d'attesa</span>
                  <small>Scrivici su WhatsApp</small>
                </span>
                <span className="mx-btn__icon"><WhatsAppIcon size={20} /></span>
              </motion.button>
            </motion.section>
          </div>

          <motion.aside
            className="mx-oinfc-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
          >
            <h4 className="mx-oinfc-info__title">
              <Info size={18} />
              Informazioni utili
            </h4>
            <ul>
              <li><Clock3 size={16} />La nostra segreteria ti chiamerà entro 24 ore</li>
              <li><CalendarDays size={16} />Puoi prenotare per qualsiasi giorno della settimana</li>
              <li><TicketPercent size={16} />Il codice sconto influencer ti dà diritto al 50% di sconto (45€ invece di 90€)</li>
              <li><BadgePercent size={16} />L'offerta è valida solo per {offerMonth}</li>
            </ul>
          </motion.aside>
        </div>
      </section>
    </PageShell>
  )
}

export default OffertaInfluencerConferma
