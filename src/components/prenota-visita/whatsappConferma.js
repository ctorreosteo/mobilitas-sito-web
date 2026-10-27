import { leggiPrenotata } from './richiestaSalvata'

// Bottone WhatsApp delle pagine di conferma quando c'è il calendario: deve essere chiaro che si prenota dal
// calendario e che WhatsApp serve solo se nessun orario va bene (o, dopo, per un imprevisto).
// Restituisce null senza calendario: la pagina usa il suo testo di sempre.

// La visita già prenotata per questa richiesta (sopravvive a un ricarica), o null
export const prenotataDi = (richiesta) => {
  const v = leggiPrenotata()
  return v && richiesta?.id && v.richiestaId === richiesta.id ? v : null
}

const dataBreve = (iso) => iso.split('-').reverse().slice(0, 2).join('/')

export const whatsappConferma = ({ dolore, conCalendario, prenotata }) => {
  const per = dolore ? ` ${dolore.per}` : ''
  if (prenotata) {
    return {
      etichetta: 'Hai un imprevisto? Scrivici su WhatsApp',
      messaggio: `Ciao, ho prenotato dal sito la prima visita${per} per il ${dataBreve(prenotata.data)} alle ${prenotata.ora}.`,
    }
  }
  if (conCalendario) {
    return {
      etichetta: 'Nessun orario ti va bene? Scrivici su WhatsApp',
      messaggio: `Ciao, ho appena inviato la richiesta${per}. Nel calendario non trovo un orario comodo: mi aiutate?`,
    }
  }
  return null
}
