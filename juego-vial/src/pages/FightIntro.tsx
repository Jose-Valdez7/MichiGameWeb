import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FightIntro() {
  const { players } = useGame()
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'vs' | 'names' | 'exiting'>('entering')
  const [key, setKey] = useState(0) // Para forzar re-render completo

  // Resetear animación cada vez que se monta el componente
  useEffect(() => {
    setAnimationPhase('entering')
    setKey(prev => prev + 1) // Forzar re-render completo
  }, [])

  // Animación automática por fases - TIMING MEJORADO
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('vs'), 2000)     // VS aparece después de 2s
    const timer2 = setTimeout(() => setAnimationPhase('names'), 4500)  // Nombres después de 4.5s
    const timer3 = setTimeout(() => setAnimationPhase('exiting'), 7000) // Salida después de 7s
    const timer4 = setTimeout(() => navigate('/tablero'), 8500)        // Navegación después de 8.5s

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [navigate, key]) // Agregar key como dependencia

  const player1 = players[0]
  const player2 = players[1]

  return (
    <div key={key} className="fixed inset-0 bg-black overflow-hidden">
      {/* Fondo con gradiente dramático */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-purple-900 to-black" />
      
      {/* Efectos de partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Jugador 1 - Lado izquierdo */}
      <motion.div
        className="absolute left-8 top-1/2 transform -translate-y-1/2"
        initial={{ x: -400, opacity: 0 }}
        animate={{ 
          x: animationPhase === 'entering' ? 0 : animationPhase === 'exiting' ? -400 : 0,
          opacity: animationPhase === 'exiting' ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.2
        }}
      >
        <div className="text-center">
          {/* Avatar del personaje */}
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-6xl mb-4 shadow-2xl"
            animate={{ 
              scale: animationPhase === 'vs' ? [1, 1.2, 1] : 1,
              rotate: animationPhase === 'vs' ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            🚗
          </motion.div>
          
          {/* Nombre del personaje */}
          <motion.h2
            className="text-3xl font-black text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: animationPhase === 'names' ? 1 : 0,
              y: animationPhase === 'names' ? 0 : 20
            }}
            transition={{ delay: 0.2 }}
          >
            {player1.character}
          </motion.h2>
          
          {/* Etiqueta jugador */}
          <motion.p
            className="text-lg text-blue-300 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase === 'names' ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            JUGADOR 1
          </motion.p>
        </div>
      </motion.div>

      {/* Jugador 2 - Lado derecho */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2"
        initial={{ x: 400, opacity: 0 }}
        animate={{ 
          x: animationPhase === 'entering' ? 0 : animationPhase === 'exiting' ? 400 : 0,
          opacity: animationPhase === 'exiting' ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.4
        }}
      >
        <div className="text-center">
          {/* Avatar del personaje */}
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-6xl mb-4 shadow-2xl"
            animate={{ 
              scale: animationPhase === 'vs' ? [1, 1.2, 1] : 1,
              rotate: animationPhase === 'vs' ? [0, -5, 5, 0] : 0
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            🚙
          </motion.div>
          
          {/* Nombre del personaje */}
          <motion.h2
            className="text-3xl font-black text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: animationPhase === 'names' ? 1 : 0,
              y: animationPhase === 'names' ? 0 : 20
            }}
            transition={{ delay: 0.2 }}
          >
            {player2.character}
          </motion.h2>
          
          {/* Etiqueta jugador */}
          <motion.p
            className="text-lg text-yellow-300 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase === 'names' ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            JUGADOR 2
          </motion.p>
        </div>
      </motion.div>

      {/* VS en el centro - SÚPER ÉPICO */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: -360, opacity: 0 }}
        animate={{ 
          scale: animationPhase === 'vs' ? [0, 1.3, 1] : animationPhase === 'exiting' ? 0 : 1,
          rotate: animationPhase === 'vs' ? [-360, 0] : 0,
          opacity: animationPhase === 'exiting' ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: 1.2,
          duration: 0.8
        }}
      >
        <motion.div
          className="relative"
          animate={{ 
            scale: animationPhase === 'vs' ? [1, 1.2, 1] : 1,
            rotate: animationPhase === 'vs' ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            duration: 0.6,
            repeat: animationPhase === 'vs' ? 2 : 0,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {/* Efecto de resplandor MÁS GRANDE */}
          <motion.div
            className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              opacity: animationPhase === 'vs' ? [0, 1, 0.8, 0] : 0,
              scale: animationPhase === 'vs' ? [0, 3, 2.5, 3] : 0
            }}
            transition={{ 
              duration: 1.5, 
              repeat: animationPhase === 'vs' ? 1 : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Segundo efecto de resplandor */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              opacity: animationPhase === 'vs' ? [0, 0.9, 0] : 0,
              scale: animationPhase === 'vs' ? [0, 2, 2] : 0
            }}
            transition={{ 
              duration: 1, 
              delay: 0.3,
              ease: "easeOut"
            }}
          />
          
          {/* Texto VS - Tamaño perfecto */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-800 text-white font-black text-6xl md:text-7xl lg:text-8xl px-8 py-6 rounded-full shadow-2xl border-4 border-white">
            <motion.div
              animate={{ 
                textShadow: animationPhase === 'vs' ? [
                  "0 0 20px white",
                  "0 0 40px yellow",
                  "0 0 20px white"
                ] : "0 0 10px white"
              }}
              transition={{ 
                duration: 0.5,
                repeat: animationPhase === 'vs' ? Infinity : 0
              }}
            >
              VS
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* RAYO ELÉCTRICO entre personajes */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'vs' ? 1 : 0 }}
        transition={{ delay: 2.5 }}
      >
        <svg width="600" height="200" viewBox="0 0 600 200" className="opacity-90">
          {/* Rayo principal */}
          <motion.path
            d="M50 100 Q150 50 250 100 Q350 150 450 100 Q550 75 600 100"
            stroke="url(#lightningGradient)"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: animationPhase === 'vs' ? [0, 1, 0.8, 1] : 0 
            }}
            transition={{ 
              pathLength: { duration: 1.5, delay: 2.5 },
              opacity: { 
                duration: 0.3, 
                repeat: animationPhase === 'vs' ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
          />
          
          {/* Rayo secundario más pequeño */}
          <motion.path
            d="M60 110 Q160 60 260 110 Q360 160 460 110 Q560 85 610 110"
            stroke="url(#lightningSecondary)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: animationPhase === 'vs' ? [0, 0.6, 0.4, 0.6] : 0 
            }}
            transition={{ 
              pathLength: { duration: 1.8, delay: 2.7 },
              opacity: { 
                duration: 0.2, 
                repeat: animationPhase === 'vs' ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
          />
          
          {/* Partículas eléctricas */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="url(#particleGradient)"
              initial={{ 
                cx: 50 + (i * 70), 
                cy: 90 + (i % 2) * 20,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: animationPhase === 'vs' ? [0, 1, 0] : 0,
                scale: animationPhase === 'vs' ? [0, 1.5, 0] : 0,
                cy: animationPhase === 'vs' ? [90 + (i % 2) * 20, 100 + (i % 2) * 10, 90 + (i % 2) * 20] : 90 + (i % 2) * 20
              }}
              transition={{ 
                duration: 0.5,
                delay: 3 + (i * 0.1),
                repeat: animationPhase === 'vs' ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="75%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            
            <linearGradient id="lightningSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            
            <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
            
            {/* Efecto de filtro para el rayo */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Título principal */}
      <motion.h1
        className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white font-black text-4xl md:text-6xl text-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: animationPhase === 'entering' ? 1 : animationPhase === 'exiting' ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        ENFRENTAMIENTO FINAL
      </motion.h1>

      {/* Mensaje de preparación */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: animationPhase === 'names' ? 1 : 0,
          y: animationPhase === 'names' ? 0 : 50
        }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white text-xl font-bold mb-2">¡Prepárense para la batalla vial!</p>
        <motion.div
          className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  )
}
