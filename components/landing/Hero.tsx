"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, ArrowRight, TreePine } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/animations"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <TreePine className="w-32 h-32 text-green-600" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-10 opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <TreePine className="w-24 h-24 text-amber-600" />
        </motion.div>

        {/* Floating circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-6 h-6 bg-amber-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto" 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-800 hover:bg-green-100 px-4 py-2 text-sm sm:text-base rounded-full border-green-200 shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Desa Gunungwangi, Argapura, Majalengka
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-900 mb-6 sm:mb-8 leading-tight font-serif"
            variants={fadeInUp}
          >
            Selamat Datang di
            <motion.span
              className="block text-transparent bg-gradient-to-r from-green-700 via-green-600 to-amber-600 bg-clip-text mt-2"
              style={{
                backgroundSize: "200% 100%",
              }}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Number.POSITIVE_INFINITY, 
                ease: "linear" 
              }}
            >
              Buku Tamu Digital
            </motion.span>
            <span className="block text-green-800 mt-2">Desa Gunungwangi</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            variants={fadeInUp}
          >
            Sistem pencatatan kunjungan modern untuk kantor desa yang berkembang. 
            <span className="block mt-2 text-base sm:text-lg text-gray-500">
              Mudah, aman, dan ramah lingkungan.
            </span>
          </motion.p>
          
          <motion.div className="flex justify-center items-center" variants={fadeInUp}>
            <Link href="/guest-book">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.95 }} 
                className="group"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white px-10 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-0"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <Users className="w-6 h-6 mr-3" />
                  Isi Buku Tamu
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut" 
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Additional info */}
          <motion.div
            className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-500"
            variants={fadeInUp}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Aman & Terpercaya
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              Mudah Digunakan
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Ramah Lingkungan
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}