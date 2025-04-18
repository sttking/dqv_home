'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useYheight } from '@/hooks/useYheight'
import { motion } from 'framer-motion'

export default function TopNav() {
  const yHeight = useYheight()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        backgroundColor: yHeight > 0 ? '#647AE1' : 'transparent',
        color: yHeight > 0 ? 'white' : 'black',
      }as React.CSSProperties}
      className="h-16 fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 border-gray-200"
    >
      <nav className="flex max-w-6xl mx-auto items-center justify-between h-full px-4">
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Image
            style={{
              filter: yHeight > 0 ? 'invert(0)' : 'invert(1)',
            }}
            src="/dqv_logo.png"
            alt="다큐브 QV-1"
            width={100}
            height={100}
          />
        </motion.div>
        <div className="flex items-center gap-4 text-lg font-bold">
          {[
              { href: '/CustomerPage', label: '고객사례' },
              { href: '/NewsPage', label: '소식' },
              { href: 'https://blog.naver.com/askavatar', label: '블로그', external: true },
            ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.href}>
              {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}
