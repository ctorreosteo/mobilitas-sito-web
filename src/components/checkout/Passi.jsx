import { Check } from 'lucide-react'

// Passi del pagamento Black Friday: dati (0), pagamento (1), fatto (2); da 3 in su sono tutti spuntati
export default function Passi({ passo, className = '' }) {
  const passi = ['I tuoi dati', 'Pagamento', 'Fatto']
  return (
    <ol className={`ckx-steps ${className}`} aria-label="Passi del pagamento">
      {passi.map((p, i) => (
        <li key={p} className={i < passo ? 'is-done' : i === passo ? 'is-on' : ''} aria-current={i === passo ? 'step' : undefined}>
          <span className="ckx-steps__dot">{i < passo ? <Check size={12} strokeWidth={3.4} /> : i + 1}</span>
          <span className="ckx-steps__lbl">{p}</span>
        </li>
      ))}
    </ol>
  )
}
