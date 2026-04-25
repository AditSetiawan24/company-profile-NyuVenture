import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Compass, Globe, Mail, Phone } from 'lucide-react';
import MobileMenu from './components/MobileMenu';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NyuVenture | Jelajah Banyumas Lebih Mudah",
  description: "Temukan destinasi wisata, kuliner, dan penginapan di Banyumas dengan NyuVenture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col pt-16">
        {/* Navigation */}
        <header className="fixed top-0 inset-x-0 z-50 bg-brand-dark shadow-md text-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
                <Compass className="text-brand-light w-7 h-7" />
                <span>NyuVenture</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6 font-medium">
                <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">Services</Link>
                <Link href="/team" className="text-white/80 hover:text-white transition-colors">Team</Link>
                <Link href="/experiment" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">Experiment</Link>
              </nav>

              <div className="hidden md:flex">
                <Link href="/contact" className="bg-brand text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-700 transition">
                  Contact
                </Link>
              </div>

              <MobileMenu />
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <footer className="bg-[#17312b] text-[#e4efeb] py-8 mt-auto">
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="mb-0 text-sm">&copy; 2026 NyuVenture.</p>
            <div className="flex items-center gap-5 text-sm">
              <Link href="https://img.freepik.com/free-vector/black-construction-flat-website_23-2148219966.jpg?semt=ais_hybrid&w=740&q=80" className="text-[#dcebe6] hover:text-white hover:underline transition-all">Terms</Link>
              <Link href="https://img.freepik.com/free-vector/black-construction-flat-website_23-2148219966.jpg?semt=ais_hybrid&w=740&q=80" className="text-[#dcebe6] hover:text-white hover:underline transition-all">Privacy</Link>
              <div className="w-[1px] h-4 bg-white/35"></div>
              <Link href="https://img.freepik.com/free-vector/black-construction-flat-website_23-2148219966.jpg?semt=ais_hybrid&w=740&q=80" className="hover:text-white transition-all"><Globe className="w-5 h-5"/></Link>
              <Link href="https://img.freepik.com/free-vector/black-construction-flat-website_23-2148219966.jpg?semt=ais_hybrid&w=740&q=80" className="hover:text-white transition-all"><Mail className="w-5 h-5"/></Link>
              <Link href="https://img.freepik.com/free-vector/black-construction-flat-website_23-2148219966.jpg?semt=ais_hybrid&w=740&q=80" className="hover:text-white transition-all"><Phone className="w-5 h-5"/></Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
