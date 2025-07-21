"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guestBookSchema, GuestBookFormData } from '@/lib/validators/guestbook-validator';
import { createClient } from '@/lib/supabase/client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, MapPin, Phone, Calendar, FileText, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SidebarInset } from '@/components/ui/sidebar';

export default function GuestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [guestName, setGuestName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GuestBookFormData>({
    resolver: zodResolver(guestBookSchema),
  });

  useEffect(() => {
    if (!id) return;

    const fetchGuest = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching guest data:', error);
        alert('Gagal memuat data tamu.');
        router.push('/admin/dashboard?tab=guests');
      } else {
        setGuestName(data.full_name);
        reset({
            fullName: data.full_name,
            address: data.address,
            phone: data.phone || '',
            purpose: data.purpose,
            visitDate: data.visit_date,
        });
      }
      setLoading(false);
    };

    fetchGuest();
  }, [id, reset, router, supabase]);

  const onSubmit = async (formData: GuestBookFormData) => {
    const { error } = await supabase
      .from('guests')
      .update({
        full_name: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        purpose: formData.purpose,
        visit_date: formData.visitDate,
      })
      .eq('id', id);

    if (error) {
      alert('Gagal memperbarui data.');
      console.error('Update error:', error);
    } else {
      alert('Data berhasil diperbarui.');
      router.push('/admin/dashboard?tab=guests');
      router.refresh();
    }
  };

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex justify-center items-center h-full p-8">Memuat data...</div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="outline" onClick={() => router.push('/admin/dashboard?tab=guests')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Tamu
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-green-900">Edit Data Pengunjung</CardTitle>
              <CardDescription>
                Perbarui informasi untuk pengunjung: <span className="font-semibold text-green-800">{guestName}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center mb-1"><User className="w-4 h-4 mr-2" />Nama Lengkap *</Label>
                    <Input id="fullName" {...register("fullName")} className={errors.fullName ? "border-red-500" : ""} />
                    {errors.fullName && <p className="text-red-600 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address" className="flex items-center mb-1"><MapPin className="w-4 h-4 mr-2" />Alamat / Kota Asal *</Label>
                    <Input id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
                    {errors.address && <p className="text-red-600 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.address.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="flex items-center mb-1"><Phone className="w-4 h-4 mr-2" />No. HP (Opsional)</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                  </div>
                  <div>
                    <Label htmlFor="visitDate" className="flex items-center mb-1"><Calendar className="w-4 h-4 mr-2" />Tanggal Kunjungan *</Label>
                    <Input id="visitDate" type="date" {...register("visitDate")} className={errors.visitDate ? "border-red-500" : ""} />
                    {errors.visitDate && <p className="text-red-600 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.visitDate.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose" className="flex items-center mb-1"><FileText className="w-4 h-4 mr-2" />Tujuan Kunjungan *</Label>
                  <Textarea id="purpose" {...register("purpose")} rows={4} className={errors.purpose ? "border-red-500" : ""} />
                  {errors.purpose && <p className="text-red-600 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.purpose.message}</p>}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SidebarInset>
  );
}
