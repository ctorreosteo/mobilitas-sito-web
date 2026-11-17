/**
 * Stile chiaro alla Google Maps per la mappa degli studi: tile vettoriali OpenFreeMap (schema OpenMapTiles,
 * gratuite e senza chiave). Vie con bordo e nome ben leggibili già dallo zoom di quartiere,
 * fermate della metro e numeri civici da vicino, così si capisce subito dove sono gli studi.
 */
const FONT = ['Noto Sans Regular']
const FONT_BOLD = ['Noto Sans Bold']
const NOME = ['coalesce', ['get', 'name:it'], ['get', 'name']]

const STRADE_PRINCIPALI = ['motorway', 'trunk', 'primary']
const STRADE_MEDIE = ['secondary', 'tertiary']
const STRADE_MINORI = ['minor', 'service']

const larghezza = (z12, z14, z16, z18) => ['interpolate', ['exponential', 1.5], ['zoom'], 12, z12, 14, z14, 16, z16, 18, z18]

function strada(id, classi, colore, bordo, larghezze, minzoom = 0) {
  const filter = ['all', ['in', ['get', 'class'], ['literal', classi]], ['!=', ['get', 'brunnel'], 'tunnel']]
  return [
    {
      id: `${id}-casing`,
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      minzoom,
      filter,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': bordo, 'line-width': larghezza(...larghezze.map((w) => w + 1.5)) },
    },
    {
      id,
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      minzoom,
      filter,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': colore, 'line-width': larghezza(...larghezze) },
    },
  ]
}

// Colori dei due temi. «chiaro» (alla Google Maps) è quello di sempre; «notte» è nei colori Mobilitas (blu notte,
// vie in blu più chiaro, metro e parchi in verde): per le pagine scure, per esempio /black-friday-2026.
const CHIARO = {
  nome: 'Mobilitas Chiaro',
  fondo: '#f1f3f4',
  servizi: '#eceff3',
  parco: '#cdeccf',
  verde: '#d4eed5',
  acqua: '#a8d4f5',
  edifici: '#e3e5e8',
  edificiBordo: '#d6d9dd',
  ferrovia: '#c4c7cc',
  viaMinore: '#ffffff',
  viaMinoreBordo: '#dadce0',
  viaMedia: '#ffffff',
  viaMediaBordo: '#cfd3d8',
  viaPrincipale: '#fde9a6',
  viaPrincipaleBordo: '#f2c94c',
  civici: '#9aa0a6',
  metro: '#e8453c',
  metroBordo: '#ffffff',
  metroNome: '#c5221f',
  alone: '#ffffff',
  quartieri: '#80868b',
  citta: '#3c4043',
  vie: '#5f6368',
}

const NOTTE = {
  nome: 'Mobilitas Notte',
  fondo: '#001a3d',
  servizi: '#011f47',
  parco: '#06343f',
  verde: '#053139',
  acqua: '#0a3f7a',
  edifici: '#04254f',
  edificiBordo: '#082d5c',
  ferrovia: '#23466f',
  viaMinore: '#0b3060',
  viaMinoreBordo: '#062a55',
  viaMedia: '#123d73',
  viaMediaBordo: '#0a3163',
  viaPrincipale: '#1d5291',
  viaPrincipaleBordo: '#2a64a8',
  civici: '#4f6f99',
  metro: '#72fa93',
  metroBordo: '#001a3d',
  metroNome: '#72fa93',
  alone: '#001a3d',
  quartieri: '#6f88ab',
  citta: '#f4f4f4',
  vie: '#9fb4d1',
}

