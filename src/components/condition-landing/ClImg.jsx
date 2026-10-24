// Foto delle landing in versione web (generate con sips da /public, vedi public/condition-landing/web):
// originali fino a 7 MB → JPEG 900/1600 px. Chiave: percorso originale usato nei dati della pagina.
const WEB = {
  '/bruxismo/bruxismo1.JPG': 'bruxismo-bruxismo1',
  '/bruxismo/bruxismo2.JPG': 'bruxismo-bruxismo2',
  '/bruxismo/bruxismo3.JPG': 'bruxismo-bruxismo3',
  '/bruxismo/bruxismo4.JPG': 'bruxismo-bruxismo4',
  '/bruxismo/bruxismo5.JPG': 'bruxismo-bruxismo5',
  '/bruxismo/bruxismo6.JPG': 'bruxismo-bruxismo6',
  '/cervicalgia/cerv10.JPG': 'cervicalgia-cerv10',
  '/cervicalgia/cerv11.JPG': 'cervicalgia-cerv11',
  '/cervicalgia/cerv13.JPG': 'cervicalgia-cerv13',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.1.png': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-1',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.10.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-10',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.11.png': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-11',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.2.png': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-2',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.3.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-3',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.4.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-4',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.5.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-5',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.6.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-6',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.7.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-7',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.8.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-8',
  '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.9.JPG': 'ciclo-menopausa-cicatricix2-ciclo-menopausa-cicatricix2-9',
  '/epicondilite-tunnel/epicondilite-tunnel.01.png': 'epicondilite-tunnel-epicondilite-tunnel-01',
  '/epicondilite-tunnel/epicondilite-tunnel.02.png': 'epicondilite-tunnel-epicondilite-tunnel-02',
  '/epicondilite-tunnel/epicondilite-tunnel.03.png': 'epicondilite-tunnel-epicondilite-tunnel-03',
  '/epicondilite-tunnel/epicondilite-tunnel.04.JPG': 'epicondilite-tunnel-epicondilite-tunnel-04',
  '/epicondilite-tunnel/epicondilite-tunnel.05.JPG': 'epicondilite-tunnel-epicondilite-tunnel-05',
  '/epicondilite-tunnel/epicondilite-tunnel.06.JPG': 'epicondilite-tunnel-epicondilite-tunnel-06',
  '/epicondilite-tunnel/epicondilite-tunnel.07.JPG': 'epicondilite-tunnel-epicondilite-tunnel-07',
  '/epicondilite-tunnel/epicondilite-tunnel.08.JPG': 'epicondilite-tunnel-epicondilite-tunnel-08',
  '/fibromialgia/fibromialgia1.JPG': 'fibromialgia-fibromialgia1',
  '/fibromialgia/fibromialgia2.JPG': 'fibromialgia-fibromialgia2',
  '/fibromialgia/fibromialgia3.JPG': 'fibromialgia-fibromialgia3',
  '/fibromialgia/fibromialgia4.2.JPG': 'fibromialgia-fibromialgia4-2',
  '/fibromialgia/fibromialgia5.JPG': 'fibromialgia-fibromialgia5',
  '/fibromialgia/fibromialgia6.JPG': 'fibromialgia-fibromialgia6',
  '/maldischiena/maldischiena1.JPG': 'maldischiena-maldischiena1',
  '/maldischiena/maldischiena2.JPG': 'maldischiena-maldischiena2',
  '/maldischiena/maldischiena3.JPG': 'maldischiena-maldischiena3',
  '/maldischiena/maldischiena4.JPG': 'maldischiena-maldischiena4',
  '/maldischiena/maldischiena5.JPG': 'maldischiena-maldischiena5',
  '/maldischiena/maldischiena6.JPG': 'maldischiena-maldischiena6',
  '/reflusso/reflusso1.JPG': 'reflusso-reflusso1',
  '/reflusso/reflusso2.JPG': 'reflusso-reflusso2',
  '/reflusso/reflusso3.JPG': 'reflusso-reflusso3',
  '/reflusso/reflusso4.JPG': 'reflusso-reflusso4',
  '/reflusso/reflusso5.JPG': 'reflusso-reflusso5',
  '/reflusso/reflusso6.JPG': 'reflusso-reflusso6',
  '/vertigini/vertigini1.JPG': 'vertigini-vertigini1',
  '/vertigini/vertigini2.JPG': 'vertigini-vertigini2',
  '/vertigini/vertigini3.JPG': 'vertigini-vertigini3',
  '/vertigini/vertigini4.JPG': 'vertigini-vertigini4',
  '/vertigini/vertigini5.JPG': 'vertigini-vertigini5',
  '/vertigini/vertigini6.JPG': 'vertigini-vertigini6',
}

export const webSrc = (src, w = 1600) => (WEB[src] ? `/condition-landing/web/${WEB[src]}-${w}.jpg` : src)

// eager: immagini above the fold (niente lazy-load, priorità alta)
const ClImg = ({ src, alt = '', sizes = '100vw', eager = false, ...rest }) => {
  const key = WEB[src]
  return (
    <img
      src={key ? `/condition-landing/web/${key}-1600.jpg` : src}
      srcSet={key ? `/condition-landing/web/${key}-900.jpg 900w, /condition-landing/web/${key}-1600.jpg 1600w` : undefined}
      sizes={key ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  )
}

export default ClImg
