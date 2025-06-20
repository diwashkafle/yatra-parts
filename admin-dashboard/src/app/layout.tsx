
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/session";
import NavbarPlus from "@/components/navbar/NavbarPlus";
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yatra Parts",
  description: "Best place for your car",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased`}>
        <AuthSessionProvider>
        <NavbarPlus/>
        <Toaster position="top-right" richColors />
          {children}
          </AuthSessionProvider>
      </body>
    </html>
  );
}
