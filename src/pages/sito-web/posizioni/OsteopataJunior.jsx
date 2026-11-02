import React from 'react'
import SchedaPosizione from './SchedaPosizione'

const OsteopataJunior = () => (
  <SchedaPosizione
    titolo="Osteopata Junior"
    titoloRighe={[{ text: 'Osteopata' }, { text: 'Junior', className: 'mx-gradient' }]}
    immagine="/lavori/osteo_junior.png"
    tipo="Partita iva"
    luogo="In presenza"
    lead="Segui i tuoi pazienti in autonomia, con un team di senior e un manager sempre al tuo fianco. Tu curi, noi organizziamo."
    manifesto={[
      'Cerchiamo un osteopata motivato che vuole',
      { text: 'crescere velocemente', accent: true },
      'in un ambiente dove agenda, accoglienza e comunicazione',
      { text: 'sono già organizzate.', accent: true },
    ]}
    descrizione={[
      [
        "L'osteopata junior segue i propri pazienti in autonomia, con il supporto costante degli osteopati senior e del manager. Agenda, accoglienza e comunicazione sono gestite dallo studio, così ci si può concentrare sulla clinica e sulla relazione con il paziente.",
      ],
      [
        "Ogni giorno ti confronti con colleghi junior, senior e responsabili, in un'azienda in forte espansione dove la crescita è tangibile e meritata.",
      ],
    ]}
    requisiti={[
      ['Diploma o laurea in Osteopatia', ''],
      ['Partita IVA', 'o disponibilità ad aprirla'],
      ['Buona disponibilità di ore', 'settimanali in studio'],
      ['Ottime capacità comunicative', 'e relazionali'],
      ['Capacità di lavorare in team', 'multidisciplinare'],
      ['Voglia di imparare i nostri protocolli', 'collaudati su centinaia di pazienti'],
    ]}
    graditi={[
      ['Prime esperienze cliniche', 'in studio o in tirocinio'],
      ['Aggiornamento continuo', 'con corsi e formazione post-diploma'],
      ['Interesse per la crescita', 'gestionale e di team'],
    ]}
    attivita={[
      ['Visite osteopatiche', 'e trattamenti dei pazienti'],
      ['Valutazione e ragionamento clinico', 'con definizione del percorso di cura'],
      ['Monitoraggio e follow-up', 'dei pazienti nel tempo'],
      ['Confronto sui casi', 'con osteopati senior e manager'],
      ['Gestione del CRM', 'per il tracciamento dei pazienti e delle attività'],
      ['Eventi formativi', 'e workshop del centro'],
    ]}
    carriera={{
      testo:
        "In Mobilitas crediamo nella formazione continua e nella meritocrazia. L'osteopata junior ha un percorso chiaro per crescere fino a ruoli senior e di responsabilità.",
      percorsi: ['Osteopata Senior', 'Team Leader', 'Manager degli osteopati', 'Responsabile studio'],
      competenze: ['Leadership e gestione team', 'Formazione e didattica', 'Gestione del paziente', 'Comunicazione'],
    }}
    iter={[
      ['Primo colloquio', 'Dal vivo o in videochiamata: chi sei al di là del curriculum, obiettivi, carattere e motivazione.'],
      ['Secondo colloquio', 'Visita con un paziente (o simulazione) sotto supervisione: ragionamento clinico, competenza manuale e rapporto con il paziente.'],
      ['Terzo colloquio', "Presentazione dell'offerta definitiva e scelta insieme di orari e condizioni."],
    ]}
    documenti={[
      ['CV aggiornato', 'con esperienze professionali'],
      ['Diploma o laurea', 'in Osteopatia'],
      ['Attestati di corsi e specializzazioni', 'se disponibili'],
      ['Lettera di motivazione', 'facoltativa, ma molto apprezzata'],
    ]}
  />
)

export default OsteopataJunior
