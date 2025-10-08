import type { Metadata } from "next";
import { Chivo, Work_Sans, Montserrat } from "next/font/google";
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
    default: "Outdoor Ñuble - Tu próxima aventura",
    template: "%s | Outdoor Ñuble",
  },
  description:
    "Turismo aventura y naturaleza en San Fabián, Ñuble. Rafting y experiencias outdoor guiadas por locales certificados en la Reserva de la Biósfera del Río Ñuble.",
  keywords:
    "rafting ñuble, turismo aventura san fabián, outdoor chile, río ñuble, rafting chile, reserva biosfera ñuble, turismo sustentable, aventura cordillera",
  authors: [{ name: "Outdoor Ñuble" }],
  creator: "Outdoor Ñuble",
  publisher: "Outdoor Ñuble",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.outdoornuble.cl",
    siteName: "Outdoor Ñuble",
    title: "Outdoor Ñuble - Tu próxima aventura",
    description:
      "Turismo aventura y naturaleza en San Fabián, Ñuble. Rafting y experiencias outdoor sustentables.",
    images: [
      {
        url: "/og-outdoornuble.jpg",
        width: 1200,
        height: 630,
        alt: "Outdoor Ñuble - Rafting y Turismo Aventura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor Ñuble - Tu próxima aventura",
    description: "Turismo aventura y naturaleza en San Fabián, Ñuble.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" suppressHydrationWarning>
      <body className={`${workSans.variable} ${chivo.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
