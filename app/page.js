import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DirectoryFilters from './components/DirectoryFilters'
import StoreGrid from './components/StoreGrid'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <DirectoryFilters />
      <StoreGrid />
      <Footer />
    </div>
  )
}
