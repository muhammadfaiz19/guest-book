"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import { HelpCircle, Sparkles } from "lucide-react"

const faqs = [
  {
    question: "Apa itu Buku Tamu Digital?",
    answer: "Buku Tamu Digital adalah sistem pencatatan kunjungan berbasis teknologi yang memungkinkan pengelolaan data tamu secara efisien, aman, dan ramah lingkungan di Kantor Desa Gunungwangi."
  },
  {
    question: "Bagaimana cara mengakses sistem ini?",
    answer: "Anda dapat mengaksesnya melalui website resmi Desa Gunungwangi atau langsung mengisi formulir di halaman buku tamu. Untuk admin, login tersedia di halaman khusus admin."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Ya, kami menggunakan enkripsi tingkat tinggi dan sistem keamanan berlapis untuk memastikan data pribadi Anda aman dan terlindungi sesuai dengan standar keamanan data."
  },
  {
    question: "Siapa yang bisa menggunakan Buku Tamu Digital?",
    answer: "Semua pengunjung yang datang ke Kantor Desa Gunungwangi dapat menggunakan sistem ini untuk mendaftar, dan petugas desa dapat mengelola data melalui dashboard admin."
  },
  {
    question: "Apakah sistem ini gratis?",
    answer: "Ya, sistem Buku Tamu Digital ini sepenuhnya gratis untuk digunakan oleh semua pengunjung. Ini merupakan layanan publik dari Pemerintah Desa Gunungwangi."
  },
  {
    question: "Bagaimana jika saya mengalami kesulitan?",
    answer: "Jika mengalami kesulitan, Anda dapat menghubungi petugas di kantor desa atau menggunakan fitur bantuan yang tersedia di website. Tim kami siap membantu Anda."
  }
]

export function FAQSection() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-amber-50 to-green-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16" 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-3 sm:mb-4 font-serif">
            Pertanyaan Umum
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
            </motion.span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang sistem buku tamu digital kami
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={{
                  initial: { opacity: 0, y: 30, scale: 0.95 },
                  animate: {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.1, 
                      ease: "easeOut" 
                    },
                  },
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 group"
                >
                  <AccordionTrigger className="text-left px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-green-900 hover:no-underline group-hover:text-green-700 transition-colors duration-200">
                    <div className="flex items-center pr-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-amber-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <div className="pl-5 sm:pl-7 border-l-2 border-green-100">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-amber-100 rounded-full text-sm sm:text-base text-green-800 border border-green-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
            Masih ada pertanyaan lain? Hubungi petugas desa kami
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}