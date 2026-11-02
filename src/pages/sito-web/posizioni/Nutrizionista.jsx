import React from 'react'
import SchedaPosizione from './SchedaPosizione'

const Nutrizionista = () => (
  <SchedaPosizione
    titolo="Nutrizionista"
    titoloRighe={[{ text: 'Nutrizionista', className: 'mx-gradient' }]}
    immagine="/lavori/nutrizionista.png"
    tipo="Partita iva"
    luogo="In presenza/Ibrido"
    lead="Valutazioni nutrizionali e piani alimentari personalizzati, dentro un team multidisciplinare che lavora fianco a fianco con gli osteopati."
    manifesto={[
      'Stiamo cercando un',
      { text: 'Nutrizionista qualificato e motivato', accent: true },
      'per unirsi al nostro',
      { text: 'team multidisciplinare.', accent: true },
    ]}
    descrizione={[
      [
        'La figura ricercata sarà responsabile della valutazione nutrizionale dei pazienti e della creazione di piani alimentari personalizzati, lavorando con il team del centro.',
        "Il nutrizionista sarà chiamato a gestire una clientela diversificata, dai pazienti con problematiche specifiche a coloro che desiderano migliorare il proprio stile di vita attraverso un'alimentazione equilibrata.",
      ],
      [
        "Sarà fondamentale la capacità di lavorare in team e di integrare l'approccio nutrizionale con le terapie osteopatiche offerte dal centro.",
        "Questa posizione offre l'opportunità di lavorare in un ambiente sanitario all'avanguardia, con possibilità di crescita professionale e di contribuire al benessere dei pazienti attraverso un approccio olistico alla salute.",
      ],
    ]}
    requisiti={[
      ['Laurea in Scienze della Nutrizione Umana', 'o titolo equivalente'],
      ["Iscrizione all'Ordine Nazionale dei Biologi", '(sezione A)'],
      ['Buona disponibilità di ore mensili', ''],
      ['Ottime capacità comunicative', 'e relazionali'],
      ['Capacità di lavorare in team', 'multidisciplinare'],
      ['Disponibilità a imparare e mettere in pratica i nostri protocolli', 'collaudati su centinaia di pazienti'],
    ]}
    graditi={[
      ['Conoscenza approfondita', 'della fisiologia e patologia umana'],
      ['Aggiornamento continuo', 'sulle ultime ricerche in ambito nutrizionale'],
      ['Capacità di gestione emotiva dei pazienti', 'e supporto psicologico durante il percorso nutrizionale'],
      ['Approfondimenti in psicologia', 'e conoscenza del rapporto tra emozioni e alimentazione'],
    ]}
    attivita={[
      ['Valutazione nutrizionale completa', 'dei pazienti attraverso anamnesi alimentare e antropometrica'],
      ['Piani alimentari personalizzati', 'basati sulle esigenze specifiche del paziente'],
      ['Monitoraggio e follow-up', 'dei pazienti con controlli periodici'],
      ['Collaborazione con gli osteopati', 'per un approccio integrato al benessere'],
      ['Educazione alimentare', 'e counseling nutrizionale'],
      ['Documentazione clinica', 'gestione e aggiornamento delle cartelle'],
      ['Eventi formativi', 'partecipazione a eventi e workshop del centro'],
      ['Gestione del CRM', 'per il tracciamento dei pazienti e delle attività'],
    ]}
    carriera={{
      testo:
        "In Mobilitas crediamo nella formazione continua e nella specializzazione. Il nutrizionista avrà l'opportunità di crescere attraverso corsi di aggiornamento, specializzazioni e la possibilità di sviluppare aree di expertise specifiche.",
      percorsi: [
        'Responsabile area nutrizionale',
        'Creazione seminari e speech ad eventi',
        'Responsabile studio',
        'Coordinatore progetti',
        'Responsabile ricerca e sviluppo',
      ],
      competenze: [
        'Leadership e gestione team',
        'Formazione e didattica',
        'Marketing sanitario',
        'Gestione progetti innovativi',
        'Capacità di vendita',
      ],
    }}
    iter={[
      ['Valutazione curriculum', "Analisi del curriculum vitae, titoli di studio, eventuali esperienze professionali e specializzazioni per valutare l'idoneità del candidato."],
      ['Primo colloquio', "Colloquio conoscitivo per valutare le competenze tecniche, l'esperienza professionale e la motivazione del candidato."],
      ['Colloquio finale', "Presentazione dell'offerta lavorativa e conclusione del processo di selezione."],
    ]}
    documenti={[
      ['CV aggiornato', 'con esperienze professionali'],
      ['Certificato di laurea', 'in Scienze della Nutrizione Umana'],
      ['Certificato di iscrizione', "all'Ordine Nazionale dei Biologi"],
      ['Attestati di specializzazione', 'se disponibili'],
      ['Lettera di motivazione personalizzata', 'un plus apprezzato'],
    ]}
  />
)

export default Nutrizionista
