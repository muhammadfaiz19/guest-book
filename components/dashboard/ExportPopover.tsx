"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileIcon as FilePdf, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { Guest } from "../../app/admin/dashboard/page";

interface ExportPopoverProps {
  filteredGuests: Guest[];
  filters: { day: string; month: string; year: string };
  searchTerm: string;
}

export default function ExportPopover({ filteredGuests, filters, searchTerm }: ExportPopoverProps) {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Buku Tamu");

    worksheet.columns = [
      { header: "Nama Lengkap", key: "full_name", width: 20 },
      { header: "Alamat", key: "address", width: 30 },
      { header: "No HP", key: "phone", width: 18 },
      { header: "Tujuan Kunjungan", key: "purpose", width: 40 },
      { header: "Tanggal Kunjungan", key: "visit_date", width: 18 },
      { header: "Waktu Input", key: "created_at", width: 15 },
    ];

    // Header style with emerald theme
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF059669" }, // Emerald-600
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    filteredGuests.forEach((guest, index) => {
      const row = worksheet.addRow({
        full_name: guest.full_name,
        address: guest.address,
        phone: guest.phone ? `'${guest.phone}` : "-",
        purpose: guest.purpose,
        visit_date: new Date(guest.visit_date).toLocaleDateString("id-ID"),
        created_at: new Date(guest.created_at).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      row.eachCell((cell) => {
        cell.alignment = { vertical: "top", horizontal: "left", wrapText: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      if (index % 2 === 1) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF0FDF4" }, // Emerald-50
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `buku-tamu-desa-gunungwangi-${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success("Data berhasil diekspor ke Excel (.xlsx)");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Laporan Buku Tamu Desa Gunungwangi", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text("Kecamatan Argapura, Kabupaten Majalengka", pageWidth / 2, 28, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const currentDateTime = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const filterInfo = [
      `Tanggal Cetak: ${currentDateTime}`,
      `Filter Hari: ${filters.day === "all" ? "Semua" : filters.day}`,
      `Filter Bulan: ${filters.month === "all" ? "Semua" : monthNames[parseInt(filters.month) - 1]}`,
      `Filter Tahun: ${filters.year === "all" ? "Semua" : filters.year}`,
      `Pencarian: ${searchTerm || "Tidak ada"}`,
    ];

    filterInfo.forEach((text, i) => {
      doc.text(text, 14, 40 + i * 6);
    });

    autoTable(doc, {
      startY: 40 + filterInfo.length * 6 + 8,
      head: [["Nama", "Alamat", "No HP", "Tujuan", "Tanggal Kunjungan", "Waktu Input"]],
      body: filteredGuests.map((guest) => [
        guest.full_name,
        guest.address,
        guest.phone || "-",
        guest.purpose,
        new Date(guest.visit_date).toLocaleDateString("id-ID"),
        new Date(guest.created_at).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 3,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [5, 150, 105], // Emerald-600
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 253, 244], // Emerald-50
      },
      margin: { left: 14, right: 14 },
    });

    doc.save(`buku-tamu-desa-gunungwangi-${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("Data berhasil diekspor ke PDF");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          <span className="font-medium">Export Data</span>
          <Sparkles className="w-3 h-3 ml-2 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-3 bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl rounded-xl"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 border-emerald-200 transition-all duration-300 h-11"
            onClick={exportToExcel}
          >
            <FileSpreadsheet className="w-4 h-4 mr-3" />
            <span className="font-medium">Export Excel</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-700 bg-red-50/80 hover:bg-red-100 border-red-200 transition-all duration-300 h-11"
            onClick={exportToPDF}
          >
            <FilePdf className="w-4 h-4 mr-3" />
            <span className="font-medium">Export PDF</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}