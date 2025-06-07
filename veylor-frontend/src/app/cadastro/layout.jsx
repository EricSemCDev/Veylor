import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // importante
});


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="no-touch font-inter">
      <body>
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Imagem de fundo */}
          <img
            src="/backgrounds/background-Veylor.png"
            alt="Fundo Veylor"
            className="absolute inset-0 w-full h-full object-cover z-0 brightness-[1.1] contrast-[1.25] saturate-100 hue-rotate-0 drop-shadow-lg select-none pointer-events-none"
          />

          <div className="absolute top-4 left-20 bottom-4 right-20 rounded-[20px] border-1 border-[rgba(147,51,234,0.30)] z-10 bg-[rgba(13,1,31,0.60)] backdrop-blur-[4px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
