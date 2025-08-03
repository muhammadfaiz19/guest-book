"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Lock, Settings, Shield, Mountain, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  newPassword: z.string().min(6, "Password minimal 6 karakter").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

type UserFormData = z.infer<typeof userSchema>

export default function SettingsContent() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "Admin Desa Gunungwangi",
      email: "admin@gunungwangi.desa.id",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.warn("Error fetching user or no session:", error.message)
        return
      }
      if (user) {
        setValue("name", user.user_metadata?.name || "Admin Desa Gunungwangi")
        setValue("email", user.email || "admin@gunungwangi.desa.id")
      }
    }
    getUserData()
  }, [setValue])

  const onSubmit = async (data: UserFormData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Gagal memperbarui data admin")
      toast.success(result.message || "Data admin berhasil diperbarui")
      reset({
        name: data.name,
        email: data.email,
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error("Gagal memperbarui data admin")
      console.error("Update error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 p-8 lg:p-12 text-white shadow-2xl"
      >
        <div className="absolute -top-8 -right-8 opacity-10">
          <Settings className="h-40 w-40 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute -bottom-6 -left-6 opacity-10">
          <Shield className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute top-6 right-6 opacity-20">
          <Sparkles className="h-8 w-8 animate-bounce" />
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold tracking-tight">
              Konfigurasi Sistem
            </h1>
            <p className="mb-6 text-xl text-emerald-100 leading-relaxed">
              Kelola pengaturan keamanan dan konfigurasi akun administrator
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-emerald-200">
              <div className="flex items-center space-x-3">
                <Mountain className="h-5 w-5" />
                <span className="text-sm font-medium">Desa Gunungwangi</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Administrator Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="border-b border-slate-200/60 bg-gradient-to-br from-emerald-50 via-white to-green-50/50 p-8">
            <CardTitle className="flex items-center space-x-4 text-slate-800">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">Pengaturan Akun</span>
                <CardDescription className="text-slate-600 text-base font-normal mt-1">
                  Kelola informasi akun dan pengaturan keamanan administrator
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span>Informasi Dasar</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Nama Administrator
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl py-3 px-4 bg-slate-50/50 transition-all duration-300"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email Administrator
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl py-3 px-4 bg-slate-50/50 transition-all duration-300"
                      placeholder="Masukkan email"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>
              </div>
              
              <Separator className="bg-slate-200" />
              
              {/* Security Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <span>Keamanan Password</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
                      Password Baru
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      {...register("newPassword")}
                      className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl py-3 px-4 bg-slate-50/50 transition-all duration-300"
                      placeholder="Masukkan password baru"
                    />
                    {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                      Konfirmasi Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl py-3 px-4 bg-slate-50/50 transition-all duration-300"
                      placeholder="Ulangi password baru"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Menyimpan Perubahan..." : "Simpan Pengaturan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}