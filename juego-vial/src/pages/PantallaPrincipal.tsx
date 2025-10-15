import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalPregunta from '../components/ModalPregunta'
import ModalGanador from '../components/ModalGanador'

// 6 imágenes diferentes para las preguntas con categorías
const imagenes = [
  { id: 1, icon: '🚦', name: 'Semáforos', category: 'transito', categoryName: 'Educación Vial' },
  { id: 2, icon: '🚸', name: 'Señales', category: 'movilis', categoryName: 'Movilis' },
  { id: 3, icon: '🚗', name: 'Vehículos', category: 'transito', categoryName: 'Educación Vial' },
  { id: 4, icon: '🚶', name: 'Peatones', category: 'transito', categoryName: 'Educación Vial' },
  { id: 5, icon: '🛣️', name: 'Carreteras', category: 'riesgos', categoryName: 'Riesgos Naturales' },
  { id: 6, icon: '🅿️', name: 'Estacionamiento', category: 'transito', categoryName: 'Educación Vial' },
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
  const [questionSelectedAnswer, setQuestionSelectedAnswer] = useState<number | null>(null)
  const [questionIsCorrect, setQuestionIsCorrect] = useState<boolean | null>(null)

  const currentPlayer = players[currentTurn]

  // Inicializar el juego cuando se llega por primera vez desde FightIntro
  useEffect(() => {
    // Inicializar si ambos jugadores tienen personajes seleccionados
    if (players[0]?.character && players[1]?.character) {
      if (!isInitialized) {
      // Resetear el estado del juego para empezar limpio
      setGameFinished(false)
      setImagenesBloqueadas(new Set())
      setShowQuestionModal(false)
      setShowWinnerModal(false)
      setSelectedImageId(null)
      setIsInitialized(true)
        // NO cambiar el turno aquí - respetar la selección del modal
        // El turno ya fue establecido por setStartingPlayer en el modal
      }
    } else {
      // Si no están listos los personajes, marcar como no inicializado
      if (isInitialized) {
        setIsInitialized(false)
      }
    }
  }, [players, isInitialized, currentTurn])

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
      return
    }
    
    setSelectedImageId(imageId)
    setQuestionSelectedAnswer(null)
    setQuestionIsCorrect(null)
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
    setQuestionSelectedAnswer(null)
    setQuestionIsCorrect(null)
  }

  const handleSemaphoreUpdate = (selectedAnswer: number | null, isCorrect: boolean | null) => {
    setQuestionSelectedAnswer(selectedAnswer)
    setQuestionIsCorrect(isCorrect)
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

  // Obtener imagen del personaje del jugador en turno
  const getCharacterImage = (characterName: string | null) => {
    if (!characterName) return null
    const map: Record<string, string> = {
      'Michi Gamer': '/images/personaje1.png',
      'Michi Mago': '/images/personaje2.png',
      'Michi Rapero': '/images/personaje3.png',
      'Michi Hacker': '/images/personaje4.png',
      'MIchi Vampiro': '/images/personaje5.png',
      'Michi Cyborg': '/images/personaje6.png',
    }
    return map[characterName] || null
  }

  return (
    <>
      {/* Panel flotante con info del jugador (cuando hay pregunta abierta) */}
      {showQuestionModal && (
        <div className="fixed top-6 left-6 z-50">
          <div className="relative">
            {/* Glow decorativo */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
            <div className="relative flex items-center gap-4 bg-black/60 backdrop-blur-lg border-2 border-white/20 rounded-3xl px-4 py-3 md:px-5 md:py-4 shadow-2xl">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/40 shadow overflow-hidden bg-center bg-cover"
                style={{ backgroundImage: getCharacterImage(currentPlayer.character) ? `url(${getCharacterImage(currentPlayer.character)})` : undefined }}
              />
              <div className="text-left leading-snug">
                <p className="text-white font-black text-lg md:text-2xl drop-shadow">
                  {currentPlayer.customName || currentPlayer.name}
                </p>
                <p className="text-blue-200 text-sm md:text-base">
                  Puntos: <span className="font-extrabold text-yellow-300">{currentPlayer.points}/3</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Semáforo flotante - solo cuando el modal de preguntas está abierto */}
      {showQuestionModal && (
        <motion.div 
            className="fixed top-8 right-12 w-23 h-36 bg-gray-800 rounded-xl border-2 border-white shadow-2xl z-50"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {/* Estructura del semáforo */}
          <div className="w-full h-full p-3 flex flex-col justify-between">
            {/* Luz roja */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer !== null && !questionIsCorrect 
                ? 'bg-red-500 border-red-300 shadow-red-500/50 shadow-lg animate-pulse' 
                : 'bg-gray-600 border-white'
            }`} />
            
            {/* Luz amarilla */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer === null
                ? 'bg-yellow-500 border-yellow-300 shadow-yellow-500/50 shadow-lg animate-pulse'
                : 'bg-gray-600 border-white'
            }`} />
            
            {/* Luz verde */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer !== null && questionIsCorrect
                ? 'bg-green-500 border-green-300 shadow-green-500/50 shadow-lg animate-pulse'
                : 'bg-gray-600 border-white'
            }`} />
          </div>
          
          {/* Etiqueta del semáforo */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded border border-white">
          </div>
        </motion.div>
      )}

    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 relative overflow-hidden">
      {/* Fondo épico con gradiente dramático */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
      
      {/* Efectos de partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full">
        <motion.h1 
          className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          🎮 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Juego de Educación Vial</span>
        </motion.h1>
      
      {/* Información de los jugadores - Estilo épico */}
      <motion.div 
        className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-5xl shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="flex justify-between items-center">
          {/* Jugador 1 */}
          <motion.div 
            className="text-center relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto shadow-lg">
              🚗
          </div>
            <h3 className="text-2xl font-black text-white mb-2 drop-shadow">{players[0].customName || 'Jugador 1'}</h3>
            <p className="text-sm text-blue-300 font-medium">{players[0].character}</p>
            <motion.div 
              className="text-xl font-bold text-yellow-400 mt-2"
              animate={{ scale: players[0].points > 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              ⭐ {players[0].points}/3
            </motion.div>
          </motion.div>
          
          {/* Información del turno - CENTRO ÉPICO */}
          <motion.div 
            className="text-center relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 mb-4 shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 mx-auto"
              >
                ⚡
              </motion.div>
            </div>
            <p className="text-xl font-black text-white mb-2 drop-shadow">
              {isInitialized ? (
                <>
                  <span className="text-yellow-400">TURNO DE:</span><br/>
                  <span className="text-orange-400">{currentPlayer.customName || `Jugador ${currentTurn + 1}`}</span>
                </>
              ) : (
                <span className="text-yellow-400">⚡ INICIALIZANDO...</span>
              )}
            </p>
            <p className="text-sm text-gray-300 font-medium">
              {isInitialized ? '🎯 Haz clic en una imagen para responder' : '🔄 Preparando tablero...'}
            </p>
          </motion.div>
          
          {/* Jugador 2 */}
          <motion.div 
            className="text-center relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto shadow-lg">
              🚙
          </div>
            <h3 className="text-2xl font-black text-white mb-2 drop-shadow">{players[1].customName || 'Jugador 2'}</h3>
            <p className="text-sm text-orange-300 font-medium">{players[1].character}</p>
            <motion.div 
              className="text-xl font-bold text-yellow-400 mt-2"
              animate={{ scale: players[1].points > 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              ⭐ {players[1].points}/3
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Grid de imágenes - Estilo épico */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {imagenes.map((imagen, index) => {
          const isBlocked = imagenesBloqueadas.has(imagen.id)
          const isCurrentPlayerTurn = !gameFinished && isInitialized
          
          // Colores según categoría
          const categoryColors = {
            transito: { border: 'border-blue-400/50', hover: 'hover:border-blue-300', shadow: 'hover:shadow-blue-500/25' },
            movilis: { border: 'border-purple-400/50', hover: 'hover:border-purple-300', shadow: 'hover:shadow-purple-500/25' },
            riesgos: { border: 'border-red-400/50', hover: 'hover:border-red-300', shadow: 'hover:shadow-red-500/25' }
          }
          
          const colors = categoryColors[imagen.category as keyof typeof categoryColors]
          
          return (
            <motion.button
              key={imagen.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              whileHover={!isBlocked && isCurrentPlayerTurn ? { 
                scale: 1.1, 
                y: -10,
                rotateY: 10
              } : {}}
              whileTap={!isBlocked && isCurrentPlayerTurn ? { scale: 0.95 } : {}}
              onClick={() => handleImageClick(imagen.id)}
              disabled={isBlocked || !isCurrentPlayerTurn}
              className={`
                relative p-8 flex flex-col items-center gap-4 text-center rounded-2xl
                backdrop-blur-lg border-2 transition-all duration-300
                ${isBlocked 
                  ? 'bg-gray-500/30 border-gray-500/50 cursor-not-allowed opacity-60' 
                  : isCurrentPlayerTurn 
                    ? `bg-gradient-to-br from-white/20 to-white/10 ${colors.border} ${colors.hover} hover:shadow-2xl ${colors.shadow} cursor-pointer` 
                    : 'bg-white/10 border-white/30 cursor-not-allowed opacity-75'
                }
              `}
            >
              {/* Efecto de resplandor para el turno activo */}
              {!isBlocked && isCurrentPlayerTurn && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              <motion.div 
                className="text-6xl relative z-10"
                animate={!isBlocked && isCurrentPlayerTurn ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isBlocked ? '🔒' : imagen.icon}
              </motion.div>
              
              <h3 className="text-xl font-black text-white drop-shadow relative z-10">
                {isBlocked ? '✅ Completado' : imagen.name}
              </h3>
              
              {/* Indicador de categoría */}
              {!isBlocked && (
                <div className={`
                  px-3 py-1 rounded-full text-xs font-bold relative z-10
                  ${imagen.category === 'transito' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                    imagen.category === 'movilis' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
                    'bg-red-500/20 text-red-300 border border-red-400/30'}
                `}>
                  {imagen.categoryName}
              </div>
              )}
              
              {isBlocked && (
                <motion.p 
                  className="text-sm text-green-300 font-medium relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  🎯 Respondido correctamente
                </motion.p>
              )}
              
              {!isInitialized && !isBlocked && (
                <motion.p 
                  className="text-sm text-yellow-400 font-medium relative z-10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⚡ Inicializando...
                </motion.p>
              )}
              
              {!isBlocked && isCurrentPlayerTurn && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Mensaje de estado si no está inicializado - Estilo épico */}
      {!isInitialized && (
        <motion.div 
          className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/50 rounded-2xl p-6 shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div 
              className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-yellow-300 font-bold text-lg">
              ⚡ Esperando que ambos jugadores seleccionen sus personajes...
            </p>
          </div>
        </motion.div>
      )}

      {/* Botón de reinicio - solo cuando hay ganador - Estilo épico */}
      {gameFinished && (
        <motion.button 
          onClick={resetGame}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          🆕 Empezar Nuevo Juego
        </motion.button>
      )}


      {/* Modales */}
      <ModalPregunta
        isOpen={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        onAnswer={handleQuestionAnswered}
        imageId={selectedImageId}
        currentPlayer={currentPlayer}
        onSemaphoreUpdate={handleSemaphoreUpdate}
      />

      <ModalGanador
        isOpen={showWinnerModal}
        onClose={handleWinnerModalClose}
        winner={players.find(player => player.points >= 3)}
        onContinue={handleWinnerModalClose}
      />
    </div>
    </div>
    </>
  )
}
