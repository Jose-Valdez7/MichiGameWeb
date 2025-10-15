import { Route, Routes, Link, useLocation } from 'react-router-dom'
import SeleccionPersonaje from './pages/SeleccionPersonaje'
import FightIntro from './pages/FightIntro'
import PantallaPrincipal from './pages/PantallaPrincipal'
import Preguntas from './pages/Preguntas'
import Resultado from './pages/Resultado'
import './index.css'
import logoGato from './assets/Imagenes michivial/Michi vial Alto.png'
import logo1 from './assets/Imagenes michivial/movilis.png'
import logo2 from './assets/Imagenes michivial/michimoney.png'
import logo3 from './assets/Imagenes michivial/saker.png'
import { useEffect, useState } from 'react'

export default function App() {
  const location = useLocation()
  const isFightIntro = location.pathname === '/fight-intro'
  const [hideBanner, setHideBanner] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ hidden: boolean }>
      setHideBanner(!!custom.detail?.hidden)
    }
    window.addEventListener('toggle-banner', handler as EventListener)
    return () => window.removeEventListener('toggle-banner', handler as EventListener)
  }, [])
  
  return (
    <div className="min-h-dvh">
      {!isFightIntro && !hideBanner && (
        <nav className="w-full p-3 flex items-center justify-between fixed top-0 left-0 z-40 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Link to="/" className="flex items-center gap-4 text-5xl md:text-6xl font-black text-white drop-shadow-2xl leading-normal">
          <img src={logoGato} alt="Logo Juego Vial" className="w-24 h-24 object-contain" />
          <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent inline-block">Juego vial</span>
        </Link>
        <div className="absolute inset-0 pr-3 pointer-events-none flex items-center justify-end gap-3">
          <img src={logo1} alt="Logo 1" className="w-24 h-24 object-contain" />
          <img src={logo2} alt="Logo 2" className="w-24 h-24 object-contain" />
          <img src={logo3} alt="Logo 3" className="w-24 h-24 object-contain" />
        </div>
        </nav>
      )}
      <div className={isFightIntro ? "pt-0" : "pt-32 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"}>
        <Routes>
          <Route path="/" element={<SeleccionPersonaje />} />
          <Route path="/fight-intro" element={<FightIntro />} />
          <Route path="/tablero" element={<PantallaPrincipal />} />
          <Route path="/preguntas" element={<Preguntas />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </div>
    </div>
  )
}
