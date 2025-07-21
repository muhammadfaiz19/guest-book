// app/components/landing/Header.tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TreePine } from "lucide-react"

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
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TreePine className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-green-800 font-serif">Buku Tamu Digital</h1>
              <p className="text-xs sm:text-sm text-green-600">Desa Gunungwangi</p>
            </div>
          </div>
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