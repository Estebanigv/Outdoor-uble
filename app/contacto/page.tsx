import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloatingCTA from "@/components/WhatsAppFloatingCTA";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getDefaultRaftingMessage } from "@/lib/getWhatsAppLink";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import aboutData from "@/content/about.json";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para reservar tu aventura en el Río Ñuble. Estamos en San Fabián de Alico, Región de Ñuble, Chile.",
};

export default function ContactoPage() {
  return (
    <>
      <SiteHeader phone={aboutData.contact.phone} />
      <WhatsAppFloatingCTA phone={aboutData.contact.phone} />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative text-white py-20 md:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-rafting.webp"
              alt="Contacto - Outdoor Ñuble"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rio/85 to-bosque/85" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Contacto</h1>
              <p className="text-xl md:text-2xl text-white drop-shadow-md">
                ¿Listo para tu próxima aventura? Escríbenos y te responderemos a la brevedad
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-grafito">
                    Información de Contacto
                  </h2>
                  <p className="text-grafito/70 mb-8">
                    Estamos ubicados en San Fabián de Alico, en el corazón de la Reserva de la
                    Biósfera del Río Ñuble. Contáctanos por cualquiera de estos medios.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="bg-rio/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-rio" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-grafito">Teléfono</h3>
                        <a
                          href={`tel:${aboutData.contact.phone}`}
                          className="text-rio hover:underline"
                        >
                          {aboutData.contact.phone}
                        </a>
                        <p className="text-sm text-grafito/60 mt-1">Lunes a Domingo, 9:00 - 20:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="bg-bosque/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-bosque" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-grafito">Email</h3>
                        <a
                          href={`mailto:${aboutData.contact.email}`}
                          className="text-rio hover:underline break-all"
                        >
                          {aboutData.contact.email}
                        </a>
                        <p className="text-sm text-grafito/60 mt-1">
                          Respondemos en menos de 24 horas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="bg-tierra/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-tierra" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-grafito">Ubicación</h3>
                        <p className="text-grafito/70">{aboutData.contact.address}</p>
                        <p className="text-sm text-grafito/60 mt-1">
                          60 km al este de Chillán
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold mb-4 text-grafito">Síguenos en redes sociales</h3>
                  <div className="flex gap-4">
                    <a
                      href={aboutData.contact.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6 text-grafito" />
                    </a>
                    <a
                      href={aboutData.contact.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6 text-grafito" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-br from-bosque to-bosque/90 p-6 rounded-lg text-white">
                  <h3 className="font-display text-xl font-bold mb-2">
                    ¿Prefieres WhatsApp?
                  </h3>
                  <p className="mb-4 text-green-50">
                    Chatea directamente con nosotros y obtén respuestas instantáneas
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white text-bosque hover:bg-white/90 w-full sm:w-auto"
                  >
                    <a
                      href={getWhatsAppLink(aboutData.contact.phone, getDefaultRaftingMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg border border-border">
                <h2 className="font-display text-2xl font-bold mb-6 text-grafito">
                  Envíanos un Mensaje
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-20 bg-crema">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-center mb-8 text-grafito">
                Cómo Llegar
              </h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-rio mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2 text-grafito">
                    San Fabián de Alico
                  </h3>
                  <p className="text-grafito/70 mb-4">
                    Región de Ñuble, Chile
                  </p>
                  <p className="text-sm text-grafito/60 max-w-md mx-auto">
                    Desde Chillán: Toma la Ruta N-55 hacia el este por aproximadamente 60 km hasta
                    San Fabián de Alico. El viaje dura aproximadamente 1 hora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Rápido */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-center mb-12 text-grafito">
                Preguntas Frecuentes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-crema p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-grafito">¿Cuándo puedo reservar?</h3>
                  <p className="text-sm text-grafito/70">
                    Puedes reservar en cualquier momento. Te recomendamos hacerlo con al menos 48
                    horas de anticipación.
                  </p>
                </div>
                <div className="bg-crema p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-grafito">¿Qué formas de pago aceptan?</h3>
                  <p className="text-sm text-grafito/70">
                    Aceptamos transferencia bancaria, efectivo y pagos electrónicos. Consulta por
                    otros métodos.
                  </p>
                </div>
                <div className="bg-crema p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-grafito">¿Ofrecen transporte?</h3>
                  <p className="text-sm text-grafito/70">
                    Sí, ofrecemos transporte desde el punto de encuentro hasta el río (ida y
                    vuelta) incluido en el tour.
                  </p>
                </div>
                <div className="bg-crema p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-grafito">¿Cuál es la política de cancelación?</h3>
                  <p className="text-sm text-grafito/70">
                    Puedes cancelar hasta 48 horas antes para reembolso completo. Consulta
                    condiciones especiales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter contact={aboutData.contact} />
    </>
  );
}
