import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata = {
  title: "CoreX",
  description: "A modern fitness platform",
};

export default function RootLayout({ children }) {
  return (
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mozilla+Headline:wdth,wght@75..125,200..700&display=swap" rel="stylesheet" />
  </head>
  <body className={`${bebasNeue.variable}`}>
    {children}
  </body>
</html>
  );
}
