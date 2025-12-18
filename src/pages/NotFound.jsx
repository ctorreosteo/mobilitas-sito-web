import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, Navigation } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButtonSito from '../components/WhatsAppButtonSito'

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-cream w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20 sm:pt-8">
        <div className="min-h-[calc(100vh-300px)] bg-gradient-to-br from-blue-dark via-azure-dark to-green relative overflow-hidden flex items-center justify-center text-blue-dark font-montserrat py-8 sm:py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with parallax effect */}
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-green/15 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-azure-dark/20 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl"
          style={{
            transform: `translate(calc(-50% + ${mousePosition.x * 0.01}px), calc(-50% + ${mousePosition.y * 0.01}px))`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>

        {/* Geometric shapes */}
        <div className="absolute top-32 right-32 w-2 h-2 bg-green rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-24 w-3 h-3 bg-azure-dark rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-green rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Number with enhanced styling */}
        <div className="mb-8 relative">
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-black text-blue-dark mb-4 leading-none relative z-10 drop-shadow-2xl">
              404
            </h1>
            {/* Glow effect behind 404 */}
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-blue-dark/30 blur-2xl -z-10"></div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-dark to-transparent rounded-full"></div>
            <div className="w-2 h-2 bg-blue-dark rounded-full animate-pulse"></div>
            <div className="w-24 h-1 bg-blue-dark rounded-full"></div>
            <div className="w-2 h-2 bg-blue-dark rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent via-blue-dark to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Message with enhanced typography */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-azure-dark mb-4 leading-tight">
            Oops! Pagina non trovata
          </h2>
          <p className="text-blue-dark/80 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
            La pagina che stai cercando non esiste o è stata spostata. 
            <span className="block mt-2 text-base md:text-lg">
              Non ti preoccupare, possiamo aiutarti a trovare quello che cerchi!
            </span>
          </p>
        </div>

        {/* Action Buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link 
            to="/" 
            className="group relative inline-flex items-center px-8 py-4 bg-green text-blue-dark font-bold rounded-xl hover:bg-green/90 transition-all duration-300 hover:scale-105 no-underline shadow-lg hover:shadow-green/50 overflow-hidden"
            onClick={() => window.scrollTo(0, 0)}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Home size={20} className="mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Torna alla Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center px-6 py-3 text-blue-dark/90 hover:text-blue-dark border-2 border-blue-dark/40 hover:border-blue-dark/80 rounded-xl transition-all duration-300 hover:bg-blue-dark/10 hover:scale-105 backdrop-blur-sm bg-white/10"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Torna Indietro
          </button>
        </div>
      </div>

      {/* Decorative SVG Elements */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10" style={{ zIndex: 1 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-blue-dark" />
      </svg>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButtonSito />
    </div>
  )
}

export default NotFound
