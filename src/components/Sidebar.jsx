import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronRight, ChevronDown, User, Phone, Mail, MessageCircle } from 'lucide-react'

const PHONE_HREF = 'tel:+393518198457'
const EMAIL_HREF = 'mailto:studio@studiomobilitas.it'
const WHATSAPP_HREF =
  'https://wa.me/393518198457?text=' +
  encodeURIComponent('Ciao Mobilitas, vorrei avere maggiori informazioni.')

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState({})
  const [scrollMetrics, setScrollMetrics] = useState({
    canScroll: false,
    thumbHeight: 0,
    thumbTop: 0,
  })
  const navRef = useRef(null)

  const updateScrollMetrics = useCallback(() => {
    const el = navRef.current
    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const canScroll = scrollHeight > clientHeight + 1
    if (!canScroll) {
      setScrollMetrics({ canScroll: false, thumbHeight: 0, thumbTop: 0 })
      return
    }

    const trackHeight = clientHeight
    const thumbHeight = Math.max(28, (clientHeight / scrollHeight) * trackHeight)
    const maxThumbTop = trackHeight - thumbHeight
    const maxScroll = scrollHeight - clientHeight
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0

    setScrollMetrics({ canScroll: true, thumbHeight, thumbTop })
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const { body, documentElement } = document
    const prevBodyOverflow = body.style.overflow
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyWidth = body.style.width
    const prevHtmlOverflow = documentElement.style.overflow

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = prevBodyOverflow
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.width = prevBodyWidth
      documentElement.style.overflow = prevHtmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const el = navRef.current
    if (!el) return

    updateScrollMetrics()
    // Dopo il paint e dopo eventuali font/layout shift
    const raf = requestAnimationFrame(updateScrollMetrics)
    const t = window.setTimeout(updateScrollMetrics, 50)

    el.addEventListener('scroll', updateScrollMetrics, { passive: true })
    window.addEventListener('resize', updateScrollMetrics)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateScrollMetrics) : null
    ro?.observe(el)
    if (el.firstElementChild) ro?.observe(el.firstElementChild)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      el.removeEventListener('scroll', updateScrollMetrics)
      window.removeEventListener('resize', updateScrollMetrics)
      ro?.disconnect()
    }
  }, [isOpen, expandedItems, updateScrollMetrics])

  const menuItems = [
    {
      name: 'Scopri Mobilitas',
      href: '/'
    },
    {
      name: 'Mobilitas Fitness Club',
      href: '/mobilitas-fitness'
    },
    {
      name: 'Mobilitas Card',
      href: '/carta-fedelta'
    },
    {
      name: 'Partnership',
      subItems: [
        { name: 'GPADEL', href: '/partnership/gpadel' },
        { name: 'Abylsen', href: '/partnership/abylsen' },
        { name: 'Stampa Subalpina', href: '/partnership/stampa-subalpina' },
        { name: 'Robogest', href: '/partnership/robogest' },
        { name: 'Edenred', href: '/partnership/edenred' },
        { name: 'Allianz', href: '/partnership/allianz' }
      ]
    },
    {
      name: 'Testimonianze',
      href: '/testimonianze'
    },
    {
      name: 'La nostra storia',
      href: '/la-nostra-storia'
    },
    {
      name: 'Influencer',
      href: '/influencer'
    },
    {
      name: 'Lavora con noi',
      href: '/lavora-con-noi'
    },
    {
      name: 'Mobilitas Insider',
      href: '/newsletter'
    },
    {
      name: 'Domande frequenti',
      href: '/faq'
    },
    {
      name: 'Magazine',
      href: '/magazine'
    },
    {
      name: 'Blog',
      href: '/blog'
    },
    {
      name: 'Risorse',
      href: '/risorse'
    }
  ]

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => {
      if (prev[itemName]) {
        return { ...prev, [itemName]: false }
      }
      return { [itemName]: true }
    })
  }

  const handleItemClick = (item) => {
    if (item.subItems) {
      toggleExpanded(item.name)
    } else {
      window.scrollTo(0, 0)
      onClose()
    }
  }

  const handleSubItemClick = () => {
    window.scrollTo(0, 0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />

      <div
        className="fixed left-0 top-0 z-50 flex h-full w-[15.5rem] flex-col overflow-hidden bg-blue-dark shadow-2xl transition-transform duration-300 ease-in-out sm:w-72"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div
          className="flex flex-shrink-0 items-center justify-between px-4 py-3.5 sm:p-6"
          style={{ borderBottom: '1px solid rgba(244, 244, 244, 0.1)' }}
        >
          <p className="m-0 font-montserrat text-sm font-bold text-cream sm:text-xl">Menu</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 appearance-none items-center justify-center border-none bg-transparent p-0 text-cream outline-none transition-colors hover:text-green sm:h-10 sm:w-10"
            aria-label="Chiudi menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <nav
            ref={navRef}
            className="sidebar-scroll h-full overscroll-contain py-2 sm:py-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="space-y-0.5 px-2.5 pr-4 sm:space-y-1 sm:px-4 sm:pr-5">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 font-montserrat text-[0.8125rem] font-medium leading-snug text-cream no-underline transition-colors hover:text-green sm:px-4 sm:py-3 sm:text-base"
                      onClick={handleSubItemClick}
                    >
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <div
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:text-green sm:px-4 sm:py-3"
                      onClick={() => handleItemClick(item)}
                    >
                      <span className="font-montserrat text-[0.8125rem] font-medium leading-snug text-cream sm:text-base">
                        {item.name}
                      </span>

                      {item.subItems && (
                        <div className="text-green">
                          {expandedItems[item.name] ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {item.subItems && expandedItems[item.name] && (
                    <div className="ml-3 mt-0.5 space-y-0.5 sm:ml-4 sm:mt-1 sm:space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.href}
                          className="block w-full rounded-lg px-3 py-1.5 font-montserrat text-[0.75rem] italic leading-snug text-cream no-underline transition-colors hover:text-green sm:px-4 sm:py-2 sm:text-sm"
                          onClick={handleSubItemClick}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Scrollbar custom: i browser overlay nascondono quella nativa finché non scrolli */}
          {scrollMetrics.canScroll && (
            <div
              className="pointer-events-none absolute bottom-2 right-1.5 top-2 w-1.5 rounded-full"
              style={{ background: 'rgba(244, 244, 244, 0.12)' }}
              aria-hidden
            >
              <div
                className="absolute left-0 w-full rounded-full bg-green"
                style={{
                  height: `${scrollMetrics.thumbHeight}px`,
                  transform: `translateY(${scrollMetrics.thumbTop}px)`,
                }}
              />
            </div>
          )}
        </div>

        <div
          className="flex-shrink-0 space-y-1.5 p-3 sm:space-y-2 sm:p-4"
          style={{ borderTop: '1px solid rgba(244, 244, 244, 0.1)' }}
        >
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-montserrat text-[0.6875rem] font-bold uppercase tracking-wide text-cream no-underline transition-colors hover:text-green sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
            style={{ border: '1px solid rgba(244, 244, 244, 0.16)' }}
            onClick={onClose}
          >
            <Phone size={16} strokeWidth={2.5} />
            Chiama ora
          </a>
          <a
            href={EMAIL_HREF}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-montserrat text-[0.6875rem] font-bold uppercase tracking-wide text-cream no-underline transition-colors hover:text-green sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
            style={{ border: '1px solid rgba(244, 244, 244, 0.16)' }}
            onClick={onClose}
          >
            <Mail size={16} strokeWidth={2.25} />
            Invia email
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg bg-green px-3 py-2.5 font-montserrat text-[0.6875rem] font-bold uppercase tracking-wide text-blue-dark no-underline transition-opacity hover:opacity-90 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
            onClick={onClose}
          >
            <MessageCircle size={16} strokeWidth={2.25} />
            Scrivici su WhatsApp
          </a>
          <Link
            to="/login"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-montserrat text-[0.75rem] font-medium text-cream no-underline transition-colors hover:text-green sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
            onClick={() => {
              window.scrollTo(0, 0)
              onClose()
            }}
          >
            <User size={16} strokeWidth={2} />
            Accedi
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
