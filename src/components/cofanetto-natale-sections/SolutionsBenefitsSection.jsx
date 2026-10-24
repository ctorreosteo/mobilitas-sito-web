import { motion } from 'framer-motion'
import { Heart, Zap, Target, Users, ShoppingCart, ArrowUp } from 'lucide-react'
import { Reveal, Snap } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const homeImages = ['home7', 'home1', 'home2', 'home3', 'home4', 'home5', 'home8']

const benefits = [
  {
    icon: Heart,
    title: "Regala una sensazione di leggerezza e benessere generale",
    description: "Un trattamento osteopatico dona una sensazione di leggerezza, calma e sollievo profondo. È il regalo che chiunque vorrebbe ricevere, ma che nessuno si aspetta. ✨"
  },
  {
    icon: Zap,
    title: "Riduce rigidità e tensioni nascoste",
    description: "Allevia stanchezza e tensioni accumulate nel corpo, riduce dolori, rigidità e fastidi che si portano dietro da mesi. Perfetto per chi ha bisogno di ricaricarsi."
  },
  {
    icon: Target,
    title: "Migliora postura e mobilità del corpo",
    description: "Libera la schiena da tensioni e posture bloccate, migliora la mobilità di spalle, collo e zona lombare. Ideale per chi passa tante ore seduto o per chi fa sport."
  },
  {
    icon: Users,
    title: "Un regalo che non finisce dimenticato in un cassetto",
    description: "È quel regalo perfetto che non vedranno l'ora di usare! 🎁 Un momento per sé, una pausa dalla vita frenetica moderna che migliora davvero la vita di chi lo riceve."
  }
]

export default function SolutionsBenefitsSection() {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-xmas-why">
      <div className="mx-wrap">
        <Reveal className="mx-xmas-why__head">
          <h2 className="mx-h mx-xmas-h2">
            Perché il <span className="mx-accent">Cofanetto Mobilitas</span> è il regalo perfetto? 🎁
          </h2>
          <p className="mx-xmas-lead">
            Un trattamento osteopatico è un regalo unico e originale che sarà davvero apprezzato! ✨
          </p>
        </Reveal>
      </div>

      <div className="mx-wrap">
        <Snap className="mx-xmas-gallery">
          {homeImages.map((name, index) => (
            <figure key={name} className="mx-xmas-gallery__item">
              <img
                src={`/home/web/${name}-900.jpg`}
                srcSet={`/home/web/${name}-900.jpg 900w, /home/web/${name}-1600.jpg 1600w`}
                sizes="(min-width: 900px) 30vw, 84vw"
                alt={`Mobilitas ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </Snap>

        <ol className="mx-xmas-why__list">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.li
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
              >
                <span className="mx-xmas-why__ic"><Icon size={22} strokeWidth={2.2} /></span>
                <div>
                  <h3 className="mx-h mx-xmas-why__t">{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <Reveal className="mx-xmas-wish">
          <h3 className="mx-h mx-xmas-wish__q">
            E se quest'anno facessi un regalo che li sorprende, li fa stare meglio… e li fa pensare a te quando si sentiranno bene? 🎯
          </h3>
          <p>
            Fai un regalo che conta davvero. <span className="mx-accent">Acquistalo ora! 🎄</span>
          </p>
          <motion.button
            type="button"
            onClick={scrollToOffer}
            className="mx-btn mx-btn--primary mx-xmas-buy"
            whileTap={{ scale: 0.97 }}
          >
            <span className="mx-xmas-buy__label">
              <ShoppingCart size={20} strokeWidth={2.4} />
              ACQUISTA ORA
            </span>
            <span className="mx-btn__icon"><ArrowUp size={20} strokeWidth={2.4} /></span>
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}
