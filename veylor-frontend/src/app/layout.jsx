import '@/styles/globals.css';

export const metadata = {
  title: 'Veylor',
  description: 'Sistema de RPG para heróis lendários.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
