import RecensioniTag from '../recensioni-tag/RecensioniTag'
import { PAROLE_GENERICHE, TAG_RECENSIONI_GENERICHE } from '../../data/dolori'

// Recensioni delle pagine di conferma. dolore: risultato di doloreDi (data/dolori.js).
// Con il dolore: recensioni di quel problema, con le sue parole evidenziate; se sono meno di tre, o il dolore
// non ha recensioni, recensioni a caso. Senza dolore (non sappiamo da dove arriva): recensioni a caso.
// Le parole sono sempre evidenziate, come sulla landing: nelle recensioni a caso quelle generiche dei dolori.
const GENERICHE = {
  tags: TAG_RECENSIONI_GENERICHE,
  evidenzia: PAROLE_GENERICHE,
  titolo: (
    <>
      Chi è venuto da noi, <span className="mx-accent">oggi scrive così</span>
    </>
  ),
  sottotitolo: 'Recensioni Google a 5 stelle di pazienti dei nostri studi di Torino.',
}

export default function RecensioniConferma({ dolore }) {
  return (
    <div className="mx-wrap">
      {dolore ? (
        <RecensioniTag
          tags={dolore.tags}
          evidenzia={dolore.parole}
          titolo={
            <>
              Chi è venuto da noi <span className="mx-accent">{dolore.per}</span>, oggi scrive così
            </>
          }
          sottotitolo="Recensioni Google a 5 stelle di persone che avevano il tuo stesso problema, nei nostri studi di Torino."
          riserva={GENERICHE}
        />
      ) : (
        <RecensioniTag
          tags={GENERICHE.tags}
          evidenzia={GENERICHE.evidenzia}
          titolo={GENERICHE.titolo}
          sottotitolo={GENERICHE.sottotitolo}
          mescola
        />
      )}
    </div>
  )
}
