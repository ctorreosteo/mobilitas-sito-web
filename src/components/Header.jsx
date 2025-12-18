import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, User } from 'lucide-react'
import Sidebar from './Sidebar'

const Header = ({ topOffset = 0 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
    
    // Se siamo già sulla home, forza il reload completo
    if (location.pathname === '/') {
      window.location.href = '/'
    } else {
      // Altrimenti naviga normalmente
      navigate('/')
    }
  }

  return (
    <>
      <header 
        className="bg-blue-dark shadow-lg border-b border-green fixed left-0 right-0 z-50 w-full" 
        style={topOffset !== 0 ? { top: `${topOffset}px` } : { top: '0' }}
      >
        <div className="container mx-auto px-4 w-full max-w-full">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Menu Hamburger - Sinistra */}
            <button
              onClick={toggleSidebar}
              className="text-cream hover:text-green transition-colors bg-transparent border-none outline-none cursor-pointer"
              aria-label="Apri menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo - Centro */}
            <a 
              href="/" 
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img 
                src="/logo_verde.png" 
                alt="Mobilitas Logo" 
                className="h-6 sm:h-7.5 w-auto"
              />
            </a>

            {/* Icona Utente - Destra */}
            <Link 
              to="/login" 
              className="text-cream hover:text-green transition-colors bg-transparent border-none outline-none cursor-pointer"
              aria-label="Accedi al tuo account"
              onClick={() => window.scrollTo(0, 0)}
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
      />
    </>
  )
}

export default Header
