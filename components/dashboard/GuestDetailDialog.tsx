import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, FileText, Calendar, Edit, User } from "lucide-react"
import type { Guest } from "../../app/admin/dashboard/page"

interface GuestDetailDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
  onEdit: () => void
}

export default function GuestDetailDialog({ isOpen, onOpenChange, guest, onEdit }: GuestDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-lg mx-auto p-0 rounded-2xl md:rounded-3xl bg-white shadow-2xl border-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-4 md:p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight flex items-center space-x-2 md:space-x-3">
              <div className="p-1.5 md:p-2 bg-white/20 rounded-lg md:rounded-xl backdrop-blur-sm">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span>Detail Pengunjung</span>
            </DialogTitle>
            <DialogDescription className="text-emerald-100 text-sm md:text-base mt-1">
              Informasi lengkap data pengunjung
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {guest && (
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 md:mb-6">
                <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight break-words">
                  {guest.full_name}
                </h3>
              </div>
              
              <div className="space-y-3 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-100">
                  <div className="p-1.5 md:p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1">Alamat</p>
                    <p className="text-sm md:text-base text-slate-800 leading-relaxed break-words">{guest.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-100">
                  <div className="p-1.5 md:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1">Nomor Telepon</p>
                    <p className="text-sm md:text-base text-slate-800 break-all">{guest.phone || "Tidak diisi"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-100">
                  <div className="p-1.5 md:p-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg flex-shrink-0">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1">Tujuan Kunjungan</p>
                    <p className="text-sm md:text-base text-slate-800 leading-relaxed break-words">{guest.purpose}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-100">
                  <div className="p-1.5 md:p-2 bg-gradient-to-r from-amber-500 to-emerald-600 rounded-lg flex-shrink-0">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-slate-600">Tanggal Kunjungan</p>
                      <p className="text-sm md:text-base text-slate-800 font-medium">
                        {new Date(guest.visit_date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-slate-600">Waktu Input</p>
                      <p className="text-sm md:text-base text-slate-800">
                        {new Date(guest.created_at).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Button
                variant="outline"
                onClick={onEdit}
                className="flex-1 sm:w-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl py-2.5 md:py-3 font-semibold transition-all duration-300"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Data
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl py-2.5 md:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}