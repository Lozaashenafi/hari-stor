import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../src/context/AuthContext";
import { Playfair_Display, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "ShallyLuxe",
  description: "Premium Hair Store",
};

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-black text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
