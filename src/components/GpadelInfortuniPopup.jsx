import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE
  || 'https://mobilitas-backend-990845221858.europe-west8.run.app'

const cleanName = (name) =>
  name.trim().replace(/\s+/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

const parseCellulare = (raw) => {
  const s = raw.trim().replace(/\s+/g, '').replace(/[-.]/g, '')
  if (!s) return { prefissoCellulare: '+39', cellulare: '' }
  if (s.startsWith('+')) {
    const match = s.match(/^(\+\d{1,4})(\d+)$/)
    if (match) return { prefissoCellulare: match[1], cellulare: match[2] }
    const digits = s.replace(/\D/g, '')
    const pref = digits.length >= 2 ? '+' + digits.slice(0, 2) : '+39'
    const num = digits.slice(2).replace(/^0+/, '') || digits
    return { prefissoCellulare: pref, cellulare: num }
  }
  return { prefissoCellulare: '+39', cellulare: s.replace(/\D/g, '') }
}

export default function GpadelInfortuniPopup({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})
    
    const errors = {}
    
    // Validazione nome
    if (!formData.nome.trim() || formData.nome.length < 2) {
      errors.nome = 'Il nome deve essere di almeno 2 caratteri'
    }
    
    // Validazione cognome
    if (!formData.cognome.trim() || formData.cognome.length < 2) {
      errors.cognome = 'Il cognome deve essere di almeno 2 caratteri'
    }
    
    // Validazione cellulare
    if (!formData.cellulare.trim() || formData.cellulare.length < 10) {
      errors.cellulare = 'Inserisci un numero di cellulare valido'
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Inserisci un indirizzo email valido'
    }
    
    // Validazione privacy
    if (!formData.privacy) {
      errors.privacy = 'Devi accettare la privacy policy'
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      email: formData.email.trim(),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      fonteString: 'GPADEL',
      leadMagnetString: 'GPADEL_39',
      leadMagnetRequestedString: 'GPADEL_39',
      tag: 'PADEL',
      note: 'Pagina: lm-gpadel-infortuni. Guida Infortuni Padel gratuita.'
    }

    try {
      const response = await fetch(`${API_BASE}/api/richieste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const json = await response.json()
      if (!response.ok || !json.success) {
        throw new Error(json.error || json.message || `Errore ${response.status}`)
      }

      setIsSubmitting(false)
      onClose()
      navigate('/lm-gpadel-infortuni-grazie')
    } catch (error) {
      console.error('API richieste:', error)
      setFormErrors({ submit: error.message || 'Si è verificato un errore durante l\'invio. Riprova più tardi.' })
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            if (!isSubmitting) {
              onClose()
            }
          }}
          disabled={isSubmitting}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-dark mb-4">Compila il form</h3>
          <p className="text-blue-dark/70 text-sm leading-relaxed">
            Dopo che avrai compilato il form, la nostra segreteria farà un controllo manuale che si tratti di una richiesta vera e ti inverà la guida gratuita. 
            Compila subito il form! 👇🏼
          </p>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="nome"
                placeholder="Nome *"
                value={formData.nome}
                onChange={handleInputChange}
                required
                minLength={2}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${
                  formErrors.nome ? 'border-red-500' : 'border-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {formErrors.nome && <p className="text-red-500 text-xs mt-1">{formErrors.nome}</p>}
            </div>
            <div>
              <input
                type="text"
                name="cognome"
                placeholder="Cognome *"
                value={formData.cognome}
                onChange={handleInputChange}
                required
                minLength={2}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${
                  formErrors.cognome ? 'border-red-500' : 'border-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {formErrors.cognome && <p className="text-red-500 text-xs mt-1">{formErrors.cognome}</p>}
            </div>
          </div>
          
          <div>
            <input
              type="tel"
              name="cellulare"
              placeholder="Cellulare *"
              value={formData.cellulare}
              onChange={handleInputChange}
              required
              minLength={10}
              pattern="[0-9+\s\-\(\)]+"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${
                formErrors.cellulare ? 'border-red-500' : 'border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {formErrors.cellulare && <p className="text-red-500 text-xs mt-1">{formErrors.cellulare}</p>}
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
          
          <div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="privacy"
                id="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="privacy" className="text-xs text-gray-600 leading-relaxed">
                Accetto la <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">privacy policy</a> e autorizzo il trattamento dei miei dati personali
              </label>
            </div>
            {formErrors.privacy && <p className="text-red-500 text-xs mt-1">{formErrors.privacy}</p>}
          </div>

          {formErrors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm">{formErrors.submit}</p>
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-green-600 transition-all font-montserrat disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              {isSubmitting ? 'Invio in corso...' : 'Scarica la guida gratis'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

