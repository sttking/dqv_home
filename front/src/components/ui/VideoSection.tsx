'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface YouTubeVideoProps {
  videoId: string
}

export default function VideoSection({ videoId = 'amNjXnp-6-s' }: YouTubeVideoProps) {
  return (
    <motion.div className="w-full mt-8">
      <motion.div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    </motion.div>
  )
}
