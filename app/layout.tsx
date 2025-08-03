import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buku Tamu Desa Gunungwangi | Argapura, Majalengka",
  description:
    "Website resmi Buku Tamu Digital Desa Gunungwangi, Kecamatan Argapura, Kabupaten Majalengka. Catat kunjunganmu secara digital dengan mudah, cepat, dan aman.",
  keywords: [
    "buku tamu desa",
    "gunungwangi",
    "argapura",
    "majalegka",
    "buku tamu digital",
    "buku tamu online",
    "desa digital",
    "kunjungan desa",
    "kkn umc",
  ],
  authors: [{ name: "Tim KKN Informatika UMC" }],
  creator: "Tim KKN Informatika Universitas Muhammadiyah Cirebon",
  metadataBase: new URL("https://guest-book-gunungwangi.vercel.app/"),
  openGraph: {
    title: "Buku Tamu Digital Desa Gunungwangi",
    description:
      "Catat kunjungan secara digital di Desa Gunungwangi, Argapura, Majalengka. Praktis, modern, dan efisien.",
    url: "https://guest-book-gunungwangi.vercel.app/",
    siteName: "Buku Tamu Desa Gunungwangi",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.webp", 
        width: 1200,
        height: 630,
        alt: "Buku Tamu Digital Desa Gunungwangi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buku Tamu Digital Desa Gunungwangi",
    description:
      "Website resmi untuk pencatatan kunjungan di Desa Gunungwangi, Argapura, Majalengka.",
    images: ["/logo.webp"],
    creator: "@timkknumc",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
