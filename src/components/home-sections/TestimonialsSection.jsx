import React from 'react'
import { Star, Users, Award, TrendingUp, ExternalLink, MessageCircle, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionDivider from '../SectionDivider'

const TestimonialsSection = () => {
  const stats = [
    { number: "500+", label: "Persone trasformate", icon: Users },
    { number: "95%", label: "Soddisfazione clienti", icon: Star },
    { number: "3 anni", label: "Media durata risultati", icon: Award },
    { number: "85%", label: "Riduzione farmaci", icon: TrendingUp }
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

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-[24px]">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-3 bg-sky-400/10 border border-sky-400/30 rounded-full px-6 py-3 mb-6 shadow-lg backdrop-blur-sm">
            <Star className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-semibold text-sky-400 font-montserrat">
              Storie di trasformazione
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-6 mt-0 font-montserrat">
            Non siamo solo numeri, siamo storie
          </h2>
          <p className="text-lg text-blue-dark/80 max-w-3xl font-montserrat">
            Ogni persona che entra da noi ha una storia. 
            <span className="font-semibold text-blue-dark"> Scopri le storie di chi ha scelto di riprendere il controllo.</span>
          </p>
          
          {/* Testimonials Section Image */}
          <div className="mt-8 mb-8">
            <img 
              src="/home/home2.png" 
              alt="Ogni persona che entra da noi ha una storia" 
              className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-dark/20">
                <IconComponent className="w-8 h-8 text-blue-dark mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-blue-dark mb-2 font-montserrat">
                  {stat.number}
                </div>
                <div className="text-sm text-blue-dark/70 font-montserrat">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Google Reviews CTA - Main Section */}
        <div className="bg-emerald-100 rounded-3xl p-8 md:p-12 text-blue-dark text-left mb-16 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            {/* Google Logo and Rating */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                  alt="Google Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-blue-dark font-montserrat">5.0/5</span>
                </div>
                <p className="text-blue-dark/80 font-montserrat">Oltre 600 storie vere</p>
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat text-blue-dark mt-0">
              Leggi le storie vere dei nostri clienti
            </h3>
            
            <p className="text-xl text-blue-dark/90 mb-8 font-montserrat leading-relaxed">
              Non credere solo alle nostre parole. 
              <span className="font-semibold text-sky-400"> Leggi le recensioni autentiche</span> di chi ha già scelto di riprendere il controllo della propria salute su Google.
            </p>

            {/* Reviews Carousel */}
            <div className="relative py-4 mb-8">
              {/* Scrollable carousel */}
              <div className="flex overflow-x-auto space-x-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .reviews-carousel::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="reviews-carousel flex space-x-4">
                  {recensioniImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
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

            {/* CTA Button */}
            <div className="flex justify-center mb-8">
              <a 
                href="https://www.google.com/search?q=mobilitas+recensioni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-blue-dark hover:bg-blue-dark/90 text-green font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-montserrat text-center flex items-center justify-center"
              >
                <ExternalLink className="mr-2 w-5 h-5" />
                Leggi le recensioni su Google
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <SectionDivider />

        {/* Il Teatro della Trasformazione - Vertical Journey */}
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-left">
            <div className="inline-flex items-center gap-3 bg-sky-400/10 border border-sky-400/30 rounded-full px-6 py-3 mb-6 shadow-lg backdrop-blur-sm">
              <Users className="w-5 h-5 text-sky-400" />
              <span className="text-sm font-semibold text-sky-400 font-montserrat">
                Il teatro della trasformazione
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4 font-montserrat">
              La tua storia inizia qui, nel teatro della trasformazione
            </h3>
            <p className="text-lg text-blue-dark/80 max-w-2xl font-montserrat">
            Il trattamento osteopatico diventa il teatro in cui possiamo educare le persone e condurle a prendere nuove scelte, per vivere ogni singolo giorno in salute. Ogni grande cambiamento inizia con un primo passo. Nel teatro della trasformazione, 
              <span className="font-semibold text-sky-400"> scegli il tuo percorso verso la libertà.</span>
            </p>
            
            {/* Theater of Transformation Image */}
            <div className="mt-8 mb-8">
              <img 
                src="/home/home5.png" 
                alt="Il trattamento osteopatico diventa il teatro della trasformazione" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl mb-8"
              />
            </div>
          </div>

          {/* Vertical Journey Steps */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Discovery */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-dark rounded-full flex items-center justify-center shadow-xl">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-blue-dark mb-3 font-montserrat">
                  Non sai se possiamo esserti di aiuto?
                </h4>
                <p className="text-blue-dark/80 font-montserrat leading-relaxed mb-6">
                  Un consulto gratuita per capire come possiamo aiutarti a raggiungere i tuoi obiettivi di salute e benessere.
                </p>
                <a 
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-blue-dark hover:bg-blue-dark/90 text-green font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat"
                >
                  <span>Prenota un consulto gratuito</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center mb-12">
              <div className="w-1 h-16 bg-gradient-to-b from-sky-400 to-green rounded-full"></div>
            </div>

            {/* Step 2: Transformation */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-green to-sky-400 rounded-full flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-blue-dark mb-3 font-montserrat">
                  Inizia la trasformazione
                </h4>
                <p className="text-blue-dark/80 font-montserrat leading-relaxed mb-6">
                  Il tuo percorso personalizzato con un primo trattamento con sconto speciale. Un investimento nella tua salute di oggi e futura.
                </p>
                <a 
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-blue-dark hover:bg-blue-dark/90 text-green font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat"
                >
                  <span>Prima visita con sconto</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center mb-12">
              <div className="w-1 h-16 bg-gradient-to-b from-green to-sky-400 rounded-full"></div>
            </div>

            {/* Step 3: Success */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-green rounded-full flex items-center justify-center shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-blue-dark mb-3 font-montserrat">
                  Raggiungi i tuoi obiettivi
                </h4>
                <p className="text-blue-dark/80 font-montserrat leading-relaxed mb-6">
                  Unisciti alle centinaia di persone che hanno già trasformato la loro vita. La tua storia di successo inizia oggi.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-blue-dark font-bold font-montserrat">5.0/5</span>
                </div>
                <p className="text-blue-dark/80 font-montserrat">
                  <span className="font-semibold text-sky-400">+420 persone</span> hanno raccontato come la loro vita sia cambiata con il nostro aiuto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
