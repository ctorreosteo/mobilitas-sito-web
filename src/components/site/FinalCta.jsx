import React from 'react'
import { CtaPair, Kicker, MaskLines, Reveal } from '../home-sections/HomeKit'

// Chiusura delle pagine interne: titolo grande, testo e le due CTA WhatsApp.
// children: per sostituire le CTA standard con azioni specifiche della pagina.
const FinalCta = ({ kicker = 'Il primo passo', titleLines, text, children }) => (
  <section className="mx-final">
    <span className="mx-final__ring" aria-hidden="true" />
    <span className="mx-final__ring" aria-hidden="true" />
    <span className="mx-final__ring" aria-hidden="true" />
    <div className="mx-wrap">
      <Reveal>
        <img className="mx-final__logo" src="/pittogramma.png" alt="" />
      </Reveal>
      <Kicker>{kicker}</Kicker>
      <h2 className="mx-h mx-h--xl">
        <MaskLines lines={titleLines} />
      </h2>
      {text && (
        <Reveal>
          <p className="mx-lead" style={{ margin: '36px auto 0', maxWidth: 720 }}>
            {text}
          </p>
        </Reveal>
      )}
      {children || <CtaPair />}
    </div>
  </section>
)

export default FinalCta
