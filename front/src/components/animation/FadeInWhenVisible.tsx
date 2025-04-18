import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInWhenVisibleProps {
  children: ReactNode
  delay?: number
  duration?: number
}

export default function FadeInWhenVisible({ children, delay = 0, duration = 0.5 }: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
