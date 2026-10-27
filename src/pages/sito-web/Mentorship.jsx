import React, { useState, useEffect } from 'react'
import { Hand } from 'lucide-react'

const Mentorship = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Ensure both Meta Pixels are initialized (backup check for production)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Ensure second pixel is initialized (in case it wasn't in index.html)
      const checkAndInit = () => {
        try {
          // Try to initialize second pixel if not already done
          window.fbq('init', '751362634658136');
        } catch (e) {
          // Pixel already initialized or error, that's ok
        }
      }
      // Check after a short delay to ensure fbq is ready
      setTimeout(checkAndInit, 500);
    }
  }, [])

  const painPoints = [
    {
      icon: '📊',
      title: 'Agenda vuota e ansia economica',
      description: 'Mesi consecutivi a 800-1.200€, con l\'ansia costante di non farcela a pagare l\'affitto o di vivere da soli: la maggior parte degli osteopati sotto i 28 anni vive ancora con i genitori. E non per scelta...'
    },
    {
      icon: '🏥',
      title: 'Il dubbio di non essere abbastanza competente',
      description: 'Ti chiedi se sei davvero pronto/a, ma non hai nessuno che ti dica dove migliorare. Ogni paziente è una prova complessa. E ogni dubbio diventa un macigno da portare da solo.'
    },
    {
      icon: '💔',
      title: 'Solitudine professionale',
      description: '10 ore al giorno chiuso in studio, senza confronto, senza guida, senza una squadra. La solitudine rallenta il miglioramento. E ti fa perdere la motivazione!'
    },
    {
      icon: '📱',
      title: 'Ripudio per il marketing',
      description: 'Ti senti a disagio ogni volta che sai di doverti "vendere". Promuoverti sembra forzato, fuori luogo. Intanto l\'agenda resta vuota… e ogni buco è una ferita all\'autostima e al conto corrente.'
    },
    {
      icon: '💸',
      title: 'Instabilità economica',
      description: 'Un mese 2.000€, il successivo 600€. Montagne russe di fatturato sono proprio quelle che danno un fastidio clamoroso.'
    },
    {
      icon: '🚪',
      title: 'Ingresso difficile nel mondo del lavoro',
      description: 'Una volta diplomato, ti ritrovi solo. Nessuno ti spiega come trovare i primi pazienti, come muoverti da libero professionista, cosa fare per iniziare davvero. Il mercato è una giungla e tu non hai né una mappa né una guida.'
    },
    {
      icon: '🔮',
      title: 'Futuro incerto della professione',
      description: 'L\'osteopatia sarà davvero una professione sanitaria? Cambierà qualcosa? Ci sarà posto per tutti o solo per pochi eletti? L\'incertezza normativa e il caos formativo alimentano dubbi, paure e senso di precarietà.'
    }
  ]

  const faqs = [
    {
      question: 'Quanto costa il tirocinio?',
      answer: 'Il percorso completo costa 800€ (prezzo normale). Con l\'offerta Black Friday in corso, il prezzo è scontato a 399€ (sconto del 50%). L\'offerta è valida solo per i primi 10 candidati selezionati che si iscrivono entro domenica 30/11 ore 23:59. Questo investimento include tutto: formazione, mentorship, test su pazienti veri e accesso alle risorse dello studio.'
    },
    {
      question: 'Quando parte la mentorship?',
      answer: 'La organizziamo in base alle tue esigenze ma, per bloccare il prezzo con l\'offerta black friday, bisogna fare richiesta ora.'
    },
    {
      question: 'Che tipo di formazione ricevo?',
      answer: 'Ricevi una formazione completa e pratica: assisti alle visite degli osteopati senior con calendario pieno e hai l\'opportunità di mettere in pratica le tecniche apprese. Inoltre, ricevi affiancamento diretto dagli osteopati senior e formazione con il manager degli osteopati. Infine, impari tutto quello che non ti hanno insegnato all\'università: formazione business, gestione pazienti e strategie per costruire una carriera solida. Tutto questo è incluso nel prezzo della mentorship.'
    },
    {
      question: 'Quante ore devo fare a settimana?',
      answer: 'Il programma verrà creato in base alle tue esigenze e alle tue disponibilità.'
    },
    {
      question: 'Come funziona la selezione?',
      answer: 'Faremo un incontro conoscitivo per capire se sei tra i candidati giusti per la mentorship.'
    },
    {
      question: 'L\'offerta Black Friday è ancora valida?',
      answer: 'L\'offerta Black Friday (399€ invece di 800€) è valida solo per i primi 10 candidati selezionati che si iscrivono entro domenica 30/11 ore 23:59. Una volta raggiunti i 10 posti o scaduto il termine, il prezzo torna a 800€. Affrettati se vuoi approfittare dello sconto!'
    }
  ]

  return (
    <div className="min-h-screen bg-cream text-blue-dark font-montserrat">
      {/* HERO SECTION */}
      <section className="relative flex items-start justify-center overflow-hidden bg-cream pt-8 pb-0">
        {/* Clean Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cream"></div>
        </div>

        {/* Minimal Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-dark rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-0">
          <div className="text-left">
            
            {/* Badge - Top Left Alignment */}
            <div className={`inline-flex items-center px-4 py-2 bg-sky-100 border border-sky-300 rounded-full mb-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">Mobilitas Mentorship</span>
            </div>

            {/* Main Headline - Mobile Optimized */}
            <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-blue-dark mb-4">
                <span className="block">Entri da Studente.</span>
                <span className="block text-blue-400">Esci Professionista del Mondo Reale.</span>
                <span className="block mt-2">Investi nella Tua Trasformazione 💪🏼</span>
              </h1>
            </div>

            {/* Hero Image */}
            <div className={`mb-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <img 
                src="/home/web/home2-1600.jpg"
                srcSet="/home/web/home2-900.jpg 900w, /home/web/home2-1600.jpg 1600w"
                sizes="(min-width: 900px) 896px, 100vw" 
                alt="Tirocinio Mobilitas Academy" 
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Subtitle */}
            <div className={`mb-10 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg text-blue-dark/90 font-light leading-relaxed max-w-3xl">
                L'unico tirocinio che ti prepara davvero al mondo del lavoro. 
                Con il nostro tirocinio vivi da subito l’esperienza clinica, impari a relazionarti con pazienti veri, scopri cosa significa lavorare in squadra e inizi a costruire una carriera concreta.
              </p>
              <p>
                <span className="font-bold">👉🏼 Finalmente hai trovato qualcuno che può insegnarti per davvero il mestiere dell'osteopata.</span>
              </p>
            </div>

            {/* USP Highlight Box */}
            <div className={`mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-r from-blue-400/10 to-blue-dark/10 border border-blue-400/30 rounded-3xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6">
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-blue-dark mb-1.5 flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      <span>Formazione nel mondo REALE</span>
                    </h3>
                    <p className="text-blue-dark/70 text-sm leading-relaxed">L'unico tirocinio che ti prepara davvero al mondo del lavoro</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-blue-dark mb-1.5 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <span>Leadership a Torino</span>
                    </h3>
                    <p className="text-blue-dark/70 text-sm leading-relaxed">Siamo lo studio osteopatico più scelto della città: reputazione consolidata, risultati verificati e casi clinici di tutti i tipi.</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-blue-dark mb-1.5 flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span>Lo Studio con più Recensioni in Italia</span>
                    </h3>
                    <p className="text-blue-dark/70 text-sm leading-relaxed">Conosciuto per le sue recensioni e testimonianze, lo studio è un punto di riferimento: trattiamo più pazienti, otteniamo più risultati e valorizziamo ogni professionista.</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-blue-dark mb-1.5 flex items-center gap-2">
                      <span className="text-2xl">👨‍⚕️</span>
                      <span>Specializzazioni e varietà clinica</span>
                    </h3>
                    <p className="text-blue-dark/70 text-sm leading-relaxed">Osteopati specializzati in vari ambiti (gravidanza e pediatria, geriatria, sport, sedentarietà, ecc.). Hai quindi l'opportunità di mettere mano a pazienti di ogni tipo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`mb-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a 
                href="#candidati" 
                className="inline-block bg-blue-dark text-green px-12 py-5 rounded-full font-semibold text-xl hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl uppercase no-underline font-montserrat"
              >
                Candidati Ora →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Divider with Two Hands and Treatment Table */}
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mx-4 p-3 bg-sky-100 rounded-full">
            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M8 4h8M8 8h8M8 12h8M8 16h8M8 20h8" />
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              <circle cx="12" cy="14" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
        </div>
      </div>

      {/* PAIN POINTS SECTION */}
      <section className="pt-8 pb-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cream"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">La Realtà</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-dark mb-6 mt-3 leading-tight">
              Conosci già la realtà
              <span className="block text-blue-dark">
                che ti spetta post diploma/laurea?
              </span>
            </h2>
            <p className="text-lg text-blue-dark/70 max-w-2xl leading-relaxed">
              Se sei qui, forse lo hai già capito: il diploma non basta 😓 <br></br>
              Ti ritrovi davanti a una realtà piena di ostacoli e nessuno ti ha insegnato ad affrontare quello a cui vai incontro. È proprio qui che iniziano a demoralizzarsi in molti!
            </p>
          </div>

          {/* Pain Points Carousel */}
          <div className="relative mb-16">
            {/* Scroll hint text - Mobile only */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-blue-dark/60 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-bold">Scorri per leggere tutto</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Gradient overlays to indicate scrollable content */}
            <div className="relative">
              {/* Left gradient fade - Mobile only */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
              
              {/* Right gradient fade - Mobile only */}
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>
              
              <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex gap-6 pb-4 px-2" style={{ width: 'max-content' }}>
                  {painPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="flex-shrink-0 w-64 md:w-80 bg-red-500/10 border border-red-500/30 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col h-full">
                        <div className="text-4xl mb-4">{point.icon}</div>
                        <h3 className="text-xl font-bold text-blue-dark mb-3">{point.title}</h3>
                        <p className="text-blue-dark/80 leading-relaxed flex-1">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced Scroll indicator */}
            <div className="flex flex-col items-center mt-6 gap-3">
              <div className="flex gap-2">
                {painPoints.map((_, index) => (
                  <div 
                    key={index} 
                    className="w-2.5 h-2.5 bg-blue-dark/30 rounded-full transition-all duration-300"
                  ></div>
                ))}
              </div>
              <p className="text-xs text-blue-dark/50 md:hidden">
                {painPoints.length} problemi comuni
              </p>
            </div>
          </div>

          {/* Text Section After Carousel */}
          <div className="mb-16 text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mb-6">
              Il problema non è che sei scarso. È che nessuno ti ha mai mostrato la strada.
            </h3>
            <div className="space-y-4 text-lg text-blue-dark/80 leading-relaxed max-w-4xl">
              <p>
                Nonostante anni di studio, ti ritrovi a provare quello che fanno gli altri. Hai competenze tecniche, ma nessuno ti ha preparato a farle diventare una professione solida. Nessuno ti ha insegnato come trovare pazienti, come gestire uno studio, come far crescere davvero la tua carriera.
              </p>
              <p>
                Ti dicono che "serve solo pazienza", che "basta il passaparola", ma l'agenda non si riempie facilmente e l'ansia cresce 😩 Ti senti in trappola: troppe domande, zero risposte.
              </p>
              <p>
                Intanto, il tempo passa. E con lui passano anche le opportunità.
              </p>
              <p className="font-semibold text-blue-dark">
                Perché la verità è che la maggior parte degli osteopati non ha i risultati che meriterebbe!
              </p>
            </div>
          </div>

          {/* Bottom Highlight */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-3xl p-8 md:p-12 text-left">
            <div className="text-5xl mb-6">💔</div>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mb-6 mt-0">
              Non basta essere bravi a trattare.
            </h3>
            <div className="space-y-4 text-lg text-blue-dark/80 leading-relaxed max-w-3xl">
              <p>
                Il mercato è pieno di bravi tecnici con l'agenda vuota.
              </p>
              <p>
                Chi ce la fa davvero è chi ha capito una cosa:
              </p>
              <p className="font-semibold text-blue-dark text-xl">
                se non impari a farti scegliere, non ti sceglierà nessuno.
              </p>
              <p>
                Puoi continuare a sperare che i pazienti arrivino "col passaparola"…
              </p>
              <p>
                Oppure puoi aprire gli occhi e capire che servono competenze diverse.
              </p>
              <p className="font-semibold text-blue-dark">
                Non per "venderti", ma per costruire una professione che rispecchi il tuo valore.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-left">
            <a 
              href="#candidati" 
              className="inline-block bg-blue-dark text-green px-12 py-5 rounded-full font-semibold text-xl hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl uppercase no-underline font-montserrat"
            >
              Candidati Ora →
            </a>
          </div>
        </div>
      </section>

      {/* Custom Divider with Two Hands and Treatment Table */}
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mx-4 p-3 bg-sky-100 rounded-full">
            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M8 4h8M8 8h8M8 12h8M8 16h8M8 20h8" />
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              <circle cx="12" cy="14" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
        </div>
      </div>

      {/* SOLUZIONE SECTION - MODERN UI */}
      <section className="pt-8 pb-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cream"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">La Soluzione</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-dark mb-6 mt-3 leading-tight">
              Una Mentorship Pensata
              <span className="block text-blue-400">
                alla Perfezione
              </span>
            </h2>
            
            {/* Hero Image */}
            <div className="mb-8">
              <img 
                src="/home/web/home5-1600.jpg"
                srcSet="/home/web/home5-900.jpg 900w, /home/web/home5-1600.jpg 1600w"
                sizes="(min-width: 900px) 896px, 100vw" 
                alt="Mentorship Mobilitas" 
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            <p className="text-xl md:text-2xl text-blue-dark/80 max-w-4xl leading-relaxed font-light">
              Una mentorship pensata alla perfezione per preparare gli studenti e/o i neodiplomati a capire come riempirsi il calendario di pazienti. 
              <span className="font-semibold text-blue-dark"> Il passaggio, la trasformazione da studente a professionista di successo.</span>
            </p>
          </div>

          {/* Main Benefits Grid - Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Card 1: Affiancamento Osteopati Senior */}
            <div className="group relative bg-gradient-to-br from-blue-50 via-white to-green-50 border-2 border-blue-200/50 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-blue-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    👨‍⚕️
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">Beneficio #1</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mt-0">Affiancamento Osteopati Senior</h3>
                  </div>
                </div>
                <p className="text-lg text-blue-dark/80 leading-relaxed mb-4">
                  Quale modo migliore se non apprendere da chi si è riempito il calendario con almeno <span className="font-bold text-blue-dark">30 visite ogni settimana</span>?
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-semibold">
                  <span>→</span>
                  <span>Impara dai migliori</span>
                </div>
              </div>
            </div>

            {/* Card 2: Praticità */}
            <div className="group relative bg-gradient-to-br from-green-50 via-white to-blue-50 border-2 border-green-200/50 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-green-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    ✋
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-1">Beneficio #2</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mt-0">Praticità</h3>
                  </div>
                </div>
                <p className="text-lg text-blue-dark/80 leading-relaxed mb-4">
                  Possibilità di mettere in pratica durante le visite con i senior e ricevere feedback. Con <span className="font-bold text-blue-dark">pazienti veri e paganti</span>, quelli che se non porti risultati si incazzano.
                </p>
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <span>→</span>
                  <span>Esperienza reale</span>
                </div>
              </div>
            </div>

            {/* Card 3: Confronto con Colleghi */}
            <div className="group relative bg-gradient-to-br from-purple-50 via-white to-blue-50 border-2 border-purple-200/50 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-purple-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    🤝
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-1">Beneficio #3</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mt-0">Confronto con Colleghi</h3>
                  </div>
                </div>
                <p className="text-lg text-blue-dark/80 leading-relaxed mb-4">
                  Siamo uno studio grande e con tanta coesione dove tutti ci aiutiamo e confrontiamo, oltre che <span className="font-bold text-blue-dark">divertirci insieme nelle pause</span>.
                </p>
                <div className="flex items-center gap-2 text-purple-400 font-semibold">
                  <span>→</span>
                  <span>Team unito</span>
                </div>
              </div>
            </div>

            {/* Card 4: Formazione Business */}
            <div className="group relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 border-2 border-orange-200/50 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-orange-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    📈
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-1">Beneficio #4</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mt-0">Formazione Business</h3>
                  </div>
                </div>
                <p className="text-lg text-blue-dark/80 leading-relaxed mb-4">
                  Impari come <span className="font-bold text-blue-dark">fidelizzare i pazienti</span> e costruire una carriera solida. Tutto quello che non ti hanno insegnato all'università.
                </p>
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <span>→</span>
                  <span>Crescita professionale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transformation Highlight Box - Ultra Modern Design */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-400/20">
            {/* Animated Background Gradient - Darker */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-dark to-blue-950"></div>
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/95 via-blue-dark/90 to-blue-dark/95"></div>
            
            {/* Subtle Accent Gradients - Much darker */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/5 via-transparent to-blue-500/5"></div>
            
            {/* Decorative Geometric Shapes - Darker and more subtle */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-green-500/8 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-full blur-3xl"></div>
            
            {/* Very subtle grid pattern - darker */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>
            
            {/* Content Container with Padding */}
            <div className="relative z-10 p-8 md:p-16">
              {/* Icon with Subtle Glow Effect */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400/15 rounded-full blur-2xl"></div>
                  <div className="relative text-7xl md:text-8xl drop-shadow-lg">🚀</div>
                </div>
              </div>
              
              {/* Main Title - High Contrast */}
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white text-center drop-shadow-2xl tracking-tight">
                La Trasformazione
              </h3>
              
              {/* Subtitle with Arrow */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/40"></div>
                <p className="text-2xl md:text-3xl font-light text-white text-center leading-tight drop-shadow-lg">
                  Da <span className="font-bold text-white">studente</span> a{' '}
                  <span className="font-bold text-green-300 drop-shadow-lg">
                    professionista di successo
                  </span>
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/40"></div>
              </div>
              
              {/* Description - High Contrast */}
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-white text-center leading-relaxed font-light drop-shadow-md">
                  Questa è la mentorship che ti prepara davvero al mondo del lavoro.{' '}
                  <span className="font-semibold text-white">Non teoria, ma pratica.</span>{' '}
                  <span className="font-semibold text-green-300 drop-shadow-md">Non promesse, ma risultati.</span>
                </p>
              </div>
              
              {/* Decorative Bottom Accent */}
              <div className="flex justify-center items-center mt-10 gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-green-400/50 to-green-400"></div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                </div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-green-400/50 to-green-400"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Divider with Two Hands and Treatment Table */}
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mx-4 p-3 bg-sky-100 rounded-full">
            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M8 4h8M8 8h8M8 12h8M8 16h8M8 20h8" />
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              <circle cx="12" cy="14" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
        </div>
      </div>

      {/* OFFERTA SECTION */}
      <section id="candidati" className="pt-8 pb-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cream"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">La tua opportunità</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-dark mb-6 mt-3 leading-tight">
              Hai un'opportunità meravigliosa con
              <span className="block text-blue-400">
                la Mentorship di Mobilitas
              </span>
            </h2>
            <p className="text-lg text-blue-dark/70 max-w-2xl leading-relaxed">
              Un investimento nella tua carriera che ti trasforma da studente/neodiplomato a professionista in tempi brevi. 
              Ecco cosa include il percorso e quanto costa 👇🏼
            </p>
          </div>

          {/* Black Friday Offer - Premium UX Box */}
          <div className="mb-16 relative">
            {/* Animated Background */}
            <div 
              className="absolute inset-0 rounded-3xl blur-2xl animate-pulse"
              style={{
                background: 'linear-gradient(to right, rgba(0, 37, 82, 0.2), rgba(114, 250, 147, 0.2), rgba(0, 37, 82, 0.2))'
              }}
            ></div>
            
            {/* Main Offer Box */}
            <div 
              className="relative rounded-3xl p-1 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: 'linear-gradient(to bottom right, #002552, #72fa93, #002552)'
              }}
            >
              <div className="bg-blue-dark rounded-3xl p-4 md:p-12">
                {/* Badge */}
                <div className="flex items-center justify-center mb-3 md:mb-6">
                  <div 
                    className="text-cream px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse border-2"
                    style={{
                      borderColor: '#72fa93',
                      backgroundColor: 'rgba(114, 250, 147, 0.1)'
                    }}
                  >
                    ⚡ OFFERTA BLACK FRIDAY ⚡
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center mb-4 md:mb-8">
                  <h3 className="text-2xl md:text-5xl font-bold text-green mb-2 md:mb-4">
                    Sconto del 50%
                  </h3>
                  <p className="text-base md:text-xl text-cream mb-3 md:mb-6">
                    ⚠️ Solo per i primi 10 candidati selezionati
                  </p>
                </div>

                {/* What's Included in Offer */}
                <div 
                  className="rounded-2xl p-3 md:p-6 mb-4 md:mb-8 border-2"
                  style={{
                    backgroundColor: 'rgba(0, 37, 82, 0.5)',
                    borderColor: '#72fa93'
                  }}
                >
                  <h4 className="text-base md:text-xl font-bold text-green mb-2 md:mb-4 text-center">Cosa ricevi con la nostra Mentorship:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {[
                      'Impari come si costruisce una carriera osteopatica concreta',
                      'Mentorship 1:1 con i nostri osteopati senior',
                      'Formazione con il manager degli osteopati inclusa',
                      'Vivi l\'ambiente di uno studio osteopatico specializzato, strutturato e all\'avanguardia',
                      'Team di colleghi junior, senior e responsabili per confrontarsi',
                      'Impari come si vende e come si fidellizzano i pazienti',
                      'Se spiccherai, avrai la possiilità di fare un colloquio finale per lavorare con noi'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-green text-lg md:text-xl flex-shrink-0">✓</span>
                        <span className="text-cream text-sm md:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="mb-4 md:mb-8">
                  <div 
                    className="rounded-2xl p-3 md:p-8 transform scale-105 shadow-xl border-2 max-w-2xl mx-auto"
                    style={{
                      backgroundColor: '#72fa93',
                      borderColor: '#72fa93'
                    }}
                  >
                    <p className="text-sm md:text-sm text-blue-dark mb-2 md:mb-6 uppercase tracking-wide font-semibold text-center">Prezzo Black Friday</p>
                    {/* Mobile: Horizontal layout - Prezzo sbarrato a sinistra, prezzo nuovo a destra */}
                    <div className="flex md:hidden flex-row items-center justify-center w-full gap-1.5">
                      {/* Old Price - Sbarrato - A sinistra */}
                      <div className="flex flex-col items-start flex-shrink-0">
                        <span className="text-3xl font-bold text-blue-dark/60 line-through">800€</span>
                        <p className="text-xs text-blue-dark/70 mt-0.5 italic">Prezzo normale</p>
                      </div>
                      
                      {/* Arrow or separator */}
                      <div className="text-blue-dark text-2xl flex-shrink-0">→</div>
                      
                      {/* New Price - In evidenza - A destra */}
                      <div className="relative flex flex-col items-start flex-shrink-0">
                        <span className="text-5xl font-bold text-blue-dark">399€</span>
                        <div className="absolute -top-2 -right-1 bg-blue-dark text-green text-xs font-bold px-1 py-0.5 rounded-full animate-bounce">
                          -50%
                        </div>
                        <p className="text-xs text-blue-dark mt-1 font-semibold italic">Risparmi 401€</p>
                      </div>
                    </div>
                    {/* Desktop: Side by side */}
                    <div className="hidden md:flex flex-row items-center justify-between w-full">
                      {/* Old Price - Sbarrato - A sinistra */}
                      <div className="flex flex-col items-start flex-shrink-0">
                        <span className="text-4xl font-bold text-blue-dark/60 line-through">800€</span>
                        <p className="text-xs text-blue-dark/70 mt-1 italic">Prezzo normale</p>
                      </div>
                      
                      {/* Arrow or separator */}
                      <div className="text-blue-dark text-3xl flex-shrink-0 px-4">→</div>
                      
                      {/* New Price - In evidenza - A destra */}
                      <div className="relative flex flex-col items-end flex-shrink-0">
                        <span className="text-6xl font-bold text-blue-dark">399€</span>
                        <div className="absolute -top-4 -right-2 bg-blue-dark text-green text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                          -50%
                        </div>
                        <p className="text-sm text-blue-dark mt-2 font-semibold italic">Risparmi 401€</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Urgency Elements */}
                <div 
                  className="rounded-2xl p-3 md:p-6 border-2 mt-3 md:mt-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(114, 250, 147, 0.15) 0%, rgba(0, 37, 82, 0.25) 100%)',
                    borderColor: '#72fa93'
                  }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-xs md:text-sm text-cream mb-1 md:mb-2">⏰ Offerta valida fino a:</p>
                      <p className="text-base md:text-2xl font-bold text-green">Domenica 30/11/2025 ore 23:59</p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-xs md:text-sm text-cream mb-1 md:mb-2">👥 Posti disponibili:</p>
                      <p className="text-base md:text-2xl font-bold text-green">Ancora 4 osteopati</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-4 md:mt-8 text-center">
                  <button
                    onClick={() => {
                      // Track Lead event ONLY for the mentorship pixel (ID: 751362634658136)
                      if (typeof window !== 'undefined' && window.fbq) {
                        const pixelId = '751362634658136'
                        const eventId = 'mentorship_lead_' + Date.now()
                        // Use trackSingle to track only for the specific pixel
                        window.fbq('trackSingle', pixelId, 'Lead', {}, {eventID: eventId})
                      }
                      
                      const phoneNumber = '393518198457'
                      const message = encodeURIComponent('Ciao, vorrei candidarmi per la Mentorship Mobilitas con l\'offerta Black Friday')
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
                      window.open(whatsappUrl, '_blank')
                    }}
                    className="inline-block bg-green text-blue-dark px-8 md:px-12 py-3 md:py-5 rounded-full font-bold text-base md:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:bg-green/90 uppercase no-underline cursor-pointer font-montserrat"
                  >
                    🎯 CANDIDATI ORA PER LA MENTORSHIP →
                  </button>
                  <p className="text-xs text-cream/70 mt-2 md:mt-3">
                    * L'offerta è valida solo per i primi 10 candidati selezionati che si iscrivono entro il Black Friday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Divider with Two Hands and Treatment Table */}
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="mx-4 p-3 bg-sky-100 rounded-full">
            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M8 4h8M8 8h8M8 12h8M8 16h8M8 20h8" />
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              <circle cx="12" cy="14" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="mx-4 p-2">
            <Hand className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section id="faq" className="pt-8 pb-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cream"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">Domande Frequenti</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-dark mb-6 mt-3 leading-tight">
              Tutte le risposte
              <span className="block text-blue-dark">
                alle tue domande
              </span>
            </h2>
            <p className="text-lg text-blue-dark/70 max-w-2xl leading-relaxed">
              Le domande più frequenti sul percorso Mobilitas Mentorship. Se non trovi la risposta, contattaci direttamente e saremo lieti di chiarire i tuoi dubbi.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-blue-dark/20 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-dark/5 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-blue-dark pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${openFAQ === index ? 'transform rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-blue-dark/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dove Siamo Section */}
          <div className="mt-16 mb-16">
            <div className="text-left mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">Dove Siamo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-dark mb-4">
                Siamo nel cuore di Torino
              </h2>
              <p className="text-lg text-blue-dark/70 max-w-2xl leading-relaxed">
                Il nostro studio si trova in una posizione strategica abbastanza centrale di Torino, 
                facilmente raggiungibile con i mezzi pubblici (anche la metro) e con parcheggi nelle vicinanze.
              </p>
            </div>
            
            {/* Map */}
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

          {/* Bottom CTA */}
          <div className="mt-16 text-left">
            <p className="text-lg text-blue-dark/80 mb-6">
              Hai altre domande? Siamo qui per rispondere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const phoneNumber = '393518198457'
                  const message = encodeURIComponent('Ciao, vorrei avere maggiori informazioni sulla Mentorship Mobilitas')
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
                  window.open(whatsappUrl, '_blank')
                }}
                className="inline-block bg-blue-dark text-green px-12 py-5 rounded-full font-semibold text-xl hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl uppercase no-underline text-center font-montserrat cursor-pointer"
              >
                Contattaci →
              </button>
              <a 
                href="#candidati" 
                className="inline-block bg-green text-blue-dark px-12 py-5 rounded-full font-bold text-xl hover:bg-green/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 uppercase no-underline text-center font-montserrat"
              >
                🎯 Vedi l'Offerta Black Friday →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mentorship

