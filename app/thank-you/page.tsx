"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Printer, TreePine, MapPin, Calendar, Heart, User, FileText, Phone } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { format, parse, isValid } from "date-fns"
import { id } from "date-fns/locale"

const confettiColors = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"]

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: `${Math.random() * 100}%`,
            top: `-10px`,
          }}
          initial={{ y: -10, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
            rotate: 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

const ThankYouContent = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const searchParams = useSearchParams()

  const parseVisitDate = (dateStr: string | null) => {
    if (!dateStr) return "Tanggal tidak diisi"
    try {
      const parsedDate = parse(dateStr, "dd MMMM yyyy", new Date(), { locale: id })
      return isValid(parsedDate) ? format(parsedDate, "dd MMMM yyyy", { locale: id }) : "Tanggal tidak valid"
    } catch {
      return "Tanggal tidak valid"
    }
  }

  const guestData = {
    fullName: searchParams.get("fullName") || "Tamu",
    address: searchParams.get("address") || "Tidak diisi",
    phone: searchParams.get("phone") || null,
    visitDate: parseVisitDate(searchParams.get("visitDate")),
    purpose: searchParams.get("purpose") || "Tidak diisi",
  }

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-green-200 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-amber-200 rounded-full opacity-40"
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-300 rounded-full opacity-50"
          animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <Header />

      <section className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="border-green-200 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-8 sm:p-12 lg:p-16">
                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-green-600" />
                </motion.div>

                <motion.h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4 sm:mb-6 font-serif"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Terima Kasih, {guestData.fullName}!
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  >
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Data kunjungan Anda telah berhasil tercatat dalam sistem buku tamu digital Kantor Desa Gunungwangi.
                </motion.p>

                <motion.div
                  className="bg-gradient-to-r from-green-50 via-white to-amber-50 border border-green-200 rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="space-y-3 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800 font-medium">Nama: {guestData.fullName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800 font-medium">Alamat: {guestData.address}</span>
                    </div>
                    {guestData.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 font-medium">No. HP: {guestData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800 font-medium">Tujuan: {guestData.purpose}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800 font-medium">Tanggal Kunjungan: {guestData.visitDate}</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-4 sm:space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <Link href="/" className="block">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white py-3 sm:py-4 text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <Home className="w-5 h-5 mr-2" />
                        Kembali ke Beranda
                      </Button>
                    </motion.div>
                  </Link>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50 py-3 sm:py-4 text-base sm:text-lg rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-5 h-5 mr-2" />
                      Cetak Bukti Kunjungan
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-50 via-white to-amber-50 border border-green-200 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p
                className="text-green-800 font-medium mb-2 text-sm sm:text-base flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                >
                  <TreePine className="w-5 h-5 mr-2 text-green-600" />
                </motion.span>
                Selamat menikmati kunjungan Anda di Desa Gunungwangi!
              </motion.p>
              <motion.p
                className="text-green-700 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                Jelajahi keindahan alam Argapura dan rasakan kehangatan masyarakat desa kami.
              </motion.p>
            </motion.div>

            <motion.p
              className="text-xs sm:text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              Jika ada pertanyaan, silakan hubungi petugas kantor desa atau admin sistem.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">Memuat...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}