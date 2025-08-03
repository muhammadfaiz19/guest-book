"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { guestBookSchema, GuestBookFormData } from "@/lib/validators/guestbook-validator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, MapPin, Phone, Calendar, FileText, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function GuestBookPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestBookFormData>({
    resolver: zodResolver(guestBookSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      purpose: "",
      visitDate: new Date().toISOString().split("T")[0],
    },
  })

  const onSubmit = async (data: GuestBookFormData) => {
    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Gagal mengirim data. Silakan coba lagi.")
      router.push("/thank-you")
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden flex flex-col">
      <Header />

      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-4 h-4 bg-green-200 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-6 h-6 bg-amber-200 rounded-full opacity-40"
          animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <main className="flex-grow">
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-6 sm:mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-3 sm:mb-4 font-serif"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Buku Tamu Digital
              </motion.h1>
              <motion.p
                className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Silakan isi formulir di bawah ini untuk mencatat kunjungan Anda ke Kantor Desa Gunungwangi.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-green-200 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 via-white to-amber-50 border-b border-green-100 rounded-t-lg">
                  <CardTitle className="text-green-900 flex items-center text-lg sm:text-xl font-serif">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    </motion.div>
                    Form Kunjungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 sm:space-y-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <Label htmlFor="fullName" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                          <User className="w-4 h-4 mr-2" /> Nama Lengkap *
                        </Label>
                        <Input
                          id="fullName"
                          {...register("fullName")}
                          placeholder="Masukkan nama lengkap Anda"
                          className={`h-11 sm:h-12 ${errors.fullName ? "border-red-500" : "border-green-200"}`}
                        />
                        <AnimatePresence>
                          {errors.fullName && (
                            <motion.p className="text-red-600 text-xs flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <AlertCircle className="w-3 h-3 mr-1" /> {errors.fullName.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <Label htmlFor="address" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                          <MapPin className="w-4 h-4 mr-2" /> Alamat / Kota Asal *
                        </Label>
                        <Input
                          id="address"
                          {...register("address")}
                          placeholder="Masukkan alamat atau kota asal"
                          className={`h-11 sm:h-12 ${errors.address ? "border-red-500" : "border-green-200"}`}
                        />
                        <AnimatePresence>
                          {errors.address && (
                            <motion.p className="text-red-600 text-xs flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <AlertCircle className="w-3 h-3 mr-1" /> {errors.address.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <Label htmlFor="phone" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                          <Phone className="w-4 h-4 mr-2" /> No. HP (Opsional)
                        </Label>
                        <Input id="phone" type="tel" {...register("phone")} placeholder="081234567890" className="h-11 sm:h-12 border-green-200" />
                      </motion.div>

                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <Label htmlFor="visitDate" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                          <Calendar className="w-4 h-4 mr-2" /> Tanggal Kunjungan *
                        </Label>
                        <Input id="visitDate" type="date" {...register("visitDate")} className={`h-11 sm:h-12 ${errors.visitDate ? "border-red-500" : "border-green-200"}`} />
                      </motion.div>
                    </div>

                    <motion.div className="space-y-2" variants={fadeInUp}>
                      <Label htmlFor="purpose" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                        <FileText className="w-4 h-4 mr-2" /> Tujuan Kunjungan *
                      </Label>
                      <Textarea
                        id="purpose"
                        {...register("purpose")}
                        placeholder="Jelaskan tujuan kunjungan Anda..."
                        rows={4}
                        className={`resize-none ${errors.purpose ? "border-red-500" : "border-green-200"}`}
                      />
                      <AnimatePresence>
                        {errors.purpose && (
                          <motion.p className="text-red-600 text-xs flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.purpose.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div key="loading" className="flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                              <span>Mengirim Data...</span>
                            </motion.div>
                          ) : (
                            <motion.div key="submit" className="flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Send className="w-5 h-5 mr-2" />
                              <span>Kirim Data</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
              <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 text-sm sm:text-base font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
