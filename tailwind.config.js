/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
                  colors: {
                    // Colori principali del brand
                    'blue-dark': '#002552',
                    'green': '#72fa93',
                    // Alias legacy usati dalla pagina /links
                    'brand-blue': '#002552',
                    'brand-green': '#72fa93',
                    'cream': '#F4F4F4',
                    'red': '#FF6869',
                    
                    // Colori secondari
                    'azure-dark': '#0ea5e9',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
