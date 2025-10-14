import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const characters = [
  'Aventurero',
  'Exploradora',
  'Robot',
  'Alien',
  'Perro',
  'Gato',
]

export default function SeleccionPersonaje() {
  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Elige tus personajes</h1>
      <p className="text-white/90">Jugador 1 y Jugador 2 deben elegir.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {characters.map((c) => (
          <motion.button
            key={c}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card flex flex-col items-center gap-2 btn-secondary py-6"
          >
            <span className="text-5xl">🚗</span>
            <span className="font-bold">{c}</span>
          </motion.button>
        ))}
      </div>

      <Link to="/ppt" className="btn btn-primary mt-2">Continuar</Link>
    </div>
  )
}


