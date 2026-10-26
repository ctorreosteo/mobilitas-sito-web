import React from 'react'
import { MotionConfig } from 'framer-motion'
import SpineProgress from '../home-sections/SpineProgress'
import '../../styles/mx.css'

// Contenitore delle pagine interne: stesso linguaggio visivo della home
// (sfondo blu, grana, tipografia, colonna di lettura su desktop largo).
const PageShell = ({ children, className = '' }) => (
  <MotionConfig reducedMotion="user">
    <div className={`mx-page ${className}`}>
      <SpineProgress />
      {children}
    </div>
  </MotionConfig>
)

export default PageShell
