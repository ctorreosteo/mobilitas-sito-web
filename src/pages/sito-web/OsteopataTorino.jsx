import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import Header from '../../components/Header'

const OsteopataTorino = () => {
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
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const carouselRef = useRef(null)
  const bodyAreasCarouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentBodyAreaIndex, setCurrentBodyAreaIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [announcementBarHeight, setAnnouncementBarHeight] = useState(40)
  const [openFAQIndex, setOpenFAQIndex] = useState(null)
  
  const homeImages = [
    '/home/home7.png',
    '/home/home4.png',
    '/home/home1.png',
    '/home/home2.png',
    '/home/home5.png',
    '/home/home8.png',
    '/home/home3.png'
  ]

  // Recensioni images from public/recensioni folder
  const recensioniImages = [
    '/recensioni/Screenshot 2025-12-17 alle 17.45.18.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.46.03.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.47.25.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.47.37.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.47.46.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.48.12.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.48.28.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.48.38.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.48.49.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.48.58.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.49.18.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.49.37.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.49.46.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.49.56.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.50.58.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.51.24.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.51.33.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.51.40.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.53.20.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.53.41.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.53.51.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.54.29.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.55.43.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.55.53.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.56.06.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.56.17.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.58.38.png',
    '/recensioni/Screenshot 2025-12-17 alle 17.58.48.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.25.45.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.25.54.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.26.02.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.26.14.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.27.25.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.27.34.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.27.42.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.27.51.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.28.06.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.28.13.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.28.28.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.28.48.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.29.47.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.29.56.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.30.05.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.30.12.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.30.28.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.31.54.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.32.04.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.32.17.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.33.22.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.33.32.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.33.44.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.39.27.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.39.40.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.39.47.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.39.56.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.40.26.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.40.42.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.41.17.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.41.49.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.42.23.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.42.31.png',
    '/recensioni/Screenshot 2025-12-17 alle 18.42.40.png'
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check carousel scroll position
  useEffect(() => {
    const checkScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        
        // Calculate which image is currently visible
        const imageWidth = carouselRef.current.scrollWidth / homeImages.length
        const newIndex = Math.round(scrollLeft / imageWidth)
        setCurrentImageIndex(Math.min(newIndex, homeImages.length - 1))
      }
    }
    
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', checkScroll)
      checkScroll() // Initial check
      
      // Also check on resize
      window.addEventListener('resize', checkScroll)
    }
    
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('resize', checkScroll)
    }
  }, [homeImages.length])

  // Check body areas carousel scroll position
  useEffect(() => {
    const checkBodyAreasScroll = () => {
      if (bodyAreasCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = bodyAreasCarouselRef.current
        const cardWidth = 320 + 24 // w-80 (320px) + space-x-6 (24px)
        const newIndex = Math.round(scrollLeft / cardWidth)
        // bodyAreas ha 7 elementi
        setCurrentBodyAreaIndex(Math.min(newIndex, 6))
      }
    }
    
    if (bodyAreasCarouselRef.current) {
      bodyAreasCarouselRef.current.addEventListener('scroll', checkBodyAreasScroll)
      checkBodyAreasScroll() // Initial check
      
      // Also check on resize
      window.addEventListener('resize', checkBodyAreasScroll)
    }
    
    return () => {
      if (bodyAreasCarouselRef.current) {
        bodyAreasCarouselRef.current.removeEventListener('scroll', checkBodyAreasScroll)
      }
      window.removeEventListener('resize', checkBodyAreasScroll)
    }
  }, [])

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    setIsVisible(true)
    // Get current month name in Italian
    const months = [
      'GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO',
      'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'
    ]
    setCurrentMonth(months[new Date().getMonth()])
    
    // Calculate announcement bar height
    const calculateHeight = () => {
      const bar = document.querySelector('[data-announcement-bar]')
      if (bar) {
        setAnnouncementBarHeight(bar.offsetHeight)
      } else {
        // Fallback values (60% of original: 60->36, 80->48)
        setAnnouncementBarHeight(window.innerWidth >= 768 ? 48 : 36)
      }
    }
    
    calculateHeight()
    window.addEventListener('resize', calculateHeight)
    return () => window.removeEventListener('resize', calculateHeight)
  }, [])

  // Countdown to tomorrow night midnight (00:00:00 of day after tomorrow)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const tomorrowNightMidnight = new Date(now)
      // Add 2 days to go to tomorrow night's midnight (not tonight's)
      tomorrowNightMidnight.setDate(tomorrowNightMidnight.getDate() + 2)
      tomorrowNightMidnight.setHours(0, 0, 0, 0)
      
      const difference = tomorrowNightMidnight - now
      
      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60))
        const hours = totalHours
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }
    
    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(interval)
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

  // SEO metadata for Osteopata Torino landing page (keyword-optimized)
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Osteopata Torino | Studio Osteopatico Mobilitas: Mal di Schiena, Cervicale, Emicrania'

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

    const description = 'Cerchi un osteopata a Torino? Mobilitas è lo studio osteopatico specializzato in mal di schiena, cervicale, sciatalgia, emicrania e postura. Valutazione + trattamento prima visita a 49€. Prenota online o via WhatsApp.'
    const pageUrl = `${window.location.origin}/osteopata-torino`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'osteopata torino, studio osteopatico torino, osteopatia torino, mal di schiena torino, cervicale torino, sciatalgia torino, emicrania torino, postura torino, trattamento osteopatico, prima visita 49€')

    // Open Graph
    ensureMetaByProperty('og:title', 'Osteopata Torino | Studio Osteopatico Mobilitas')
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
    
    console.log('Redirecting to confirmation page...') // Debug log
    
    // Send data to Zapier webhook
    try {
      // Format date and time as requested: dd/mm/yyyy and hh:mm
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      
      const webhookData = {
        nome: formData.nome,
        cognome: formData.cognome,
        telefono: formData.cellulare,
        email: formData.email,
        data: `${day}/${month}/${year}`,
        ora: `${hours}:${minutes}`,
        offerta: 'Trattamento osteopatico da 90€ a 49€',
        pagina: 'Osteopata Torino',
        privacy_accettata: formData.privacy
      }
      
      // Send data to Zapier webhook (same approach as gravidanza landing)
      const response = await fetch('https://hooks.zapier.com/hooks/catch/19401274/urmpgqj/', {
        method: 'POST',
        body: JSON.stringify(webhookData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Zapier webhook response:', result)
      console.log('Data sent to Zapier successfully')
    } catch (error) {
      console.error('Error sending data to Zapier:', error)
      // Don't block the user flow if webhook fails
    }
    
    // Redirect to confirmation page
    try {
      navigate('/osteopata-torino-conferma')
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location
      window.location.href = '/osteopata-torino-conferma'
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
      {/* Announcement Bar with Countdown - Fixed above header */}
      <div data-announcement-bar className="fixed top-0 left-0 right-0 z-[60] bg-red-600 border-b-2 border-red-700 w-full py-1.5 md:py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-3">
            {/* Mobile: "4 posti rimasti," prima riga, "l'offerta scade tra:" seconda riga, timer a destra */}
            {/* Desktop: "4 posti rimasti, l'offerta scade tra:" tutto su una riga */}
            <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-1">
              <span className="text-white font-black text-sm md:text-base font-montserrat uppercase">4 posti rimasti,</span>
              <span className="text-white font-black text-sm md:text-base font-montserrat uppercase">l'offerta scade tra:</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 md:gap-2">
              <div className="flex items-center justify-center bg-white rounded-lg px-2 py-1 md:px-3 md:py-1.5 shadow-md min-w-[50px] md:min-w-[55px]">
                <span className="text-base md:text-lg font-black text-red-600 font-montserrat">{String(timeLeft.hours).padStart(2, '0')}h</span>
              </div>
              <span className="text-base md:text-lg font-bold text-white font-montserrat">:</span>
              <div className="flex items-center justify-center bg-white rounded-lg px-2 py-1 md:px-3 md:py-1.5 shadow-md min-w-[50px] md:min-w-[55px]">
                <span className="text-base md:text-lg font-black text-red-600 font-montserrat">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              </div>
              <span className="text-base md:text-lg font-bold text-white font-montserrat">:</span>
              <div className="flex items-center justify-center bg-white rounded-lg px-2 py-1 md:px-3 md:py-1.5 shadow-md min-w-[50px] md:min-w-[55px]">
                <span className="text-base md:text-lg font-black text-red-600 font-montserrat">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Header - positioned below announcement bar */}
      <Header topOffset={announcementBarHeight} />
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
              <h3 className="text-2xl font-bold text-blue-dark mb-4">Compila il form</h3>
              <p className="text-blue-dark/70 text-sm leading-relaxed">
                Dopo che avrai compilato il form, la nostra segreteria ti contatterà per prendere appuntamento. 
                Prenota subito il tuo trattamento prima che i posti esauriscano! 👇🏼
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${formErrors.nome ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${formErrors.cognome ? 'border-red-500' : 'border-gray-300'}`}
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
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${formErrors.cellulare ? 'border-red-500' : 'border-gray-300'}`}
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
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="text-xs text-gray-600 leading-relaxed">
                    Accetto la <a href="#" className="text-blue-600 underline">privacy policy</a> e autorizzo il trattamento dei miei dati personali
                  </label>
                </div>
                {formErrors.privacy && <p className="text-red-500 text-xs mt-1">{formErrors.privacy}</p>}
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="button-shake w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-green-600 transition-all font-montserrat text-lg"
                >
                  Prenota con sconto
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
        @keyframes subtleShake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-1px) translateY(1px); }
          20% { transform: translateX(1px) translateY(-1px); }
          30% { transform: translateX(-1px) translateY(-1px); }
          40% { transform: translateX(1px) translateY(1px); }
          50% { transform: translateX(-1px) translateY(0); }
          60% { transform: translateX(1px) translateY(0); }
          70% { transform: translateX(0) translateY(-1px); }
          80% { transform: translateX(0) translateY(1px); }
          90% { transform: translateX(-1px) translateY(0); }
        }
        .button-shake {
          animation: subtleShake 3s ease-in-out infinite;
        }
        .button-shake:hover {
          animation: none;
        }
      `}</style>
      
      {/* HERO SECTION */}
        <section className="relative pt-[100px] pb-8 flex items-center justify-center overflow-hidden">
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
          <div className={`inline-flex items-center px-3 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full mb-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-1.5 md:mr-2"></div>
            <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Studio Osteopatico Torino</span>
          </div>

          {/* Main Headline */}
          <div className={`mb-2 md:mt-6 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h1 className="text-7xl md:text-6xl lg:text-7xl font-black leading-none mb-6 font-montserrat">
              <span className="text-blue-dark font-montserrat">
                Qualche dolore o problema che desideri{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                risolvere velocemente?
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`mb-12 transition-all duration-1500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <p className="text-xl md:text-2xl text-blue-dark/80 font-light leading-relaxed max-w-4xl mb-8">
              <span className="font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Mobilitas</span> è lo studio osteopatico più scelto di Torino. 
              Da noi trovi l'osteopata giusto per te, specializzato per la tua problematica!
            </p>
            
            {/* Home Images Carousel */}
            <div className="mb-8 mt-8 relative">
              {/* Scroll buttons - visible on mobile */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 md:hidden"
                  aria-label="Scorri a sinistra"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              
              {canScrollRight && (
                <button
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 md:hidden"
                  aria-label="Scorri a destra"
                >
                  <ChevronRight size={24} />
                </button>
              )}
              
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto space-x-4 pb-4 horizontal-scroll snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {homeImages.map((imageSrc, index) => (
                  <div key={index} className="flex-shrink-0 snap-center">
                    <img 
                      src={imageSrc} 
                      alt={`Mobilitas ${index + 1}`}
                      className="h-56 md:h-80 rounded-2xl shadow-lg object-cover w-[85vw] md:w-auto md:min-w-[400px]"
                    />
                  </div>
                ))}
              </div>
              
              {/* Scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {homeImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-gradient-to-r from-blue-600 to-green-500 w-8' 
                        : 'bg-blue-300'
                    }`}
                  ></div>
                ))}
              </div>
              
              {/* Scroll hint text - visible on mobile */}
              <p className="text-center text-sm text-blue-dark/60 mt-2 md:hidden">
                Scorri per vedere tutte le immagini
              </p>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
              {[
                "Anamnesi completa e valutazione posturale",
                "Trattamento osteopatico specializzato per te", 
                "Consigli per prevenire ricadute",
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
            <p className="text-3xl text-blue-dark font-bold text-center font-montserrat">
              Da <span className="line-through text-red-500 font-black text-4xl">90€</span> a <span className="text-green-600 font-black text-5xl">49€</span> <span className="block md:inline">in offerta di {currentMonth.toLowerCase()}</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className={`mt-8 flex justify-center transition-all duration-1500 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <button 
              onClick={() => setShowForm(true)}
              className="button-shake group relative inline-flex items-center px-8 py-6 bg-blue-dark text-green font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-dark/25 transition-all duration-300 hover:scale-105 font-montserrat"
            >
              <span className="relative z-10 text-center uppercase">
                <div>PRENOTA IL TRATTAMENTO</div>
                <div>CON L'OFFERTA</div>
                <div className="text-sm normal-case mt-1 text-white">(clicca qui)</div>
              </span>
              <div className="absolute inset-0 bg-blue-dark/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Reviews Carousel */}
          <div className={`mt-[140px] md:mt-[168px] transition-all duration-1500 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-left mb-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-dark mb-3 font-montserrat">
                Lo Studio Osteopatico più
                <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mt-1">
                  Scelto, Richiesto e Recensito di Torino
                </span>
              </h3>
              <p className="text-blue-dark/70 text-base md:text-lg mt-3 font-medium">
              ⭐ Oltre 600 persone hanno raccontato pubblicamente le loro storie meravigliose ⭐
              </p>
            </div>
            
            <div className="relative py-4">
              {/* Scrollable carousel */}
              <div className="flex overflow-x-auto space-x-4 pb-4 horizontal-scroll snap-x snap-mandatory">
                {recensioniImages.map((image, index) => (
                  <div key={index} className="flex-shrink-0 snap-center">
                    <div className="w-72 md:w-96 h-auto rounded-2xl shadow-xl overflow-hidden bg-white p-3 hover:shadow-2xl transition-shadow duration-300">
                      <img 
                        src={image} 
                        alt={`Recensione ${index + 1}`}
                        className="w-full h-auto rounded-xl object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Scroll hint */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <div className="flex items-center gap-2 text-blue-dark/60 text-sm font-medium">
                  <ChevronLeft className="w-4 h-4 animate-pulse" />
                  <span>Scorri per vedere tutte le recensioni</span>
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
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
            <div className="inline-flex items-center px-3 py-1.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full mb-0">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-1.5 md:mr-3"></div>
              <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Problemi che Risolviamo</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-blue-dark mb-3 md:mb-8 leading-tight">
              Quali sono i problemi che
              <span className="block">
                <span className="text-blue-dark">trattiamo </span>
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent md:ml-2">
                  e risolviamo?
                </span>
              </span>
            </h2>
            <p className="text-xl text-blue-dark/70 max-w-3xl leading-relaxed mt-0">
              Abbiamo Osteopati specializzati per ogni area del corpo, trattiamo ogni tipo di problema con approcci osteopatici mirati e personalizzati 💪🏼
            </p>
          </div>

          {/* Body Areas Horizontal Carousel */}
          <div className="mb-20">
            <div ref={bodyAreasCarouselRef} className="flex overflow-x-auto space-x-6 pb-4 horizontal-scroll">
              {bodyAreas.map((area, index) => (
                <div 
                  key={index}
                  className="group relative flex-shrink-0 w-80"
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
                    <div className="space-y-1.5">
                      {(() => {
                        // Raggruppa i problemi 3 per riga per mostrarli tutti in modo compatto
                        const groupedProblems = []
                        for (let i = 0; i < area.problems.length; i += 3) {
                          groupedProblems.push(area.problems.slice(i, i + 3))
                        }
                        return groupedProblems.map((group, groupIndex) => (
                          <div key={groupIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                            <div className="flex-1">
                              <span className="text-blue-dark/70 text-sm leading-tight">
                                {group.join(', ')}
                              </span>
                            </div>
                          </div>
                        ))
                      })()}
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
            
            {/* Scroll Indicator */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-6">
              <div className="flex space-x-2">
                {bodyAreas.map((_, index) => {
                  const isActive = hoveredCard === index || currentBodyAreaIndex === index
                  return (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 w-8' 
                          : 'bg-blue-300'
                      }`}
                    ></div>
                  )
                })}
              </div>
              <span className="text-blue-dark/60 text-sm font-medium md:hidden">
                ← Scorri per vedere tutte le aree →
              </span>
            </div>
          </div>

          {/* Specializations Box */}
          <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-4 md:p-8 text-white shadow-2xl">
            <div className="text-left">
              <div className="text-4xl mb-2 md:mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-2 md:mb-4">Ogni Osteopata con la Sua Specializzazione</h3>
              <p className="text-lg opacity-90 leading-relaxed mb-4 md:mb-6">
                Non un osteopata generico, ma il professionista giusto per te. Ogni membro del nostro team si dedica a una specifica area, garantendoti il trattamento più mirato ed efficace per la tua problematica:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  "Gravidanza e Pediatria",
                  "Geriatria e Terza Età", 
                  "Postura e Lavori Pesanti",
                  "Sport e Performance",
                  "Postura e Lavoro Sedentario",
                  "E tutto quello che ti serve!"
                ].map((specialization, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 text-left">
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
              className="button-shake group relative inline-flex items-center px-12 py-6 bg-blue-dark text-green font-bold text-lg rounded-full shadow-2xl hover:shadow-blue-dark/25 transition-all duration-300 hover:scale-105 font-montserrat"
            >
              <span className="relative z-10 text-center uppercase">
                <div>PRENOTA LA TUA PRIMA</div>
                <div>VISITA CON OFFERTA</div>
                <div className="text-sm normal-case mt-1 text-white">(clicca qui)</div>
              </span>
              <div className="absolute inset-0 bg-blue-dark/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <div className="text-white order-1 lg:order-1">
              <div className="inline-flex items-center px-3 py-1.5 md:px-6 md:py-3 bg-cream/10 border border-white/20 rounded-full mb-8">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cream rounded-full mr-1.5 md:mr-3"></div>
                <span className="text-white font-semibold text-xs md:text-sm uppercase tracking-wider">Dove Siamo</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-8 leading-tight mt-0">
                Vieni a trovarci
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">
                  nel cuore di Torino
                </span>
              </h2>
              
              <p className="text-xl text-white/80 leading-relaxed mb-8 mt-0">
                Il nostro studio si trova in una posizione strategica nel centro di Torino, 
                facilmente raggiungibile con i mezzi pubblici e con parcheggio nelle vicinanze.
              </p>

              {/* Map - Mobile: shown here, Desktop: hidden (shown in right column) */}
              <div className="relative mb-8 lg:hidden">
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
              <div className="flex justify-center md:justify-start">
                <button 
                  onClick={() => setShowForm(true)}
                  className="button-shake group relative inline-flex items-center px-8 py-6 md:py-5 bg-cream text-blue-900 font-bold rounded-2xl hover:bg-cream/90 transition-all duration-300 hover:scale-105 font-montserrat text-lg md:text-base"
                >
                  <span className="relative z-10 text-center uppercase">
                    <div>PRENOTA LA TUA PRIMA</div>
                    <div>VISITA CON OFFERTA</div>
                    <div className="text-sm normal-case mt-1 text-blue-900">(clicca qui)</div>
                  </span>
                  <div className="absolute inset-0 bg-cream/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Right Side - Map (Desktop only) */}
            <div className="relative hidden lg:block order-2 lg:order-2">
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

      {/* FAQ SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-12">
            <div className="inline-flex items-center px-3 py-1.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full mb-3 md:mb-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-1.5 md:mr-3"></div>
              <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Domande Frequenti</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-dark mb-4 leading-tight">
              Hai domande?
              <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mt-2">
                Abbiamo le risposte
              </span>
            </h2>
            <p className="text-xl text-blue-dark/70 max-w-2xl leading-relaxed">
              Tutto quello che vuoi sapere sul nostro studio e sui trattamenti osteopatici
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {[
              {
                question: "Dove si trova lo studio?",
                answer: "Il nostro studio si trova in Via Peyron 54, nel cuore di Torino. Siamo facilmente raggiungibili con i mezzi pubblici (metro fermate Bernini o Principi d'Acaja) e con parcheggio nelle vicinanze, inclusi 2 parcheggi privati e strisce blu."
              },
              {
                question: "Quanto dura un trattamento osteopatico?",
                answer: "Il trattamento completo dura circa 1 ora. Ti consigliamo di arrivare 10 minuti prima dell'orario fissato per completare l'accettazione e permetterci di iniziare puntualmente la tua visita."
              },
              {
                question: "Come devo vestirmi per la visita?",
                answer: "Ti consigliamo di indossare un abbigliamento comodo, preferibilmente sportivo come quello che useresti per andare in palestra. L'importante è che tu ti senta a tuo agio e che i vestiti permettano all'osteopata di valutare la tua postura e di eseguire i test necessari."
              },
              {
                question: "Con quale osteopata farò la visita?",
                answer: "Durante la chiamata con la nostra segreteria, analizzeremo insieme i tuoi bisogni e le tue esigenze specifiche. In base alla tua problematica, ti assegneremo l'osteopata più indicato per il tuo caso, garantendoti un trattamento personalizzato e mirato."
              },
              {
                question: "Quali sono gli orari di apertura?",
                answer: "Siamo aperti dal lunedì al venerdì dalle 8:00 alle 21:00 e il sabato dalle 9:00 alle 18:00. La domenica siamo chiusi."
              },
              {
                question: "Quanto costa la prima visita?",
                answer: "La prima visita con valutazione posturale e trattamento osteopatico è in offerta a 49€ (prezzo originale 90€). Questa offerta include un'anamnesi completa, la valutazione posturale e il trattamento osteopatico specializzato per la tua problematica."
              },
              {
                question: "Serve la prescrizione medica?",
                answer: "No, non è necessaria la prescrizione medica per accedere ai trattamenti osteopatici. Puoi prenotare direttamente contattando la nostra segreteria o compilando il form di prenotazione online."
              },
              {
                question: "Quante sedute servono per risolvere il problema?",
                answer: "Il numero di sedute necessarie varia in base alla problematica e alla risposta individuale al trattamento. Durante la prima visita, dopo la valutazione, l'osteopata ti fornirà un piano di trattamento personalizzato con una stima delle sedute necessarie per il tuo caso specifico."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-blue-dark/10 hover:border-blue-500/40 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.01]"
              >
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                  className="w-full px-5 py-2 md:py-4 text-left flex items-center justify-between hover:bg-blue-dark/5 transition-colors duration-200"
                >
                  <h3 className="text-base md:text-lg font-bold text-blue-dark pr-4 font-montserrat leading-tight">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                        openFAQIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {openFAQIndex === index && (
                  <div className="px-5 pb-4">
                    <div className="w-full h-px bg-gradient-to-r from-blue-500/30 to-blue-600/30 mb-3"></div>
                    <p className="text-blue-dark/80 leading-relaxed text-sm md:text-base font-montserrat">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="button-shake group relative inline-flex items-center px-12 py-6 bg-blue-dark text-green font-bold text-lg rounded-full shadow-2xl hover:shadow-blue-dark/25 transition-all duration-300 hover:scale-105 font-montserrat"
            >
              <span className="relative z-10 text-center uppercase">
                <div>PRENOTA LA TUA PRIMA</div>
                <div>VISITA CON OFFERTA</div>
                <div className="text-sm normal-case mt-1 text-white">(clicca qui)</div>
              </span>
              <div className="absolute inset-0 bg-blue-dark/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OsteopataTorino
