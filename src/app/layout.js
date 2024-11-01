import localFont from 'next/font/local';
import './globals.css';

/*
 * const helveticaLight = localFont({
 *   src: "./fonts/HelveticaLight.woff",
 *   variable: "--font-helvetica-light",
 *   weight: "100 900",
 * });
 */

export const metadata = {
  title: 'NuSantap',
  description: 'NuSantap - GovAI Hackathon',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-light antialiased">
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
          <div className="relative h-full max-h-[888px] w-full max-w-[450px] overflow-hidden bg-gray-500 shadow-2xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
