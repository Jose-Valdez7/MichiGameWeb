import { useState } from 'react'
import Modal from './ui/Modal'

type ModalNombreJugadorProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (nombre: string) => void
  playerNumber: number
  characterName: string
  characterImage?: string
}

export default function ModalNombreJugador({ 
  isOpen, 
  onClose, 
  onConfirm, 
  playerNumber, 
  characterName,
  characterImage 
}: ModalNombreJugadorProps) {
  const [nombre, setNombre] = useState('')

  const handleConfirm = () => {
    if (nombre.trim()) {
      onConfirm(nombre.trim())
      setNombre('')
      onClose()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-400 hover:scrollbar-thumb-purple-300 scrollbar-thumb-rounded-full">
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
        
        {/* Partículas flotantes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 300}px`,
              top: `${Math.random() * 200}px`,
              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out ${i * 0.3}s`
            }}
          />
        ))}
        
        {/* Imagen del personaje en la esquina superior derecha */}
        {characterImage && (
          <div className="absolute top-4 right-4 w-40 h-40 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl z-20">
            <img 
              src={characterImage} 
              alt={characterName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-6 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white mb-4 drop-shadow-2xl">
              🎭 <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">PERSONALIZAR JUGADOR</span>
            </h2>
            <p className="text-xl text-white mb-2 font-medium">
              Has seleccionado: <span className="font-bold text-yellow-400">{characterName}</span>
            </p>
            <p className="text-lg text-gray-300">
              ¿Cómo quieres que se llame este jugador?
            </p>
          </div>

          <div className="space-y-4">
            <label htmlFor="nombre" className="block text-lg font-bold text-white">
              Nombre del Jugador {playerNumber}:
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Nombre para Jugador ${playerNumber}`}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border-2 border-purple-400/50 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-300 transition-all duration-300 text-lg font-medium"
              style={{ color: 'white' }}
              autoFocus
              maxLength={20}
            />
            <p className="text-sm text-gray-300 font-medium">
              Máximo 20 caracteres
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 backdrop-blur-lg border-2 border-gray-400/50 text-white rounded-xl hover:border-gray-300 hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 font-bold text-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!nombre.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-purple-500/50"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
