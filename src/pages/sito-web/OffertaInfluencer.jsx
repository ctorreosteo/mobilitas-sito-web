import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

const OffertaInfluencer = () => {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentMonth, setCurrentMonth] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    codiceSconto: '',
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    // Get current month name in Italian
    const months = [
      'GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO',
      'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'
    ]
    setCurrentMonth(months[new Date().getMonth()])
  }, [])

  // Handle ESC key to close form
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showForm) {
        setShowForm(false)
      }
    }

    if (showForm) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [showForm])

  // SEO metadata for Offerta Influencer landing page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Offerta Influencer | Mobilitas Studio Osteopatico Torino'

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

    const description = 'Offerta esclusiva per chi arriva dagli influencer: 50% di sconto sul trattamento osteopatico con codice sconto. Da 90€ a 45€. Prenota ora con il codice del tuo influencer preferito.'
    const pageUrl = `${window.location.origin}/offerta-influencer`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'offerta influencer, trattamento osteopatico influencer, osteopata torino influencer, collaborazione influencer')

    // Open Graph
    ensureMetaByProperty('og:title', 'Offerta Influencer | Mobilitas Studio Osteopatico Torino')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!') // Debug log
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
    setSubmitError('')

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const codiceSconto = formData.codiceSconto.trim()
    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      email: formData.email.trim(),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      fonteString: 'INFLUENCER_MARKETING',
      leadMagnetString: 'COUPON45',
      leadMagnetRequestedString: 'COUPON45',
      note: `codice sconto inserito: ${codiceSconto}`
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

      navigate('/offerta-influencer-conferma')
    } catch (error) {
      console.error('API richieste:', error)
      setSubmitError(error.message || 'Si è verificato un errore durante l\'invio. Riprova.')
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const bodyAreas = [
    {
      icon: "🧠",
      title: "Testa, Collo e Sistema Nervoso",
      problems: [
        "Cervicalgia", "Emicrania", "Mal di testa tensivo", "Vertigini", "Acufeni",
        "Colpo di frusta", "Dolori mandibolari (ATM)", "Bruxismo", "Click mandibolare",
        "Difficoltà di concentrazione", "Ansia somatizzata", "Disturbi del sonno",
        "Tensione da postura al PC", "Cefalea da stress", "Tensione cranica nei bambini",
        "Nebbia mentale", "Irritabilità nei neonati"
      ],
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-100"
    },
    {
      icon: "🦴",
      title: "Schiena, Bacino e Postura",
      problems: [
        "Lombalgia", "Dorsalgia", "Sciatalgia", "Ernia del disco", "Dolore al coccige",
        "Dolore pelvico cronico", "Mal di schiena da postura", "Problemi posturali",
        "Asimmetrie bacino/spalle", "Tensioni posturali da ansia", "Postura curva da terza età",
        "Rigidità articolare mattutina", "Dolore dopo cadute", "Instabilità da fermi",
        "Dolori dopo uso di bastoni", "Recupero post-operatorio", "Tensioni lombari in gravidanza"
      ],
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-100"
    },
    {
      icon: "💪",
      title: "Arti Superiori",
      problems: [
        "Epicondilite", "Tunnel carpale", "Formicolii a braccia e mani", "Dolori articolari diffusi",
        "Dolore alla spalla", "Mani deboli o doloranti", "Rigidità articolare del braccio",
        "Dolore durante l'allenamento", "Dolore da supporti tecnologici"
      ],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100"
    },
    {
      icon: "🦵",
      title: "Arti Inferiori",
      problems: [
        "Dolore al ginocchio", "Fascite plantare", "Piedi gonfi", "Dolori di crescita alle gambe",
        "Anche rigide o artrosiche", "Difficoltà a camminare", "Salite e discese faticose",
        "Edemi agli arti inferiori", "Debolezza posturale nel passo", "Dolori alle gambe in gravidanza"
      ],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100"
    },
    {
      icon: "🫁",
      title: "Sistema Digestivo e Gastrointestinale",
      problems: [
        "Reflusso gastrico", "Gonfiore addominale", "Colon irritabile", "Stitichezza",
        "Diarrea ricorrente", "Pancia gonfia o dura", "Digestione lenta", "Irritabilità intestinale da stress",
        "Problemi digestivi legati alla postura", "Malassorbimento posturale", "Dolori addominali ciclici"
      ],
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-100"
    },
    {
      icon: "🫁",
      title: "Sistema Respiratorio e Diaframma",
      problems: [
        "Fiato corto", "Diaframma rigido", "Difficoltà respiratorie", "Respirazione superficiale da stress",
        "Respiro bloccato in gravidanza", "Asma funzionale", "Oppressione toracica da postura",
        "Affaticamento nel parlare", "Difficoltà a respirare profondamente"
      ],
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-100"
    },
    {
      icon: "👩",
      title: "Area Donna e Sistema Uro-Ginecologico",
      problems: [
        "Dolori mestruali", "Ciclo irregolare", "Sindrome premestruale acuta", "Endometriosi (supporto sintomatico)",
        "Dispareunia", "Tensioni pelviche", "Difficoltà nel concepimento", "Diastasi addominale post-parto",
        "Rigidità del bacino post-parto", "Incontinenza urinaria", "Inestetismi da ritenzione",
        "Dolori legati a scarpe con tacco"
      ],
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-100"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-blue-dark font-montserrat overflow-hidden">
      {/* Form Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false)
            }
          }}
        >
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors font-montserrat"
            >
              <span className="text-gray-600 text-lg font-bold">×</span>
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-blue-dark mb-4">Prenota con il tuo codice sconto</h3>
              <p className="text-blue-dark/70 text-sm leading-relaxed">
                Compila il form inserendo il <span className="font-bold text-blue-600">codice sconto</span> che ti ha dato il tuo influencer. 
                Dopo l'invio, la nostra segreteria ti contatterà per confermare l'appuntamento e applicare lo sconto del 50%! 🎉
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.nome ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.cognome ? 'border-red-500' : 'border-gray-300'}`}
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
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.cellulare ? 'border-red-500' : 'border-gray-300'}`}
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
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              
              <div>
                <input
                  type="text"
                  name="codiceSconto"
                  placeholder="Inserisci il codice sconto del tuo influencer"
                  value={formData.codiceSconto}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.codiceSconto ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.codiceSconto && <p className="text-red-500 text-xs mt-1">{formErrors.codiceSconto}</p>}
                <p className="text-xs text-gray-500 mt-1">Il codice sconto ti permette di ottenere il 50% di sconto (45€ invece di 90€)</p>
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
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="text-xs text-gray-600 leading-relaxed">
                    Accetto la <a href="#" className="text-blue-600 underline">privacy policy</a> e autorizzo il trattamento dei miei dati personali
                  </label>
                </div>
                {formErrors.privacy && <p className="text-red-500 text-xs mt-1">{formErrors.privacy}</p>}
              </div>
              
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-green-600 transition-all font-montserrat disabled:opacity-60"
                >
                  {isSubmitting ? 'Invio in corso...' : 'Prenota con sconto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* HERO SECTION */}
        <section className="relative pt-10 pb-8 flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-green-500/5"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/15 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-left">
          {/* Badge */}
          <div className={`inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full mb-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-2"></div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Offerta Esclusiva</span>
          </div>

          {/* Main Headline */}
          <div className={`mb-2 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
              <span className="block text-blue-dark">
                Hai il Codice Sconto del Tuo
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mt-2">
                Influencer Preferito?
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`mb-12 transition-all duration-1500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <p className="text-xl md:text-2xl text-blue-dark/80 font-light leading-relaxed max-w-4xl mb-6">
              Perfetto! 🎉
            </p>
            <p className="text-xl md:text-2xl text-blue-dark/80 font-light leading-relaxed max-w-4xl mb-8">
              Inserisci il <span className="font-bold text-blue-600">codice sconto</span> che ti ha dato il tuo influencer e accedi al <span className="font-bold text-green-600">50% di sconto</span> sul trattamento osteopatico. 
              Un'offerta esclusiva riservata solo a chi arriva tramite i nostri partner influencer.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
              {[
                "Trattamento posturale e di prevenzione",
                "Anamnesi completa e valutazione posturale", 
                "Trattamento osteopatico specializzato per te",
                "Consigli personalizzati per evitare ricadute",
                "Studio nel cuore di Torino, facilmente raggiungibile",
                "Studio più scelto di Torino e con più recensioni d'Italia"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-blue-dark font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Details */}
          <div className={`mt-8 transition-all duration-1500 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
              <span className="text-red-600 font-bold text-sm">🎁 Offerta Esclusiva con Codice Influencer</span>
            </div>
            <p className="text-2xl text-blue-dark font-bold mt-2">
              <span className="text-blue-dark">Prezzo normale: </span>
              <span className="line-through text-red-500 font-black text-3xl">90€</span>
            </p>
            <p className="text-3xl md:text-4xl text-blue-dark font-bold mt-2">
              <span className="text-blue-dark">Con il codice sconto: </span>
              <span className="text-green-600 font-black text-5xl">45€</span>
            </p>
            <p className="text-lg text-green-600 font-semibold mt-2">
              Risparmi 45€ (50% di sconto) 🎉
            </p>
          </div>

          {/* CTA Button */}
          <div className={`mt-8 flex justify-center transition-all duration-1500 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <button 
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center px-8 py-6 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 font-montserrat"
            >
              <span className="relative z-10 text-center uppercase">
                <div>PRENOTA CON IL TUO</div>
                <div>CODICE SCONTO INFLUENCER -50%</div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full mb-0">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-3"></div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Problemi che Risolviamo</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-blue-dark mb-8 leading-tight">
              I problemi che trattiamo
              <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                e risolviamo
              </span>
            </h2>
            <p className="text-xl text-blue-dark/70 max-w-3xl leading-relaxed">
              Specializzati in tutte le aree del corpo, trattiamo ogni tipo di problema con approcci osteopatici mirati e personalizzati 💪🏼
            </p>
          </div>

          {/* Body Areas Horizontal Carousel */}
          <div className="mb-20">
            {/* Mobile Scroll Hint */}
            <div className="md:hidden flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <svg className="w-5 h-5 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span className="text-blue-600 font-semibold text-sm">Scorri per vedere tutte le aree</span>
                <svg className="w-5 h-5 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Scrollable Container */}
              <div className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll snap-x snap-mandatory scroll-smooth">
                {bodyAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="group relative flex-shrink-0 w-80 snap-start"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card */}
                    <div className={`relative bg-gradient-to-br ${area.bgGradient} border border-white/50 rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full`}>
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${area.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}>
                        {area.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-blue-dark mb-4">{area.title}</h3>
                      
                      {/* Problems List */}
                      <div className="space-y-2">
                        {area.problems.slice(0, 8).map((problem, problemIndex) => (
                          <div key={problemIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-blue-dark/70 text-sm">{problem}</span>
                          </div>
                        ))}
                        {area.problems.length > 8 && (
                          <div className="text-blue-dark/60 text-sm font-medium">
                            +{area.problems.length - 8} altri problemi...
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    </div>
                    
                    {/* Floating Elements */}
                    {hoveredCard === index && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator with Count */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  {bodyAreas.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        hoveredCard === index 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 w-8' 
                          : 'bg-blue-300'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-blue-dark/60 md:hidden">
                  {bodyAreas.length} aree disponibili
                </span>
              </div>
              <div className="md:hidden text-xs text-blue-dark/50 italic">
                👆 Tieni premuto e scorri per navigare
              </div>
            </div>
          </div>

          {/* Specializations Box */}
          <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-left">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-4">Osteopati Specializzati per Ogni Area</h3>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                Il nostro team di osteopati è specializzato in diverse aree per garantirti il trattamento più efficace:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Gravidanza e Pediatria",
                  "Geriatria e Terza Età", 
                  "Postura e Lavori Pesanti",
                  "Sport e Performance",
                  "Postura e Lavoro Sedentario",
                  "E tutto quello che ti serve!"
                ].map((specialization, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
                    <div className="font-semibold">{specialization}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 font-montserrat"
            >
              <span className="relative z-10 text-center uppercase">
                <div>PRENOTA CON IL TUO</div>
                <div>CODICE SCONTO -50%</div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-green-700/90"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cream/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cream/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-cream/30 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-cream/50 rounded-full animate-bounce delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <div className="inline-flex items-center px-6 py-3 bg-cream/10 border border-white/20 rounded-full mb-8">
                <div className="w-3 h-3 bg-cream rounded-full mr-3"></div>
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Dove Siamo</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Vieni a trovarci
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">
                  nel cuore di Torino
                </span>
              </h2>
              
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Il nostro studio si trova in una posizione strategica nel centro di Torino, 
                facilmente raggiungibile con i mezzi pubblici e con parcheggio nelle vicinanze.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cream/20 rounded-full flex items-center justify-center">
                    <span className="text-cream text-sm">📍</span>
                  </div>
                  <span className="text-white/90">Via Peyron 54, Torino</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cream/20 rounded-full flex items-center justify-center">
                    <span className="text-cream text-sm">🚇</span>
                  </div>
                  <span className="text-white/90">Metro: comodissimo da Bernini o Principi d'Acaja</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cream/20 rounded-full flex items-center justify-center">
                    <span className="text-cream text-sm">🚗</span>
                  </div>
                  <span className="text-white/90">2 parcheggi nelle vicinanze + strisce blu</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowForm(true)}
                  className="group relative inline-flex items-center px-8 py-4 bg-cream text-blue-900 font-bold rounded-2xl hover:bg-cream/90 transition-all duration-300 hover:scale-105 font-montserrat"
                >
                  <span className="relative z-10 text-center uppercase">
                    <div>PRENOTA CON CODICE SCONTO</div>
                    <div>45€ invece di 90€</div>
                  </span>
                  <div className="absolute inset-0 bg-cream/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit" 
                  width="100%" 
                  height="450" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OffertaInfluencer

