import { Route, Routes, Link } from 'react-router-dom'
import SeleccionPersonaje from './pages/SeleccionPersonaje'
import PiedraPapelTijera from './pages/PiedraPapelTijera'
import TableroVial from './pages/TableroVial'
import Preguntas from './pages/Preguntas'
import Resultado from './pages/Resultado'
import './index.css'

export default function App() {
  return (
    <div className="min-h-dvh">
      <nav className="w-full p-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-white drop-shadow">Juego Vial</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SeleccionPersonaje />} />
        <Route path="/ppt" element={<PiedraPapelTijera />} />
        <Route path="/tablero" element={<TableroVial />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </div>
  )
}
