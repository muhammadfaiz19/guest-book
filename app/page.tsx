// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { FloatingElements } from "@/components/landing/FloatingElements"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { VillageInfo } from "@/components/landing/VillageInfo"
import { Features } from "@/components/landing/Features"
import { Footer } from "@/components/landing/Footer"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  // Efek untuk memastikan komponen hanya di-render di client-side
  // untuk menghindari hydration mismatch error dari framer-motion.
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Atau tampilkan skeleton/loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 overflow-hidden">
      <FloatingElements />
      <Header />
      <main>
        <Hero />
        <VillageInfo />
        <Features />
      </main>
      <Footer />
    </div>
  )
}