import React from 'react'
import SchedaPosizione from './SchedaPosizione'

const OsteopataTirocinante = () => (
  <SchedaPosizione
    titolo="Osteopata Tirocinante"
    titoloRighe={[{ text: 'Osteopata' }, { text: 'Tirocinante', className: 'mx-gradient' }]}
    immagine="/lavori/osteo_tirocinante.png"
    posizioneImmagine="62% center"
    tipo="Tirocinio"
    luogo="In presenza"
    lead="Il tirocinio che ti prepara davvero al mondo del lavoro: pazienti veri, osteopati senior al tuo fianco e un percorso che può continuare con noi."
    manifesto={[
      'Cerchiamo studenti e neodiplomati in osteopatia che vogliono',
      { text: 'passare dalla teoria alla pratica', accent: true },
      'e costruire fin da subito',
      { text: 'una carriera concreta.', accent: true },
    ]}
    descrizione={[
      [
        "Il tirocinante affianca gli osteopati senior durante le visite, impara a relazionarsi con pazienti veri e mette in pratica le tecniche apprese sotto supervisione, seguendo i protocolli collaudati del centro.",
      ],
      [
        'Oltre alla parte clinica, il percorso include formazione su tutto quello che spesso non si impara durante gli studi: gestione del paziente, lavoro in team e basi per costruire una carriera solida.',
      ],
    ]}
    requisiti={[
      ['Studente degli ultimi anni o neodiplomato', 'in osteopatia'],
      ['Forte motivazione', 'a crescere nella professione'],
      ['Disponibilità di tempo', 'per la presenza in studio'],
      ['Ottime capacità comunicative', 'e relazionali'],
      ['Voglia di imparare i nostri protocolli', 'collaudati su centinaia di pazienti'],
    ]}
    graditi={[
      ['Esperienze di tirocinio', 'già svolte in altri contesti clinici'],
      ['Interesse per la formazione continua', "e l'aggiornamento scientifico"],
      ['Predisposizione al lavoro in team', 'multidisciplinare'],
    ]}
    attivita={[
      ['Affiancamento agli osteopati senior', 'durante le visite in studio'],
      ['Osservazione clinica', 'e ragionamento sui casi insieme al team'],
      ['Pratica delle tecniche', 'sotto supervisione'],
      ['Relazione con il paziente', "dall'accoglienza al follow-up"],
      ['Formazione con il manager', 'su gestione del paziente e del lavoro in studio'],
      ['Eventi formativi', 'e workshop del centro'],
    ]}
    carriera={{
      testo:
        'Il tirocinio è il primo passo del percorso in Mobilitas. I tirocinanti più meritevoli possono proseguire come Osteopata Junior e crescere nel team.',
      percorsi: ['Osteopata Junior', 'Osteopata Senior', 'Team Leader', 'Manager degli osteopati'],
      competenze: ['Ragionamento clinico', 'Competenza manuale', 'Gestione del paziente', 'Lavoro in team'],
    }}
    iter={[
      ['Valutazione curriculum', 'Analisi del curriculum, del percorso di studi e delle eventuali esperienze di tirocinio.'],
      ['Primo colloquio', 'Un incontro conoscitivo per capire chi sei, cosa cerchi e cosa ti motiva.'],
      ['Colloquio finale', 'Presentazione del percorso di tirocinio e scelta insieme di orari e modalità.'],
    ]}
    documenti={[
      ['CV aggiornato', 'con percorso di studi ed eventuali esperienze'],
      ['Iscrizione al corso di osteopatia', 'o diploma, se già conseguito'],
      ['Lettera di motivazione', 'facoltativa, ma molto apprezzata'],
    ]}
  />
)

export default OsteopataTirocinante
