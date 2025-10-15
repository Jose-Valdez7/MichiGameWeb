import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState, useEffect, useRef } from 'react'
import GameDetectedModal from '../components/GameDetectedModal'
import ModalNombreJugador from '../components/ModalNombreJugador'

const characters = [
  'Aventurero',
  'Exploradora',
  'Robot',
  'Alien',
  'Perro',
  'Gato',
]

export default function SeleccionPersonaje() {
  const { players, selectCharacter, setCustomName, reset, justReset } = useGame()
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0)
  const [showGameDetectedModal, setShowGameDetectedModal] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  
  // Bandera persistente en localStorage
  const MODAL_DECISION_KEY = 'juego-vial-modal-decision'
  
  // Ref para rastrear si ya verificamos el modal
  const hasCheckedModal = useRef(false)

  // Efecto para verificar el modal
  useEffect(() => {
    // Si ya verificamos el modal, no hacer nada
    if (hasCheckedModal.current) {
      return
    }
    
    // No mostrar modal si acabamos de hacer reset
    if (justReset) {
      hasCheckedModal.current = true
      return
    }
    
    // Verificar si ya decidimos empezar nuevo en localStorage
    const modalDecision = localStorage.getItem(MODAL_DECISION_KEY)
    if (modalDecision === 'start-new') {
      hasCheckedModal.current = true
      return // No mostrar modal si ya decidimos empezar nuevo
    }
    
    // Verificar si hay datos guardados
    const hasAnyData = Boolean(
      players[0].character || 
      players[1].character || 
      players[0].position > 0 || 
      players[1].position > 0 || 
      players[0].points > 0 || 
      players[1].points > 0
    )
    
    // Mostrar modal si hay cualquier dato guardado
    if (hasAnyData) {
      setShowGameDetectedModal(true)
    }
    
    // Marcar que ya verificamos el modal
    hasCheckedModal.current = true
  }, [players, justReset])

  const handleCharacterSelect = (character: string) => {
    // Guardar el personaje seleccionado y mostrar el modal de nombre
    setSelectedCharacter(character)
    setShowNameModal(true)
  }

  const handleNameConfirm = (nombre: string) => {
    // Seleccionar el personaje y establecer el nombre personalizado
    selectCharacter(currentPlayer, selectedCharacter)
    setCustomName(currentPlayer, nombre)
    
    // Cambiar al siguiente jugador o continuar
    if (currentPlayer === 0) {
      setCurrentPlayer(1)
    }
  }

  const canContinue = players[0].character && players[1].character

  const handleStartNewGame = () => {
    reset()
    setCurrentPlayer(0)
    localStorage.setItem(MODAL_DECISION_KEY, 'start-new') // Guardar decisión en localStorage
    hasCheckedModal.current = false // Resetear para que no verifique el modal otra vez
  }

  const handleCloseModal = () => {
    setShowGameDetectedModal(false)
    localStorage.removeItem(MODAL_DECISION_KEY) // Limpiar la decisión
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 relative overflow-hidden">
      {/* Fondo épico con gradiente dramático */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
      
      {/* Efectos de partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight]
            }}
            transition={{
              duration: 4,
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
          🎭 <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">ELIGE TUS PERSONAJES</span>
        </motion.h1>
      
      {/* Panel de información de jugadores - Estilo épico */}
      <motion.div 
        className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-5xl shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="text-center mb-4">
          <motion.div 
            className="inline-flex items-center gap-3 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              ⚡
            </div>
            <p className="text-2xl font-black text-white">
              TURNO DE: <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {players[currentPlayer].customName || `Jugador ${currentPlayer + 1}`}
              </span>
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            className={`p-4 rounded-xl backdrop-blur-lg border-2 transition-all duration-300 ${
              players[0].character 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50' 
                : 'bg-white/10 border-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xl">
                🚗
              </div>
              <div>
                <p className="text-white font-bold">{players[0].customName || 'Jugador 1'}</p>
                <p className={`text-sm font-medium ${players[0].character ? 'text-green-300' : 'text-gray-400'}`}>
                  {players[0].character ? `✅ ${players[0].character}` : '❌ Sin seleccionar'}
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={`p-4 rounded-xl backdrop-blur-lg border-2 transition-all duration-300 ${
              players[1].character 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50' 
                : 'bg-white/10 border-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                🚙
              </div>
              <div>
                <p className="text-white font-bold">{players[1].customName || 'Jugador 2'}</p>
                <p className={`text-sm font-medium ${players[1].character ? 'text-green-300' : 'text-gray-400'}`}>
                  {players[1].character ? `✅ ${players[1].character}` : '❌ Sin seleccionar'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid de personajes - Estilo épico */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {characters.map((character, index) => (
          <motion.button
            key={character}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1, y: -10, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterSelect(character)}
            disabled={players[currentPlayer].character !== null}
            className={`
              relative p-8 flex flex-col items-center gap-4 rounded-2xl backdrop-blur-lg border-2 transition-all duration-300
              ${players[currentPlayer].character !== null
                ? 'bg-gray-500/30 border-gray-500/50 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-br from-white/20 to-white/10 border-purple-400/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer'
              }
            `}
          >
            {/* Efecto de resplandor para el turno activo */}
            {players[currentPlayer].character === null && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            <motion.div 
              className="text-6xl relative z-10"
              animate={players[currentPlayer].character === null ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚗
            </motion.div>
            
            <h3 className="text-xl font-black text-white drop-shadow relative z-10">
              {character}
            </h3>
            
            {players[currentPlayer].character === null && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚡
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {canContinue && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Link to="/fight-intro">
            <motion.button
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚔️ ¡INICIAR ENFRENTAMIENTO! ⚔️
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Modal para juego detectado */}
      <GameDetectedModal
        isOpen={showGameDetectedModal}
        onClose={handleCloseModal}
        onStartNew={handleStartNewGame}
      />

      {/* Modal para personalizar nombre */}
      <ModalNombreJugador
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onConfirm={handleNameConfirm}
        playerNumber={currentPlayer + 1}
        characterName={selectedCharacter}
      />
      </div>
    </div>
  )
}


