// app/components/landing/Footer.tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { TreePine } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import { footerData } from "@/lib/data"

export function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-green-800 via-green-900 to-green-800 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Footer About Section */}
          <motion.div className="sm:col-span-2 lg:col-span-1" variants={fadeInUp}>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <TreePine className="w-7 h-7 text-green-800" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">Buku Tamu Digital</h3>
                <p className="text-green-200 text-sm sm:text-base">Desa Gunungwangi</p>
              </div>
            </div>
            <p className="text-green-200 leading-relaxed text-sm sm:text-base">
              Sistem modern untuk Kantor Desa Gunungwangi, Argapura, Majalengka.
            </p>
          </motion.div>

          {/* Footer Links Sections */}
          {footerData.map((section, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 font-serif">{section.title}</h4>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block text-green-200 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm sm:text-base"
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <div className="text-green-200 text-sm sm:text-base flex items-start">
                        {item.icon && <item.icon className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />}
                        <span className={!item.icon ? "ml-7" : ""}>{item.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-green-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-green-200 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Buku Tamu Digital Desa Gunungwangi. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}