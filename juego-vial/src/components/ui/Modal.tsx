import { motion, AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay épico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/50 to-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            {/* Modal transparente - el contenido controla el estilo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-400 hover:scrollbar-thumb-purple-300 scrollbar-thumb-rounded-full ${className}`}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
