import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Phone, Clock } from 'lucide-react'
import Dialog, { DialogHeader } from '../ui/Dialog'

// Utility functions for date and time formatting
const formatCurrentDate = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  
  return `${day}/${month}/${year}`
}

const formatCurrentTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  return `${hours}:${minutes}`
}

// initialWeek: settimana già scelta nella pagina (es. '21-24'), precompila il campo
export default function BookingPopup({ isOpen, onClose, initialWeek = '' }) {
  const uid = useId()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pregnancyWeek: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // All'apertura porta nel form la settimana scelta nella pagina, se il campo è ancora vuoto
  const [lastOpen, setLastOpen] = useState(false)
  if (isOpen !== lastOpen) {
    setLastOpen(isOpen)
    if (isOpen && initialWeek && !formData.pregnancyWeek) {
      setFormData((prev) => ({ ...prev, pregnancyWeek: initialWeek }))
    }
  }
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(false)
    
    try {
      // Clean and format the form data
      const cleanedData = {
        data: formatCurrentDate(),
        orario: formatCurrentTime(),
        nome: formData.firstName.trim(),
        cognome: formData.lastName.trim(),
        telefono: formData.phone.trim(),
        email: formData.email.trim(),
        settimana_gravidanza: formData.pregnancyWeek,
        fonte: 'Gravidanza'
      }
      
      console.log('Sending data to Zapier:', cleanedData)
      
      // Send data to Zapier webhook (same format as walk popup)
      const response = await fetch('https://hooks.zapier.com/hooks/catch/19401274/u1twbuc/', {
        method: 'POST',
        body: JSON.stringify(cleanedData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Zapier webhook response:', result)
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          pregnancyWeek: ''
        })
        onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error sending data to Zapier:', error)
      setIsSubmitting(false)
      setSubmitError(true)
    }
  }

  const WEEKS = ['1-4', '5-8', '9-12', '13-16', '17-20', '21-24', '25-28', '29-32', '33-36', '37-40']

  return (
    <Dialog isOpen={isOpen} onClose={onClose} closeDisabled={isSubmitting} title="Prenota il tuo trattamento">
      {!isSubmitted ? (
        <>
          <DialogHeader
            title="Prenota il tuo trattamento"
            text={
              <>
                Compila il form e la nostra segretaria ti chiamerà <strong>entro 24h lavorative</strong> per prenotare
                l'appuntamento quando sei comoda
              </>
            }
          />

          <form className="mx-dlg-form" onSubmit={handleSubmit}>
            <div className="mx-dlg-row mx-dlg-row--2">
              <div className="mx-dlg-field">
                <label className="mx-dlg-label" htmlFor={`${uid}-nome`}>Nome *</label>
                <input
                  className="mx-dlg-input"
                  id={`${uid}-nome`}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  autoComplete="given-name"
                  placeholder="Nome"
                />
              </div>
              <div className="mx-dlg-field">
                <label className="mx-dlg-label" htmlFor={`${uid}-cognome`}>Cognome *</label>
                <input
                  className="mx-dlg-input"
                  id={`${uid}-cognome`}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  autoComplete="family-name"
                  placeholder="Cognome"
                />
              </div>
            </div>

            <div className="mx-dlg-field">
              <label className="mx-dlg-label" htmlFor={`${uid}-tel`}>Numero di telefono *</label>
              <input
                className="mx-dlg-input"
                id={`${uid}-tel`}
                type="tel"
                inputMode="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                autoComplete="tel"
                placeholder="Il tuo numero di telefono"
              />
            </div>

            <div className="mx-dlg-field">
              <label className="mx-dlg-label" htmlFor={`${uid}-email`}>Email *</label>
              <input
                className="mx-dlg-input"
                id={`${uid}-email`}
                type="email"
                inputMode="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                placeholder="La tua email"
              />
            </div>

            <div className="mx-dlg-field">
              <label className="mx-dlg-label" htmlFor={`${uid}-week`}>Settimana di gravidanza</label>
              <select
                className="mx-dlg-select"
                id={`${uid}-week`}
                name="pregnancyWeek"
                value={formData.pregnancyWeek}
                onChange={handleInputChange}
              >
                <option value="">Seleziona la settimana</option>
                {WEEKS.map((w) => (
                  <option key={w} value={w}>{w} settimane</option>
                ))}
              </select>
            </div>

            {submitError && (
              <p className="mx-dlg-error" role="alert">
                ❌ Errore nell'invio della richiesta. Riprova o contattaci direttamente al +39 3518198457
              </p>
            )}

            <button type="submit" className="mx-dlg-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mx-dlg-spinner" aria-hidden="true" />
                  Invio in corso...
                </>
              ) : (
                <>
                  Invia richiesta
                  <ArrowRight size={20} strokeWidth={2.6} />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="mx-dlg-done" role="status">
          <motion.span
            className="mx-dlg-done__icon"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <Check size={34} strokeWidth={3} />
          </motion.span>
          <DialogHeader
            title="Richiesta inviata!"
            text={
              <>
                La nostra segretaria ti chiamerà <strong>entro 24h lavorative</strong> per prenotare l'appuntamento quando sei
                comoda.
              </>
            }
          />
          <div className="mx-dlg-done__info">
            <p>
              <Phone size={16} />
              <span>
                <strong>Numero di telefono:</strong> +39 3518198457
              </span>
            </p>
            <p>
              <Clock size={16} />
              <span>
                <strong>Orari:</strong> Lun-Ven 9:00-19:00, Sab 9:00-13:00
              </span>
            </p>
          </div>
        </div>
      )}
    </Dialog>
  )
}
