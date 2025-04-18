'use client'
import { motion } from 'framer-motion'

type TeamMemberProps = {
  name: string
  title: string
  description: string[]
}

export default function TeamMember({ name, title, description }: TeamMemberProps) {
  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
        <svg
          className="w-12 h-12 text-indigo-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div>
        <motion.h3
          className="text-lg font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-gray-700 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.p>
        {description.map((line, index) => (
          <motion.p
            key={index}
            className="text-gray-600 text-sm mt-1"
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
