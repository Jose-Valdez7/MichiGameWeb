import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const opciones = [
  { id: 'piedra', icon: '🪨' },
  { id: 'papel', icon: '📄' },
  { id: 'tijera', icon: '✂️' },
]

export default function PiedraPapelTijera() {
  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Piedra, Papel o Tijera</h1>

      <div className="flex gap-4">
        {opciones.map((o) => (
          <motion.button key={o.id} whileHover={{ y: -6 }} className="card text-5xl p-6">
            {o.icon}
          </motion.button>
        ))}
      </div>

      <p className="text-white/90">Quien gane comienza primero.</p>
      <Link to="/tablero" className="btn btn-primary">Ir al tablero</Link>
    </div>
  )
}


