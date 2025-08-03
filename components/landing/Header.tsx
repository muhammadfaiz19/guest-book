"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <motion.header
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO + TITLE */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/logo.png"
                alt="Logo Desa Gunungwangi"
                fill
                sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 52px"
                className="object-contain rounded-md shadow-sm"
                priority
              />
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-green-800 font-serif group-hover:underline">
                Buku Tamu Digital
              </h1>
              <p className="text-xs sm:text-sm text-green-600">Desa Gunungwangi</p>
            </div>
          </Link>

          {/* LOGIN BUTTON */}
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent text-xs sm:text-sm px-3 sm:px-4 rounded-full"
              >
                Admin Login
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