const creaStile = (c) => ({
  version: 8,
  name: c.nome,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    omt: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
      attribution: '© <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': c.fondo } },
    {
      id: 'landuse',
      type: 'fill',
      source: 'omt',
      'source-layer': 'landuse',
      filter: ['in', ['get', 'class'], ['literal', ['hospital', 'school', 'university', 'college']]],
      paint: { 'fill-color': c.servizi },
    },
    {
      id: 'park',
      type: 'fill',
      source: 'omt',
      'source-layer': 'park',
      paint: { 'fill-color': c.parco },
    },
    {
      id: 'landcover-verde',
      type: 'fill',
      source: 'omt',
      'source-layer': 'landcover',
      filter: ['in', ['get', 'class'], ['literal', ['wood', 'grass']]],
      paint: { 'fill-color': c.verde },
    },
    { id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-color': c.acqua } },
    {
      id: 'waterway',
      type: 'line',
      source: 'omt',
      'source-layer': 'waterway',
      filter: ['in', ['get', 'class'], ['literal', ['river', 'canal']]],
      paint: { 'line-color': c.acqua, 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 8] },
    },
    {
      id: 'building',
      type: 'fill',
      source: 'omt',
      'source-layer': 'building',
      minzoom: 14,
      paint: { 'fill-color': c.edifici, 'fill-outline-color': c.edificiBordo },
    },
    {
      id: 'railway',
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      minzoom: 12,
      filter: ['all', ['==', ['get', 'class'], 'rail'], ['!=', ['get', 'brunnel'], 'tunnel']],
      paint: { 'line-color': c.ferrovia, 'line-width': 1.4, 'line-dasharray': [3, 3] },
    },
    ...strada('road-minor', STRADE_MINORI, c.viaMinore, c.viaMinoreBordo, [0.6, 2.5, 7, 18], 13),
    ...strada('road-medium', STRADE_MEDIE, c.viaMedia, c.viaMediaBordo, [1.2, 4, 10, 24], 11),
    ...strada('road-major', STRADE_PRINCIPALI, c.viaPrincipale, c.viaPrincipaleBordo, [1.8, 5, 12, 28], 9),
    {
      id: 'housenumber',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'housenumber',
      minzoom: 17,
      layout: { 'text-field': ['get', 'housenumber'], 'text-font': FONT, 'text-size': 10 },
      paint: { 'text-color': c.civici },
    },
    {
      id: 'metro-dot',
      type: 'circle',
      source: 'omt',
      'source-layer': 'poi',
      minzoom: 13,
      filter: ['all', ['==', ['get', 'class'], 'railway'], ['==', ['get', 'subclass'], 'station']],
      paint: { 'circle-radius': 5, 'circle-color': c.metro, 'circle-stroke-color': c.metroBordo, 'circle-stroke-width': 1.5 },
    },
    {
      id: 'metro-label',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'poi',
      minzoom: 13,
      filter: ['all', ['==', ['get', 'class'], 'railway'], ['==', ['get', 'subclass'], 'station']],
      layout: {
        'text-field': NOME,
        'text-font': FONT,
        'text-size': 11,
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-optional': true,
      },
      paint: { 'text-color': c.metroNome, 'text-halo-color': c.alone, 'text-halo-width': 1.4 },
    },
    {
      id: 'place-suburb',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'place',
      minzoom: 11,
      maxzoom: 16,
      filter: ['in', ['get', 'class'], ['literal', ['suburb', 'quarter', 'neighbourhood']]],
      layout: {
        'text-field': ['upcase', NOME],
        'text-font': FONT,
        'text-size': ['interpolate', ['linear'], ['zoom'], 11, 9.5, 15, 12],
        'text-letter-spacing': 0.12,
      },
      paint: { 'text-color': c.quartieri, 'text-halo-color': c.fondo, 'text-halo-width': 1.5 },
    },
    {
      id: 'place-city',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'place',
      maxzoom: 13,
      filter: ['in', ['get', 'class'], ['literal', ['city', 'town']]],
      layout: { 'text-field': NOME, 'text-font': FONT_BOLD, 'text-size': 15 },
      paint: { 'text-color': c.citta, 'text-halo-color': c.alone, 'text-halo-width': 1.8 },
    },
    // In fondo: i nomi delle vie hanno la precedenza sui nomi dei quartieri quando si sovrappongono.
    {
      id: 'road-label',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'transportation_name',
      minzoom: 12,
      // Le vie minori compaiono da zoom 14, prima solo corsi e strade principali.
      filter: [
        'any',
        ['in', ['get', 'class'], ['literal', [...STRADE_PRINCIPALI, ...STRADE_MEDIE]]],
        ['all', ['==', ['get', 'class'], 'minor'], ['>=', ['zoom'], 14]],
      ],
      layout: {
        'symbol-placement': 'line',
        'text-field': NOME,
        'text-font': FONT,
        'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10.5, 16, 13, 18, 15],
        // Spaziatura stretta: i corsi di Torino arrivano spezzati in tratti corti e altrimenti restano senza nome.
        'symbol-spacing': 120,
        'text-max-angle': 40,
        'text-padding': 1,
      },
      paint: { 'text-color': c.vie, 'text-halo-color': c.alone, 'text-halo-width': 1.6 },
    },
  ],
})

export const MAP_STYLE = creaStile(CHIARO)
export const MAP_STYLE_NOTTE = creaStile(NOTTE)
