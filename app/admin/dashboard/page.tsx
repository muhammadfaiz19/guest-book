"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import DashboardContent from "@/components/dashboard/DashboardContent"
import GuestTable from "@/components/dashboard/GuestTable"
import StatisticsContent from "@/components/dashboard/StatisticsContent"
import SettingsContent from "@/components/dashboard/SettingsContent"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export interface Guest {
  id: string
  created_at: string
  full_name: string
  address: string
  phone: string | null
  purpose: string
  visit_date: string
}

const menuItems = [
  { id: "dashboard", title: "Beranda" },
  { id: "guests", title: "Data Pengunjung" },
  { id: "statistics", title: "Analitik" },
  { id: "settings", title: "Konfigurasi" },
]

export default function AdminDashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [guestData, setGuestData] = useState<Guest[]>([])
  const [userName, setUserName] = useState<string>("Administrator")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard"
    setActiveTab(tab)
  }, [searchParams])

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("guests")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Failed to fetch guests:", error)
          setGuestData([])
        } else {
          setGuestData(data as Guest[])
        }
      } catch (error) {
        console.error("Database connection error:", error)
        setGuestData([])
      }
      setLoading(false)
    }

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Failed to fetch user:", error)
      } else {
        const name = data.user?.user_metadata?.name || "Administrator"
        setUserName(name)
      }
    }

    fetchGuests()
    fetchUser()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "guests":
        return <GuestTable guestData={guestData} setGuestData={setGuestData} loading={loading} />
      case "statistics":
        return <StatisticsContent guestData={guestData} />
      case "settings":
        return <SettingsContent />
      case "dashboard":
      default:
        return <DashboardContent guestData={guestData} userName={userName} />
    }
  }

  return (
    <SidebarInset>
      <motion.header
        className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-200/60 px-6 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SidebarTrigger className="-ml-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors p-2" />
        <div className="flex items-center space-x-2 ml-2">
          {/* LOGO */}
          <div className="relative w-12 h-12">
            <Image
              src="/logo.webp"
              alt="Logo Desa Gunungwangi"
              fill
              sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 52px"
              className="object-contain rounded-md shadow-sm"
              priority
            />
          </div>
          {/* TITLE */}
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {menuItems.find((item) => item.id === activeTab)?.title || "Beranda"}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Desa Gunungwangi</p>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </SidebarInset>
  )
}
