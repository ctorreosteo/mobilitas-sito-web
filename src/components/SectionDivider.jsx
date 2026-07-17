import React from 'react'
import { Hand } from 'lucide-react'

const SectionDivider = ({ overlap = false, className = '' }) => {
  return (
    <div
      className={`${overlap ? 'relative z-20 -my-4 py-0 bg-transparent' : 'py-8'} ${className}`}
    >
      <div className="flex items-center justify-center bg-transparent">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
        <div className={`${overlap ? 'mx-6 p-0' : 'mx-6 p-3'} bg-transparent`}>
          <Hand className="w-6 h-6 text-sky-400" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      </div>
    </div>
  )
}

export default SectionDivider
