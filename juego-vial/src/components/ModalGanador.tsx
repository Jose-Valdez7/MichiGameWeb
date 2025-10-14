import { motion } from 'framer-motion'
import Modal from './ui/Modal'

interface ModalGanadorProps {
  isOpen: boolean
  onClose: () => void
  winner: { name: string; customName: string | null; character: string | null; position: number; points: number } | undefined
  onContinue: () => void
}

export default function ModalGanador({ isOpen, onClose, onContinue, winner }: ModalGanadorProps) {
  if (!winner) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      className="max-w-lg"
    >
      <div className="bg-gradient-to-br from-gray-900 via-yellow-900 to-orange-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
        
        {/* Partículas de celebración */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-80"
            initial={{ 
              x: Math.random() * 300,
              y: Math.random() * 200,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [Math.random() * 200, Math.random() * 200],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <div className="text-center space-y-6 relative z-10">
          <h2 className="text-4xl font-black text-white mb-6 drop-shadow-2xl">
            🏆 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">¡FELICIDADES!</span>
          </h2>
          
          {/* Animación de celebración */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-9xl"
          >
            🏆
          </motion.div>
          
          {/* Información del ganador */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Corona sobre el nombre */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="text-5xl mb-3"
              >
                👑
              </motion.div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow">
                ¡<span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{winner.customName || winner.name}</span> HA GANADO!
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/50 rounded-2xl p-4">
              <p className="text-xl text-white font-bold">
                Primer jugador en llegar a 3 puntos
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/50 rounded-2xl p-4">
              <p className="text-2xl font-black text-white mb-2">
                Puntos finales: <span className="text-yellow-400">{winner.points}/3</span>
              </p>
              <p className="text-lg text-gray-300 font-medium">
                Personaje: <span className="text-yellow-400 font-bold">{winner.character}</span>
              </p>
            </div>
          </motion.div>

          {/* Botón de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={onContinue}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-black text-2xl shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-3"
            >
              🎮 Continuar
            </button>
          </motion.div>

          {/* Efectos de confeti épicos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-4 text-4xl"
          >
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              🎉
            </motion.span>
            <motion.span
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            >
              🎊
            </motion.span>
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
            >
              ✨
            </motion.span>
          </motion.div>

          {/* Efectos de confeti adicionales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 5]
                }}
                initial={{ 
                  x: Math.random() * 400,
                  y: -10,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: 300,
                  opacity: [0, 1, 0],
                  rotate: [0, 720],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.1,
                  ease: "easeIn"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </Modal>
  )
}
