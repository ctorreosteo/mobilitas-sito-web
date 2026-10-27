import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Car, MapPin, TrainFront } from 'lucide-react'
import { STUDI } from '../../data/studi'
import { MAP_STYLE } from './mapStyle'
import './studi-map.css'

// Pin dello studio: badge col pittogramma ed etichetta con l'indirizzo; il click apre le indicazioni.
function creaPin(studio) {
  const el = document.createElement('a')
  el.className = 'mx-studi-map__pin'
  el.dataset.studio = studio.id
  el.href = studio.indicazioniUrl
  el.target = '_blank'
  el.rel = 'noopener noreferrer'
  el.setAttribute('aria-label', `Indicazioni per Mobilitas ${studio.quartiere}, ${studio.nome}, su Google Maps`)
  el.innerHTML = `
    <span class="mx-studi-map__badge" aria-hidden="true"></span>
    <span class="mx-studi-map__label">
      <b>${studio.nome}</b>
      <span>Mobilitas · ${studio.quartiere}</span>
    </span>`
  return el
}

/**
 * Mappa degli studi Mobilitas, chiara e orientata a nord come Google Maps.
 * MapLibre si carica solo quando la mappa sta per entrare nello schermo, per non pesare sulla landing.
 */
// Quanto allontanare la mappa rispetto al taglio che inquadra esattamente gli studi
const ZOOM_PIU_LONTANO = 0.7

export default function StudiMap({ studi = STUDI, className = '' }) {
  const box = useRef(null)
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisibile(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visibile) return
    let map
    let annullato = false
    Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl.css')]).then(([{ default: maplibregl }]) => {
      if (annullato) return
      const bounds = new maplibregl.LngLatBounds()
      studi.forEach((s) => bounds.extend([s.lng, s.lat]))
      map = new maplibregl.Map({
        container: box.current,
        style: MAP_STYLE,
        bounds,
        // Spazio in alto e a destra per badge ed etichette dei pin.
        fitBoundsOptions: { padding: { top: 80, bottom: 40, left: 40, right: 170 }, maxZoom: 15 },
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        locale: {
          'CooperativeGesturesHandler.WindowsHelpText': 'Usa Ctrl + scroll per lo zoom',
          'CooperativeGesturesHandler.MacHelpText': 'Usa ⌘ + scroll per lo zoom',
          'CooperativeGesturesHandler.MobileHelpText': 'Usa due dita per muovere la mappa',
        },
      })
      // Un filo più lontano del taglio esatto: si vedono meglio i quartieri intorno ai due studi
      map.setZoom(map.getZoom() - ZOOM_PIU_LONTANO)
      map.touchZoomRotate.disableRotation()
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      studi.forEach((s) => {
        // La punta del badge (largo 44px) cade sul punto: l'etichetta sporge a destra senza spostarlo.
        new maplibregl.Marker({ element: creaPin(s), anchor: 'bottom-left', offset: [-22, 0] })
          .setLngLat([s.lng, s.lat])
          .addTo(map)
      })
    })
    return () => {
      annullato = true
      map?.remove()
    }
  }, [visibile, studi])

  const evidenzia = (id, on) =>
    box.current?.querySelector(`[data-studio="${id}"]`)?.classList.toggle('is-active', on)

  return (
    <div className={`mx-studi-map ${className}`}>
      <div
        ref={box}
        className="mx-studi-map__canvas"
        role="region"
        aria-label={`Mappa degli studi Mobilitas a Torino: ${studi.map((s) => s.nome).join(' e ')}`}
      />
      {/* Una scheda per sede: dove è, come arrivarci, indicazioni. Al passaggio si illumina il suo pin. */}
      <div className="mx-studi-map__sedi">
        {studi.map((s) => (
          <article
            key={s.id}
            className="mx-studi-map__sede"
            onMouseEnter={() => evidenzia(s.id, true)}
            onMouseLeave={() => evidenzia(s.id, false)}
          >
            <p className="mx-studi-map__quartiere">
              <MapPin size={14} aria-hidden="true" /> {s.quartiere}
            </p>
            <h3 className="mx-studi-map__via">{s.nome}, Torino</h3>
            {s.comeArrivare?.length > 0 && (
              <ul className="mx-studi-map__arrivo">
                {s.comeArrivare.map((c) => (
                  <li key={c.testo}>
                    {c.tipo === 'metro' ? <TrainFront size={15} aria-hidden="true" /> : <Car size={15} aria-hidden="true" />}
                    {c.testo}
                  </li>
                ))}
              </ul>
            )}
            <a className="mx-studi-map__go" href={s.indicazioniUrl} target="_blank" rel="noopener noreferrer">
              Indicazioni
              <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
