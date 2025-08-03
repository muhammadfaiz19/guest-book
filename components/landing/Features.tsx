"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import { features } from "@/lib/data"

export function Features() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-amber-50 to-green-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.div className="text-center mb-8 sm:mb-12 lg:mb-16" variants={fadeInUp}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-3 sm:mb-4 font-serif">
            Fitur Unggulan
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
            </motion.span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            Sistem buku tamu digital yang dirancang khusus untuk kebutuhan kantor desa modern
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 60, scale: 0.8 },
                animate: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 0.6, delay: feature.delay, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className={`${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <Card className={`border-${feature.color}-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:bg-white/90 group`}>
                <CardContent className="p-6 sm:p-8 text-center">
                  <motion.div
                    className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 text-${feature.color}-600`} />
                  </motion.div>
                  <h3 className={`text-lg sm:text-xl font-semibold text-${feature.color}-900 mb-3 sm:mb-4 font-serif`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}