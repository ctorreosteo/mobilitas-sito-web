// Foto dei trattamenti in public/trattamenti/web, divise per zona del corpo (prima parte del nome del file).
// Servono ai collage delle landing: ogni landing pesca le foto della sua zona che non usa già altrove.
// Esclusa la foto con il bambino (va solo dove si parla di pediatria). Se aggiungi foto alla cartella, aggiungile qui.
const FOTO = {
  anca: [
    'anca_decubito-laterale_01_orizzontale',
    'anca_decubito-laterale_02_orizzontale',
    'anca_decubito-laterale_06_orizzontale',
    'anca_decubito-laterale_07_orizzontale',
    'anca_flessa-supino_05_orizzontale',
    'anca_flessa-supino_06_orizzontale',
    'anca_flessa-supino_07_orizzontale',
    'anca_flessa-supino_11_orizzontale',
    'anca_flessa-supino_12_orizzontale',
    'anca_flessa-supino_13_orizzontale',
  ],
  atm: [
    'atm_intraorale-lingua_01_orizzontale',
    'atm_intraorale_01_orizzontale',
    'atm_intraorale_02_orizzontale',
    'atm_mandibola-con-guanto_01_orizzontale',
    'atm_mandibola-con-guanto_02_orizzontale',
    'atm_mandibola-con-guanto_03_orizzontale',
    'atm_presa-mandibolare-esterna_01_orizzontale',
  ],
  collo: [
    'collo_allungamento-cervicale-supino_02_orizzontale',
    'collo_cervicale-e-spalle-supino_02_orizzontale',
    'collo_cervicale-e-spalle-supino_03_orizzontale',
    'collo_cervicale-e-spalle-supino_04_orizzontale',
    'collo_presa-cervicale-supino_02_orizzontale',
    'collo_presa-cervicale-supino_08_orizzontale',
    'collo_presa-cervicale-supino_09_orizzontale',
    'collo_presa-cervicale-supino_14_orizzontale',
    'collo_presa-cervicale-supino_16_orizzontale',
    'collo_presa-cervicale-supino_17_orizzontale',
    'collo_presa-cervicale-supino_18_orizzontale',
    'collo_presa-cervicale-supino_19_orizzontale',
    'collo_presa-cervicale-supino_21_orizzontale',
    'collo_presa-cervicale-supino_22_orizzontale',
    'collo_presa-cervicale-supino_25_orizzontale',
    'collo_presa-cervicale-supino_26_orizzontale',
    'collo_presa-cervicale-supino_30_orizzontale',
    'collo_presa-cervicale-supino_31_orizzontale',
  ],
  gamba: [
    'gamba_gamba-tesa-sollevata_01_orizzontale',
    'gamba_gamba-tesa-sollevata_02_orizzontale',
    'gamba_ginocchio-anca-flessione_01_orizzontale',
    'gamba_ginocchio-supino_01_orizzontale',
    'gamba_piede-caviglia-supino_01_orizzontale',
  ],
  pancia: [
    'pancia_addome-basso-supino_01_orizzontale',
    'pancia_addome-basso-supino_02_orizzontale',
    'pancia_addome-basso-supino_03_orizzontale',
    'pancia_addome-basso-supino_04_orizzontale',
    'pancia_addome-basso-supino_05_orizzontale',
    'pancia_addome-basso-supino_06_orizzontale',
    'pancia_addome-dettaglio-mani_01_orizzontale',
    'pancia_addome-supino_01_orizzontale',
    'pancia_addome-supino_02_orizzontale',
    'pancia_addome-supino_04_orizzontale',
    'pancia_addome-supino_07_orizzontale',
    'pancia_addome-supino_08_orizzontale',
    'pancia_addome-supino_09_orizzontale',
    'pancia_addome-supino_10_orizzontale',
    'pancia_addome-supino_11_orizzontale',
    'pancia_addome-supino_13_orizzontale',
    'pancia_addome-supino_14_orizzontale',
    'pancia_addome-supino_15_orizzontale',
    'pancia_addome-supino_20_orizzontale',
  ],
  schiena: [
    'schiena_dorsale-alta-prono_04_orizzontale',
    'schiena_dorsale-alta-prono_06_orizzontale',
    'schiena_dorso-sacrale-prono_02_orizzontale',
    'schiena_lombare-decubito-laterale_01_orizzontale',
    'schiena_lombare-prono_03_orizzontale',
    'schiena_lombare-prono_10_orizzontale',
    'schiena_lombare-prono_14_orizzontale',
    'schiena_lombare-prono_15_orizzontale',
    'schiena_lombare-supino_01_orizzontale',
    'schiena_lombare-supino_02_orizzontale',
  ],
  spalla: [
    'spalla_scapola-decubito-laterale_01_orizzontale',
    'spalla_scapola-decubito-laterale_05_orizzontale',
    'spalla_scapola-decubito-laterale_06_orizzontale',
    'spalla_valutazione-in-piedi_01_orizzontale',
  ],
}

