import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flashcards de Direito',
  description: 'Plataforma educacional para estudo de conceitos jurídicos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 pt-16`}> {/* 16 = altura da navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}