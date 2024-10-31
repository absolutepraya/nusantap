import localFont from "next/font/local";
import "./globals.css";

/*
* const helveticaLight = localFont({
*   src: "./fonts/HelveticaLight.woff",
*   variable: "--font-helvetica-light",
*   weight: "100 900",
* });
*/

export const metadata = {
  title: "NuSantap",
  description: "NuSantap - GovAI Hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}
