// Studi Mobilitas, relative schede Google e posizione sulla mappa.
// indicazioniUrl apre Google Maps (app su mobile) con il percorso verso lo studio già impostato.
// comeArrivare: righe "come arrivare" sotto la mappa (tipo: 'metro' | 'auto').
// I link vengono da mobilitas-hq (colonna studi.google_review_link): là finiscono in /review,
// che apre il modulo "scrivi una recensione"; senza quel suffisso aprono la scheda dello studio
// con valutazione e recensioni, che è quello che serve a chi visita il sito.
export const RECENSIONI_TOTALI = 1000

export const STUDI = [
  {
    id: 'peyron54',
    nome: 'Via Peyron 54',
    zona: 'Comodo con la metro',
    recensioniUrl: 'https://g.page/r/Cdp6sMp04e6XEBM',
    quartiere: 'San Donato',
    lng: 7.6577188,
    lat: 45.0802312,
    mapsUrl: 'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.08023495897442,7.65514387704107,17z',
    indicazioniUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mobilitas+Studio+Osteopatico+Via+Peyron+54+Torino',
    comeArrivare: [
      { tipo: 'metro', testo: "Metro Bernini o Principi d'Acaja" },
      { tipo: 'auto', testo: '2 parcheggi vicini e strisce blu' },
    ],
  },
  {
    id: 'lamarmora35',
    nome: 'Via Lamarmora 35',
    zona: 'Crocetta',
    recensioniUrl: 'https://g.page/r/CZivuP4ENA5REBM',
    quartiere: 'Crocetta',
    lng: 7.6660428,
    lat: 45.0593749,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mobilitas+Studio+Osteopatico+Crocetta+Via+Lamarmora+35+Torino',
    indicazioniUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mobilitas+Studio+Osteopatico+Crocetta+Via+Lamarmora+35+Torino',
    comeArrivare: [{ tipo: 'auto', testo: 'Parcheggi vicini e strisce blu' }],
  },
]
