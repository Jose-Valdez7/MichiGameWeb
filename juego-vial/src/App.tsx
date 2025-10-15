import { Route, Routes, Link } from 'react-router-dom'
import SeleccionPersonaje from './pages/SeleccionPersonaje'
import FightIntro from './pages/FightIntro'
import PantallaPrincipal from './pages/PantallaPrincipal'
import Preguntas from './pages/Preguntas'
import Resultado from './pages/Resultado'
import './index.css'

export default function App() {
  return (
    <div className="min-h-dvh">
      <Routes>
        <Route path="/" element={<SeleccionPersonaje />} />
        <Route path="/fight-intro" element={<FightIntro />} />
        <Route path="/tablero" element={<PantallaPrincipal />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </div>
  )
}
