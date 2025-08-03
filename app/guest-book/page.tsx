"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, User, Phone, Calendar, FileText, Send, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { useRouter } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, startOfDay, isValid } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"

const guestFormSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi (minimal 2 karakter)"),
  address: z.string().min(5, "Alamat wajib diisi (minimal 5 karakter)"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]{10,15}$/.test(val), {
      message: "Format nomor HP tidak valid",
    }),
  visitDate: z.date().refine((val) => isValid(val), { message: "Tanggal kunjungan tidak valid" }),
  purpose: z.string().min(5, "Tujuan wajib diisi (minimal 5 karakter)"),
})

type GuestFormData = z.infer<typeof guestFormSchema>

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
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      visitDate: startOfDay(new Date()),
      purpose: "",
    },
  })

  const onSubmit = async (data: GuestFormData) => {
    setLoading(true)
    try {
      const formattedVisitDate = format(data.visitDate, "dd MMMM yyyy", { locale: id })
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName.trim(),
          address: data.address.trim(),
          phone: data.phone?.trim() || null,
          visitDate: format(data.visitDate, "yyyy-MM-dd"),
          purpose: data.purpose.trim(),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Gagal menyimpan data")

      const queryParams = new URLSearchParams({
        fullName: data.fullName.trim(),
        address: data.address.trim(),
        phone: data.phone?.trim() || "",
        visitDate: formattedVisitDate,
        purpose: data.purpose.trim(),
      }).toString()

      router.push(`/thank-you?${queryParams}`)
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden flex flex-col">
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
      <Header />
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
                <span className="block text-green-800 text-lg sm:text-xl mt-2">Desa Gunungwangi</span>
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
              <div className="border-green-200 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <div className="bg-gradient-to-r from-green-50 via-white to-amber-50 border-b border-green-100 rounded-t-lg p-4 sm:p-6">
                  <h2 className="text-green-900 flex items-center text-lg sm:text-xl font-serif">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    </motion.div>
                    Form Kunjungan
                  </h2>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
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
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p className="text-red-600 text-xs flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <AlertCircle className="w-3 h-3 mr-1" /> {errors.phone.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fadeInUp}>
                        <Label htmlFor="visitDate" className="flex items-center text-sm sm:text-base text-green-800 font-medium">
                          <Calendar className="w-4 h-4 mr-2" /> Tanggal Kunjungan *
                        </Label>
                        <Controller
                          control={control}
                          name="visitDate"
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal border-green-200 focus:border-green-500 focus:ring-green-500 h-11 sm:h-12 rounded-lg transition-all duration-200",
                                    !field.value && "text-muted-foreground",
                                    errors.visitDate && "border-red-500"
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    if (date && isValid(date)) {
                                      field.onChange(startOfDay(date))
                                    }
                                  }}
                                  initialFocus
                                  className="bg-white border-green-200 rounded-md"
                                  locale={id}
                                  defaultMonth={field.value || startOfDay(new Date())}
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                        <AnimatePresence>
                          {errors.visitDate && (
                            <motion.p className="text-red-600 text-xs flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <AlertCircle className="w-3 h-3 mr-1" /> {errors.visitDate.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <AnimatePresence mode="wait">
                          {loading ? (
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
                </div>
              </div>
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