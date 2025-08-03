"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Guest } from "../../app/admin/dashboard/page";
import { Edit } from "lucide-react";

const guestSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  phone: z.string().optional(),
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
      purpose: "",
    },
  });

  const watchForm = useWatch({ control });

  useEffect(() => {
    if (guest) {
      setOriginalData(guest);
      reset({
        fullName: guest.full_name,
        address: guest.address,
        phone: guest.phone || "",
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
            visitDate: guest.visit_date,
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
      const hasChanges =
        watchForm.fullName !== originalData.full_name ||
        watchForm.address !== originalData.address ||
        watchForm.phone !== (originalData.phone || "") ||
        watchForm.purpose !== originalData.purpose;
      setIsDirty(hasChanges);
    }
  }, [watchForm, originalData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-md mx-auto p-0 rounded-2xl md:rounded-3xl bg-white shadow-2xl border-0 overflow-hidden max-h-[90vh] overflow-y-auto">
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
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-emerald-800">
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className="w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11"
              />
              {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-emerald-800">
                Alamat
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11"
              />
              {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-emerald-800">
                No HP
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                className="w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-sm font-medium text-emerald-800">
                Tujuan Kunjungan
              </Label>
              <Input
                id="purpose"
                {...register("purpose")}
                className="w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50 h-11"
              />
              {errors.purpose && <p className="text-xs text-red-600">{errors.purpose.message}</p>}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
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