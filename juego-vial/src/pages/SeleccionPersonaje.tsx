import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import GameDetectedModal from '../components/GameDetectedModal'

const characters = [
  'Aventurero',
  'Exploradora',
  'Robot',
  'Alien',
  'Perro',
  'Gato',
]

export default function SeleccionPersonaje() {
  const { players, selectCharacter, reset } = useGame()
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0)
  const [showGameDetectedModal, setShowGameDetectedModal] = useState(false)
  const [hasShownModal, setHasShownModal] = useState(false)

  useEffect(() => {
    // Solo verificar si no hemos mostrado el modal ya
    if (!hasShownModal) {
      const hasGame = Boolean(
        players[0].character || 
        players[1].character || 
        players[0].position > 0 || 
        players[1].position > 0 || 
        players[0].points > 0 || 
        players[1].points > 0
      )
      
      // Mostrar modal si hay un juego existente
      if (hasGame) {
        setShowGameDetectedModal(true)
        setHasShownModal(true)
      }
    }
  }, [players, hasShownModal])

  const handleCharacterSelect = (character: string) => {
    selectCharacter(currentPlayer, character)
    
    // Cambiar al siguiente jugador o continuar
    if (currentPlayer === 0) {
      setCurrentPlayer(1)
    }
  }

  const canContinue = players[0].character && players[1].character

  const handleStartNewGame = () => {
    reset()
    setCurrentPlayer(0)
    setHasShownModal(false) // Resetear para que no aparezca el modal otra vez
  }

  const handleCloseModal = () => {
    setShowGameDetectedModal(false)
    setHasShownModal(true) // Marcar que ya se mostró el modal
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Elige tus personajes</h1>
      
      <div className="card p-4 mb-4">
        <p className="text-lg font-bold text-center">
          Turno de: <span className="text-primary">Jugador {currentPlayer + 1}</span>
        </p>
        <div className="flex gap-4 mt-2">
          <div className={`p-2 rounded ${players[0].character ? 'bg-success text-white' : 'bg-gray-200'}`}>
            Jugador 1: {players[0].character || 'Sin seleccionar'}
          </div>
          <div className={`p-2 rounded ${players[1].character ? 'bg-success text-white' : 'bg-gray-200'}`}>
            Jugador 2: {players[1].character || 'Sin seleccionar'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {characters.map((c) => (
          <motion.button
            key={c}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterSelect(c)}
            disabled={players[currentPlayer].character !== null}
            className="card flex flex-col items-center gap-2 btn-secondary py-6 disabled:opacity-50"
          >
            <span className="text-5xl">🚗</span>
            <span className="font-bold">{c}</span>
          </motion.button>
        ))}
      </div>

      {canContinue && (
        <Link to="/fight-intro" className="btn btn-primary mt-2">
          ¡Iniciar Enfrentamiento!
        </Link>
      )}

      {/* Modal para juego detectado */}
      <GameDetectedModal
        isOpen={showGameDetectedModal}
        onClose={handleCloseModal}
        onStartNew={handleStartNewGame}
      />
    </div>
  )
}


