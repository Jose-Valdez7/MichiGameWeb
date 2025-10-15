import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState, useEffect, useRef } from 'react'
import GameDetectedModal from '../components/GameDetectedModal'
import ModalNombreJugador from '../components/ModalNombreJugador'

const characters = [
  { name: 'Michi Gamer', image: '/images/personaje1.png' },
  { name: 'Michi Mago', image: '/images/personaje2.png' },
  { name: 'Michi Rapero', image: '/images/personaje3.png' },
  { name: 'Michi Hacker', image: '/images/personaje4.png' },
  { name: 'Michi Vampiro', image: '/images/personaje5.png' },
  { name: 'Michi Cyborg', image: '/images/personaje6.png' },
]

export default function SeleccionPersonaje() {
  const { players, selectCharacter, setCustomName, reset, justReset } = useGame()
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0)
  const [showGameDetectedModal, setShowGameDetectedModal] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [hoveredIndexP1, setHoveredIndexP1] = useState<number | null>(null)
  const [hoveredIndexP2, setHoveredIndexP2] = useState<number | null>(null)
  const [showStartButton, setShowStartButton] = useState(false)

  const getCharacterImage = (name: string | null | undefined) => {
    if (!name) return null
    const found = characters.find(c => c.name === name)
    return found?.image || null
  }
  
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

  // Efecto para mostrar el botón con delay de 2 segundos
  useEffect(() => {
    if (canContinue) {
      setShowStartButton(false) // Resetear primero
      const timer = setTimeout(() => {
        setShowStartButton(true)
      }, 2000) // 2 segundos de delay
      
      return () => clearTimeout(timer)
    } else {
      setShowStartButton(false)
    }
  }, [canContinue])

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
      
      

      {/* Vistas previas (Jugador 1 y Jugador 2) */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preview Jugador 1 (estilo Street Fighter) */}
        <div className="relative mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 h-64 sm:h-72 md:h-80 lg:h-96 border-2 border-cyan-300/40 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.25)]">
          {(() => {
            const hovered = hoveredIndexP1
            const selectedImg = getCharacterImage(players[0].character)
            const src = hovered !== null ? characters[hovered].image : selectedImg
            const label = hovered !== null ? characters[hovered].name : (players[0].customName ? `${players[0].customName}: ${players[0].character}` : players[0].character || 'Jugador 1')
            return src ? (
              <>
                {/* Fondo con imagen a pantalla completa */}
                <motion.div
                  key={label}
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Vigneta y líneas sutiles */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.07) 3px)' }} />
                {/* Glow lateral de color jugador 1 */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />
                {/* Banner nombre */}
                <div className="absolute top-2 left-2 px-3 py-1 rounded-lg bg-cyan-600/70 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg">
                  {players[0].customName ? label : `J1: ${label}`}
                </div>
              </>
            ) : (
              <div className="w-full h-full grid place-items-center text-white/70 text-sm sm:text-base">
                J1: Aun no selcciona personaje
              </div>
            )
          })()}
        </div>
        {/* Preview Jugador 2 (estilo Street Fighter) */}
        <div className="relative mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 h-64 sm:h-72 md:h-80 lg:h-96 border-2 border-rose-300/40 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(244,63,94,0.25)]">
          {(() => {
            const hovered = hoveredIndexP2
            const selectedImg = getCharacterImage(players[1].character)
            const src = hovered !== null ? characters[hovered].image : selectedImg
            const label = hovered !== null ? characters[hovered].name : (players[1].customName ? `${players[1].customName}: ${players[1].character}` : players[1].character || 'Jugador 2')
            return src ? (
              <>
                {/* Fondo con imagen a pantalla completa */}
                <motion.div
                  key={label}
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Vigneta y líneas sutiles */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.07) 3px)' }} />
                {/* Glow lateral de color jugador 2 */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-400/20 blur-3xl rounded-full pointer-events-none" />
                {/* Banner nombre */}
                <div className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-rose-600/70 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg">
                  {players[1].customName ? label : `J2: ${label}`}
                </div>
              </>
            ) : (
              <div className="w-full h-full grid place-items-center text-white/70 text-sm sm:text-base">
                J2: Aun no selcciona personaje
              </div>
            )
          })()}
        </div>
        {/* VS centrado entre previews */}
        <motion.div 
          className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-yellow-400 border-4 border-white/30 shadow-2xl grid place-items-center">
            <span className="text-white font-black text-3xl drop-shadow">VS</span>
          </div>
        </motion.div>
      </div>

      {/* Carrusel de personajes en fila */}
      <div className="w-full overflow-visible">
        <div className="flex flex-wrap items-stretch justify-center gap-4 pr-2 w-full">
        {characters.map((character, index) => (
          <motion.button
            key={character.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1, y: -10, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterSelect(character.name)}
            onMouseEnter={() => {
              if (currentPlayer === 0) setHoveredIndexP1(index); else setHoveredIndexP2(index)
            }}
            onMouseLeave={() => {
              if (currentPlayer === 0) setHoveredIndexP1(null); else setHoveredIndexP2(null)
            }}
            disabled={players[currentPlayer].character !== null}
            className={`
              relative overflow-hidden flex-none flex flex-col items-center justify-end gap-2 rounded-2xl h-56 md:h-64 w-44 md:w-48 border-2 transition-all duration-300
              ${players[currentPlayer].character !== null
                ? 'bg-gray-500/30 border-gray-500/50 cursor-not-allowed opacity-60'
                : 'bg-black/10 border-purple-400/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer'
              }
            `}
            style={{
              backgroundImage: `url(${character.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Efecto de resplandor para el turno activo */}
            {players[currentPlayer].character === null && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {/* Oscurecedor inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <h3 className="text-lg font-black text-white drop-shadow relative z-10 mb-2 px-2 py-0.5 bg-black/40 rounded-lg">
              {character.name}
            </h3>
            
            {/* Indicador removido */}
          </motion.button>
        ))}
        </div>
      </div>

      {canContinue && showStartButton && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <Link to="/fight-intro">
            <motion.button
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-3xl md:text-4xl px-12 md:px-16 py-6 md:py-8 rounded-2xl shadow-2xl border-2 border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
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
        characterImage={getCharacterImage(selectedCharacter) || undefined}
      />
      </div>
    </div>
  )
}


