import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Gift, ShoppingBag, Users, Heart, Laptop, ShoppingCart, Baby, Dumbbell, User, AlertCircle, DollarSign, Stethoscope, UserCircle } from 'lucide-react'

export default function PainPointsSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Carosello problemi di chi deve fare regali
  const shoppingProblems = [
    {
      icon: Clock,
      title: "È quasi Natale e non hai ancora fatto i regali",
      description: "Ti eri ripromesso di non ridurti all'ultimo minuto, e invece eccoti qui. Ancora con le mani in mano, senza idee e con l'ansia che sale."
    },
    {
      icon: DollarSign,
      title: "Butti via soldi in parcheggi e tempo prezioso",
      description: "Giri per ore cercando un parcheggio, paghi tariffe esorbitanti in centro, perdi interi pomeriggi tra negozi e centri commerciali. E alla fine non trovi nulla."
    },
    {
      icon: Gift,
      title: "Sempre le solite idee banali che finiscono dimenticate",
      description: "Cappelini, sciarpe, profumi, oggetti inutili... Regali che finiscono dimenticati in un cassetto o che vengono riciclati l'anno dopo. Non vuoi più questo."
    },
    {
      icon: Users,
      title: "Code infinite e folla ovunque",
      description: "Le vie del centro e i centri commerciali sono invasi. Code interminabili alle casse, gente che spinge, stress e confusione. Un incubo che si ripete ogni anno."
    }
  ]

  // Pain points per target - Blocco 1: Amici e conoscenti
  const targetPainPointsFriends = [
    {
      icon: Gift,
      title: "L'amico che ha già tutto",
      description: "Non ha bisogno di niente, non desidera nulla… e ogni idea ti sembra banale. Profumi, oggetti, buoni… sempre le solite cose che finiscono dimenticate in un cassetto."
    },
    {
      icon: Dumbbell,
      title: "L'amico sportivo",
      description: "Chi è super attivo ha già tutto: scarpe nuove, abbigliamento impeccabile, attrezzatura e abbonamenti. Trovare qualcosa che non abbia già è una vera impresa."
    },
    {
      icon: Laptop,
      title: "L'amico sedentario",
      description: "Chi sta seduto per ore, davanti a uno schermo, ha bisogno di qualcosa di molto diverso: una pausa vera per sciogliere il corpo, scaricare la tensione alla schiena, spalle e collo."
    },
    {
      icon: User,
      title: "Chi vive una vita frenetica",
      description: "Quando è stata l'ultima volta che hai regalato un momento per sé? Non un oggetto, ma una vera pausa dalla vita frenetica moderna. Una parentesi di pace per respirare, sciogliere le tensioni e lo stress."
    }
  ]

  // Pain points per target - Blocco 2: Famiglia e situazioni specifiche
  const targetPainPointsFamily = [
    {
      icon: Stethoscope,
      title: "L'amico/parente che ha sempre qualche problema o acciacco",
      description: "Quella persona che si lamenta sempre di qualche dolore, rigidità o fastidio. Un trattamento osteopatico è il regalo perfetto per aiutarla a stare meglio e sentirsi più leggera."
    },
    {
      icon: UserCircle,
      title: "Un parente anziano",
      description: "Un gesto di cura e gratitudine verso chi si è sempre preso cura di te. Aiutalo a muoversi meglio, sentirsi più libero e ritrovare quella mobilità che il tempo ha limitato. Un regalo che vale più di mille parole."
    },
    {
      icon: Heart,
      title: "La donna incinta",
      description: "Durante la gravidanza il corpo cambia e accumula tensioni. Un trattamento osteopatico specifico è il regalo perfetto per il benessere di mamma e bambino."
    },
    {
      icon: Baby,
      title: "Il bambino piccolo",
      description: "Anche i più piccoli possono beneficiare di trattamenti osteopatici delicati per tensioni, disturbi del sonno o piccoli traumi. Un regalo che i genitori apprezzeranno."
    }
  ]


  return (
    <section id="pain-points-section" className="relative py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-blue-dark mb-6">
            Basta con i soliti <span style={{color: '#00BFFF'}}>regali inutili!</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-dark/80 max-w-4xl leading-relaxed">
            Ogni Natale si finisce per spendere soldi in oggetti che non servono a niente.
            Quest’anno puoi fare un regalo che <span className="font-bold">lascia il segno</span>: migliora il corpo, la salute e la qualità di vita di chi lo riceve.
          </p>
        </motion.div>

        {/* Carosello Problemi Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mb-8 text-left">
            Ogni anno la stessa storia...
          </h3>
          
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
          
          <div className="relative max-w-7xl mx-auto">
            {/* Gradient overlays to indicate scrollable content */}
            <div className="relative">
              {/* Left gradient fade - Mobile only */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
              
              {/* Right gradient fade - Mobile only */}
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>
              
              <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex gap-6 pb-4 px-2" style={{ width: 'max-content' }}>
                  {shoppingProblems.map((problem, index) => {
                    const IconComponent = problem.icon
                    return (
                      <div 
                        key={index}
                        className="flex-shrink-0 w-80 bg-red-500/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-red-500/30 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-blue-dark mb-3 mt-0 font-montserrat leading-tight">
                                {problem.title}
                              </h4>
                            </div>
                          </div>
                          
                          <p className="text-blue-dark/80 mb-4 font-montserrat leading-relaxed text-sm flex-1">
                            {problem.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex flex-col items-center mt-6 gap-3">
              <div className="flex gap-2">
                {shoppingProblems.map((_, index) => (
                  <div 
                    key={index} 
                    className="w-2.5 h-2.5 bg-red-500/40 rounded-full transition-all duration-300"
                  ></div>
                ))}
              </div>
              <p className="text-xs text-blue-dark/50 md:hidden">
                {shoppingProblems.length} situazioni comuni
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pain Points per Target - Blocco 1: Famiglia */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mb-8 text-left">
            Non sai cosa regalare ai tuoi <span style={{color: '#00BFFF'}}>parenti</span> e persone care?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetPainPointsFamily.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-dark/10 hover:border-green/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-red-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-blue-dark mb-2 leading-tight mt-0">
                      {point.title}
                    </h4>
                    
                    <p className="text-blue-dark text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pain Points per Target - Blocco 2: Amici */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-blue-dark mb-8 text-left">
            O ai tuoi <span style={{color: '#00BFFF'}}>amici</span>?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetPainPointsFriends.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-dark/10 hover:border-green/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-red-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-blue-dark mb-2 leading-tight mt-0">
                      {point.title}
                    </h4>
                    
                    <p className="text-blue-dark text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div style={{backgroundColor: 'rgba(255, 165, 0, 0.2)'}} className="text-blue-dark p-8 md:p-12 rounded-2xl shadow-2xl border border-orange-300 mb-8 text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ marginTop: '0px' }}>
              Vuoi sentirti finalmente soddisfatto per aver fatto un regalo utile, originale e di estremo valore? 🎯
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed">
              O preferisci aspettare di nuovo il 24 dicembre e fare i soliti regali? 🎄
            </p>
            <p className="text-xl md:text-2xl leading-relaxed mt-4">
              <span style={{color: '#00BFFF'}} className="font-bold">Acquistali ora da Mobilitas!</span>
            </p>
          </div>
          
          {/* CTA Button */}
          <motion.button 
            onClick={scrollToOffer}
            className="mt-6"
            style={{
              backgroundColor: '#002552',
              color: '#72fa93',
              padding: '20px 40px',
              borderRadius: '50px',
              fontSize: '20px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0, 37, 82, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'Montserrat, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#001a3a';
              e.target.style.boxShadow = '0 15px 40px rgba(0, 37, 82, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#002552';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 37, 82, 0.4)';
            }}
          >
            <ShoppingCart style={{width: '22px', height: '22px'}} />
            ACQUISTA ORA
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
