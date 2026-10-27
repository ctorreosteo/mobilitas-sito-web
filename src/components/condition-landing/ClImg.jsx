// Foto dei trattamenti: versioni web in public/trattamenti/web (larghe 900 e 1600 px), ricavate
// dagli originali della cartella "Immagini - dolori". Nei dati della pagina si scrive
// '/trattamenti/<nome file senza estensione>', per esempio '/trattamenti/collo_presa-cervicale-supino_18_orizzontale'.
import { fuocoDi } from '../../data/fuocoFoto'

const PREFIX = '/trattamenti/'

const trattamentoSrc =(src, w = 1600) => `/trattamenti/web/${src.slice(PREFIX.length)}-${w}.jpg`

// eager: immagini above the fold (niente lazy-load, priorità alta)
// Le foto dei trattamenti si tagliano sul loro punto di interesse (data/fuocoFoto.js): vince sulle classi
// object-[…] dei config; uno style con objectPosition passato a mano vince su tutto.
const ClImg = ({ src, alt = '', sizes = '100vw', eager = false, style, ...rest }) => {
  const web = typeof src === 'string' && src.startsWith(PREFIX)
  const fuoco = web ? fuocoDi(src) : undefined
  return (
    <img
      src={web ? trattamentoSrc(src) : src}
      srcSet={web ? `${trattamentoSrc(src, 900)} 900w, ${trattamentoSrc(src)} 1600w` : undefined}
      sizes={web ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={fuoco ? { objectPosition: fuoco, ...style } : style}
      {...rest}
    />
  )
}

export default ClImg
