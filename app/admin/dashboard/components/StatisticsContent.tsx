"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Guest } from "../page";
import { useMemo } from "react";

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

export default function StatisticsContent({ guestData }: { guestData: Guest[] }) {
  const monthlyData = useMemo(() => {
    const months: { [key: string]: number } = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 };
    guestData.forEach(guest => {
      const visitDate = new Date(`${guest.visit_date}T00:00:00`);
      const month = visitDate.toLocaleString('default', { month: 'short' });
      if (months.hasOwnProperty(month)) {
        months[month]++;
      }
    });
    return Object.entries(months).map(([month, visitors]) => ({ month, visitors }));
  }, [guestData]);

  const purposeData = useMemo(() => {
    const purposes: { [key: string]: number } = {};
    guestData.forEach(guest => {
      const p = guest.purpose.toLowerCase();
      let category = "Lainnya";
      if (p.includes("wisata") || p.includes("liburan")) category = "Wisata";
      else if (p.includes("bisnis") || p.includes("kerja")) category = "Bisnis";
      else if (p.includes("keluarga") || p.includes("saudara")) category = "Keluarga";
      
      purposes[category] = (purposes[category] || 0) + 1;
    });
    const total = guestData.length || 1;
    return Object.entries(purposes).map(([name, value]) => ({ name, value: Math.round((value / total) * 100) }));
  }, [guestData]);

  const purposeColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <motion.div
      key="statistics"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="mb-6 sm:mb-8" variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 font-serif">
          Statistik Kunjungan
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">Analisis data kunjungan tamu keseluruhan</p>
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8" variants={staggerContainer} initial="initial" animate="animate">
        <motion.div variants={fadeInUp}>
          <Card className="border-green-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <CardHeader><CardTitle className="text-green-900 text-lg sm:text-xl font-serif">Tren Kunjungan Bulanan</CardTitle></CardHeader>
            <CardContent className="flex-1">
              <ChartContainer config={{ visitors: { label: "Pengunjung", color: "hsl(var(--chart-1))" } }} className="h-full min-h-[300px] lg:min-h-[400px]">
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

        <motion.div variants={fadeInUp}>
          <Card className="border-green-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <CardHeader><CardTitle className="text-green-900 text-lg sm:text-xl font-serif">Distribusi Tujuan Kunjungan</CardTitle></CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ChartContainer config={{ visitors: { label: "Pengunjung" } }} className="h-full min-h-[300px] lg:min-h-[400px] flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={purposeData} cx="50%" cy="50%" labelLine={false} innerRadius={70} outerRadius={120} dataKey="value">
                      {purposeData.map((entry, index) => <Cell key={`cell-${index}`} fill={purposeColors[index % purposeColors.length]} />)}
                    </Pie>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                {purposeData.map((item, index) => (
                  <motion.div key={index} className="flex items-center" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                    <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: purposeColors[index % purposeColors.length] }} />
                    <span className="text-xs sm:text-sm text-gray-600">{item.name}: {item.value}%</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
