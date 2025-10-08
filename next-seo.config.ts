import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s | Outdoor Ñuble",
  defaultTitle: "Rafting Río Ñuble - Outdoor Ñuble | San Fabián, Chile",
  description:
    "Vive la aventura del rafting en el Río Ñuble, San Fabián, Chile. Experiencia emocionante con guías certificados, equipamiento profesional y paisajes cordilleranos únicos.",
  canonical: "https://www.outdoornuble.cl",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.outdoornuble.cl",
    siteName: "Outdoor Ñuble",
    title: "Rafting Río Ñuble - Outdoor Ñuble",
    description:
      "Vive la aventura del rafting en el Río Ñuble, San Fabián, Chile. Experiencia emocionante con guías certificados y paisajes cordilleranos únicos.",
    images: [
      {
        url: "https://www.outdoornuble.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rafting Río Ñuble - Outdoor Ñuble",
      },
    ],
  },
  twitter: {
    handle: "@outdoornuble",
    site: "@outdoornuble",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "rafting, río ñuble, san fabián, chile, aventura, deportes extremos, turismo aventura, ñuble, chillán, outdoor, ecoturismo",
    },
    {
      name: "author",
      content: "Outdoor Ñuble",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "geo.region",
      content: "CL-NB",
    },
    {
      name: "geo.placename",
      content: "San Fabián de Alico",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

export default config;
