// app/components/landing/VillageInfo.tsx
"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { TreePine } from "lucide-react"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations"
import { villageStats } from "@/lib/data"

export function VillageInfo() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4 sm:mb-6 font-serif"
              variants={fadeInUp}
            >
              Tentang Desa Gunungwangi
            </motion.h2>
            <motion.p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg" variants={fadeInUp}>
              Desa Gunungwangi terletak di Kecamatan Argapura, Kabupaten Majalengka, Jawa Barat. Desa yang dikelilingi oleh pemandangan alam yang indah ini menggabungkan kearifan lokal dengan teknologi modern.
            </motion.p>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              variants={staggerContainer}
            >
              {villageStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-3 sm:p-4 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl border border-${stat.color}-200 ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-xl sm:text-2xl font-bold text-${stat.color}-800`}>{stat.number}</div>
                  <div className={`text-xs sm:text-sm text-${stat.color}-600`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="order-1 lg:order-2 relative" variants={fadeInUp}>
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/placeholder.svg?height=500&width=700&text=Kantor+Desa+Gunungwangi"
                alt="Kantor Desa Gunungwangi"
                width={700}
                height={500}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full flex items-center justify-center shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}   