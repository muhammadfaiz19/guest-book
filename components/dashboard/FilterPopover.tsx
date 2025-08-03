import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Filter, Sliders } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterPopoverProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  filters: { day: string; month: string; year: string }
  setFilters: (filters: { day: string; month: string; year: string }) => void
  uniqueYears: number[]
  onApply: () => void
}

export default function FilterPopover({ isOpen, setIsOpen, filters, setFilters, uniqueYears, onApply }: FilterPopoverProps) {
  const resetFilters = () => {
    setFilters({ day: "all", month: "all", year: "all" })
    setIsOpen(false)
  }

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "all").length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex gap-2"
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter</span>
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs font-bold">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 md:p-5 bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl rounded-xl md:rounded-2xl"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 md:w-5 h-4 md:h-5 text-emerald-600" />
            <h4 className="font-semibold text-slate-800 text-sm md:text-base">Filter Data Pengunjung</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="day" className="text-xs md:text-sm font-semibold text-emerald-700">Hari</Label>
              <Select value={filters.day} onValueChange={(value) => setFilters({ ...filters, day: value })}>
                <SelectTrigger id="day" className="h-10 md:h-11 text-sm border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50">
                  <SelectValue placeholder="Pilih Hari" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white/95 backdrop-blur-xl max-h-48">
                  <SelectItem value="all" className="text-sm font-medium">Semua Hari</SelectItem>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()} className="text-sm">
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="month" className="text-xs md:text-sm font-semibold text-emerald-700">Bulan</Label>
              <Select value={filters.month} onValueChange={(value) => setFilters({ ...filters, month: value })}>
                <SelectTrigger id="month" className="h-10 md:h-11 text-sm border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50">
                  <SelectValue placeholder="Pilih Bulan" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white/95 backdrop-blur-xl max-h-48">
                  <SelectItem value="all" className="text-sm font-medium">Semua Bulan</SelectItem>
                  {[
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                  ].map((month, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()} className="text-sm">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="year" className="text-xs md:text-sm font-semibold text-emerald-700">Tahun</Label>
              <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
                <SelectTrigger id="year" className="h-10 md:h-11 text-sm border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50">
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white/95 backdrop-blur-xl max-h-48">
                  <SelectItem value="all" className="text-sm font-medium">Semua Tahun</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-sm">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1 text-slate-600 border-slate-300 hover:bg-slate-50 transition-all duration-300 h-10 md:h-11 text-sm font-medium"
            >
              Reset Filter
            </Button>
            <Button
              onClick={onApply}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-10 md:h-11 text-sm font-medium"
            >
              Terapkan
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}