"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Users, ChevronLeft, ChevronRight, Search, Database, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import GuestList from "./GuestList"
import GuestDetailDialog from "./GuestDetailDialog"
import GuestEditDialog from "./GuestEditDialog"
import FilterPopover from "./FilterPopover"
import ExportPopover from "./ExportPopover"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"
import type { Guest } from "../../app/admin/dashboard/page"

interface GuestTableProps {
  guestData: Guest[]
  setGuestData: (guests: Guest[]) => void
  loading: boolean
}

export default function GuestTable({ guestData, setGuestData, loading }: GuestTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ day: "all", month: "all", year: "all" })
  const [appliedFilters, setAppliedFilters] = useState({ day: "all", month: "all", year: "all" })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const itemsPerPage = 10

  const uniqueYears = useMemo(
    () => Array.from(new Set(guestData.map((guest) => new Date(guest.visit_date).getFullYear()))).sort((a, b) => b - a),
    [guestData],
  )

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
      }, 1000),
    [],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchTerm(e.target.value)
    },
    [debouncedSetSearchTerm],
  )

  const filteredGuests = useMemo(() => {
    return guestData.filter((guest) => {
      const matchesSearch =
        guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.purpose.toLowerCase().includes(searchTerm.toLowerCase())

      const visitDate = new Date(guest.visit_date)
      const matchesDay = appliedFilters.day === "all" || visitDate.getDate().toString() === appliedFilters.day
      const matchesMonth = appliedFilters.month === "all" || (visitDate.getMonth() + 1).toString() === appliedFilters.month
      const matchesYear = appliedFilters.year === "all" || visitDate.getFullYear().toString() === appliedFilters.year

      return matchesSearch && matchesDay && matchesMonth && matchesYear
    })
  }, [guestData, searchTerm, appliedFilters])

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredGuests.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
  }, [])

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters)
    setIsFilterOpen(false)
    setCurrentPage(1)
  }, [filters])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="h-12 bg-gradient-to-r from-slate-200 to-emerald-200 rounded-2xl animate-pulse" />
        <div className="h-96 bg-gradient-to-br from-slate-100 to-emerald-100 rounded-3xl animate-pulse" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="bg-gradient-to-br from-emerald-50 via-white to-green-50 border-b border-slate-200/60 p-8">
          <CardTitle className="text-slate-800 flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg">
              <Database className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight">Data Pengunjung</span>
              <p className="text-slate-600 text-base font-normal mt-1">
                Kelola dan pantau data pengunjung Desa Gunungwangi
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Cari berdasarkan nama, alamat, atau tujuan kunjungan..."
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-3 border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 rounded-xl bg-slate-50/50 text-base"
              />
            </div>
            <div className="flex gap-3">
              <FilterPopover
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                filters={filters}
                setFilters={setFilters}
                uniqueYears={uniqueYears}
                onApply={handleApplyFilters}
              />
              <ExportPopover
                filteredGuests={filteredGuests}
                filters={appliedFilters}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border border-emerald-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-emerald-700">{filteredGuests.length}</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">Data Ditampilkan</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-700">{guestData.length}</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">Total Keseluruhan</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-emerald-100 p-6 rounded-2xl border border-teal-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-teal-700">
                    {guestData.filter((g) => g.visit_date === new Date().toISOString().split("T")[0]).length}
                  </p>
                  <p className="text-sm font-semibold text-teal-600 mt-1">Pengunjung Hari Ini</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Guest List */}
          <GuestList
            guests={currentItems}
            onView={(guest) => {
              setSelectedGuest(guest)
              setIsDetailOpen(true)
            }}
            onEdit={(guest) => {
              setSelectedGuest(guest)
              setIsEditOpen(true)
            }}
            onDelete={(id) => setGuestData(guestData.filter((guest) => guest.id !== id))}
          />
        </CardContent>

        {/* Pagination */}
        {filteredGuests.length > 0 && (
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-emerald-50/30 px-8 py-6 gap-4">
            <div className="text-sm text-slate-600 font-medium">
              Menampilkan <span className="font-bold text-slate-800">{indexOfFirstItem + 1}</span> - 
              <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, filteredGuests.length)}</span> dari{" "}
              <span className="font-bold text-slate-800">{filteredGuests.length}</span> total data
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 p-0 flex items-center justify-center border-slate-300 hover:bg-slate-100 disabled:opacity-50 rounded-xl transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-10 w-10 p-0 rounded-xl font-semibold transition-all duration-300 ${
                      currentPage === pageNum 
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg" 
                        : "border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-10 w-10 p-0 flex items-center justify-center border-slate-300 hover:bg-slate-100 disabled:opacity-50 rounded-xl transition-all duration-300"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Dialogs */}
      <GuestDetailDialog
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        guest={selectedGuest}
        onEdit={() => {
          setIsDetailOpen(false)
          setIsEditOpen(true)
        }}
      />

      <GuestEditDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        guest={selectedGuest}
        onSuccess={(updatedGuest) => {
          setGuestData(
            guestData.map((g) => (g.id === updatedGuest.id ? { ...g, ...updatedGuest } : g)),
          )
        }}
      />
    </motion.div>
  )
}