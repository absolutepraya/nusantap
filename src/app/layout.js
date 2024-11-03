import localFont from 'next/font/local';
import './globals.css';

export const metadata = {
  title: 'NuSantap',
  description: 'NuSantap by UINNOVATOR - Gov-AI Hackathon 2024',
  icons: {
    icon: '/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/src/app/fonts/PlusJakartaSans-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel='preload' href='/elements/topleft.svg' as='image' type="image/svg+xml" />
      </head>
      <body className="font-light antialiased">
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
          <div className="relative h-full max-h-[888px] w-full max-w-[450px] overflow-hidden shadow-2xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
