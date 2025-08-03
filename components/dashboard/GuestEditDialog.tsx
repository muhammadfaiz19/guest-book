"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Edit, Calendar, User, MapPin, Phone, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, startOfDay, isValid } from "date-fns";
import { id } from "date-fns/locale";
import type { Guest } from "../../app/admin/dashboard/page";

const guestSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]{10,15}$/.test(val), {
      message: "Format nomor HP tidak valid",
    }),
  visitDate: z.date().refine((val) => isValid(val), { 
    message: "Tanggal kunjungan tidak valid" 
  }),
  purpose: z.string().min(5, "Tujuan kunjungan minimal 5 karakter"),
});

type GuestFormData = z.infer<typeof guestSchema>;

interface GuestEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  guest: Guest | null;
  onSuccess: (updatedGuest: Guest) => void;
}

export default function GuestEditDialog({ isOpen, onOpenChange, guest, onSuccess }: GuestEditDialogProps) {
  const [originalData, setOriginalData] = useState<Guest | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      visitDate: startOfDay(new Date()),
      purpose: "",
    },
  });

  const watchForm = useWatch({ control });

  useEffect(() => {
    if (guest) {
      setOriginalData(guest);
      
      let visitDate = startOfDay(new Date());
      if (guest.visit_date) {
        try {
          const parsedDate = new Date(guest.visit_date);
          if (isValid(parsedDate)) {
            visitDate = startOfDay(parsedDate);
          }
        } catch (error) {
          console.error("Error parsing visit date:", error);
        }
      }
      
      reset({
        fullName: guest.full_name,
        address: guest.address,
        phone: guest.phone || "",
        visitDate: visitDate,
        purpose: guest.purpose,
      });
      setIsDirty(false);
    }
  }, [guest, reset]);

  const onSubmit = async (data: GuestFormData) => {
    if (guest && originalData) {
      try {
        const response = await fetch("/api/guests", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: guest.id,
            fullName: data.fullName,
            address: data.address,
            phone: data.phone || "",
            purpose: data.purpose,
            visitDate: format(data.visitDate, "yyyy-MM-dd"),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Gagal memperbarui data");
        }

        const updatedGuest = {
          ...guest,
          full_name: data.fullName,
          address: data.address,
          phone: data.phone || null,
          purpose: data.purpose,
          visit_date: format(data.visitDate, "yyyy-MM-dd"),
        };

        onSuccess(updatedGuest);
        onOpenChange(false);
        toast.success("Data berhasil diubah");
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data");
      }
    }
  };

  useEffect(() => {
    if (originalData && watchForm) {
      let originalVisitDate = startOfDay(new Date());
      if (originalData.visit_date) {
        try {
          const parsedDate = new Date(originalData.visit_date);
          if (isValid(parsedDate)) {
            originalVisitDate = startOfDay(parsedDate);
          }
        } catch (error) {
          console.error("Error parsing original visit date:", error);
        }
      }

      const hasChanges =
        watchForm.fullName !== originalData.full_name ||
        watchForm.address !== originalData.address ||
        watchForm.phone !== (originalData.phone || "") ||
        watchForm.purpose !== originalData.purpose ||
        (watchForm.visitDate && format(watchForm.visitDate, "yyyy-MM-dd") !== format(originalVisitDate, "yyyy-MM-dd"));
      
      setIsDirty(hasChanges || false);
    }
  }, [watchForm, originalData]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open ?? false)}>
      <DialogContent className="w-[95%] max-w-2xl mx-auto p-0 rounded-2xl md:rounded-3xl bg-white shadow-2xl border-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 p-4 md:p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight flex items-center space-x-2 md:space-x-3">
              <div className="p-1.5 md:p-2 bg-white/20 rounded-lg md:rounded-xl backdrop-blur-sm">
                <Edit className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span>Edit Data Pengunjung</span>
            </DialogTitle>
            <DialogDescription className="text-emerald-100 text-sm md:text-base mt-1">
              Ubah informasi pengunjung
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            {/* Full Name and Address Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-emerald-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className={cn(
                    "w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11",
                    errors.fullName && "border-red-500"
                  )}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-emerald-800 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Alamat
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  className={cn(
                    "w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11",
                    errors.address && "border-red-500"
                  )}
                  placeholder="Masukkan alamat"
                />
                {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
              </div>
            </div>
            
            {/* Phone and Visit Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-emerald-800 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  No HP (Opsional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={cn(
                    "w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11",
                    errors.phone && "border-red-500"
                  )}
                  placeholder="081234567890"
                />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitDate" className="text-sm font-medium text-emerald-800 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tanggal Kunjungan
                </Label>
                <Controller
                  control={control}
                  name="visitDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 bg-emerald-50/50 h-11 rounded-lg transition-all duration-200",
                            !field.value && "text-muted-foreground",
                            errors.visitDate && "border-red-500"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date && isValid(date)) {
                              field.onChange(startOfDay(date));
                            }
                          }}
                          initialFocus
                          className="bg-white border-emerald-200 rounded-md"
                          locale={id}
                          defaultMonth={field.value || startOfDay(new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.visitDate && <p className="text-xs text-red-600">{errors.visitDate.message}</p>}
              </div>
            </div>
            
            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-sm font-medium text-emerald-800 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Tujuan Kunjungan
              </Label>
              <Textarea
                id="purpose"
                {...register("purpose")}
                className={cn(
                  "w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 resize-none",
                  errors.purpose && "border-red-500"
                )}
                placeholder="Jelaskan tujuan kunjungan..."
                rows={4}
              />
              {errors.purpose && <p className="text-xs text-red-600">{errors.purpose.message}</p>}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto border-emerald-300 text-emerald-700 hover:bg-emerald-100 rounded-xl py-2.5 md:py-3 font-semibold transition-all duration-300 order-2 sm:order-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={!isDirty}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-xl py-2.5 md:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}