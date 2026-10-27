// Foto dei trattamenti: versioni web in public/trattamenti/web (larghe 900 e 1600 px), ricavate
// dagli originali della cartella "Immagini - dolori". Nei dati della pagina si scrive
// '/trattamenti/<nome file senza estensione>', per esempio '/trattamenti/collo_presa-cervicale-supino_18_orizzontale'.
const PREFIX = '/trattamenti/'

const trattamentoSrc =(src, w = 1600) => `/trattamenti/web/${src.slice(PREFIX.length)}-${w}.jpg`

// eager: immagini above the fold (niente lazy-load, priorità alta)
const ClImg = ({ src, alt = '', sizes = '100vw', eager = false, ...rest }) => {
  const web = typeof src === 'string' && src.startsWith(PREFIX)
  return (
    <img
      src={web ? trattamentoSrc(src) : src}
      srcSet={web ? `${trattamentoSrc(src, 900)} 900w, ${trattamentoSrc(src)} 1600w` : undefined}
      sizes={web ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  )
}

export default ClImg
