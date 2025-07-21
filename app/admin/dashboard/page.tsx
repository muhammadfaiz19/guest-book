"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine } from "lucide-react";

// Import komponen untuk setiap tab
import DashboardContent from "./components/DashboardContent";
import GuestTable from "./components/GuestTable";
import StatisticsContent from "./components/StatisticsContent";
import SettingsContent from "./components/SettingsContent";
import { createClient } from "@/lib/supabase/client";

// Definisikan tipe data tamu
export interface Guest {
  id: number;
  created_at: string;
  full_name: string;
  address: string;
  phone: string | null;
  purpose: string;
  visit_date: string;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard" },
  { id: "guests", title: "Data Tamu" },
  { id: "statistics", title: "Statistik" },
  { id: "settings", title: "Pengaturan" },
];

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [guestData, setGuestData] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const tab = searchParams.get('tab') || 'dashboard';
    setActiveTab(tab);
  }, [searchParams]);
  
  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Failed to fetch guests:", error);
      } else {
        setGuestData(data as Guest[]);
      }
      setLoading(false);
    };

    fetchGuests();
  }, [supabase]);

  const renderContent = () => {
    switch (activeTab) {
      case 'guests':
        return <GuestTable guestData={guestData} setGuestData={setGuestData} loading={loading} />;
      case 'statistics':
        return <StatisticsContent guestData={guestData} />;
      case 'settings':
        return <SettingsContent />;
      case 'dashboard':
      default:
        return <DashboardContent guestData={guestData} />;
    }
  };

  return (
    <SidebarInset>
      <motion.header
        className="flex h-16 shrink-0 items-center gap-2 border-b border-green-100 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SidebarTrigger className="-ml-1 text-green-700 hover:bg-green-50" />
        <div className="flex items-center space-x-2 ml-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-green-800 font-serif">
              {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
            </h1>
            <p className="text-xs text-green-600">Desa Gunungwangi</p>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </SidebarInset>
  );
}