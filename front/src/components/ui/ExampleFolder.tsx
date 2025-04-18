'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ExampleFolderProps {
  folder: string
  name: string
  desc: string
  type: string
  href: string
}

export default function ExampleFolder({ folder, name, desc, type, href }: ExampleFolderProps) {
  const lines = desc.split('\n')

  return (
    <motion.div
      className="w-full relative shadow-md bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }as any}
    >
      {/* <motion.div
        className="bg-[#5667B6] rounded-t-lg h-7 font-bold -z-10 absolute top-0 -translate-y-full left-4 py-1 pl-4 pr-3 text-white text-sm"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {folder}
        <div className="absolute -top-[0.35rem] left-14 right-0 -z-20 h-full">
          <div className="bg-[#5667B6] h-full w-16 rounded-l-full rotate-45 transform origin-top-left"></div>
        </div>
      </motion.div> */}
      <motion.div
        className="absolute -top-8 left-4 right-0 -z-20 h-full"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="124" height="60" viewBox="0 0 164 67" fill="none">
          <path
            d="M0.687866 12.9563C0.687866 6.32889 6.06045 0.956299 12.6879 0.956299H80.3993C89.7881 0.956299 97.3992 8.56746 97.3992 17.9563V46.8808C97.3992 48.5376 96.0561 49.8808 94.3992 49.8808H3.68786C2.03101 49.8808 0.687866 48.5376 0.687866 46.8808V12.9563Z"
            fill="#5667B6"
          />
          <path
            d="M81.2169 4.37318C84.021 2.33578 87.818 2.33578 90.622 4.37318L133.236 35.3365C139.505 39.8919 136.283 49.8085 128.533 49.8085H43.3057C35.5561 49.8085 32.3338 39.8919 38.6032 35.3365L81.2169 4.37318Z"
            fill="#5667B6"
          />
        </svg>
        <p className="text-white font-bold absolute top-2.5 text-sm left-4">{folder}</p>
      </motion.div>
      <motion.div
        className="bg-[#647AE1] rounded-t-lg py-2.5 text-white text-xl font-bold text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {name}
      </motion.div>

      <motion.div
        className="p-6 bg-[#F4F4F4] text-base rounded-b-lg text-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className="mb-2"
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </motion.div>

      {type === 'link' && (
        <motion.div
          className="p-4 bg-gray-100 flex justify-center"
          whileHover={{ backgroundColor: '#ebedf9' } as any}
          transition={{ duration: 0.2 }}
        >
          <motion.a
            href={href}
            className="bg-[#202F76] text-lg text-white py-2 px-4 rounded font-medium w-full text-center"
            whileHover={{
              scale: 1.03,
              backgroundColor: '#344297',
            }as any}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            제품 사이트 →
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  )
}
