export default function StructuredData() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": "https://www.outdoornuble.cl/#touristattraction",
    "name": "Outdoor Ñuble",
    "alternateName": "Rafting Río Ñuble",
    "description": "Turismo aventura y rafting profesional en el Río Ñuble, San Fabián de Alico. Experiencias outdoor guiadas por locales certificados en la Reserva de la Biósfera declarada por la UNESCO.",
    "url": "https://www.outdoornuble.cl",
    "image": [
      "https://www.outdoornuble.cl/og-outdoornuble.jpg",
      "https://www.outdoornuble.cl/images/hero-rafting.webp"
    ],
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San Fabián de Alico",
      "addressLocality": "San Fabián",
      "addressRegion": "Región de Ñuble",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -36.5667,
      "longitude": -71.5333
    },
    "telephone": "+56932344214",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/share/1BUNJX6c1e",
      "https://www.instagram.com/extremosurexpediciones.cl"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Rafting",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rafting Familiar",
            "description": "Experiencia de rafting ideal para familias con niños desde 8 años. Rápidos clase II-III."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rafting Aventura",
            "description": "Para aventureros que buscan adrenalina pura. Rápidos clase III-IV."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rafting Extremo",
            "description": "La experiencia más intensa. Rápidos clase IV-V para expertos."
          }
        }
      ]
    },
    "tourBookingPage": "https://api.whatsapp.com/send?phone=56932344214"
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.outdoornuble.cl/#organization",
    "name": "Outdoor Ñuble",
    "url": "https://www.outdoornuble.cl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.outdoornuble.cl/images/logo.webp"
    },
    "description": "Operador de turismo aventura especializado en rafting en el Río Ñuble, ubicado en la Reserva de la Biósfera de Ñuble, Chile.",
    "email": "contacto@outdoornuble.cl",
    "telephone": "+56932344214",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San Fabián de Alico",
      "addressLocality": "San Fabián",
      "addressRegion": "Región de Ñuble",
      "postalCode": "3780000",
      "addressCountry": "CL"
    },
    "sameAs": [
      "https://www.facebook.com/share/1BUNJX6c1e",
      "https://www.instagram.com/extremosurexpediciones.cl"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.outdoornuble.cl"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
