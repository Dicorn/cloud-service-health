import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Microsoft 365 Service Health Monitor',
  description: 'Monitor de salud de servicios de Microsoft 365',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* ⚡ TanStack Query Provider envuelve toda la app */}
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}