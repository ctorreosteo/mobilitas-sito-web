import { Reveal } from '../home-sections/HomeKit'
import { FOTO_STUDIO } from '../../data/fotoTrattamenti'
import './studio-collage.css'

// "Ti aspettiamo in studio": le foto dove si vede lo studio con il logo (FOTO_STUDIO in data/fotoTrattamenti.js).
// Non si dice quale studio è nelle foto (non lo sappiamo).
export default function StudioCollage() {
  return (
    <Reveal className="mx-studio-collage">
      {FOTO_STUDIO.map((f, i) => (
        <figure key={f.nome} className="mx-studio-collage__photo">
          <img src={`/trattamenti/web/${f.nome}-900.jpg`} style={{ objectPosition: f.pos }} alt={f.alt} loading="lazy" decoding="async" />
          {i === 0 && (
            <figcaption>
              <span>Ti aspettiamo in studio</span>
              Due studi a Torino: San Donato e Crocetta
            </figcaption>
          )}
        </figure>
      ))}
    </Reveal>
  )
}
