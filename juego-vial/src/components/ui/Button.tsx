import { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { play } from '../../utils/sound'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', onClick, className = '', children, ...rest }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      onClick={(e) => { play('click'); onClick?.(e) }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}


