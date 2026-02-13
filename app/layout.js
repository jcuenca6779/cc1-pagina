import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

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
  title: 'CC1 - Centro Comercial Uno',
  description: 'Centro Comercial Uno en Portoviejo',
}


export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
