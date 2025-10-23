import type { Metadata } from "next";
import { Chivo, Work_Sans, Montserrat } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  weight: ["400", "700", "900"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.outdoornuble.cl"),
  title: {
    default: "Rafting Río Ñuble | Outdoor Ñuble - Turismo Aventura en San Fabián",
    template: "%s | Outdoor Ñuble",
  },
  description:
    "Descubre el mejor rafting en el Río Ñuble, San Fabián de Alico. Turismo aventura con guías certificados en la Reserva de la Biósfera UNESCO. Reserva tu experiencia hoy.",
  keywords:
    "rafting río ñuble, rafting san fabián, turismo aventura ñuble, outdoor chile, rafting chile, reserva biosfera ñuble, turismo sustentable chile, aventura cordillera, rafting profesional, guías certificados rafting",
  authors: [{ name: "Outdoor Ñuble" }],
  creator: "Outdoor Ñuble",
  publisher: "Outdoor Ñuble",
  alternates: {
    canonical: "https://www.outdoornuble.cl",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.outdoornuble.cl",
    siteName: "Outdoor Ñuble",
    title: "Rafting Río Ñuble | Outdoor Ñuble - Turismo Aventura",
    description:
      "El mejor rafting en el Río Ñuble con guías certificados. Experiencias de turismo aventura en la Reserva de la Biósfera UNESCO, San Fabián de Alico.",
    images: [
      {
        url: "/og-outdoornuble.jpg",
        width: 1200,
        height: 630,
        alt: "Outdoor Ñuble - Rafting profesional en Río Ñuble, San Fabián de Alico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafting Río Ñuble | Outdoor Ñuble",
    description: "El mejor rafting en el Río Ñuble. Turismo aventura con guías certificados en San Fabián.",
    images: ["/og-outdoornuble.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-google-search-console",
  },
  other: {
    "theme-color": "#0A84AE",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A84AE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${workSans.variable} ${chivo.variable} ${montserrat.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
