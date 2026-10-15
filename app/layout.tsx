import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, Oswald, Cinzel } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const stormfaze = localFont({
  src: "../public/font/Stormfaze.otf",
  variable: "--font-stormfaze",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#24130A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Brewtoria Café — More Than Just Coffee | Artisanal Coffee & Bakery",
  description:
    "Discover your perfect brew, freshly baked artisanal delights, and a comforting luxury atmosphere in every cup. Crafted with love, served with soul at Brewtoria.",
  keywords: [
    "Brewtoria",
    "Specialty Coffee",
    "Luxury Café",
    "Iced Caramel Latte",
    "Artisanal Bakery",
    "Cappuccino",
    "Croissants",
    "Café",
    "Coffee Shop",
  ],
  authors: [{ name: "Brewtoria Café & Bakery" }],
  openGraph: {
    title: "Brewtoria Café — More Than Just Coffee",
    description:
      "Discover your perfect brew, freshly baked artisanal delights, and a comforting luxury atmosphere in every cup.",
    type: "website",
    locale: "en_US",
    siteName: "Brewtoria Café",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import SmoothScroll from "./components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${oswald.variable} ${cinzel.variable} ${stormfaze.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased text-[#382014] bg-[#F7EBDD] selection:bg-[#B8753D] selection:text-[#FFF9F0]">
        <SmoothScroll>
          <CartProvider>{children}</CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
