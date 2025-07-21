/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Guest } from "../page";
import { createClient } from "@/lib/supabase/client";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const months = [
  { value: "all", label: "Semua Bulan" }, { value: "0", label: "Januari" },
  { value: "1", label: "Februari" }, { value: "2", label: "Maret" },
  { value: "3", label: "April" }, { value: "4", label: "Mei" },
  { value: "5", label: "Juni" }, { value: "6", label: "Juli" },
  { value: "7", label: "Agustus" }, { value: "8", label: "September" },
  { value: "9", label: "Oktober" }, { value: "10", label: "November" },
  { value: "11", label: "Desember" },
];

export default function GuestTable({ guestData, setGuestData, loading }: { guestData: Guest[], setGuestData: React.Dispatch<React.SetStateAction<Guest[]>>, loading: boolean }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const supabase = createClient();

  const uniqueYears = useMemo(() => {
    const years = new Set(guestData.map(guest => new Date(guest.visit_date).getFullYear().toString()));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [guestData]);

  const filteredData = useMemo(() => {
    return guestData.filter(guest => {
      const visitDate = new Date(`${guest.visit_date}T00:00:00`);
      const searchMatch =
        guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      const monthMatch = selectedMonth === "all" || visitDate.getMonth().toString() === selectedMonth;
      const yearMatch = selectedYear === "all" || visitDate.getFullYear().toString() === selectedYear;
      return searchMatch && monthMatch && yearMatch;
    });
  }, [searchTerm, guestData, selectedMonth, selectedYear]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMonth, selectedYear]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) {
      alert("Gagal menghapus data.");
    } else {
      setGuestData(prevData => prevData.filter(guest => guest.id !== id));
      alert("Data berhasil dihapus.");
    }
  };
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["No.", "Nama Lengkap", "Alamat", "Tujuan Kunjungan", "Tanggal"];
    const tableRows = filteredData.map((guest, index) => [
      index + 1, guest.full_name, guest.address, guest.purpose,
      new Date(`${guest.visit_date}T00:00:00`).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' }),
    ]);

    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Semua Bulan";
    const yearLabel = selectedYear === "all" ? "Semua Tahun" : selectedYear;

    doc.setFontSize(18); doc.setTextColor("#166534"); doc.text("Laporan Data Pengunjung", 14, 22);
    doc.setFontSize(11); doc.setTextColor("#6B7280"); doc.text(`Desa Gunungwangi - Filter: ${monthLabel}, ${yearLabel}`, 14, 28);

    autoTable(doc, {
      head: [tableColumns], body: tableRows, startY: 35, theme: 'striped',
      headStyles: { fillColor: [22, 163, 74], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 253, 244] }, styles: { cellPadding: 3, fontSize: 10 },
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i); doc.setFontSize(9); doc.setTextColor("#6B7280");
      const text = `Dicetak pada: ${new Date().toLocaleString("id-ID")} | Halaman ${i} dari ${pageCount}`;
      const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
      const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      doc.text(text, textX, doc.internal.pageSize.getHeight() - 10);
    }
    doc.save(`laporan-pengunjung-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const handleExportExcel = () => {
    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "Semua Bulan";
    const yearLabel = selectedYear === "all" ? "Semua Tahun" : selectedYear;
    const filterInfo = [`Filter Laporan: Bulan=${monthLabel}, Tahun=${yearLabel}`];
    const headers = ["No", "Nama Lengkap", "Alamat", "No HP", "Tujuan Kunjungan", "Tanggal Kunjungan", "Waktu Input"];
    const data = filteredData.map((guest, index) => [
      index + 1, guest.full_name, guest.address, guest.phone || "-", guest.purpose,
      new Date(`${guest.visit_date}T00:00:00`).toLocaleDateString("id-ID"),
      new Date(guest.created_at).toLocaleString("id-ID"),
    ]);

    const csvContent = [filterInfo.join(","), headers.join(","), ...data.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `laporan-pengunjung-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <motion.div key="guests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <motion.div className="mb-6 sm:mb-8" variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 font-serif">Data Pengunjung</h2>
        <p className="text-gray-600 text-sm sm:text-base">Kelola dan filter data kunjungan tamu</p>
      </motion.div>

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Cari pengunjung..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Pilih Bulan" /></SelectTrigger>
                  <SelectContent>{months.map(month => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Pilih Tahun" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    {uniqueYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={handleExportExcel} variant="outline" className="border-green-200 text-green-700 hover:bg-green-50"><Download className="w-4 h-4 mr-2" /> Excel</Button>
                <Button onClick={handleExportPDF} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50"><Download className="w-4 h-4 mr-2" /> PDF</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b"><th className="text-left p-4 font-medium">Nama</th><th className="text-left p-4 font-medium hidden sm:table-cell">Alamat</th><th className="text-left p-4 font-medium">Tujuan</th><th className="text-left p-4 font-medium hidden lg:table-cell">Tanggal</th><th className="text-left p-4 font-medium">Aksi</th></tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center p-8 text-gray-500">Memuat data...</td></tr>
                  ) : paginatedData.length === 0 ? (
                    <tr><td colSpan={5} className="text-center p-8 text-gray-500">Data tidak ditemukan.</td></tr>
                  ) : (
                    paginatedData.map((guest, index) => (
                      <motion.tr key={guest.id} className="border-b hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                        <td className="p-4">
                          <div className="font-medium">{guest.full_name}</div>
                          {guest.phone && <div className="text-sm text-gray-500">{guest.phone}</div>}
                        </td>
                        <td className="p-4 text-gray-700 hidden sm:table-cell">{guest.address}</td>
                        <td className="p-4"><Badge variant="secondary">{guest.purpose.length > 20 ? guest.purpose.substring(0, 20) + "..." : guest.purpose}</Badge></td>
                        <td className="p-4 text-gray-700 hidden lg:table-cell">{new Date(`${guest.visit_date}T00:00:00`).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="icon" variant="outline" onClick={() => router.push(`/admin/guest/${guest.id}`)}><Eye className="w-4 h-4" /></Button>
                            <DeleteConfirmationDialog onConfirm={() => handleDelete(guest.id)}>
                              <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                            </DeleteConfirmationDialog>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full text-sm text-gray-600">
              <div>
                Menampilkan <strong>{paginatedData.length}</strong> dari <strong>{filteredData.length}</strong> data
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>
                <span>Halaman {currentPage} dari {pageCount || 1}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount || pageCount === 0}
                >
                  Berikutnya
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
