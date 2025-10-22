"use client";

import { MapPin, Navigation, TrendingUp, Zap, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export default function RaftingMap() {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const routes = [
    {
      id: "bajo",
      name: "Ñuble Bajo",
      subtitle: "La Aventura Familiar",
      distance: "6 km",
      class: "III",
      difficulty: "Media",
      age: "8+ años",
      description: "Ideal para familias y principiantes. Nuestra sección más trabajada comercialmente con rápidos emocionantes pero seguros.",
      color: "from-rio to-bosque",
      borderColor: "border-rio/40",
      shadowColor: "shadow-rio/20",
      icon: MapPin,
      features: ["Rápidos clase III", "Guías especializados", "Todo el año"]
    },
    {
      id: "medio",
      name: "Ñuble Medio",
      subtitle: "El Desafío Intermedio",
      distance: "8 km",
      class: "III-IV",
      difficulty: "Alta",
      age: "12+ años",
      description: "Para aventureros con experiencia previa. Rápidos técnicos y oleajes más intensos que pondrán a prueba tus habilidades.",
      color: "from-amber-500 to-orange-600",
      borderColor: "border-amber-500/40",
      shadowColor: "shadow-amber-500/20",
      icon: Navigation,
      features: ["Rápidos clase III-IV", "Oleajes técnicos", "Oct - Mar"]
    },
    {
      id: "alto",
      name: "Ñuble Alto",
      subtitle: "La Máxima Adrenalina",
      distance: "12 km",
      class: "IV-V",
      difficulty: "Extrema",
      age: "16+ años",
      description: "Solo para expertos. La experiencia más extrema con rápidos clase V y caídas verticales en aguas bravas salvajes.",
      color: "from-red-600 to-rose-700",
      borderColor: "border-red-500/40",
      shadowColor: "shadow-red-500/20",
      icon: Zap,
      features: ["Rápidos clase IV-V", "Caídas verticales", "Nov - Ene"]
    }
  ];

  return (
    <section id="mapa-rutas" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-rio/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-bosque/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Río Ñuble
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Tres trayectorias únicas en San Fabián de Alico, desde aventura familiar hasta adrenalina extrema
          </p>
        </div>

        {/* Main Content - Map + Routes */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-12 lg:items-stretch">
            {/* Map Container */}
            <div className="relative group order-2 lg:order-1 h-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:shadow-rio/30 group-hover:border-rio/30 h-full">
                {/* Glowing effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rio/20 via-bosque/20 to-rio/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Map */}
                <div className="relative w-full h-full min-h-[400px] lg:min-h-0 bg-grafito/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51187.49373093154!2d-71.53823842167969!3d-36.56687999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9668e47b4a3e7ed3%3A0x45f0fb9f1e6e7b8e!2sSan%20Fabi%C3%A1n%2C%20Regi%C3%B3n%20de%20%C3%91uble%2C%20Chile!5e1!3m2!1ses!2scl!4v1647458739021!5m2!1ses!2scl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de rutas de rafting en San Fabián de Alico - Vista de Terreno"
                    className="w-full h-full absolute inset-0"
                  />
                </div>

                {/* Map overlay with location badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/40">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-montserrat font-bold text-grafito text-lg leading-tight">
                        San Fabián de Alico
                      </h3>
                      <p className="text-grafito/70 text-sm leading-tight">
                        Región del Biobío, Chile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Routes Cards */}
            <div className="flex flex-col gap-5 order-1 lg:order-2">
              {routes.map((route, index) => {
                const Icon = route.icon;
                const isHovered = hoveredRoute === route.id;

                return (
                  <div
                    key={route.id}
                    onMouseEnter={() => setHoveredRoute(route.id)}
                    onMouseLeave={() => setHoveredRoute(null)}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer ${
                      isHovered ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    {/* Glowing border effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${route.color} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}></div>

                    {/* Card content */}
                    <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-2 ${route.borderColor} rounded-3xl p-6 transition-all duration-500 group-hover:border-opacity-60 ${route.shadowColor} group-hover:shadow-2xl`}>
                      <div className="flex items-start gap-5">
                        {/* Number badge */}
                        <div className="flex-shrink-0">
                          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${route.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                              <span className="font-montserrat font-black text-grafito text-sm">{index + 1}</span>
                            </div>
                          </div>
                        </div>

                        {/* Route info */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            <h3 className="font-montserrat font-black text-2xl text-white mb-1 drop-shadow-lg">
                              {route.name}
                            </h3>
                            <p className="text-white/80 text-sm font-medium drop-shadow">
                              {route.subtitle}
                            </p>
                          </div>

                          <p className="text-white/90 text-sm leading-relaxed mb-4 drop-shadow">
                            {route.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
                              <div className="text-white/70 text-xs mb-0.5">Distancia</div>
                              <div className="font-montserrat font-bold text-white text-sm">{route.distance}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
                              <div className="text-white/70 text-xs mb-0.5">Clase</div>
                              <div className="font-montserrat font-bold text-white text-sm">{route.class}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
                              <div className="text-white/70 text-xs mb-0.5">Dificultad</div>
                              <div className="font-montserrat font-bold text-white text-sm">{route.difficulty}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
                              <div className="text-white/70 text-xs mb-0.5">Edad mín.</div>
                              <div className="font-montserrat font-bold text-white text-sm">{route.age}</div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-5">
                            {route.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${route.color} px-3 py-1.5 rounded-full shadow-lg`}
                              >
                                <TrendingUp className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-semibold">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <a
                              href={`https://wa.me/56932344214?text=${encodeURIComponent(`Hola! Me interesa la ruta ${route.name} (${route.class}). ¿Podrían darme más información?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r ${route.color} hover:opacity-90 text-white font-montserrat font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95`}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">Consultar por WhatsApp</span>
                            </a>
                            <a
                              href={`tel:+56932344214`}
                              className="sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-montserrat font-semibold py-3 px-5 rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">Llamar</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UNESCO Badge */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-rio/20 via-bosque/20 to-rio/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-white/20 group-hover:border-rio/30 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center shadow-xl relative">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute -top-1 -right-1">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-rio text-xs">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-bold text-2xl sm:text-3xl text-white mb-2 drop-shadow-lg">
                    Reserva de la Biósfera UNESCO
                  </h3>
                  <p className="text-white/90 leading-relaxed drop-shadow">
                    En el corazón del <span className="font-semibold text-white">Corredor Biológico Nevados de Chillán - Laguna del Laja</span>, un ecosistema único protegido y reconocido mundialmente por su valor natural excepcional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
