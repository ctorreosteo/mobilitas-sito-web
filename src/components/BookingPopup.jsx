import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Utility functions for data cleaning
const cleanName = (name) => {
  return name.trim().replace(/\s+/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

const cleanPhone = (phone) => {
  return phone.trim().replace(/\s+/g, '')
}

// In dev: '' così le chiamate vanno a /api/... (stesso origin) e il proxy Vite le inoltra a hq.studiomobilitas.it/api/...
// In prod: base completa (se il backend abilita CORS per il tuo dominio, altrimenti serve proxy lato server)
// Nota: usiamo VITE_API_BASE per poter cambiare rapidamente endpoint senza toccare il codice.
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

/** Estrae prefisso (es. +39) e numero solo cifre per l'API richieste */
function parseCellulare(raw) {
  const s = cleanPhone(raw).replace(/[-.]/g, '')
  if (!s) return { prefissoCellulare: '+39', cellulare: '' }
  if (s.startsWith('+')) {
    const match = s.match(/^(\+\d{1,4})(\d+)$/)
    if (match) return { prefissoCellulare: match[1], cellulare: match[2] }
    const digits = s.replace(/\D/g, '')
    const pref = digits.length >= 2 ? '+' + digits.slice(0, 2) : '+39'
    const num = digits.slice(2).replace(/^0+/, '') || digits
    return { prefissoCellulare: pref, cellulare: num }
  }
  const digits = s.replace(/\D/g, '')
  return { prefissoCellulare: '+39', cellulare: digits }
}

const formatCurrentDate = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

// Contesto "visita" = prima visita / landing cliniche (senza pacchetto camminata)
const isLandingVisita = (pageContext) =>
  pageContext === 'cervicalgia' ||
  pageContext === 'reflusso' ||
  pageContext === 'vertigini' ||
  pageContext === 'bruxismo' ||
  pageContext === 'cicatrici-cesareo' ||
  pageContext === 'cicatrici-seno' ||
  pageContext === 'ciclo-doloroso' ||
  pageContext === 'fibromialgia' ||
  pageContext === 'menopausa'

const isVisitaContext = (packageType, pageContext) =>
  !packageType || isLandingVisita(pageContext)

// ctaType: 'consulto' = consulto gratuito, 'primaVisita' = prima visita con sconto
function getPopupCopy(packageType, pageContext, ctaType) {
  const isLanding = isLandingVisita(pageContext)
  const isConsulto = isLanding && ctaType === 'consulto'
  const isPrimaVisita = isLanding && (ctaType === 'primaVisita' || !ctaType)
  const isVisita = isVisitaContext(packageType, pageContext) && !isConsulto

  if (isConsulto) {
    return {
      title: 'Richiedi consulto telefonico gratuito',
      subtitle: 'Consulenza gratuita',
      subtext: 'La nostra segreteria ti chiamerà per un breve colloquio gratuito e darti tutte le informazioni.',
      cta: 'Richiedi consulto gratuito',
      pacchettoLabel: 'Consulto gratuito',
    }
  }

  if (isPrimaVisita) {
    return {
      title: 'Richiedi prima visita con sconto',
      subtitle: 'Prima visita a 49€',
      subtext: 'La nostra segreteria ti chiamerà per confermare l\'appuntamento e darti tutte le informazioni.',
      cta: 'Richiedi prima visita con sconto',
      pacchettoLabel: 'Prima visita',
    }
  }

  return {
    title: 'Prenota il tuo posto',
    subtitle: packageType === 'base' ? 'Pacchetto Base - 5€' : 'Pacchetto Premium - 39€',
    subtext: 'La nostra segreteria ti chiamerà per darti tutti i dettagli della camminata.',
    cta: 'Sì, voglio partecipare alla camminata',
    pacchettoLabel: packageType === 'base' ? 'Pacchetto Base - 5€' : packageType === 'premium' ? 'Pacchetto Premium - 39€' : 'Pacchetto non specificato',
  }
}

export default function BookingPopup({ isOpen, onClose, packageType, pageContext, ctaType }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    orarioChiamata: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const copy = getPopupCopy(packageType, pageContext, ctaType)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const orarioSelect = document.getElementById('orarioChiamata')
    const selectedOption = orarioSelect?.options[orarioSelect.selectedIndex]
    const orarioText = selectedOption ? selectedOption.text : formData.orarioChiamata

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const leadMagnetString =
      isLandingVisita(pageContext) && ctaType === 'consulto' ? 'CT_GRATUITA' : 'COUPON49'

    const tagByContext = {
      cervicalgia: 'Cervicalgia',
      reflusso: 'Reflusso',
      vertigini: 'Vertigini',
      bruxismo: 'Bruxismo',
      'cicatrici-cesareo': 'CicatriciCesareo',
      'cicatrici-seno': 'CicatriciSeno',
      'ciclo-doloroso': 'CicloDoloroso',
      fibromialgia: 'Fibromialgia',
      menopausa: 'Menopausa',
    }

    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      fonteString: pageContext === 'bruxismo' ? 'SOCIAL_ADS' : 'GOOGLE_ADS',
      leadMagnetString,
      ...(tagByContext[pageContext] && { tag: tagByContext[pageContext] }),
      note: orarioText ? `Orario richiesta: ${orarioText}` : undefined,
    }

    try {
      const response = await fetch(`${API_BASE}/api/richieste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || json.message || `Errore ${response.status}`)
      }

      setIsSubmitting(false)
      setFormData({ nome: '', cognome: '', cellulare: '', orarioChiamata: '' })
      setIsSubmitted(false)
      setError(null)
      onClose()
      navigate(pageContext === 'cervicalgia' ? '/cervicalgia/conferma' : '/conferma-richiesta')
    } catch (err) {
      console.error('API richieste:', err)
      setError(err.message || 'Si è verificato un errore. Riprova più tardi.')
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false)
      setError(null)
      setFormData({ nome: '', cognome: '', cellulare: '', orarioChiamata: '' })
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 font-montserrat"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-blue-dark border border-green rounded-2xl shadow-2xl w-full max-w-[92vw] sm:max-w-[400px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - compatto su mobile */}
            <div className="relative bg-blue-dark p-3 pb-2 sm:p-5 sm:pb-4 border-b border-green/20">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50 bg-black/30 border-2 border-green text-cream hover:bg-green/20"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="text-center pr-7 sm:pr-8">
                <h2 className="text-lg sm:text-xl font-black text-green mb-0.5 sm:mb-1 leading-tight">
                  {copy.title}
                </h2>
                <p className="text-sm sm:text-sm font-bold text-cream/90 mb-0.5 sm:mb-1">
                  {copy.subtitle}
                </p>
                <p className="text-xs sm:text-xs text-cream/80 font-medium italic leading-snug">
                  {copy.subtext}
                </p>
              </div>
            </div>

            {/* Content - form compatto su mobile */}
            <div className="p-3 sm:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="nome" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-green/90">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="input-premium input-compact w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl text-cream font-medium text-sm sm:text-[15px] placeholder-cream/30 transition-all duration-300"
                      placeholder="Mario"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="cognome" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-green/90">
                      Cognome *
                    </label>
                    <input
                      type="text"
                      id="cognome"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleInputChange}
                      required
                      className="input-premium input-compact w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl text-cream font-medium text-sm sm:text-[15px] placeholder-cream/30 transition-all duration-300"
                      placeholder="Rossi"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="cellulare" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-green/90">
                      Cellulare *
                    </label>
                    <input
                      type="tel"
                      id="cellulare"
                      name="cellulare"
                      value={formData.cellulare}
                      onChange={handleInputChange}
                      required
                      className="input-premium input-compact w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl text-cream font-medium text-sm sm:text-[15px] placeholder-cream/30 transition-all duration-300"
                      placeholder="+39 333 123 4567"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="orarioChiamata" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-green/90">
                      Orario *
                    </label>
                    <select
                      id="orarioChiamata"
                      name="orarioChiamata"
                      value={formData.orarioChiamata}
                      onChange={handleInputChange}
                      required
                      className="input-premium select-premium input-compact w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl text-cream font-medium text-sm sm:text-[15px] transition-all duration-300 appearance-none cursor-pointer [&>option]:bg-[#001a3d] [&>option]:text-cream"
                    >
                      <option value="">Seleziona fascia oraria</option>
                      <option value="mattina">Mattina (9:00 – 12:00)</option>
                      <option value="pausa-pranzo">Pausa pranzo (13:00 – 14:00)</option>
                      <option value="pomeriggio">Pomeriggio (14:00 – 18:00)</option>
                      <option value="sera">Sera (18:00 – 20:00)</option>
                      <option value="qualsiasi">Qualsiasi orario</option>
                    </select>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-400/30 bg-red-500/10"
                    >
                      <p className="text-red-200/90 text-xs sm:text-sm font-medium">{error}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.nome.trim() || !formData.cognome.trim() || !formData.cellulare.trim() || !formData.orarioChiamata}
                    className="cta-popup-brand w-full text-blue-dark py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base tracking-wide shadow-[0_4px_20px_rgba(114,250,147,0.25)] hover:shadow-[0_6px_28px_rgba(114,250,147,0.35)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-dark border-t-transparent rounded-full animate-spin" />
                        <span>Invio in corso...</span>
                      </div>
                    ) : (
                      copy.cta
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4 sm:py-8"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                      className="text-blue-dark text-xl sm:text-2xl font-bold"
                    >
                      ✓
                    </motion.div>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-cream mb-2 sm:mb-4">
                    Prenotazione confermata!
                  </h3>

                  <p className="text-cream/80 text-sm sm:text-base mb-4 sm:mb-6">
                    Grazie <strong className="text-green">{formData.nome}</strong>! Ti contatteremo al numero <strong className="text-green">{formData.cellulare}</strong> entro 24 ore.
                    {formData.orarioChiamata && (
                      <span className="block mt-1 sm:mt-2">
                        Ti chiameremo preferibilmente <strong className="text-green">{formData.orarioChiamata}</strong>.
                      </span>
                    )}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs sm:text-sm text-cream/50"
                  >
                    Questo popup si chiuderà automaticamente...
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
