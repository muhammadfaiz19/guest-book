import { Shield, History, MapPin, Phone, Mail, Clock, FileText } from "lucide-react"
import { ComponentType } from "react"

export type FooterLink = {
  text: string
  href?: string
  icon?: ComponentType<{ className?: string }>
}

export const villageStats = [
  { number: "1,945", label: "Penduduk", color: "green" },
  { number: "3", label: "Hektar Sawah", color: "amber" },
  { number: "12", label: "RT/RW", color: "blue" },
]

export const features = [
  {
    icon: Shield,
    title: "Keamanan Data",
    description:
      "Data tamu tersimpan aman dengan enkripsi tingkat tinggi dan backup otomatis untuk perlindungan maksimal.",
    color: "green",
    delay: 0,
  },
  {
    icon: History,
    title: "Riwayat Kunjungan",
    description:
      "Akses mudah ke seluruh data dan riwayat kunjungan tamu yang tercatat secara digital dan terstruktur.",
    color: "amber",
    delay: 0.1,
  },
  {
    icon: FileText,
    title: "Laporan & Statistik",
    description:
      "Hasilkan laporan kunjungan periodik dan lihat statistik tamu untuk mendukung pengambilan keputusan desa.",
    color: "blue",
    delay: 0.2,
  },
]

export const footerData: { title: string; items: FooterLink[] }[] = [
  {
    title: "Kontak",
    items: [
      { icon: MapPin, text: "Desa Gunungwangi, Argapura, Majalengka" },
      { icon: Phone, text: "(0233) 123-4567" },
      { icon: Mail, text: "info@gunungwangi.desa.id" },
    ],
  },
  {
    title: "Jam Operasional",
    items: [
      { icon: Clock, text: "Senin - Jumat: 08:00 - 16:00" },
      { text: "Sabtu & Minggu : Tutup" },
    ],
  },
  {
    title: "Quick Links",
    items: [
      { text: "Isi Buku Tamu", href: "/guest-book" },
      { text: "Admin Login", href: "/login" },
    ],
  },
]