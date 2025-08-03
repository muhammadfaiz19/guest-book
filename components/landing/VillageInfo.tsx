"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations"
import { villageStats } from "@/lib/data"
import { Mountain, TreePine } from "lucide-react"

export function VillageInfo() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Mountain className="w-40 h-40 text-green-600" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-10 opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <TreePine className="w-32 h-32 text-amber-600" />
        </motion.div>
      </div>

      <div className="container mx-auto relative z-10">
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
            
            <motion.p
              className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg"
              variants={fadeInUp}
            >
              Desa Gunungwangi terletak di Kecamatan Argapura, Kabupaten Majalengka, Jawa Barat.
              Desa ini berada di lereng Gunung Ciremai dengan ketinggian sekitar 850 mdpl.
              Suasana alamnya sangat sejuk dan asri, dengan potensi besar di bidang pertanian,
              pariwisata, dan pengembangan desa digital.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              variants={staggerContainer}
            >
              {villageStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`
                    text-center p-4 sm:p-5 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 
                    rounded-xl border border-${stat.color}-200 shadow-sm hover:shadow-lg
                    ${index === 2 ? "col-span-2 sm:col-span-1" : ""}
                    transition-all duration-300 group
                  `}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-2xl sm:text-3xl font-bold text-${stat.color}-800 mb-1`}>
                    {stat.number}
                  </div>
                  <div className={`text-xs sm:text-sm text-${stat.color}-600 font-medium`}>
                    {stat.label}
                  </div>
                  {/* Decorative element */}
                  <div className={`w-8 h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-full mx-auto mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional info */}
            {/* <motion.div
              className="mt-6 sm:mt-8 p-4 bg-gradient-to-r from-green-50 to-amber-50 rounded-xl border border-green-100"
              variants={fadeInUp}
            >
              <p className="text-sm text-gray-600 text-center italic">
                &quot;Desa yang berkembang dengan teknologi modern sambil mempertahankan nilai-nilai tradisional&quot;
              </p>
            </motion.div> */}
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 relative"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/desa-gunungwangi.webp"
                alt="Kantor Desa Gunungwangi"
                width={700}
                height={500}
                priority
                className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />
              
              {/* Image overlay text */}
              {/* <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Kantor Desa Gunungwangi</h3>
                <p className="text-sm opacity-90">Melayani dengan Hati, Membangun dengan Inovasi</p>
              </div> */}
            </motion.div>

            {/* Logo circle */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Image
                src="/logo.webp"
                alt="Logo Desa Gunungwangi"
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-contain p-2"
              />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-6 left-6 w-3 h-3 bg-amber-400 rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-12 right-12 w-2 h-2 bg-green-400 rounded-full opacity-60"
              animate={{
                y: [0, 8, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}