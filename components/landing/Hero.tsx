// app/components/landing/Hero.tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, ArrowRight, TreePine } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/animations"

export function Hero() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center relative z-10">
        <motion.div className="max-w-5xl mx-auto" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-800 hover:bg-green-100 px-4 py-2 text-sm sm:text-base rounded-full border-green-200">
              <MapPin className="w-4 h-4 mr-2" />
              Desa Gunungwangi, Argapura, Majalengka
            </Badge>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-900 mb-4 sm:mb-6 leading-tight font-serif"
            variants={fadeInUp}
          >
            Selamat Datang di
            <motion.span
              className="block text-transparent bg-gradient-to-r from-green-700 via-green-600 to-amber-600 bg-clip-text mt-2"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              Buku Tamu Digital
            </motion.span>
            <span className="block text-green-800 mt-2">Desa Gunungwangi</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            variants={fadeInUp}
          >
            Sistem pencatatan kunjungan modern untuk kantor desa yang berkembang. Mudah, aman, dan ramah lingkungan.
          </motion.p>
          
          <motion.div className="flex justify-center items-center" variants={fadeInUp}>
            <Link href="/guest-book">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Users className="w-5 h-5 mr-2" />
                  Isi Buku Tamu
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute top-10 right-10 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <TreePine className="w-32 h-32 text-green-600" />
      </motion.div>
    </section>
  )
}