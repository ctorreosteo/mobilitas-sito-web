import { AlertTriangle, Heart, Moon, Zap, Shield } from 'lucide-react'
import { Reveal, Snap } from '../home-sections/HomeKit'

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Dolori e fastidi crescenti",
    description: "Il mal di schiena diventa insopportabile, la sciatalgia ti blocca, il bacino si irrigidisce e il dolore al pube ti accompagna tutto il giorno. Ogni settimana peggiora e temi di non farcela fino al parto. Capiamo la tua paura e il tuo dolore."
  },
  {
    icon: Moon,
    title: "Difficoltà a dormire bene",
    description: "La notte è un tormento: nessuna posizione è comoda, ogni movimento fa male, i risvegli continui ti sfiancano e i crampi ti svegliano. Non riposi mai davvero e la stanchezza si accumula. Temi che questo stress possa far male al tuo bambino."
  },
  {
    icon: Zap,
    title: "Stanchezza e affaticamento",
    description: "Ti trascini tutto il giorno, anche per le cose più semplici. Mancanza di fiato, difficoltà a concentrarti, energia che si esaurisce a metà giornata. Temi di non riuscire a gestire tutto: lavoro, casa, preparativi per il bambino. La stanchezza ti fa sentire inadeguata."
  },
  {
    icon: Heart,
    title: "Sensazioni di ansia e a volte insicurezza",
    description: "I dubbi ti assillano: 'È normale quello che provo?', 'Il dolore è pericoloso per il bambino?', 'Posso fare qualcosa o rischio di peggiorare?'. L'amore per il tuo bambino si mescola alla paura di sbagliare e all'ansia per la sua salute. Non sei sola in questo."
  },
  {
    icon: Shield,
    title: "Paura del parto e del post-parto",
    description: "Il bacino si blocca, non senti il corpo pronto per il parto. Temi complicazioni, il recupero post-parto, l'ansia per il benessere del bambino. L'amore per il tuo bambino si mescola alla paura del momento più importante della tua vita. Ti accompagniamo in questo percorso."
  }
]

export default function PainPointsSection() {
  return (
    <section className="mx-grav-sec mx-grav-pain">
      <div className="mx-wrap">
        <Reveal className="mx-grav-head">
          <h2 className="mx-h mx-grav-h2">
            Sei in gravidanza e probabilmente stai vivendo almeno una di queste situazioni 😕
          </h2>
          <p className="mx-grav-lead">
            Non sei sola. Questi sono i dolori e le preoccupazioni più comuni che vivono le donne in gravidanza.
          </p>
        </Reveal>

        <Snap className="mx-grav-pain__list">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div key={point.title} className="mx-grav-pcard">
                <span className="mx-grav-pcard__n">0{index + 1}</span>
                <span className="mx-grav-pcard__ic"><Icon size={22} strokeWidth={2.2} /></span>
                <h3 className="mx-h mx-grav-h3">{point.title}</h3>
                <p>{point.description}</p>
              </div>
            )
          })}
        </Snap>

        <Reveal className="mx-grav-turn">
          <span className="mx-grav-turn__dots" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <h3 className="mx-h mx-grav-turn__title">Non devi sopportare tutto questo</h3>
          <p>Esiste una soluzione naturale e sicura per te e il tuo bambino</p>
        </Reveal>
      </div>
    </section>
  )
}
