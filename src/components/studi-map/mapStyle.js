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

export const MAP_STYLE = {
  version: 8,
  name: 'Mobilitas Chiaro',
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    omt: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
      attribution: '© <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#f1f3f4' } },
    {
      id: 'landuse',
      type: 'fill',
      source: 'omt',
      'source-layer': 'landuse',
      filter: ['in', ['get', 'class'], ['literal', ['hospital', 'school', 'university', 'college']]],
      paint: { 'fill-color': '#eceff3' },
    },
    {
      id: 'park',
      type: 'fill',
      source: 'omt',
      'source-layer': 'park',
      paint: { 'fill-color': '#cdeccf' },
    },
    {
      id: 'landcover-verde',
      type: 'fill',
      source: 'omt',
      'source-layer': 'landcover',
      filter: ['in', ['get', 'class'], ['literal', ['wood', 'grass']]],
      paint: { 'fill-color': '#d4eed5' },
    },
    { id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-color': '#a8d4f5' } },
    {
      id: 'waterway',
      type: 'line',
      source: 'omt',
      'source-layer': 'waterway',
      filter: ['in', ['get', 'class'], ['literal', ['river', 'canal']]],
      paint: { 'line-color': '#a8d4f5', 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 8] },
    },
    {
      id: 'building',
      type: 'fill',
      source: 'omt',
      'source-layer': 'building',
      minzoom: 14,
      paint: { 'fill-color': '#e3e5e8', 'fill-outline-color': '#d6d9dd' },
    },
    {
      id: 'railway',
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      minzoom: 12,
      filter: ['all', ['==', ['get', 'class'], 'rail'], ['!=', ['get', 'brunnel'], 'tunnel']],
      paint: { 'line-color': '#c4c7cc', 'line-width': 1.4, 'line-dasharray': [3, 3] },
    },
    ...strada('road-minor', STRADE_MINORI, '#ffffff', '#dadce0', [0.6, 2.5, 7, 18], 13),
    ...strada('road-medium', STRADE_MEDIE, '#ffffff', '#cfd3d8', [1.2, 4, 10, 24], 11),
    ...strada('road-major', STRADE_PRINCIPALI, '#fde9a6', '#f2c94c', [1.8, 5, 12, 28], 9),
    {
      id: 'housenumber',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'housenumber',
      minzoom: 17,
      layout: { 'text-field': ['get', 'housenumber'], 'text-font': FONT, 'text-size': 10 },
      paint: { 'text-color': '#9aa0a6' },
    },
    {
      id: 'metro-dot',
      type: 'circle',
      source: 'omt',
      'source-layer': 'poi',
      minzoom: 13,
      filter: ['all', ['==', ['get', 'class'], 'railway'], ['==', ['get', 'subclass'], 'station']],
      paint: { 'circle-radius': 5, 'circle-color': '#e8453c', 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 1.5 },
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
      paint: { 'text-color': '#c5221f', 'text-halo-color': '#ffffff', 'text-halo-width': 1.4 },
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
      paint: { 'text-color': '#80868b', 'text-halo-color': '#f1f3f4', 'text-halo-width': 1.5 },
    },
    {
      id: 'place-city',
      type: 'symbol',
      source: 'omt',
      'source-layer': 'place',
      maxzoom: 13,
      filter: ['in', ['get', 'class'], ['literal', ['city', 'town']]],
      layout: { 'text-field': NOME, 'text-font': FONT_BOLD, 'text-size': 15 },
      paint: { 'text-color': '#3c4043', 'text-halo-color': '#ffffff', 'text-halo-width': 1.8 },
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
      paint: { 'text-color': '#5f6368', 'text-halo-color': '#ffffff', 'text-halo-width': 1.6 },
    },
  ],
}
