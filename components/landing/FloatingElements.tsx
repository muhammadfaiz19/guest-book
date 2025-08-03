"use client"
import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-green-200 rounded-full opacity-60"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-amber-200 rounded-full opacity-40"
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-300 rounded-full opacity-50"
        animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
    </div>
  )
}