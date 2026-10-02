import { CartProvider } from "./cart-provider";
import SiteHeader from "./site-header";
import { ShippingBand } from "./presentation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THE PAWMART | Cuidado para tus mascotas",
  description: "Un espacio para cuidar a quienes hacen tu vida más feliz. Descubre THE PAWMART.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:block focus:p-4"
          >
            Saltar al contenido
          </a>
          <ShippingBand />
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-[#173F35]/10 px-5 py-6 text-center text-xs text-[#53645B]">
        THE PAWMART · Para quienes son parte de la familia.
      </footer>
        </CartProvider>
      </body>
    </html>
  );
}
