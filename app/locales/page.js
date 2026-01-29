import DirectoryFilters from '../components/DirectoryFilters'
import StoreGrid from '../components/StoreGrid'

export const metadata = {
  title: 'Locales - CC1',
  description: 'Directorio de locales comerciales y emprendimientos.',
}

export default function LocalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DirectoryFilters />
      <StoreGrid />
    </div>
  )
}
