import LocalesClient from '../components/LocalesClient'
import { getLocales } from '../../api/locales'

export const metadata = {
  title: 'Locales - CC1',
  description: 'Directorio de locales comerciales y emprendimientos.',
}

export default async function LocalesPage() {
  let initialLocales = null
  let initialError = ''

  try {
    initialLocales = await getLocales()
  } catch (error) {
    initialError = 'No se pudo cargar los locales.'
  }

  return (
    <LocalesClient initialApiLocales={initialLocales} initialError={initialError} />
  )
}
