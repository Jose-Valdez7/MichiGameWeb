import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Lane() {
  return (
    <div className="flex items-center gap-2">
      {[0,1,2].map((i) => (
        <div key={i} className="h-20 w-24 rounded-xl bg-road/90 border-4 border-yellow-300 grid place-items-center text-white font-bold">
          {i+1}
        </div>
      ))}
      <div className="h-20 w-24 rounded-xl bg-green-600 grid place-items-center text-white font-extrabold">META</div>
    </div>
  )
}

export default function TableroVial() {
  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Tablero Vial</h1>

      <motion.div initial={{ backgroundPosition: '0px 0px' }} animate={{ backgroundPosition: ['0px 0px','400px 0px'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="w-full max-w-5xl rounded-3xl p-6 border-white/50 border bg-[url('https://svgshare.com/i/17iQ.svg')] bg-repeat-x">
        <div className="flex flex-col gap-6">
          <Lane />
          <Lane />
        </div>
      </motion.div>

      <div className="flex gap-3">
        <Link to="/preguntas" className="btn btn-primary">Responder pregunta</Link>
        <Link to="/resultado" className="btn btn-secondary">Ver resultado</Link>
      </div>
    </div>
  )
}


