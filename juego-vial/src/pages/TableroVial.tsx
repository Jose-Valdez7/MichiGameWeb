import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'

function Lane({ player }: { player: { name: string, character: string | null, position: number } }) {
  return (
    <div className="flex items-center gap-2 relative">
      {[0,1,2].map((i) => (
        <div key={i} className="h-20 w-24 rounded-xl bg-road/90 border-4 border-yellow-300 grid place-items-center text-white font-bold relative">
          {i+1}
          {player.position === i && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-primary/80 rounded-xl"
            >
              <span className="text-2xl">🚗</span>
            </motion.div>
          )}
        </div>
      ))}
      <div className="h-20 w-24 rounded-xl bg-green-600 grid place-items-center text-white font-extrabold relative">
        META
        {player.position >= 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-success/80 rounded-xl"
          >
            <span className="text-2xl">🏆</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function TableroVial() {
  const { players, currentTurn, winner } = useGame()
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)
  
  const gameFinished = winner !== null
  const currentPlayer = players[currentTurn]

  // Mostrar indicador de guardado cuando cambie el estado
  useEffect(() => {
    setShowSaveIndicator(true)
    const timer = setTimeout(() => setShowSaveIndicator(false), 2000)
    return () => clearTimeout(timer)
  }, [players, currentTurn, winner])

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 overflow-hidden">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Tablero Vial</h1>
        {showSaveIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm font-medium"
          >
            <span>💾</span>
            <span>Guardado</span>
          </motion.div>
        )}
      </div>

      {/* Información del juego */}
      <div className="card p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <div className="text-center">
            <p className="font-bold text-primary">{players[0].character}</p>
            <p className="text-sm">Posición: {players[0].position + 1}/4</p>
            <p className="text-sm font-bold text-accent">Puntos: {players[0].points}/3</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-secondary">{players[1].character}</p>
            <p className="text-sm">Posición: {players[1].position + 1}/4</p>
            <p className="text-sm font-bold text-accent">Puntos: {players[1].points}/3</p>
          </div>
        </div>
        
        {!gameFinished && (
          <div className="text-center">
            <p className="text-lg font-bold">
              Turno de: <span className="text-accent">{currentPlayer.character}</span>
            </p>
          </div>
        )}
        
        {gameFinished && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-success">
              ¡{players[winner].character} ha ganado! 🏆
            </h2>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ backgroundPosition: '0px 0px' }} 
        animate={{ backgroundPosition: ['0px 0px','400px 0px'] }} 
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} 
        className="w-full max-w-5xl rounded-3xl p-6 border-white/50 border bg-[url('https://svgshare.com/i/17iQ.svg')] bg-repeat-x"
      >
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Lane player={players[0]} />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 text-white font-bold">
              {players[0].character}
            </div>
          </div>
          <div className="relative">
            <Lane player={players[1]} />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 text-white font-bold">
              {players[1].character}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 flex-wrap justify-center">
        {!gameFinished && (
          <Link to="/preguntas" className="btn btn-primary">
            Responder pregunta
          </Link>
        )}
        <Link to="/resultado" className="btn btn-secondary">
          {gameFinished ? 'Ver resultado final' : 'Ver estado actual'}
        </Link>
        <button 
          onClick={() => {
            if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderá todo el progreso.')) {
              window.location.reload()
            }
          }} 
          className="btn bg-gray-500 hover:bg-gray-600 text-white"
        >
          Reiniciar juego
        </button>
      </div>
    </div>
  )
}


