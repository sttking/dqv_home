'use client'

import React from 'react'
import { motion } from 'framer-motion'
interface InfoTabProps {
  title: string
  subTitle: string
}

export default function InfoTab({ title, subTitle }: InfoTabProps) {
  return (
    <motion.div
      className="overflow-hidden text-center rounded-lg shadow-md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold text-nowrap bg-[#647AE1] text-white py-2">{title}</h2>
      <p className="text-sm font-medium text-center bg-[#F4F4F4] p-4">{subTitle}</p>
    </motion.div>
  )
}
