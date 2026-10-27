import { Banknote, Clock, MapPin, Scale, Shirt, UserCheck } from 'lucide-react'

// Domande pratiche sulla prima visita, uguali per tutte le landing della prima visita (cervicalgia e le landing
// dei dolori, in coda alle domande cliniche di ognuna). Testi semplici, livello quinta elementare.
export const FAQ_PRIMA_VISITA = [
  {
    icon: Scale,
    question: 'Che differenza c\'è tra osteopata e fisioterapista?',
    answer: <>Il fisioterapista si occupa soprattutto di <strong>riabilitazione</strong>, per esempio dopo un trauma, e usa spesso esercizi e macchinari. L'osteopata lavora solo con le mani, su <strong>tutto il corpo</strong>. Cerca la <strong>causa</strong> del problema e ti aiuta a non farlo tornare, anche sistemando postura e abitudini di tutti i giorni. Non guarda solo dove fa male, ma perché fa male, per risolvere il problema alla fonte.</>,
  },
  {
    icon: Shirt,
    question: 'Come mi devo vestire?',
    answer: <>Vieni con <strong>vestiti comodi</strong>, tipo quelli da palestra, facili da togliere se serve. L'importante è che tu stia a tuo agio.</>,
  },
  {
    icon: Banknote,
    question: 'Quanto costano le sedute?',
    answer: <>La prima visita è scontata: <strong>49€ invece di 90€</strong>. Il prezzo delle sedute dopo dipende dal percorso che ti serve. Abbiamo <strong>pacchetti per risparmiare</strong>: te li spieghiamo in studio.</>,
  },
  {
    icon: MapPin,
    question: 'Dove vi trovate?',
    answer: <>Abbiamo <strong>due studi a Torino</strong>: in <strong>Via Peyron 54</strong> (San Donato) e in <strong>Via Lamarmora 35</strong> (Crocetta). Ci arrivi comodo in metro (fermate Bernini per Via Peyron, Re Umberto per Via Lamarmora) e in auto. Quando prenoti ti mandiamo le indicazioni precise.</>,
  },
  {
    icon: Clock,
    question: 'Quanto dura una visita?',
    answer: <>La prima visita dura circa <strong>un'ora</strong>: parliamo, ti visitiamo e facciamo il primo trattamento. Le sedute dopo durano circa <strong>40-55 minuti</strong>, in base al problema.</>,
  },
  {
    icon: UserCheck,
    question: 'Con chi farò la visita?',
    answer: <>Durante la telefonata scegliamo per te l'<strong>osteopata giusto</strong>, quello più <strong>esperto</strong> nel tuo problema. Tutti i nostri osteopati sono preparati e lavorano con lo <strong>stesso metodo</strong>.</>,
  },
]
