import { Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata = {
  title: 'CC1 - Directorio Comercial',
  description: 'Directorio comercial de Portoviejo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
