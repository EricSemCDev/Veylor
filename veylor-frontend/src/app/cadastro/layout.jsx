/* Style Imports */
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

/* Variavel de fonte */
const inter = Inter({ subsets: ['latin']});

/* Dados da Head do layout */
export const metadata = {
  title: 'Veylor',
  description: 'Sistema de RPG para heróis lendários.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="no-touch">
      <body className={`${inter.className}`} >
        <div className="relative min-h-screen w-full overflow-hidden">

          {/* Imagem de fundo */}
          <img src="/backgrounds/background-Veylor.png" alt="Fundo Veylor" className="absolute inset-0 w-full h-full object-cover z-0 brightness-[1.1] contrast-[1.25] saturate-100 hue-rotate-0 drop-shadow-lg"/>

          <div className="absolute top-4 left-20 bottom-4 right-20 rounded-[20px] border-1 border-[rgba(147,51,234,0.30)] z-10 bg-[rgba(13,1,31,0.60)] backdrop-blur-[4px]">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
