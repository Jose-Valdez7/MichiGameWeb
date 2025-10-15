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
      title=""
      className="max-w-lg"
    >
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-400 hover:scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full">
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
        
        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 300}px`,
              top: `${Math.random() * 200}px`,
              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out ${i * 0.3}s`
            }}
          />
        ))}
        
        <div className="text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-black text-white mb-4 drop-shadow-2xl">
            💾 <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">JUEGO GUARDADO DETECTADO</span>
          </h2>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl"
          >
            💾
          </motion.div>
          
          <div className="space-y-3">
            <p className="text-xl text-white font-medium">
              Tienes un juego en progreso
            </p>
            <p className="text-lg text-gray-300">
              Puedes continuar donde lo dejaste o empezar uno nuevo.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/tablero"
              onClick={onClose}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-3"
            >
              🎮 Continuar Juego
            </Link>
            
            <button
              onClick={() => {
                onStartNew()
                onClose()
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-3"
            >
              🆕 Empezar Nuevo
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 backdrop-blur-lg border-2 border-gray-400/50 text-white rounded-xl hover:border-gray-300 hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 font-bold text-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
