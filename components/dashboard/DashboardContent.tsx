"use client"

import { motion } from "framer-motion"
import { Users, Calendar, TrendingUp, MapPin, Mountain, Activity, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Guest } from "../../app/admin/dashboard/page"

interface DashboardContentProps {
  guestData: Guest[]
  userName: string
}

export default function DashboardContent({ guestData, userName }: DashboardContentProps) {
  const today = new Date().toISOString().split("T")[0]
  const todayGuests = guestData.filter((guest) => guest.visit_date === today)
  
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const monthlyGuests = guestData.filter((guest) => {
    const guestDate = new Date(guest.visit_date)
    return guestDate.getMonth() === thisMonth && guestDate.getFullYear() === thisYear
  })

  const stats = [
    {
      title: "Kunjungan Hari Ini",
      value: todayGuests.length,
      description: "Pengunjung aktif hari ini",
      icon: Users,
      gradient: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      textColor: "text-emerald-700",
      iconBg: "bg-gradient-to-r from-emerald-500 to-green-600",
    },
    {
      title: "Total Bulan Ini",
      value: monthlyGuests.length,
      description: "Akumulasi pengunjung bulan ini",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      textColor: "text-green-700",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "Total Keseluruhan",
      value: guestData.length,
      description: "Semua data pengunjung tercatat",
      icon: TrendingUp,
      gradient: "from-teal-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-emerald-100",
      textColor: "text-teal-700",
      iconBg: "bg-gradient-to-r from-teal-500 to-emerald-600",
    },
  ]

  const recentGuests = guestData.slice(0, 6)

  return (
    <motion.div
      key="dashboard"
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
        {/* Animated Background Elements */}
        <div className="absolute -top-8 -right-8 opacity-10">
          <Mountain className="h-40 w-40 animate-pulse" />
        </div>
        <div className="absolute -bottom-6 -left-6 opacity-10">
          <Activity className="h-32 w-32 animate-bounce" />
        </div>
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-8 w-8 animate-spin" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold tracking-tight">
              Selamat Datang, {userName}!
            </h1>
            <p className="mb-6 text-xl text-emerald-100 leading-relaxed">
              Dashboard Buku Tamu Digital Desa Gunungwangi
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-emerald-200">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Kecamatan Argapura, Kabupaten Majalengka
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString("id-ID", { 
                    weekday: "long", 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardHeader className={`p-6 ${stat.bgColor} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <stat.icon className="w-full h-full" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-white/90 text-slate-700 border-0 shadow-sm font-medium"
                  >
                    Live
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 bg-white">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-slate-900 tracking-tight">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {stat.title}
                  </div>
                  <div className="text-sm text-slate-500 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Guests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-emerald-50 p-6">
            <CardTitle className="flex items-center space-x-3 text-slate-800">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pengunjung Terkini</span>
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              {recentGuests.length} pengunjung terakhir yang tercatat dalam sistem
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            {recentGuests.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {recentGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-emerald-50/50 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="space-y-3 flex-1">
                        <div className="font-semibold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                          {guest.full_name}
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm">{guest.address}</span>
                        </div>
                        <div className="inline-block">
                          <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 hover:from-emerald-200 hover:to-green-200 transition-all duration-300 px-3 py-1">
                            {guest.purpose.length > 40 ? guest.purpose.substring(0, 40) + "..." : guest.purpose}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-right sm:text-right">
                        <div className="font-semibold text-slate-700 flex items-center justify-end space-x-2">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>{new Date(guest.visit_date).toLocaleDateString("id-ID")}</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(guest.created_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-emerald-100 rounded-3xl flex items-center justify-center">
                  <Users className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Data Pengunjung</h3>
                <p className="text-slate-500">Data pengunjung akan muncul di sini setelah ada yang mendaftar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}