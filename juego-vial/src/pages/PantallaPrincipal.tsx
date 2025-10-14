import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import ModalPregunta from '../components/ModalPregunta'
import ModalGanador from '../components/ModalGanador'

// 6 imágenes diferentes para las preguntas
const imagenes = [
  { id: 1, icon: '🚦', name: 'Semáforos' },
  { id: 2, icon: '🚸', name: 'Señales' },
  { id: 3, icon: '🚗', name: 'Vehículos' },
  { id: 4, icon: '🚶', name: 'Peatones' },
  { id: 5, icon: '🛣️', name: 'Carreteras' },
  { id: 6, icon: '🅿️', name: 'Estacionamiento' },
]

export default function PantallaPrincipal() {
  const { players, currentTurn, addPoint, setTurn } = useGame()
  const [imagenesBloqueadas, setImagenesBloqueadas] = useState<Set<number>>(new Set())
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [gameFinished, setGameFinished] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const currentPlayer = players[currentTurn]

  // Inicializar el juego cuando se llega por primera vez desde FightIntro
  useEffect(() => {
    if (!isInitialized && players[0].character && players[1].character) {
      // Resetear el estado del juego para empezar limpio
      setGameFinished(false)
      setImagenesBloqueadas(new Set())
      setShowQuestionModal(false)
      setShowWinnerModal(false)
      setSelectedImageId(null)
      setIsInitialized(true)
      
      // Asegurar que el turno esté en 0 (primer jugador)
      setTurn(0)
    }
  }, [players, isInitialized, setTurn])

  // Verificar si hay un ganador
  useEffect(() => {
    const winner = players.find(player => player.points >= 3)
    if (winner && !gameFinished) {
      setGameFinished(true)
      setShowWinnerModal(true)
    }
  }, [players, gameFinished])

  const handleImageClick = (imageId: number) => {
    // No permitir clic si la imagen está bloqueada, el juego terminó, o no está inicializado
    if (imagenesBloqueadas.has(imageId) || gameFinished || !isInitialized) {
      console.log('Click bloqueado:', { 
        isBlocked: imagenesBloqueadas.has(imageId), 
        gameFinished, 
        isInitialized 
      })
      return
    }
    
    console.log('Click permitido en imagen:', imageId)
    setSelectedImageId(imageId)
    setShowQuestionModal(true)
  }

  const handleQuestionAnswered = (isCorrect: boolean) => {
    setShowQuestionModal(false)
    
    if (isCorrect && selectedImageId) {
      // Bloquear la imagen y dar punto
      setImagenesBloqueadas(prev => new Set(prev).add(selectedImageId))
      addPoint(currentTurn)
    }
    
    // Cambiar turno
    setTurn(currentTurn === 0 ? 1 : 0)
    setSelectedImageId(null)
  }

  const handleWinnerModalClose = () => {
    setShowWinnerModal(false)
    // Aquí podrías navegar a la pantalla de preguntas original si quieres
  }

  const resetGame = () => {
    setImagenesBloqueadas(new Set())
    setGameFinished(false)
    setShowWinnerModal(false)
    // Reiniciar el juego completo
    window.location.reload()
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Juego de Educación Vial</h1>
      
      {/* Información de los jugadores */}
      <div className="card p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center">
          {/* Jugador 1 */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-2">{players[0].character}</h3>
            <p className="text-sm text-gray-600">Jugador 1</p>
            <p className="text-lg font-bold text-accent">Puntos: {players[0].points}/3</p>
          </div>
          
          {/* Información del turno */}
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">
              {isInitialized ? (
                <>
                  Turno de: <span className="text-accent">{currentPlayer.character}</span>
                </>
              ) : (
                <span className="text-yellow-600">Inicializando juego...</span>
              )}
            </p>
            <p className="text-sm text-gray-600">
              {isInitialized ? 'Haz clic en una imagen para responder' : 'Preparando tablero...'}
            </p>
          </div>
          
          {/* Jugador 2 */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-secondary mb-2">{players[1].character}</h3>
            <p className="text-sm text-gray-600">Jugador 2</p>
            <p className="text-lg font-bold text-accent">Puntos: {players[1].points}/3</p>
          </div>
        </div>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {imagenes.map((imagen) => {
          const isBlocked = imagenesBloqueadas.has(imagen.id)
          const isCurrentPlayerTurn = !gameFinished && isInitialized
          
          return (
            <motion.button
              key={imagen.id}
              whileHover={!isBlocked && isCurrentPlayerTurn ? { scale: 1.05 } : {}}
              whileTap={!isBlocked && isCurrentPlayerTurn ? { scale: 0.95 } : {}}
              onClick={() => handleImageClick(imagen.id)}
              disabled={isBlocked || !isCurrentPlayerTurn}
              className={`
                card p-8 flex flex-col items-center gap-4 text-center
                ${isBlocked 
                  ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                  : isCurrentPlayerTurn 
                    ? 'hover:bg-primary/20 cursor-pointer transition-colors' 
                    : 'cursor-not-allowed opacity-75'
                }
              `}
            >
              <div className="text-6xl">
                {isBlocked ? '🔒' : imagen.icon}
              </div>
              <h3 className="text-lg font-bold">
                {isBlocked ? 'Completado' : imagen.name}
              </h3>
              {isBlocked && (
                <p className="text-sm text-gray-600">✓ Respondido correctamente</p>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Botón de reinicio - solo cuando hay ganador */}
      {gameFinished && (
        <button 
          onClick={resetGame}
          className="btn bg-gray-500 hover:bg-gray-600 text-white mt-4"
        >
          🔄 Reiniciar Juego
        </button>
      )}

      {/* Modales */}
      <ModalPregunta
        isOpen={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        onAnswer={handleQuestionAnswered}
        imageId={selectedImageId}
        currentPlayer={currentPlayer}
      />

      <ModalGanador
        isOpen={showWinnerModal}
        onClose={handleWinnerModalClose}
        winner={players.find(player => player.points >= 3)}
        onContinue={handleWinnerModalClose}
        onPlayAgain={resetGame}
      />
    </div>
  )
}
