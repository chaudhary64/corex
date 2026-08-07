import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LoadingProvider } from "./context/LoadingProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "CoreX — Premium Training Club",
  description:
    "Elite coaching, world-class equipment, and a community built on discipline. Train at the standard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} bg-paper text-ink`}
      >
        <LoadingProvider>
          {children}
          <SpeedInsights />
        </LoadingProvider>
      </body>
    </html>
  );
}
