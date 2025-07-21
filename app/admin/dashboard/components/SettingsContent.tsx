"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function SettingsContent() {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="mb-6 sm:mb-8" variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 font-serif">Pengaturan</h2>
        <p className="text-gray-600 text-sm sm:text-base">Kelola pengaturan sistem</p>
      </motion.div>

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-green-900 text-lg sm:text-xl font-serif">Pengaturan Umum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Settings className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Pengaturan Lanjutan</h3>
              <p className="text-gray-600 mb-4">Fitur pengaturan akan segera tersedia</p>
              <Button disabled className="bg-green-600 hover:bg-green-700 text-white">
                Buka Pengaturan Lengkap
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}