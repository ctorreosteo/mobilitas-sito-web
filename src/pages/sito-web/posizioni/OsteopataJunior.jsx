import React from 'react'
import SchedaPosizione from './SchedaPosizione'

const OsteopataJunior = () => (
  <SchedaPosizione
    titolo="Osteopata Junior"
    immagine="/lavori/osteo_junior.png"
    tipo="Partita iva"
    luogo="In presenza"
    descrizione={[
      <>
        Stiamo cercando un <strong className="text-blue-dark">Osteopata Junior</strong> motivato per unirsi al nostro
        team. La figura ricercata seguirà i propri pazienti in autonomia, con il supporto costante degli osteopati senior
        e del manager.
      </>,
      <>
        L'osteopata junior lavorerà in un contesto organizzato: agenda, accoglienza e comunicazione sono gestite dallo
        studio, così da potersi concentrare sulla clinica e sulla relazione con il paziente.
      </>,
      <>
        Questa posizione offre l'opportunità di crescere velocemente, confrontarsi ogni giorno con colleghi junior,
        senior e responsabili, e costruire una carriera concreta all'interno di un'azienda in forte espansione.
      </>,
    ]}
    requisiti={[
      ['Diploma o laurea in Osteopatia', ''],
      ['Partita IVA', 'o disponibilità ad aprirla'],
      ['Buona disponibilità di ore', 'settimanali in studio'],
      ['Ottime capacità comunicative', 'e relazionali'],
      ['Capacità di lavorare in team', 'multidisciplinare'],
      ['Disponibilità a imparare e mettere in pratica i nostri protocolli', 'collaudati su centinaia di pazienti'],
    ]}
    graditi={[
      ['Prime esperienze cliniche', 'in studio o in tirocinio'],
      ['Aggiornamento continuo', 'con corsi e formazione post-diploma'],
      ['Interesse per la crescita', 'gestionale e di team'],
    ]}
    attivita={[
      ['Visite osteopatiche', 'e trattamenti dei pazienti'],
      ['Valutazione e ragionamento clinico', 'con definizione del percorso di cura'],
      ['Monitoraggio e follow-up', 'dei pazienti'],
      ['Confronto sui casi', 'con osteopati senior e manager'],
      ['Gestione e compilazione responsabile del CRM', 'per il tracciamento dei pazienti e delle attività'],
      ['Partecipazione a eventi formativi', 'e workshop del centro'],
    ]}
    carriera={{
      titolo: 'Crescita professionale e specializzazione',
      testo:
        "In Mobilitas crediamo nella formazione continua e nella meritocrazia. L'osteopata junior ha un percorso chiaro per crescere fino a ruoli senior e di responsabilità.",
      percorsi: ['Osteopata Senior', 'Team Leader', 'Manager degli osteopati', 'Responsabile studio'],
      competenze: ['Leadership e gestione team', 'Formazione e didattica', 'Gestione del paziente', 'Comunicazione'],
    }}
    iter={[
      ['Primo colloquio', 'Ci incontriamo dal vivo o in videochiamata per capire chi sei al di là del curriculum: obiettivi, carattere e motivazione.'],
      ['Secondo colloquio', 'Visita osteopatica con un paziente (o simulazione) sotto supervisione, per valutare ragionamento clinico, competenza manuale e rapporto con il paziente.'],
      ['Terzo colloquio', "Presentazione dell'offerta definitiva e scelta insieme di orari e condizioni."],
    ]}
    documenti={[
      ['CV aggiornato', 'con esperienze professionali'],
      ['Diploma o laurea', 'in Osteopatia'],
      ['Attestati di corsi e specializzazioni', '(se disponibili)'],
      ['PLUS:', 'lettera di motivazione personalizzata'],
    ]}
  />
)

export default OsteopataJunior
