// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProviders } from "./AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sabor Viajero",
    template: "%s | Sabor Viajero",
  },
  description: "Descubre rutas, eventos y restaurantes únicos en tu ciudad y más allá.",
  keywords: [
    "gastronomía", "rutas gastronómicas", "restaurantes", "eventos culinarios", "foodies", "Sabor Viajero"
  ],
  authors: [{ name: "Sabor Viajero", url: "https://saborviajero.com" }],
  creator: "Sabor Viajero",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://saborviajero.com",
    siteName: "Sabor Viajero",
    title: "Sabor Viajero",
    description: "Explora rutas, eventos y restaurantes únicos. Vive la experiencia foodie.",
    images: [
      {
        url: "/og-image.jpg", // asegúrate de tener la imagen en /public
        width: 1200,
        height: 630,
        alt: "Sabor Viajero - Gastronomía sin fronteras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabor Viajero",
    description: "Explora rutas, eventos y restaurantes únicos. Vive la experiencia foodie.",
    site: "@saborviajero", // cambia por tu handle real si tienes uno
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://saborviajero.com"),
  alternates: {
    canonical: "https://saborviajero.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // si tienes uno
  },
  manifest: "/site.webmanifest", // si tienes uno (opcional)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload og-image para SEO */}
        <link rel="preload" as="image" href="/og-image.jpg" />
        {/* Opcional: metatag viewport (Next lo agrega pero puedes forzar aquí) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased min-h-screen bg-gray-50 dark:bg-gray-950
          font-sans
        `}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1 min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
