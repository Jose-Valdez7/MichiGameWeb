import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const sample = {
  pregunta: '¿Qué color indica alto en un semáforo?',
  opciones: ['Verde','Amarillo','Rojo'],
  correcta: 2,
}

export default function Preguntas() {
  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Pregunta</h1>
      <div className="card w-full max-w-2xl">
        <p className="text-xl font-bold mb-4">{sample.pregunta}</p>
        <div className="grid gap-3">
          {sample.opciones.map((op) => (
            <motion.button key={op} whileTap={{ scale: 0.98 }} className="btn btn-secondary w-full justify-center">
              {op}
            </motion.button>
          ))}
        </div>
      </div>
      <Link to="/tablero" className="btn btn-primary">Volver al tablero</Link>
    </div>
  )
}


