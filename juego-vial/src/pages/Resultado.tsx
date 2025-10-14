import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Resultado() {
  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="text-4xl font-extrabold text-white drop-shadow">
        ¡Ganaste!
      </motion.h1>
      <motion.div initial={{ y: -10 }} animate={{ y: [ -10, 10, -10 ] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl">🏁</motion.div>
      <div className="flex gap-3">
        <Link to="/" className="btn btn-secondary">Volver a elegir</Link>
        <Link to="/tablero" className="btn btn-primary">Jugar de nuevo</Link>
      </div>
    </div>
  )
}