// Collage "Ti aspettiamo in studio" (StudioCollage.jsx): le foto dove si vede lo studio con il logo
export const FOTO_STUDIO = [
  { nome: 'collo_presa-cervicale-supino_22_orizzontale', pos: '50% 45%', alt: 'Trattamento del collo nello studio Mobilitas' },
  { nome: 'schiena_dorsale-alta-prono_04_orizzontale', pos: '40% 50%', alt: 'Osteopata Mobilitas tratta la parte alta della schiena' },
  { nome: 'spalla_scapola-decubito-laterale_01_orizzontale', pos: '45% 55%', alt: 'Trattamento di spalla e scapola nello studio Mobilitas' },
]

// Zone del corpo per ogni landing (pageContext/slug): la prima è la principale
const ZONE = {
  reflusso: ['pancia'],
  stitichezza: ['pancia'],
  'gonfiore-addominale': ['pancia'],
  'colon-irritabile': ['pancia'],
  menopausa: ['pancia', 'anca'],
  'ciclo-doloroso': ['pancia', 'anca'],
  'cicatrici-cesareo': ['pancia', 'anca'],
  'cicatrici-seno': ['pancia', 'spalla'],
  maldischiena: ['schiena', 'anca'],
  sciatalgia: ['schiena', 'anca', 'gamba'],
  emicrania: ['collo', 'atm'],
  vertigini: ['collo', 'atm'],
  bruxismo: ['atm', 'collo'],
  'tunnel-carpale': ['spalla', 'collo'],
  epicondilite: ['spalla', 'collo'],
  fibromialgia: ['collo', 'schiena', 'pancia', 'spalla'],
}

// Una foto per serie prima di ripetere la serie: gli scatti consecutivi (es. anca_flessa-supino_05, _06, _07)
// sono quasi uguali e in un collage sembrerebbero la stessa foto
const serie = (nome) => nome.replace(/_\d+_orizzontale$/, '')
function variate(nomi) {
  const gruppi = new Map()
  for (const n of nomi) gruppi.set(serie(n), [...(gruppi.get(serie(n)) || []), n])
  const liste = [...gruppi.values()]
  const out = []
  for (let i = 0; out.length < nomi.length; i++) {
    for (const l of liste) if (l[i]) out.push(l[i])
  }
  return out
}

const nomeDi = (src) => src.replace('/trattamenti/', '')

/**
 * Sceglie le foto di una landing senza ripetizioni a occhio: due scatti della stessa serie
 * (es. collo_presa-cervicale-supino_08 e _09) sembrano la stessa foto, quindi si conta per serie.
 * fisse: foto già decise (collage dello studio, valutazione...), contano per la loro serie.
 * prendi(preferita?, facoltativa?): la foto preferita se la sua serie non è ancora comparsa, altrimenti
 * la prima foto di una serie nuova (prima della zona della landing, poi delle altre zone). Finite le serie
 * nuove: una foto facoltativa non c'è (null), una obbligatoria ripete una serie (al massimo due volte).
 * Restituisce '/trattamenti/<nome>' o null.
 */
export function creaSceltaFoto(slug, fisse = []) {
  const zona = ZONE[slug] || ['collo', 'schiena', 'pancia']
  // Se la zona finisce, prima le foto più "generiche"; i primi piani dentro la bocca solo dove c'entrano
  const altre = ['collo', 'pancia', 'schiena', 'anca', 'gamba', 'spalla', 'atm'].filter((z) => !zona.includes(z))
  const primoPiano = (n) => n.startsWith('atm_intraorale') && !zona.includes('atm')
  const ordine = [...zona.flatMap((z) => variate(FOTO[z])), ...altre.flatMap((z) => variate(FOTO[z]))].filter((n) => !primoPiano(n))
  const usate = new Set()
  const perSerie = new Map()
  const segna = (nome) => {
    usate.add(nome)
    perSerie.set(serie(nome), (perSerie.get(serie(nome)) || 0) + 1)
  }
  fisse.filter(Boolean).forEach((f) => segna(nomeDi(f)))
  return function prendi(preferita, facoltativa = false) {
    const pref = preferita && nomeDi(preferita)
    if (pref && !usate.has(pref) && !perSerie.get(serie(pref))) {
      segna(pref)
      return preferita
    }
    for (const max of facoltativa ? [1] : [1, 2]) {
      const n = ordine.find((x) => !usate.has(x) && (perSerie.get(serie(x)) || 0) < max)
      if (n) {
        segna(n)
        return `/trattamenti/${n}`
      }
    }
    return null
  }
}
