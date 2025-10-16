import { motion } from 'framer-motion'
import Modal from './ui/Modal'

const getCharacterImage = (characterName: string | null) => {
  if (!characterName) return null
  const map: Record<string, string> = {
    'Michi Gamer': '/images/personaje1.png',
    'Michi Mago': '/images/personaje2.png',
    'Michi Rapero': '/images/personaje3.png',
    'Michi Hacker': '/images/personaje4.png',
    'Michi Vampiro': '/images/personaje5.png',
    'Michi Cyborg': '/images/personaje6.png',
  }
  return map[characterName] || null
}

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
      className="max-w-6xl w-full mt-20"
      adjustForNavbar={false}
    >
      <div 
        className="backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-yellow-400 hover:scrollbar-thumb-yellow-300 scrollbar-thumb-rounded-full flex flex-col justify-center min-h-[80vh]"
        style={{
          backgroundImage: getCharacterImage(winner.character) ? `url(${getCharacterImage(winner.character)})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-black/70" />
        
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
        
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
        
        <div className="text-center space-y-8 relative z-10 w-full max-w-6xl mx-auto">
           {/* Título épico de victoria */}
           <motion.div
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
             className="mb-6"
           >
             <h2 className="text-6xl font-black text-white mb-4 drop-shadow-2xl">
               <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                 ⚔️ VICTORIA ÉPICA ⚔️
               </span>
             </h2>
           </motion.div>
          
          
          {/* Información del ganador */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
             {/* Nombre del ganador */}
             <div className="relative">
               <h3 className="text-7xl font-black text-white mb-6 drop-shadow-2xl">
                 ¡<span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                   {winner.customName || winner.name}
                 </span> HA GANADO!
               </h3>
             </div>
            
          </motion.div>

          {/* Botón de acción épico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={onContinue}
              className="w-full px-8 py-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-2xl hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition-all duration-300 font-black text-3xl shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-4 border-2 border-yellow-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl">🎮</span>
              <span>¡JUGAR DE NUEVO!</span>
              <span className="text-4xl">⚔️</span>
            </motion.button>
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
