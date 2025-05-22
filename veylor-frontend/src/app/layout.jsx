import '@/styles/globals.css';

import { Inter } from 'next/font/google';

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
    <html lang="pt-br">
      <body className={`${inter.className} font-inter`}>
        {children}
      </body>
    </html>
  );
}
