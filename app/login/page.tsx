"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, TreePine, LogIn, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/lib/supabase/client'

// Skema validasi menggunakan Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

// Tipe data untuk form berdasarkan skema Zod
type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [authError, setAuthError] = useState<string | null>(null);

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validasi live saat input berubah
  });

  // Fungsi yang dijalankan saat form disubmit
  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null); // Reset error setiap kali submit

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setAuthError("Email atau password yang Anda masukkan salah.");
    } else {
      // Jika berhasil, Supabase akan menangani sesi
      // dan middleware akan mengarahkan ke dashboard
      router.push('/admin/dashboard');
      router.refresh(); // Penting untuk memuat ulang state otentikasi
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-green-600 hover:text-green-700 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Kembali ke Beranda</span>
          </Link>
        </div>

        <Card className="border-green-200 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-green-900">Admin Login</CardTitle>
            <p className="text-gray-600 text-sm mt-2">Masuk ke dashboard admin Desa Gunungwangi</p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-green-800 flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="admin@gunungwangi.desa.id"
                  className={`h-11 text-sm border-green-200 focus:border-green-500 focus:ring-green-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs flex items-center pt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-green-800 flex items-center text-sm">
                  <Lock className="w-4 h-4 mr-2" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className={`h-11 text-sm border-green-200 focus:border-green-500 focus:ring-green-500 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                 {errors.password && (
                  <p className="text-red-600 text-xs flex items-center pt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && (
                <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                  {authError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Masuk...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Masuk
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
