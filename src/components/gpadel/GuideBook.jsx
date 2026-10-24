const COVER = '/landing-pages/web/lm-gpadel-copertina'

// Libro 3D costruito in CSS sulla copertina della guida
const GuideBook = ({ className = '', sizes = '(min-width: 1024px) 340px, 40vw', eager = false, alt = 'Ebook Guida Infortuni Padel' }) => (
  <div className={`mx-gpl-book ${className}`}>
    <div className="mx-gpl-book__inner">
      <img
        className="mx-gpl-book__cover"
        src={`${COVER}-900.jpg`}
        srcSet={`${COVER}-480.jpg 480w, ${COVER}-900.jpg 900w, ${COVER}-1600.jpg 1414w`}
        sizes={sizes}
        alt={alt}
        width="1414"
        height="2000"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="mx-gpl-book__spine" aria-hidden="true" />
      <span className="mx-gpl-book__pages" aria-hidden="true" />
      <span className="mx-gpl-book__back" aria-hidden="true" />
    </div>
    <span className="mx-gpl-book__shadow" aria-hidden="true" />
  </div>
)

export default GuideBook
