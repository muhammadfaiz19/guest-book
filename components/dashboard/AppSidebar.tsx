"use client"

import {
  Calendar,
  Home,
  Users,
  BarChart3,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import Link from "next/link"

const menuItems = [
  {
    title: "Beranda",
    url: "/admin/dashboard?tab=dashboard",
    icon: Home,
    tab: "dashboard",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Data Pengunjung",
    url: "/admin/dashboard?tab=guests",
    icon: Users,
    tab: "guests",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Analitik",
    url: "/admin/dashboard?tab=statistics",
    icon: BarChart3,
    tab: "statistics",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    title: "Konfigurasi",
    url: "/admin/dashboard?tab=settings",
    icon: Settings,
    tab: "settings",
    gradient: "from-amber-500 to-orange-600",
  },
]

export default function AppSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "dashboard"
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Sign out error:", error)
      router.push("/login")
    }
  }

  return (
    <Sidebar className="w-64 overflow-x-hidden border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <SidebarHeader className="border-b border-slate-200/60 bg-gradient-to-br from-emerald-50 via-white to-green-50/50">
        <motion.div
          className="flex items-center gap-4 p-4 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/admin/dashboard?tab=dashboard" className="flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/logo.png"
                alt="Logo Desa Gunungwangi"
                fill
                sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 52px"
                className="object-contain rounded-md shadow-sm"
                priority
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-md font-bold text-slate-800 tracking-tight whitespace-nowrap">
                Desa Gunungwangi
              </h2>
              <div className="flex items-center space-x-2 text-xs text-slate-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>Kec. Argapura</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold px-6 py-4 text-sm tracking-wide">
            MENU UTAMA
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={activeTab === item.tab}
                      className={`
                        relative group transition-all duration-300 rounded-xl mx-2 py-3 px-4
                        hover:bg-gradient-to-r hover:from-slate-100 hover:to-emerald-100/50 hover:shadow-md
                        data-[active=true]:bg-gradient-to-r data-[active=true]:from-emerald-500 data-[active=true]:to-green-600
                        data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:scale-105
                        hover:scale-102 transform
                      `}
                    >
                      <a href={item.url} className="flex items-center space-x-4 w-full">
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            activeTab === item.tab
                              ? "bg-white/20 shadow-inner"
                              : "bg-gradient-to-br " + item.gradient + " group-hover:shadow-md"
                          }`}
                        >
                          <item.icon
                            className="w-5 h-5 text-white transition-all duration-300"
                          />
                        </div>
                        <span className="font-medium text-sm tracking-wide whitespace-nowrap">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-slate-200/60 mx-6" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold px-6 py-4 text-sm tracking-wide">
            INFORMASI
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-6 py-3">
              <div className="bg-gradient-to-br from-emerald-100 via-white to-green-100 rounded-2xl p-5 border border-emerald-200/50 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Hari Ini</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-4"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-all duration-300 rounded-xl py-3"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span className="font-medium">Keluar Sistem</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  )
}
