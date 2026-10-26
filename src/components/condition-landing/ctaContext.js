import { createContext } from 'react'

// { labels, openConsulto, openPrimaVisita }: apre il BookingPopup con il ctaType giusto
export const CtaContext = createContext(null)

export const pad2 = (n) => String(n).padStart(2, '0')
