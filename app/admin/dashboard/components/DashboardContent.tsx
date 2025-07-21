"use client"

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Guest } from "../page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
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

export default function DashboardContent({ guestData }: { guestData: Guest[] }) {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const uniqueYears = useMemo(() => {
    const years = new Set(guestData.map(guest => new Date(guest.visit_date).getFullYear().toString()));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [guestData]);

  const filteredData = useMemo(() => {
    return guestData.filter(guest => {
      const visitDate = new Date(`${guest.visit_date}T00:00:00`);
      const monthMatch = selectedMonth === "all" || visitDate.getMonth().toString() === selectedMonth;
      const yearMatch = selectedYear === "all" || visitDate.getFullYear().toString() === selectedYear;
      return monthMatch && yearMatch;
    });
  }, [guestData, selectedMonth, selectedYear]);

  const todayGuests = filteredData.filter(
    (guest) => new Date(`${guest.visit_date}T00:00:00`).toDateString() === new Date().toDateString()
  ).length;

  const totalGuests = filteredData.length;
  const averageGuests = totalGuests > 0 ? (totalGuests / 30).toFixed(1) : "0";

  const stats = [
    { title: "Total Pengunjung", value: totalGuests, change: "Sesuai filter", icon: Users, color: "green" },
    { title: "Hari Ini", value: todayGuests, change: "Pengunjung hari ini", icon: Calendar, color: "blue" },
    { title: "Rata-rata Harian", value: averageGuests, change: "Berdasarkan 30 hari", icon: TrendingUp, color: "amber" },
  ];
  
  const monthlyData = useMemo(() => {
    const monthsData: { [key: string]: number } = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 };
    filteredData.forEach(guest => {
      const visitDate = new Date(`${guest.visit_date}T00:00:00`);
      const month = visitDate.toLocaleString('default', { month: 'short' });
      if (monthsData.hasOwnProperty(month)) {
        monthsData[month]++;
      }
    });
    return Object.entries(monthsData).map(([month, visitors]) => ({ month, visitors }));
  }, [filteredData]);

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="mb-6 sm:mb-8" variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 font-serif">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">Ringkasan data kunjungan Desa Gunungwangi</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Pilih Bulan" /></SelectTrigger>
          <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Pilih Tahun" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tahun</SelectItem>
            {uniqueYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={staggerContainer} initial="initial" animate="animate"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className={`border-${stat.color}-200 bg-gradient-to-br from-white to-${stat.color}-50 hover:shadow-lg transition-all duration-300`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium text-${stat.color}-800`}>{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</div>
                <p className={`text-xs text-${stat.color}-600`}>{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="border-green-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <CardHeader><CardTitle className="text-green-900 text-lg sm:text-xl font-serif">Tren Kunjungan Bulanan</CardTitle></CardHeader>
          <CardContent className="flex-1">
            <ChartContainer config={{ visitors: { label: "Pengunjung", color: "hsl(var(--chart-1))" } }} className="h-full min-h-[300px] sm:min-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
