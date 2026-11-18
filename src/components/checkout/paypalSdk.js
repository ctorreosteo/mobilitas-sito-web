// Carica una volta sola lo script di PayPal (bottoni carta, PayPal e Paga in 3 rate) con il client id che dà il
// gestionale: quello sandbox fuori produzione, quello vero in produzione. Paga in 3 rate va abilitato a mano
// (enable-funding=paylater); in sandbox serve anche buyer-country=IT, che in produzione PayPal non accetta.
// Niente disable-funding: ogni bottone ha già il suo fundingSource, e un metodo che PayPal dismette lo farebbe fallire.
let caricamento = null

export function caricaPayPal(clientId, sandbox) {
  if (window.paypal?.Buttons) return Promise.resolve(window.paypal)
  if (caricamento) return caricamento
  const params = new URLSearchParams({
    'client-id': clientId,
    currency: 'EUR',
    intent: 'capture',
    locale: 'it_IT',
    components: 'buttons',
    'enable-funding': 'paylater,card',
  })
  if (sandbox) params.set('buyer-country', 'IT')
  caricamento = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = `https://www.paypal.com/sdk/js?${params.toString()}`
    s.async = true
    s.dataset.namespace = 'paypal'
    s.onload = () => (window.paypal?.Buttons ? resolve(window.paypal) : reject(new Error('PayPal non disponibile')))
    s.onerror = () => {
      caricamento = null
      s.remove()
      reject(new Error('PayPal non raggiungibile'))
    }
    document.head.appendChild(s)
  })
  return caricamento
}
