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
    <div 
      className="min-h-dvh p-6 flex flex-col items-center gap-6"
      style={{
        backgroundImage: 'url("/images/fondo-personajes.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Elige tus personajes</h1>
      
      <div className="card p-4 mb-4">
        <p className="text-lg font-bold text-center">
          Turno de: <span className="text-primary">{players[currentPlayer].customName || `Jugador ${currentPlayer + 1}`}</span>
        </p>
        <div className="flex gap-4 mt-2">
          <div className={`p-2 rounded ${players[0].character ? 'bg-success text-white' : 'bg-gray-200'}`}>
            {players[0].customName || 'Jugador 1'}: {players[0].character || 'Sin seleccionar'}
          </div>
          <div className={`p-2 rounded ${players[1].character ? 'bg-success text-white' : 'bg-gray-200'}`}>
            {players[1].customName || 'Jugador 2'}: {players[1].character || 'Sin seleccionar'}
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

      {/* Modal para personalizar nombre */}
      <ModalNombreJugador
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onConfirm={handleNameConfirm}
        playerNumber={currentPlayer + 1}
        characterName={selectedCharacter}
      />
    </div>
  )
}


