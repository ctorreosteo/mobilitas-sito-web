import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronRight, ChevronDown, User, Phone, Mail, MessageCircle } from 'lucide-react'

const PHONE_HREF = 'tel:+393518198457'
const EMAIL_HREF = 'mailto:studio@studiomobilitas.it'
const WHATSAPP_HREF =
  'https://wa.me/393518198457?text=' +
  encodeURIComponent('Ciao Mobilitas, vorrei avere maggiori informazioni.')

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState({})

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
      // Se l'item è già espanso, lo chiudiamo
      if (prev[itemName]) {
        return { ...prev, [itemName]: false }
      }
      // Altrimenti chiudiamo tutti gli altri e apriamo solo questo
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
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-blue-dark shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-cream/10 p-6">
          <h2 className="font-montserrat text-xl font-bold text-cream">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 appearance-none items-center justify-center border-none bg-transparent p-0 text-cream outline-none transition-colors hover:text-green"
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-4">
            {menuItems.map((item, index) => (
              <div key={index}>
                {/* Main Item */}
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 font-montserrat font-medium text-cream no-underline transition-colors hover:bg-green/10 hover:text-green"
                    onClick={handleSubItemClick}
                  >
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-green/10"
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="font-montserrat font-medium text-cream">
                      {item.name}
                    </span>

                    {item.subItems && (
                      <div className="text-green">
                        {expandedItems[item.name] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Sub Items */}
                {item.subItems && expandedItems[item.name] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href}
                        className="block w-full rounded-lg px-4 py-2 font-montserrat text-sm italic text-cream no-underline transition-colors hover:bg-green/10 hover:text-green"
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

        {/* Contatti + account */}
        <div
          className="flex-shrink-0 space-y-2 p-4"
          style={{ borderTop: '1px solid rgba(244, 244, 244, 0.1)' }}
        >
          <a
            href={PHONE_HREF}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-montserrat text-sm font-bold uppercase tracking-wide text-cream no-underline transition-colors hover:text-green"
            style={{ border: '1px solid rgba(244, 244, 244, 0.16)' }}
            onClick={onClose}
          >
            <Phone size={18} strokeWidth={2.5} />
            Chiama ora
          </a>
          <a
            href={EMAIL_HREF}
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-montserrat text-sm font-bold uppercase tracking-wide text-cream no-underline transition-colors hover:text-green"
            style={{ border: '1px solid rgba(244, 244, 244, 0.16)' }}
            onClick={onClose}
          >
            <Mail size={18} strokeWidth={2.25} />
            Invia email
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-green px-4 py-3 font-montserrat text-sm font-bold uppercase tracking-wide text-blue-dark no-underline transition-opacity hover:opacity-90"
            onClick={onClose}
          >
            <MessageCircle size={18} strokeWidth={2.25} />
            Scrivici su WhatsApp
          </a>
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-montserrat text-sm font-medium text-cream no-underline transition-colors hover:text-green"
            onClick={() => {
              window.scrollTo(0, 0)
              onClose()
            }}
          >
            <User size={18} strokeWidth={2} />
            Accedi
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
