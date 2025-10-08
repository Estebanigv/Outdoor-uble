import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloatingCTA from "@/components/WhatsAppFloatingCTA";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getDefaultRaftingMessage } from "@/lib/getWhatsAppLink";
import { Shield, Heart, Users, Leaf, Award, Target } from "lucide-react";
import aboutData from "@/content/about.json";

export const metadata: Metadata = {
  title: "Nosotros - Quiénes Somos",
  description:
    "Conoce a Outdoor Ñuble, empresa de turismo aventura sustentable en San Fabián. Guías locales certificados, compromiso con la naturaleza y experiencias inolvidables.",
};

export default function NosotrosPage() {
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
              alt="Outdoor Ñuble - Turismo Aventura"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rio/85 to-bosque/85" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                {aboutData.company.tagline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
                {aboutData.company.description}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-crema p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-rio" />
                  <h2 className="font-display text-3xl font-bold text-grafito">
                    {aboutData.mission.title}
                  </h2>
                </div>
                <p className="text-grafito/80 leading-relaxed">{aboutData.mission.description}</p>
              </div>

              <div className="bg-crema p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-8 w-8 text-bosque" />
                  <h2 className="font-display text-3xl font-bold text-grafito">
                    {aboutData.vision.title}
                  </h2>
                </div>
                <p className="text-grafito/80 leading-relaxed">{aboutData.vision.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-crema">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-grafito">
                Nuestros Valores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutData.values.map((value, index) => {
                  const icons = [Shield, Leaf, Award, Heart, Users];
                  const Icon = icons[index % icons.length];

                  return (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Icon className="h-10 w-10 text-rio mb-4" />
                      <h3 className="font-display text-xl font-bold mb-3 text-grafito">{value.title}</h3>
                      <p className="text-grafito/70">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-6 text-grafito">
                {aboutData.team.title}
              </h2>
              <p className="text-xl text-center text-grafito/70 mb-12 max-w-3xl mx-auto">
                {aboutData.team.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutData.team.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3 bg-crema p-4 rounded-lg">
                    <Award className="h-5 w-5 text-bosque flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-grafito/80">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-crema">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-grafito">
                ¿Por Qué Elegirnos?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutData.whyChooseUs.map((reason, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg">
                    <h3 className="font-display text-xl font-bold mb-3 text-grafito">{reason.title}</h3>
                    <p className="text-grafito/70">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Stats */}
        <section className="py-20 bg-gradient-to-br from-rio to-bosque text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
                {aboutData.experience.title}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                    {aboutData.experience.yearsOfOperation}+
                  </div>
                  <div className="text-blue-100">Años de Experiencia</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                    {aboutData.experience.happyCustomers}
                  </div>
                  <div className="text-blue-100">Clientes Felices</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                    {aboutData.experience.toursCompleted}
                  </div>
                  <div className="text-blue-100">Tours Completados</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">100%</div>
                  <div className="text-blue-100">Seguridad</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-grafito">
                ¿Listo para tu próxima aventura?
              </h2>
              <p className="text-xl mb-8 text-grafito/70">
                Únete a nosotros y descubre la magia del Río Ñuble
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-rio hover:bg-rio/90 text-lg px-8 py-6">
                  <a href={getWhatsAppLink(aboutData.contact.phone, getDefaultRaftingMessage())}>
                    Reservar por WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-grafito text-grafito hover:bg-crema">
                  <a href="/contacto">Contacto</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter contact={aboutData.contact} />
    </>
  );
}
