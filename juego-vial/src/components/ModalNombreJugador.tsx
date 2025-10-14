import { useState } from 'react'
import Modal from './ui/Modal'

type ModalNombreJugadorProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (nombre: string) => void
  playerNumber: number
  characterName: string
}

export default function ModalNombreJugador({ 
  isOpen, 
  onClose, 
  onConfirm, 
  playerNumber, 
  characterName 
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
    <Modal isOpen={isOpen} onClose={onClose} title={`Personalizar Jugador ${playerNumber}`}>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            Has seleccionado: <span className="font-bold text-primary">{characterName}</span>
          </p>
          <p className="text-sm text-gray-600">
            ¿Cómo quieres que se llame este jugador?
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre del Jugador {playerNumber}:
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Nombre para Jugador ${playerNumber}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
            maxLength={20}
          />
          <p className="text-xs text-gray-500">
            Máximo 20 caracteres
          </p>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={onClose}
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!nombre.trim()}
            className="btn bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </div>
    </Modal>
  )
}
