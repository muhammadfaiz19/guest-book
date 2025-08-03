"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock, LogIn, Home, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
})

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      if (error) {
        form.setError("root", {
          message: "Email atau password salah. Silakan periksa kembali.",
        })
      } else {
        toast.success("Login berhasil! Mengarahkan ke dashboard...")
        router.push("/admin/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error(error)
      form.setError("root", {
        message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
      })
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-center"
      >
        <Image
          src="/logo.webp"
          alt="Logo Desa Gunungwangi"
          width={120}
          height={120}
          className="rounded-full w-auto h-auto mx-auto shadow-lg"
          priority
        />
      </motion.div>
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-center space-y-3"
      >
        <h1 className="text-3xl font-bold text-emerald-800">
          Admin Portal
        </h1>
        <div className="space-y-1">
          <p className="text-xl font-semibold text-emerald-700">Buku Tamu Digital</p>
          <p className="text-sm font-medium text-slate-600">Desa Gunungwangi</p>
          <p className="text-xs text-slate-500">Kecamatan Argapura, Kabupaten Majalengka</p>
        </div>
      </motion.div>

      {/* Login Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Message */}
        {form.formState.errors.root && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <p className="text-red-700 text-sm text-center font-medium">
              {form.formState.errors.root.message}
            </p>
          </motion.div>
        )}

        {/* Email field */}
        <motion.div
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email Administrator
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="admin@gunungwangi.desa.id"
              className={`pl-10 h-12 bg-white/90 border-slate-200 shadow-sm focus:bg-white transition-all ${
                form.formState.errors.email 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                  : "focus:border-emerald-500 focus:ring-emerald-500/20"
              }`}
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-xs flex items-center bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3 h-3 mr-2" />
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* Password field */}
        <motion.div
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...form.register("password")}
              placeholder="••••••••••••"
              className={`pl-10 pr-10 h-12 bg-white/90 border-slate-200 shadow-sm focus:bg-white transition-all ${
                form.formState.errors.password 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                  : "focus:border-emerald-500 focus:ring-emerald-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-600 text-xs flex items-center bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-3 h-3 mr-2" />
              {form.formState.errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Submit button */}
        <motion.div
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {form.formState.isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-3" />
                Masuk ke Dashboard
              </>
            )}
          </Button>
        </motion.div>

        {/* Back to home button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-white/80 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm transition-all duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </motion.div>
      </form>
    </div>
  )
}