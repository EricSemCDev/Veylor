import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { AuthProvider } from "@/context/authContext";
import 'leaflet/dist/leaflet.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Veylor',
  description: 'Sistema de RPG para heróis lendários.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={clsx('no-touch', inter.className)}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
