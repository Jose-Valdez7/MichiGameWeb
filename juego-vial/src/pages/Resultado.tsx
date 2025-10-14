import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export default function Resultado() {
  const { players, winner, reset } = useGame()
  
  const gameFinished = winner !== null
  const winnerPlayer = gameFinished ? players[winner] : null

  const handleRestart = () => {
    reset()
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      {gameFinished ? (
        <>
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ type: 'spring', stiffness: 120 }} 
            className="text-4xl font-extrabold text-white drop-shadow"
          >
            ¡{winnerPlayer?.character} ha ganado! 🏆
          </motion.h1>
          
          <motion.div 
            initial={{ y: -10 }} 
            animate={{ y: [ -10, 10, -10 ] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="text-7xl"
          >
            🏁
          </motion.div>

          <div className="card p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Resultados Finales</h2>
            <div className="space-y-4">
              {players.map((player, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl flex justify-between items-center ${
                    index === winner ? 'bg-success/20 border-2 border-success' : 'bg-gray-100'
                  }`}
                >
                  <div>
                    <p className="font-bold text-lg">{player.character}</p>
                    <p className="text-sm text-gray-600">Jugador {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {index === winner ? '🏆' : '🥈'}
                    </p>
                    <p className="text-sm">
                      Posición: {player.position + 1}/4
                    </p>
                    <p className="text-sm font-bold text-accent">
                      Puntos: {player.points}/3
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 bg-blue-50 border-2 border-blue-200 mb-4">
            <p className="text-blue-700 text-center text-sm">
              💾 Tu progreso se guarda automáticamente. Puedes cerrar y volver más tarde.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link to="/" className="btn btn-secondary" onClick={handleRestart}>
              Volver a seleccionar personajes
            </Link>
            <button onClick={handleRestart} className="btn btn-primary">
              Jugar de nuevo
            </button>
          </div>
        </>
      ) : (
        <>
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ type: 'spring', stiffness: 120 }} 
            className="text-4xl font-extrabold text-white drop-shadow"
          >
            Estado del Juego
          </motion.h1>

          <div className="card p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Posiciones Actuales</h2>
            <div className="space-y-4">
              {players.map((player, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-lg">{player.character}</p>
                    <p className="text-sm text-gray-600">Jugador {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">🚗</p>
                    <p className="text-sm">
                      Posición: {player.position + 1}/4
                    </p>
                    <p className="text-sm font-bold text-accent">
                      Puntos: {player.points}/3
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 bg-blue-50 border-2 border-blue-200 mb-4">
            <p className="text-blue-700 text-center text-sm">
              💾 Tu progreso se guarda automáticamente. Puedes cerrar y volver más tarde.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link to="/tablero" className="btn btn-primary">
              Volver al tablero
            </Link>
            <Link to="/" className="btn btn-secondary" onClick={handleRestart}>
              Reiniciar juego
            </Link>
          </div>
        </>
      )}
    </div>
  )
}


