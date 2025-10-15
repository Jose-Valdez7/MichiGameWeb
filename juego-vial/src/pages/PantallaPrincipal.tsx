import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { players, currentTurn, addPoint, setTurn, reset } = useGame()
  const navigate = useNavigate()
  const [imagenesBloqueadas, setImagenesBloqueadas] = useState<Set<number>>(new Set())
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [gameFinished, setGameFinished] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const currentPlayer = players[currentTurn]

  // Inicializar el juego cuando se llega por primera vez desde FightIntro
  useEffect(() => {
    if (players[0].character && players[1].character && !isInitialized) {
      console.log('Personajes detectados, inicializando...')
      // Resetear el estado del juego para empezar limpio
      setGameFinished(false)
      setImagenesBloqueadas(new Set())
      setShowQuestionModal(false)
      setShowWinnerModal(false)
      setSelectedImageId(null)

      // Asegurar que el turno esté en 0 (primer jugador)
      setTurn(0)

      // Marcar como inicializado
      setIsInitialized(true)
    }
  }, [players[0].character, players[1].character, isInitialized, setTurn])

  // Resetear isInitialized cuando cambien los personajes
  useEffect(() => {
    setIsInitialized(false)
  }, [players[0].character, players[1].character])

  // Verificar si hay un ganador
  useEffect(() => {
    const winner = players.find(player => player.points >= 3)
    if (winner && !gameFinished) {
      setGameFinished(true)
      setShowWinnerModal(true)
    }
  }, [players, gameFinished])

  const handleImageClick = (imageId: number) => {
    console.log('Click detectado en imagen:', imageId, {
      isBlocked: imagenesBloqueadas.has(imageId),
      gameFinished,
      isInitialized,
      player1: players[0].character,
      player2: players[1].character
    })

    // Verificar condiciones básicas
    if (imagenesBloqueadas.has(imageId)) {
      console.log('Imagen ya bloqueada')
      return
    }

    if (gameFinished) {
      console.log('Juego terminado')
      return
    }

    if (!players[0].character || !players[1].character) {
      console.log('Personajes no seleccionados')
      return
    }

    console.log('Click permitido - abriendo modal')
    setSelectedImageId(imageId)
    setShowQuestionModal(true)
    console.log('Modal debería mostrarse ahora')
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
    // Reiniciar el estado del juego
    reset()
    setImagenesBloqueadas(new Set())
    setGameFinished(false)
    setShowWinnerModal(false)
    setSelectedImageId(null)
    setShowQuestionModal(false)

    // Pequeño delay para asegurar que el reset se complete antes de navegar
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      {/* Licencias de manejar en esquinas superiores */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between pointer-events-none">
        {/* Licencia Jugador 1 - Esquina superior izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="pointer-events-auto"
        >
          <div className={`relative w-72 h-40 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-xl border-3 ${currentTurn === 0 && !gameFinished
              ? 'border-green-500 shadow-green-500/50'
              : 'border-gray-400'
            }`} style={{
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)',
              boxShadow: currentTurn === 0 && !gameFinished
                ? '0 0 20px rgba(34, 197, 94, 0.6), 0 8px 20px rgba(0,0,0,0.3)'
                : '0 8px 20px rgba(0,0,0,0.2)'
            }}>
            {/* Efecto de brillo cuando es su turno */}
            {currentTurn === 0 && !gameFinished && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Header de la licencia */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <div className="text-xs font-bold text-green-800">LICENCIA DE CONDUCIR</div>
              <div className="text-xs font-bold text-green-800">REPÚBLICA VIAL</div>
            </div>

            {/* Foto del conductor */}
            <div className="absolute top-8 left-4 w-16 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-green-300">
              <div className="text-3xl">
                {players[0].character ? '🚗' : '👤'}
              </div>
            </div>

            {/* Información del conductor */}
            <div className="absolute top-8 left-24 right-4">
              <div className="text-xs text-green-900 font-bold mb-1">
                {players[0].customName || players[0].character || 'JUGADOR 1'}
              </div>
              <div className="text-xs text-green-700 mb-1">ID: JUG-001</div>
              <div className="text-xs text-green-700 mb-1">CLASE: A</div>
              <div className="text-xs text-green-700">VIGENCIA: 2024-2025</div>
            </div>

             {/* Barra de progreso */}
             <div className="absolute bottom-2 left-4 right-4">
               <div className="flex items-center gap-1">
                 <div className="text-xs text-green-800 font-bold leading-none">PROGRESO: {players[0].points}/3</div>
                 <div className="flex-1 bg-green-200 rounded-full h-2">
                   <motion.div 
                     className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                     initial={{ width: 0 }}
                     animate={{ width: `${(players[0].points / 3) * 100}%` }}
                     transition={{ duration: 0.8 }}
                   />
                 </div>
               </div>
             </div>

            {/* Indicador de turno */}
            {currentTurn === 0 && !gameFinished && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600"
              >
                <span className="text-lg">🎯</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Licencia Jugador 2 - Esquina superior derecha */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="pointer-events-auto"
        >
          <div className={`relative w-72 h-40 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-xl border-3 ${currentTurn === 1 && !gameFinished
              ? 'border-red-500 shadow-red-500/50'
              : 'border-gray-400'
            }`} style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 50%, #f87171 100%)',
              boxShadow: currentTurn === 1 && !gameFinished
                ? '0 0 20px rgba(239, 68, 68, 0.6), 0 8px 20px rgba(0,0,0,0.3)'
                : '0 8px 20px rgba(0,0,0,0.2)'
            }}>
            {/* Efecto de brillo cuando es su turno */}
            {currentTurn === 1 && !gameFinished && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Header de la licencia */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <div className="text-xs font-bold text-red-800">LICENCIA DE CONDUCIR</div>
              <div className="text-xs font-bold text-red-800">REPÚBLICA VIAL</div>
            </div>

            {/* Foto del conductor */}
            <div className="absolute top-8 left-4 w-16 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-red-300">
              <div className="text-3xl">
                {players[1].character ? '🚙' : '👤'}
              </div>
            </div>

            {/* Información del conductor */}
            <div className="absolute top-8 left-24 right-4">
              <div className="text-xs text-red-900 font-bold mb-1">
                {players[1].customName || players[1].character || 'JUGADOR 2'}
              </div>
              <div className="text-xs text-red-700 mb-1">ID: JUG-002</div>
              <div className="text-xs text-red-700 mb-1">CLASE: A</div>
              <div className="text-xs text-red-700">VIGENCIA: 2024-2025</div>
            </div>

             {/* Barra de progreso */}
             <div className="absolute bottom-2 left-4 right-4">
               <div className="flex items-center gap-1">
                 <div className="text-xs text-red-800 font-bold leading-none">PROGRESO: {players[1].points}/3</div>
                 <div className="flex-1 bg-red-200 rounded-full h-2">
                   <motion.div 
                     className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                     initial={{ width: 0 }}
                     animate={{ width: `${(players[1].points / 3) * 100}%` }}
                     transition={{ duration: 0.8 }}
                   />
                 </div>
               </div>
             </div>

            {/* Indicador de turno */}
            {currentTurn === 1 && !gameFinished && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600"
              >
                <span className="text-lg">🎯</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mensaje central del juego */}
      <div className="text-center mt-48">
        {players[0].character && players[1].character ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="bg-white/90 text-gray-800 px-8 py-6 rounded-xl shadow-lg border-2 border-gray-300 inline-block">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">
                  Turno de:
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600 whitespace-nowrap">
                  {currentPlayer.name}
                </h3>
              </div>
            </div>
            <p className="text-lg text-white drop-shadow-lg mt-4 font-medium">
              Haz clic en una imagen para responder
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="bg-yellow-100 text-yellow-800 px-6 py-4 rounded-xl shadow-lg border-2 border-yellow-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Esperando personajes...
              </h2>
              <p className="text-lg font-medium">
                Selecciona personajes primero
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {imagenes.map((imagen) => {
          const isBlocked = imagenesBloqueadas.has(imagen.id)
          const canClick = !isBlocked && !gameFinished && players[0].character && players[1].character

          return (
            <motion.button
              key={imagen.id}
              whileHover={canClick ? { scale: 1.05 } : {}}
              whileTap={canClick ? { scale: 0.95 } : {}}
              onClick={() => handleImageClick(imagen.id)}
              disabled={!canClick}
              className={`
                card p-8 flex flex-col items-center gap-4 text-center
                ${isBlocked
                  ? 'bg-gray-300 cursor-not-allowed opacity-50'
                  : canClick
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
          🆕 Empezar Nuevo Juego
        </button>
      )}

      {/* Modales */}
      {console.log('Estado del modal:', showQuestionModal, 'Imagen seleccionada:', selectedImageId)}
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
      />
    </div>
  )
}
