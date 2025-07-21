"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, Calendar, TrendingUp, LogOut, TreePine, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from '@/lib/supabase/client';

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: TrendingUp },
  { id: "guests", title: "Data Tamu", icon: Users },
  { id: "statistics", title: "Statistik", icon: Calendar },
  { id: "settings", title: "Pengaturan", icon: Settings },
];

export default function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleTabChange = (tabId: string) => {
    router.push(`/admin/dashboard?tab=${tabId}`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
        <motion.div
          className="flex items-center space-x-3 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TreePine className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-lg font-bold text-green-800 font-serif">Admin Dashboard</h1>
            <p className="text-sm text-green-600">Desa Gunungwangi</p>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800 font-medium">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id}>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <SidebarMenuButton
                      onClick={() => handleTabChange(item.id)}
                      isActive={activeTab === item.id}
                      className={`w-full justify-start transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-medium shadow-sm border-l-4 border-green-600"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-green-100 bg-gradient-to-r from-green-50 to-white">
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50 bg-transparent justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </motion.div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}
