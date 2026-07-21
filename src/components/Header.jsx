import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Phone, User } from 'lucide-react'
import Sidebar from './Sidebar'

const PHONE_HREF = 'tel:+393518198457'

const iconBtnClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center border-none bg-transparent p-0 text-cream outline-none transition-colors hover:text-green focus-visible:text-green [-webkit-tap-highlight-color:transparent] appearance-none cursor-pointer'

const Header = ({ topOffset = 0 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen((open) => !open)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    if (location.pathname === '/') {
      window.location.href = '/'
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 w-full bg-blue-dark transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{
          top: topOffset !== 0 ? `${topOffset}px` : '0',
          borderBottom: '1px solid rgba(114, 250, 147, 0.28)',
        }}
      >
        <div className="container mx-auto w-full max-w-full px-2 sm:px-4">
          <div className="grid h-16 grid-cols-[2.75rem_1fr_2.75rem] items-center sm:h-20 sm:grid-cols-[2.75rem_1fr_auto]">
            <button
              type="button"
              onClick={toggleSidebar}
              className={iconBtnClass}
              aria-label="Apri menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu size={24} strokeWidth={2} />
            </button>

            <a
              href="/"
              className="flex items-center justify-center justify-self-center"
              onClick={handleLogoClick}
            >
              <img
                src="/logo_verde.png"
                alt="Mobilitas"
                className="h-6 w-auto sm:h-[1.875rem]"
                decoding="async"
              />
            </a>

            <div className="flex items-center justify-end gap-1 justify-self-end">
              <a
                href={PHONE_HREF}
                className={`${iconBtnClass} sm:hidden`}
                aria-label="Chiama Mobilitas"
              >
                <Phone size={22} strokeWidth={2} />
              </a>

              <a
                href={PHONE_HREF}
                className="hidden items-center gap-2 border-none bg-transparent px-2 py-2 text-cream no-underline outline-none transition-colors hover:text-green focus-visible:text-green sm:inline-flex"
                aria-label="Chiama Mobilitas"
              >
                <Phone size={18} strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Chiama
                </span>
              </a>

              <Link
                to="/login"
                className={`${iconBtnClass} hidden sm:inline-flex`}
                aria-label="Accedi al tuo account"
                onClick={() => window.scrollTo(0, 0)}
              >
                <User size={22} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  )
}

export default Header
