import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Modal from './ui/Modal'

interface GameDetectedModalProps {
  isOpen: boolean
  onClose: () => void
  onStartNew: () => void
}

export default function GameDetectedModal({ isOpen, onClose, onStartNew }: GameDetectedModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💾 Juego Guardado Detectado"
      className="max-w-lg"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-6xl"
        >
          💾
        </motion.div>
        
        <div className="space-y-2">
          <p className="text-gray-700 text-lg font-medium">
            Tienes un juego en progreso
          </p>
          <p className="text-gray-600">
            Puedes continuar donde lo dejaste o empezar uno nuevo.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link
            to="/tablero"
            onClick={onClose}
            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full justify-center py-3 text-lg"
          >
            🎮 Continuar Juego
          </Link>
          
          <button
            onClick={() => {
              onStartNew()
              onClose()
            }}
            className="btn bg-red-500 hover:bg-red-600 text-white w-full justify-center py-3 text-lg"
          >
            🆕 Empezar Nuevo
          </button>
          
          <button
            onClick={onClose}
            className="btn bg-gray-400 hover:bg-gray-500 text-white w-full justify-center py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
