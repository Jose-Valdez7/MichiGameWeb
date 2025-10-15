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
  console.log('🚀 TableroVial - Componente iniciado')
  
  const { players, currentTurn, winner } = useGame()
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)
  
  const gameFinished = winner !== null
  const currentPlayer = players[currentTurn]

  // Logs de depuración
  console.log('🔍 TableroVial - Estado del juego:', {
    players,
    currentTurn,
    winner,
    gameFinished,
    currentPlayer
  })
  
  console.log('🎯 Renderizando cards de jugadores')
  console.log('👤 Renderizando Card Jugador 1:', players[0])
  console.log('👤 Renderizando Card Jugador 2:', players[1])

  // Mostrar indicador de guardado cuando cambie el estado
  useEffect(() => {
    setShowSaveIndicator(true)
    const timer = setTimeout(() => setShowSaveIndicator(false), 2000)
    return () => clearTimeout(timer)
  }, [players, currentTurn, winner])

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 relative">
      {/* Cards de jugadores */}
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-start gap-4 mb-6">
          {/* Card Jugador 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 max-w-xs"
          >
          <div className={`card p-4 w-64 shadow-2xl border-2 ${
            currentTurn === 0 && !gameFinished 
              ? 'border-primary bg-primary/10' 
              : 'border-gray-300 bg-white/95'
          }`} style={{ backgroundColor: 'red', border: '3px solid blue' }}>
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar del personaje */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {players[0].character ? '🚗' : '👤'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {players[0].customName || players[0].character || 'Jugador 1'}
                </h3>
                <p className="text-sm text-gray-600">Jugador 1</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Posición:</span>
                <span className="font-bold text-primary">{players[0].position + 1}/4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Puntos:</span>
                <span className="font-bold text-accent">{players[0].points}/3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(players[0].points / 3) * 100}%` }}
                />
              </div>
            </div>
            
            {currentTurn === 0 && !gameFinished && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3 text-center"
              >
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
                  🎯 Tu turno
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

          {/* Card Jugador 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 max-w-xs"
          >
          <div className={`card p-4 w-64 shadow-2xl border-2 ${
            currentTurn === 1 && !gameFinished 
              ? 'border-secondary bg-secondary/10' 
              : 'border-gray-300 bg-white/95'
          }`} style={{ backgroundColor: 'green', border: '3px solid yellow' }}>
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar del personaje */}
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {players[1].character ? '🚙' : '👤'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {players[1].customName || players[1].character || 'Jugador 2'}
                </h3>
                <p className="text-sm text-gray-600">Jugador 2</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Posición:</span>
                <span className="font-bold text-secondary">{players[1].position + 1}/4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Puntos:</span>
                <span className="font-bold text-accent">{players[1].points}/3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(players[1].points / 3) * 100}%` }}
                />
              </div>
            </div>
            
            {currentTurn === 1 && !gameFinished && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-3 text-center"
              >
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-white">
                  🎯 Tu turno
                </span>
              </motion.div>
            )}
          </div>
          </motion.div>
        </div>

        {/* Mensaje central del juego */}
        <div className="text-center mt-6">
          {!gameFinished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <p className="text-lg font-bold text-white drop-shadow-lg">
                Turno de: <span className="text-accent">{currentPlayer.name}</span>
              </p>
            </motion.div>
          )}
          
          {gameFinished && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-success drop-shadow-lg">
                ¡{players[winner].name} ha ganado! 🏆
              </h2>
            </motion.div>
          )}
        </div>
      </div>

      {/* Título y indicador de guardado */}
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
              {players[0].name}
            </div>
          </div>
          <div className="relative">
            <Lane player={players[1]} />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 text-white font-bold">
              {players[1].name}
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


