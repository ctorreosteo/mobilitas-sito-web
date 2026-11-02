import React from 'react'
import SchedaPosizione from './SchedaPosizione'

const OsteopataTirocinante = () => (
  <SchedaPosizione
    titolo="Osteopata Tirocinante"
    immagine="/lavori/osteo_tirocinante.png"
    tipo="Tirocinio"
    luogo="In presenza"
    descrizione={[
      <>
        Stiamo cercando studenti degli ultimi anni e neodiplomati in osteopatia per un{' '}
        <strong className="text-blue-dark">tirocinio clinico</strong> all'interno dei nostri studi. Un percorso pensato
        per chi vuole passare dalla teoria alla pratica e prepararsi davvero al mondo del lavoro.
      </>,
      <>
        Il tirocinante affiancherà gli osteopati senior durante le visite, imparerà a relazionarsi con pazienti veri e
        metterà in pratica le tecniche apprese sotto supervisione, seguendo i protocolli collaudati del centro.
      </>,
      <>
        Oltre alla parte clinica, il percorso include formazione su tutto quello che spesso non si impara durante gli
        studi: gestione del paziente, lavoro in team e basi per costruire una carriera solida.
      </>,
    ]}
    requisiti={[
      ['Studente degli ultimi anni o neodiplomato', 'in osteopatia'],
      ['Forte motivazione', 'a crescere nella professione'],
      ['Disponibilità di tempo', 'per la presenza in studio'],
      ['Ottime capacità comunicative', 'e relazionali'],
      ['Disponibilità a imparare e mettere in pratica i nostri protocolli', 'collaudati su centinaia di pazienti'],
    ]}
    graditi={[
      ['Esperienze di tirocinio', 'già svolte in altri contesti clinici'],
      ['Interesse per la formazione continua', 'e l\'aggiornamento scientifico'],
      ['Predisposizione al lavoro in team', 'multidisciplinare'],
    ]}
    attivita={[
      ['Affiancamento agli osteopati senior', 'durante le visite'],
      ['Osservazione clinica', 'e ragionamento sui casi'],
      ['Pratica delle tecniche', 'sotto supervisione'],
      ['Relazione con il paziente', 'dall\'accoglienza al follow-up'],
      ['Formazione con il manager degli osteopati', 'su gestione del paziente e del lavoro in studio'],
      ['Partecipazione a eventi formativi', 'e workshop del centro'],
    ]}
    carriera={{
      titolo: 'Dal tirocinio al lavoro',
      testo:
        'Il tirocinio è il primo passo del percorso in Mobilitas. I tirocinanti più meritevoli possono proseguire come Osteopata Junior e crescere nel team.',
      percorsi: ['Osteopata Junior', 'Osteopata Senior', 'Team Leader', 'Manager degli osteopati'],
      competenze: ['Ragionamento clinico', 'Competenza manuale', 'Gestione del paziente', 'Lavoro in team'],
    }}
    iter={[
      ['Valutazione curriculum', 'Analisi del curriculum vitae, del percorso di studi e delle eventuali esperienze di tirocinio.'],
      ['Primo colloquio', 'Colloquio conoscitivo per capire chi sei, cosa cerchi e la tua motivazione.'],
      ['Colloquio finale', 'Presentazione del percorso di tirocinio e definizione insieme di orari e modalità.'],
    ]}
    documenti={[
      ['CV aggiornato', 'con percorso di studi ed eventuali esperienze'],
      ['Attestato o certificato', 'di iscrizione al corso di osteopatia (o diploma, se già conseguito)'],
      ['PLUS:', 'lettera di motivazione personalizzata'],
    ]}
  />
)

export default OsteopataTirocinante
